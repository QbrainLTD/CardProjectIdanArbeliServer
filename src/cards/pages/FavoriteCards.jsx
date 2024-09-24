import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";

export default function FavoriteCards() {
  const { handleFavCards, favoriteCards, isLoading, handleLike } = useCards();

  useEffect(() => {
    if (favoriteCards.length === 0) { 
      handleFavCards(); 
    }
  }, [favoriteCards, handleFavCards]);  

  return (
    <div>
      <PageHeader
        title="Favorite Cards"
        subtitle="On this page you can find all favorite business cards liked by you"
      />
      <CardsFeedback
        cards={favoriteCards}  
        isLoading={isLoading}
        error={null}
        handleDelete={() => { }}  
        handleLike={handleLike} 
      />
    </div>
  );
}
