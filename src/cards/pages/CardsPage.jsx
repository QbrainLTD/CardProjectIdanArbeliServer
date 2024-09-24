import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { grey } from "@mui/material/colors";

const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(12),
  right: theme.spacing(2),
}));

export default function CardsPage() {
  const { filteredCards,cards, error, isLoading, getAllCards, handleDelete, handleLike, handlePhoneCard } = useCards();

  
  useEffect(() => {
    getAllCards();  
  }, [getAllCards]);

  const { user } = useCurrentUser();
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader 
        title="Cards page"
        subtitle="On this page you can find all business cards from all categories"
      />

      
      <CardsFeedback
        cards={filteredCards} 
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleLike={handleLike}
        handlePhoneCard={handlePhoneCard}
      />

      {user && (
        <FloatingButton color="primary" aria-label="add" onClick={() => navigate(ROUTES.CREATE_CARD)}>
          <AddIcon />
        </FloatingButton>
      )}
    </div>
  );
}
