import { Box, Divider, List, ListItem, Paper } from "@mui/material";
import React from "react";

export const About: React.FC = () => {
  return (
    <Box sx={{ padding: 6, borderRadius: 4, margin: "12px 24px" }}>
      <Paper
        sx={{
          maxWidth: 400,
          margin: "0 auto",
        }}
        elevation={15}
      >
        <List>
          <ListItem>Create React App Bootstrapping</ListItem>
          <Divider />
          <ListItem>MUI components for quick UI</ListItem>
          <Divider />
          <ListItem>React Router V6 for Routing</ListItem>
          <Divider />
          <ListItem>Some lorel ipsum</ListItem>
          <Divider />
          <ListItem> some placeholder images</ListItem>
        </List>
      </Paper>
    </Box>
  );
};
