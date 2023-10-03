import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import firebaseAuthErrorMessages from "../Utils/errorMapping";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ HandleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setcnfPassword] = useState("");
  const { theme } = UseThemes();

  const HandleSubmitInfo = () => {
    if (!email || !password || !cnfPassword) {
      toast.warn("All fields are mandatory !", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          color: "yellow",
        },
      });
      return;
    }
    if (password !== cnfPassword) {
      toast.warn("Password Mismatch !", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          color: "yellow",
        },
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast.success("Acount Created successfully !", {
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
        toast.error(
          firebaseAuthErrorMessages[error.code] || "Some error occured",
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
    <Box
      className="box-signup"
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: theme.background,
      }}
    >
      <TextField
        type="email"
        label="Enter the email Please"
        variant="outlined"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        InputLabelProps={{
          style: {
            color: theme.color,
          },
        }}
        inputProps={{
          style: {
            color: theme.color,
          },
        }}
      />

      <TextField
        type="password"
        label="Enter Password"
        variant="outlined"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        inputProps={{
          style: {
            color: theme.color,
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.color,
          },
        }}
      />
      <TextField
        type="password"
        label="Confirm Password"
        variant="outlined"
        onChange={(event) => {
          setcnfPassword(event.target.value);
        }}
        InputLabelProps={{
          style: {
            color: theme.color,
          },
        }}
        inputProps={{
          style: {
            color: theme.color,
          },
        }}
      />

      <Button
        variant="contained"
        size="large"
        style={{ background: theme.color, color: `${theme.background}` }}
        onClick={HandleSubmitInfo}
        className="signup-btn"
      >
        Signup
      </Button>
    </Box>
  );
};
export default Signup;
