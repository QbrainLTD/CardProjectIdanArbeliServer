import { useCallback, useEffect, useMemo, useState } from "react";
import SnackbarProvider, { useSnack } from "../../providers/SnackbarProvider";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { changeLikeStatus, deleteCard, editCard, createCard, getCards, getMyCards } from "../services/cardsApiService";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function useCards() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [filteredCards, setFilteredCards] = useState([]); // For filtered cards
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [searchParams] = useSearchParams(); // Hook for handling query parameters
  const { user } = useCurrentUser();
  const setSnack = useSnack();
  const navigate = useNavigate();
  useAxios();

  // Function to handle the status of a request
  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setIsLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  // Update query and filter cards whenever search query changes
  useEffect(() => {
    const query = searchParams.get("q")?.toLowerCase() || "";

    // Filter cards based on the query
    const filtered = cards.filter((card) =>
      card.title?.toLowerCase().includes(query) ||
      card.description?.toLowerCase().includes(query)
    );
    setFilteredCards(filtered);
  }, [searchParams, cards]);

  // Fetch all cards
  const getAllCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://card-server.onrender.com/cards");
      const fetchedCards = response.data || [];
      setCards(fetchedCards); // Set all cards
      setFavoriteCards(fetchedCards); // Set favorite cards (if necessary)
      setSnack("success", "All cards are here!");
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cards:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [setSnack]);

  const getCardById = useCallback(async (id) => {
    try {
      const response = await axios.get(`https://card-server.onrender.com/cards/${id}`);
      const data = response.data;
      setCard(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleGetMyCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDelete = useCallback(async (cardId) => {
    try {
      setIsLoading(true);
      await deleteCard(cardId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }, []);

  const handleLike = useCallback(async (cardId) => {
    try {
      const card = await changeLikeStatus(cardId);
      requestStatus(false, null, cards, card);
      setSnack("success", "The business card has been liked!");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [cards, setSnack]);

  const handleCreateCard = useCallback(async (cardFromClient) => {
    setError(null);
    setIsLoading(true);
    try {
      const card = await createCard(normalizeCard(cardFromClient));
      setCard(card);
      setSnack("success", "A new business card has been created!");
      setTimeout(() => {
        navigate(ROUTES.ROOT);
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setSnack, navigate]);

  const handlePhoneCard = (id) => {
    window.location.href = `tel:${id}`;
  };

  const handleUpdateCard = useCallback(async (cardId, cardFromClient) => {
    setIsLoading(true);
    try {
      const card = await editCard(cardId, normalizeCard(cardFromClient));
      setCard(card);
      setSnack("success", "The business card has been updated!");
      setTimeout(() => navigate(ROUTES.ROOT), 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setSnack, navigate]);


  const handleGetCard = useCallback(async (cardId) => {
    setIsLoading(true);
    try {
      const card = await getCards(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      console.error(`Error fetching card ${cardId}:`, error);
      requestStatus(false, error.message || 'An error occurred', null);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const handleFavCards = useCallback(async () => {
    try {
      setIsLoading(true);
      await getAllCards();
      console.log(cards);


      if (user && user._id) {
        const favData = cards.filter(card => card.likes.includes(user._id));
        console.log(favData);
        setFavoriteCards(favData);
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getAllCards, cards, user, setFavoriteCards]);








  return {
    cards,
    card,
    error,
    isLoading,
    favoriteCards,
    filteredCards, // Return filtered cards
    getAllCards,
    handleFavCards,
    getCardById,
    handleGetMyCards,
    handleDelete,
    handleLike,
    handleUpdateCard,
    handlePhoneCard,
    handleCreateCard,
  };
}
