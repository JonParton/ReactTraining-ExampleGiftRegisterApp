import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  SwipeableDrawer,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { mobileMenuOpenState } from "./SideNavAtom";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => ({
  sideBarPaper: {
    //padding: 24,
    marginRight: 10,
    height: "100%",
  },
  navigationTitle: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  MobileSideBar: {
    padding: theme.spacing(3),
  },
}));

export default function SideNav(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [mobileMenuOpen, setMobileMenuOpen] = useRecoilState(
    mobileMenuOpenState
  );

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setMobileMenuOpen(open);
  };

  const MenuItems = () => {
    return (
      <List component="nav">
        <ListItem
          button
          onClick={() => {
            history.push("/");
            setMobileMenuOpen(false);
          }}
          divider
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Introduction" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            history.push("/gift-register");
            setMobileMenuOpen(false);
          }}
          divider
        >
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText primary="Gift Register" />
        </ListItem>
      </List>
    );
  };

  return (
    <Paper className={classes.sideBarPaper}>
      {/* <Typography className={classes.navigationTitle} variant="h5" gutterBottom>
        Navigation:
      </Typography> */}
      {/* The Swipable Drawer if it is too small.*/}
      <SwipeableDrawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box className={classes.MobileSideBar}>
          <MenuItems />
        </Box>
      </SwipeableDrawer>

      <Hidden mdDown>
        <MenuItems />
      </Hidden>
    </Paper>
  );
}
