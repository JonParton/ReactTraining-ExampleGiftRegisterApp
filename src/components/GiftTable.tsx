import {
  Box,
  Button,
  fade,
  InputBase,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Gift } from "../models/gift";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  gridIcon: {
    minWidth: "24px",
    width: "24px",
    float: "left",
    marginLeft: "5px",
  },
  gridIconCell: {
    width: "70px",
    padding: "0",
  },
  searchBox: {
    backgroundColor: theme.palette.grey[200],
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type props = {
  gifts: Gift[];
  deleteGift(giftID: number): void;
  launchEditGift(giftID: number): void;
};

function GiftTable(props: props) {
  const [fullGiftList, setFullGiftList] = useState(props.gifts);
  const [currentSearchText, setCurrentSearchText] = useState("");
  const classes = useStyles();

  // Make sure we handle the case of the Gift list changing above.
  useEffect(() => {
    setFullGiftList(props.gifts);
  }, [props.gifts]);

  function handleDeleteGift(giftID: number) {
    // Set the current edited gift to our Gift object.
    props.deleteGift(giftID);
  }

  function handleEditGift(giftID: number) {
    props.launchEditGift(giftID);
  }

  function decideIfGiftShouldBeShown(gift: Gift): boolean {
    let shouldWeShow: boolean = false;

    let lowerSearchText = currentSearchText.toLowerCase();

    // TODO: Can we make this generic to not have to know the Gift Structure?
    if (gift.description.toLowerCase().includes(lowerSearchText)) {
      shouldWeShow = true;
    }

    if (gift.donor.toLowerCase().includes(lowerSearchText)) {
      shouldWeShow = true;
    }

    if (gift.recipient.toLowerCase().includes(lowerSearchText)) {
      shouldWeShow = true;
    }

    if (gift.date.toLowerCase().includes(lowerSearchText)) {
      shouldWeShow = true;
    }

    //TODO: handle Value
    // if (gift.value) {
    //   shouldWeShow = true;
    // }

    return shouldWeShow;
  }

  return (
    <React.Fragment>
      {/* Search Box */}
      <Box className={classes.searchBox}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={currentSearchText}
            onChange={(e) => setCurrentSearchText(e.target.value)}
          />
        </div>
      </Box>

      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Donor</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fullGiftList
              .filter((gift) => {
                return decideIfGiftShouldBeShown(gift);
              })
              .sort((a, b) => {
                return a.giftID - b.giftID;
              })
              .map((gift) => {
                return (
                  <TableRow key={gift.giftID}>
                    <TableCell scope="row">{gift.giftID}</TableCell>
                    <TableCell>{gift.date}</TableCell>
                    <TableCell>{gift.donor}</TableCell>
                    <TableCell>{gift.recipient}</TableCell>
                    <TableCell>{gift.currency}</TableCell>
                    <TableCell>{gift.value}</TableCell>
                    <TableCell>{gift.description}</TableCell>
                    <TableCell className={classes.gridIconCell}>
                      <Button
                        className={classes.gridIcon}
                        onClick={() => {
                          handleEditGift(gift.giftID);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </Button>

                      <Button
                        className={classes.gridIcon}
                        onClick={() => {
                          handleDeleteGift(gift.giftID);
                        }}
                      >
                        <DeleteIcon color="error" fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default GiftTable;
