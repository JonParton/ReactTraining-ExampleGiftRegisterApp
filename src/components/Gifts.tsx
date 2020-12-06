import { Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import AddEditGiftDialog from "./AddEditGiftDialog";
import GiftTable from "./GiftTable";
import hardcodedGifts from "../harcodedData/gifts.json";
import { Gift, initGift } from "../models/gift";
import {
  addEditGiftDialogOpenAtom,
  giftToBeEditedAtom,
} from "../state/GiftModalAtom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  mainContent: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
    display: "flex",
  },
  mainPaper: {
    padding: 24,
  },
  addEditArea: {
    marginTop: theme.spacing(2),
  },
  clearLocalStorageButton: {
    marginTop:10,
    // Only float right when we are not in column mode!
    [theme.breakpoints.up('md')]: {
      float:"right",
    },
  },
}));

interface GiftsURLParamsTypes {
  giftIDParam: string | undefined;
}

function Gifts() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [giftsArray, setGiftsArray] = useState<Gift[]>(hardcodedGifts);
  const [giftArrayLoaded, setGiftArrayLoaded] = useState(false);
  const setAddEditGiftDialogOpen = useSetRecoilState(addEditGiftDialogOpenAtom);
  const [giftToBeEdited, setGiftToBeEdited] = useRecoilState(
    giftToBeEditedAtom
  );
  let { giftIDParam } = useParams<GiftsURLParamsTypes>();
  const history = useHistory();
  const match = useRouteMatch();

  // The first time we load - Make sure we get
  useEffect(() => {
    const giftsLocalStorage = localStorage.getItem("gifts");
    if (giftsLocalStorage !== null) {
      setGiftsArray((prevState) => {
        setGiftArrayLoaded(true);
        return JSON.parse(giftsLocalStorage);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(giftsArray));
  }, [giftsArray]);

  function receiveGiftFromForm(gift: Gift) {
    if (gift.giftID === 0) {
      gift.giftID = getNextAvailableGiftID();

      setGiftsArray((prevState) => [...prevState, gift]);
    } else {
      // Update the gift in our current array as it should exist already!
      setGiftsArray((prevState) => [
        ...prevState.filter((aGift) => aGift.giftID !== gift.giftID),
        gift,
      ]);
    }
  }

  function getNextAvailableGiftID(): number {
    // Check if we actually have any ID's, if not return 1 else work out the next available.
    if (giftsArray.length === 0) {
      return 1;
    } else {
      return Math.max(...giftsArray.map((gift) => gift.giftID)) + 1;
    }
  }

  function clearGiftsFromLocalStorage() {
    localStorage.removeItem("gifts");
    // Rest our state to the Hardcoded Data file.
    setGiftsArray(hardcodedGifts);
  }

  function deleteGift(giftID: number) {
    if (giftID > 0) {
      // By checking if the returned list of gifts have the ID we are also checking access.
      // We are not checking if they have "Rights" however.
      const existingGiftArray = giftsArray.filter(
        (aGift) => aGift.giftID === giftID
      );

      if (existingGiftArray.length === 1) {
        setGiftsArray((prevState) => [
          ...prevState.filter((aGift) => aGift.giftID !== giftID),
        ]);
      }
    }
  }

  function launchEditGift(giftID: number) {
    // Set the current edited gift to our Gift object.
    //console.log(gift);
    history.push(`${match.url}/${giftID}`);
  }

  useEffect(() => {
    if (giftIDParam) {
      const giftID = parseInt(giftIDParam);

      if (!isNaN(giftID) && giftID >= 0) {
        if (giftID === 0) {
          setGiftToBeEdited(initGift());

          setAddEditGiftDialogOpen(true);
        } else {
          // By checking if the returned list of gifts have the ID we are also checking access.
          // We are not checking if they have "Rights" however.
          const existingGiftArray = giftsArray.filter(
            (aGift) => aGift.giftID === giftID
          );

          if (existingGiftArray.length === 1) {
            setGiftToBeEdited(existingGiftArray[0]);

            setAddEditGiftDialogOpen(true);
          } else {
            // We have a wired quirk with having so many bloody use effects here.
            // This can run and remove the query parameter before the gifts load into
            // the table.
            if (giftArrayLoaded && match && match.url) {
              let url = match.url;
              let urlParts = url.split("/");
              urlParts.pop();
              let nonEditURL = urlParts.join("/");

              //Replace the history so they don't get the error again when hitting back.
              history.replace(`${nonEditURL}`);
              enqueueSnackbar(
                "We could not find the gift you are looking for",
                {
                  variant: "error",
                }
              );
            }
          }
        }
      } else {
        // The gift ID was not an ID at all! Remove it.
        if (match && match.url) {
          let url = match.url;
          let urlParts = url.split("/");
          urlParts.pop();
          let nonEditURL = urlParts.join("/");

          //Replace the history so they don't git the error again when hitting back.
          history.replace(`${nonEditURL}`);
          enqueueSnackbar("That's not a Gift ID! Your link may be broken.", {
            variant: "error",
          });
        }
      }
    }
  }, [
    enqueueSnackbar,
    giftArrayLoaded,
    giftIDParam,
    giftsArray,
    history,
    match,
    setAddEditGiftDialogOpen,
    setGiftToBeEdited,
  ]);

  return (
    <React.Fragment>
      <Paper elevation={8} className={classes.mainPaper}>
        <Grid container>
          <Grid item md={8} xs={12}>
          <Typography variant="h3" gutterBottom>
            Current Gifts Made
            
          </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
          <Button
              className={classes.clearLocalStorageButton}
              variant="outlined"
              startIcon={<DeleteForeverIcon />}
              onClick={clearGiftsFromLocalStorage}
            >
              Clear LocalStorage
            </Button>
          </Grid>
        </Grid>
        <hr />
        <Typography variant="h5" gutterBottom>
          List of current gifts in the system
        </Typography>

        <GiftTable
          gifts={giftsArray}
          deleteGift={deleteGift}
          launchEditGift={launchEditGift}
        />

        {/* The Edit Area */}
        <Box className={classes.addEditArea}>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={() => {
              launchEditGift(0);
            }}
          >
            Register New Gift
          </Button>
        </Box>
      </Paper>
      {/* Notice the use of the Component Key here ....
          This is some jiggery pokery to make sure my initial values of the form 
          are reset correctly when the gift being edited changes. 
          When the Key changes it discards the component and starts again!
          */}
      <AddEditGiftDialog
        key={giftToBeEdited.giftID}
        receiveGiftFromForm={receiveGiftFromForm}
      />
    </React.Fragment>
  );
}

export default Gifts;
