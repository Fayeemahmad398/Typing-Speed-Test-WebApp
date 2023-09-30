import { Balance, Leaderboard } from "@mui/icons-material";
import { Modal, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { UseThemes } from "../GlobalContextFolder/MyThemeContext";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, database } from "../firebaseConfig";
import { useGlobalContext } from "../GlobalContextFolder/myContext";

import { useNavigate } from "react-router";

function Comparision() {
  const [open, setOpen] = useState(false);
  const [Email, setEmail] = useState("");
  const obj = UseThemes();
  const navigate = useNavigate();
  const myGlobalContext = useGlobalContext();
  console.log(myGlobalContext);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function HandleSubmit() {
    console.log(Email);
    if (!Email.includes("@") || !Email.includes(".com")) {
      toast.warning("Please,Enter proper email(includes like @,.com )", {
        style: {
          background: "black",
          color: "yellow",
        },
      });
    } else if (Email.length < 6) {
      toast.warning("Email should be atleast 6 characters", {
        style: {
          background: "black",
          color: "yellow",
        },
      });
    } else {
      try {
        const q = query(
          collection(database, "result"),
          where("Email", "==", Email),
          orderBy("WPM", "desc")
        );

        const AllDocs = await getDocs(q);
        console.log(AllDocs);
        let top5ScoresOfFriend = [];

        AllDocs.docs.map((doc, index) => {
          if (index <= 4) {
            top5ScoresOfFriend.push(doc.data());
          }
        });

        if (top5ScoresOfFriend.length == 5) {
          if (myGlobalContext.CurrentUserData.length < 5) {
            toast.warning(
              "You need to give Atleast 5 tests to compare with friend !",
              {
                style: {
                  background: "black",
                  color: "yellow",
                },
              }
            );
          } else {
            console.log("saving both data");

            myGlobalContext.dataForCompare = [
              myGlobalContext.CurrentUserData.slice(0,5),
              top5ScoresOfFriend,
            ];
            navigate("/ComparePage");
          }
        } else {
          toast.warning(
            "Your friend needs to give Atleast 5 tests to compare in healthy competition !",
            {
              style: {
                background: "black",
                color: "yellow",
              },
            }
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div>
      <div>
        <Balance onClick={handleOpen} />
        <Leaderboard />
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
            border: "10px dotted red",
          }}
        >
          <Box
            sx={{
              color: obj.theme.color,
              width: "400px",

              display: "flex",
              flexDirection: "column",
              gap: "30px",
              p: 5,
              background: `${obj.theme.background}`,
            }}
          >
            <TextField
              value={Email}
              label="Outlined"
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
              onClick={HandleSubmit}
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
