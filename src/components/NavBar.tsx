import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useSetRecoilState } from "recoil";
import { mobileMenuOpenState } from "./SideNav/SideNavAtom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: "none",
  },
  tooltip: {
    fontSize: theme.typography.fontSize * 1.2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const NavBar: React.FunctionComponent = () => {
  const classes = useStyles();
  const setMobileMenuOpen = useSetRecoilState(mobileMenuOpenState);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setMobileMenuOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            Example Gift Register
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
