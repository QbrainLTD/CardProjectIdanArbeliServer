import { Container, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      <Container
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Container sx={{ flex: 1, mr: 2 }}>
          <Typography variant="h6">About Page</Typography>
          <Typography variant="body1" paragraph>
            This project is a dynamic web application that empowers users to create, upload, search, and edit business cards. The platform is designed to provide a simple yet powerful solution for individuals and businesses looking to manage and showcase their profiles online. Users can easily add their business details, including images, contact information, and descriptions, and then categorize their cards for easy discovery by others.

            One of the standout features is the ability to search through all uploaded cards, making it incredibly efficient to find specific businesses or services. Additionally, users can edit their existing cards, ensuring that their information remains up-to-date and accurate. The platform also suggests potential business profiles to users based on their interests or browsing history, enhancing user engagement and helping businesses reach a wider audience.

            Built with the power of React, this application offers a smooth and responsive user experience. React's component-based architecture allows for seamless updates and efficient rendering, ensuring that users enjoy fast load times and a fluid interface. The flexibility of React also enables easy expansion of features and customization, making this platform a robust solution for business card management in the digital age.
          </Typography>
        </Container>
        <Container sx={{ flex: 1 }}>
          <img
            src="/images/card.png"
            alt="Card"
            style={{ width: "100%", maxWidth: 400 }}
          />
        </Container>
      </Container>
    </Container>
  );
}
