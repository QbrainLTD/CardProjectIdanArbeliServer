import CardComponent from "./card/CardComponent";
import { Container } from "@mui/material";

export default function Cards({ cards, handleDelete, handleLike, handlePhoneCard, handleSearch }) {
  const handleEdit = (id) => {
    console.log("editing card " + id);
  };
  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      {cards.map((card) => (
        <CardComponent
          card={card}
          key={card._id}
          handleDelete={handleDelete}
          handleLike={handleLike}
          handleEdit={handleEdit}
          handlePhoneCard={handlePhoneCard}
          handleSearch={handleSearch}
        />
      ))}
    </Container>
  );
}
