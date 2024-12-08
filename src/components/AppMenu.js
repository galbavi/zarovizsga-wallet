import { AppBar, Box, Button, Grid2, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useAuth } from "../hooks/useAuth";

export const AppMenu = () => {
  const navigate = useNavigate();
  const { authToken, logout } = useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid2 spacing={2}>
          <Grid2 size={{}}></Grid2>
        </Grid2>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => {
            navigate("/");
          }}
        >
          Wallets
        </Typography>
        {authToken !== false && (
          <>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/mywallets");
              }}
            >
              My Wallet
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/sharedwallets");
              }}
            >
              Shared Wallet
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
