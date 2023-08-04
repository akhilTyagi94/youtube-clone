import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, IconButton, Avatar, Menu, MenuItem, Box } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../lib/firebase";

import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await auth.signOut().then(() => navigate("/"));
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="YT" height={45}></img>
      </Link>
      <Box display="flex" justifyContent="flex-end" gap="2">
        <SearchBar />
        <IconButton
          id="demo-positioned-menu"
          onClick={handleClick}
          size="small"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar src={currentUser?.photoURL} sx={{ width: 32, height: 32 }} />
        </IconButton>
        <div>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Box>
    </Stack>
  );
};

export default Navbar;
