import { Balance } from "@mui/icons-material";
import { Modal, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "../firebaseConfig";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import { useNavigate } from "react-router";
import { useGlobalContext } from "../GlobalContextFolder/myContext";

function Comparision() {
  const [open, setOpen] = useState(false);
  const [Email, setEmail] = useState("");

  const obj = UseThemes();
  const { currentUserData } = useGlobalContext();
  const navigate = useNavigate();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleTopper() {
    if (currentUserData.length < 2) {
      toast.warn("You need to give atleast two tests to compare with Topper", {
        style: {
          background: "black",
          color: "yellow",
        },
      });
      return;
    } else {
      navigate("/topperpage");
      return;
    }
  }

  function HandleSubmitForFriend() {
    if (!Email.includes("@") || !Email.includes(".com")) {
      toast.warning("Please Enter proper email like (@,.com)", {
        style: {
          background: "black",
          color: "yellow",
        },
      });
    } else if (Email.length < 6) {
      toast.warning("Email should atleast of 6 length !", {
        style: {
          background: "black",
          color: "yellow",
        },
      });
    } else {
      if (currentUserData.length < 2) {
        toast.warn(
          "You need to give atleast two tests to compare with friend",
          {
            style: {
              background: "black",
              color: "yellow",
            },
          }
        );
        return;
      }

      localStorage.setItem("Email", JSON.stringify(Email));
      navigate("/FriendComparePage");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        gap: "30px",
        flexFlow: "row wrap",
      }}
    >
      <div className="box-compare" onClick={handleOpen}>
        <abbr title="Compare with your friends">
          <Balance
            style={{ fontSize: "65px", marginRight: "30px", cursor: "pointer" }}
          />
        </abbr>
        <h2>Compare your Typing speed and accuracy with your friends</h2>
      </div>
      <div className="box-compare" onClick={handleTopper}>
        <abbr title="Cm your abilities with your friends">
          <EmojiEventsIcon
            style={{ fontSize: "65px", marginRight: "30px", cursor: "pointer" }}
          />
        </abbr>
        <h2>Check Where you are and Topper</h2>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px dotted red",
          }}
        >
          <Box
            sx={{
              color: obj.theme.color,
              width: "400px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "5px",
              gap: "30px",
              p: 5,
              background: `${obj.theme.background}`,
            }}
          >
            <TextField
              value={Email}
              label="Friend's Email"
              variant="outlined"
              placeholder="Enter Your friend's Email "
              onChange={(e) => {
                setEmail(e.target.value.trim());
              }}
              required={true}
              inputProps={{
                style: {
                  border: "none",
                  color: `${obj.theme.color}`,
                },
              }}
              InputLabelProps={{
                style: {
                  border: "none",
                  color: obj.theme.color,
                },
              }}
            />
            <Button
              onClick={HandleSubmitForFriend}
              style={{
                background: `${obj.theme.color}`,
                color: `${obj.theme.background}`,
              }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Comparision;
