import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import { GoogleButton } from "react-google-button";
import Signup from "./Signup";
import { useState } from "react";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import { Box } from "@mui/system";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import firebaseAuthErrorMessages from "../Utils/errorMapping";
import { auth } from "../firebaseConfig.js";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

const AccountCircle = () => {
  const [isOpen, setOpen] = useState(false);

  const [value, setvalue] = useState(0);
  const { theme } = UseThemes();
  const navigator = useNavigate();

  const [user] = useAuthState(auth);

  const HandleModal = () => {
    if (user) {
      navigator("/userpage");
    } else {
      setOpen(true);
    }
  };

  const HandleClose = () => {
    setOpen(false);
  };
  const handleChangeVal = (event, v) => {
    setvalue(v);
  };
  const handleLogout = () => {
    auth
      .signOut()
      .then((res) => {
        toast.success("logged out successfully!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            color: "green",
          },
        });
      })
      .catch((error) => {
        toast.error(" Not able to  Logged out !", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            color: "red",
          },
        });
      });
  };

  const GoogleProvider = new GoogleAuthProvider();

  const handleGoogleLogIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((res) => {
        toast.success("Google logged in successfully!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            color: "green",
          },
        });
        HandleClose();
      })
      .catch((error) => {
        console.log(error.message.Firebase);

        toast.error(
          firebaseAuthErrorMessages[error.code] ||
            "Not able use google login service",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              color: "red",
            },
          }
        );
      });
  };

  return (
    <div className="modal-sign-login">
      <AccountCircleIcon onClick={HandleModal} className="acount-circle-icon" />
      {user && (
        <LogoutIcon onClick={handleLogout} className="acount-circle-icon" />
      )}
      <Modal
        open={isOpen}
        onClose={HandleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "400px", borderRadius: "10px" }}
          className="signloginbox"
        >
          <AppBar
            position="static"
            style={{
              background: `${theme.background}`,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <Tabs variant="fullWidth" value={value} onChange={handleChangeVal}>
              <Tab label="Signup" style={{ color: theme.color }}></Tab>
              <Tab label="Login" style={{ color: theme.color }}></Tab>
            </Tabs>
          </AppBar>

          {value == 0 && <Signup HandleClose={HandleClose} />}
          {value == 1 && <Login HandleClose={HandleClose} />}

          <Box p={3}>
            <span>OR</span>
            <GoogleButton
              style={{
                width: "100%",
                marginTop: "8px",
              }}
              onClick={handleGoogleLogIn}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};
export default AccountCircle;
