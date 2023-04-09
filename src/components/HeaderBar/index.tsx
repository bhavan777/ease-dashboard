import {
  Box,
  Divider,
  List,
  ListItem,
  styled,
  ListItemButton,
  CssBaseline,
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";

const Logo = styled("img")({
  maxHeight: 24,
});

const DrawerLogo = styled(Logo)({
  margin: "12px 0",
});

const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
  marginRight: 12,
});

const DrawerLink = styled(StyledLink)({
  color: "#333",
  display: "block",
  width: "100%",
  marginRight: 0,
});

export const HeaderBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <DrawerLogo src="https://assets.website-files.com/61d349a2268b8a1801fcc09b/63216a5731f654c7b9ae73a3_Ease_Logos_no%20tm_Wordmark_Navy-p-1600.png" />
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <DrawerLink to="/">Dashboard</DrawerLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <DrawerLink to="/about">About</DrawerLink>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box minHeight={64}>
      <CssBaseline />
      <AppBar variant="elevation">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Logo src="https://assets.website-files.com/61d349a2268b8a1801fcc09b/63216a5731f654c7b9ae73a3_Ease_Logos_no%20tm_Wordmark_Navy.png" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>
              <StyledLink to="/">Dashboard</StyledLink>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <StyledLink to="/about">About</StyledLink>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 200,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
