import React, { useEffect } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { logo } from "../utils/constants";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;

        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => user && navigate("/feed"));
  });

  return (
    <>
      <Container
        sx={{ display: "grid", placeContent: "center", height: "100vh" }}
        maxWidth="md"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom="20px"
        >
          <img src={logo} alt="YT" height={100}></img>
        </Box>
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{ marginBottom: 4 }}
          color="#fff"
        >
          Welcome to Youtopia
        </Typography>
        <Button onClick={handleLogin} variant="outlined" color="primary">
          Login with google
        </Button>
      </Container>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
          style: {
            fontSize: 14,
          },
        }}
      />
    </>
  );
}
