import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

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
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Paper elevation={8} className={classes.mainPaper}>
      <Typography variant="h3" gutterBottom>
        Introduction
      </Typography>
      <hr />
      <br />
      <Alert severity="warning">
        <Typography variant="body1" color="textSecondary">
          This is still a work in progress and is not a perfect app of course!
        </Typography>
      </Alert>
      <br />
      <Typography variant="body1" gutterBottom>
        This is an example application created during a recent react training
        that allows you to play around with a corporate gift register.
      </Typography>
      <br />
      <Typography variant="body1" gutterBottom>
        It shows the use of react and quite a few additional libraries because
        JP just can't help himself.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Features
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li>
            Deep Linking to the Edit Screen using React Router Hooks (With some
            reasonably good testing done!). To see this try adding a different
            or broken giftID to the URL when on the gift page.
            <Link style={{ color: "red", fontSize: 10 }} to="/gift-register/-8">
              [Example failure
            </Link>{" "}
            <Link
              style={{ color: "green", fontSize: 10 }}
              to="/gift-register/2"
            >
              Example success]
            </Link>
          </li>
          <li>
            Styling provided by{" "}
            <a href="https://material-ui.com/" target="_blank" rel="noreferrer">
              Material UI
            </a>{" "}
            using JSS in components to make them easily portable.
          </li>
          <li>
            Static type checking through{" "}
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Typescript!
            </a>
          </li>
          <li>
            Form and Validation impelmented through{" "}
            <a href="https://formik.org/" target="_blank" rel="noreferrer">
              Formik and Yup
            </a>
          </li>
          <li>
            Toasts used when the application needs to let you know something
            like a warning. Provided by{" "}
            <a
              href="https://github.com/iamhosseindhv/notistack"
              target="_blank"
              rel="noreferrer"
            >
              Notistack!
            </a>
          </li>
          <li>Some very simplistic searching</li>
          <li>Responsive layout implemented using Material-UI Components.</li>
          <li>
            Some lightweight client state using{" "}
            <a href="https://recoiljs.org/" target="_blank" rel="noreferrer">
              Recoil
            </a>
          </li>
          <li>...</li>
        </ul>
      </Typography>
      <br />
    </Paper>
  );
}
