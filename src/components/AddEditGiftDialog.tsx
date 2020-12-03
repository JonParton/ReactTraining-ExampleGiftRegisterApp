import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addEditGiftDialogOpenAtom,
  giftToBeEditedAtom,
} from "../state/GiftModalAtom";
import { makeStyles, MenuItem } from "@material-ui/core";
import { Gift } from "../models/gift";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useHistory, useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
  currencyDropdown: {
    marginTop: 7,
  },
}));

const validationSchema = yup.object({
  donor: yup
    .string()
    .label("This should be the donors name")
    .min(5, "I reckon name should be longer. Please use their full name")
    .required("Donor is required"),
  recipient: yup
    .string()
    .label("This should be the donors name")
    .min(5, "I reckon name should be longer. Please use their full name")
    .required("Recipient is required"),
  description: yup
    .string()
    .min(10, "We must have a meaty description here")
    .required("A description is required"),
  value: yup
    .number()
    .min(0, "Come on now, You can't have a negative gift!")
    .required("This is required son."),
});

interface AddEditGiftDialogProps {
  receiveGiftFromForm(gift: Gift): void;
}

export default function AddEditGiftDialog(props: AddEditGiftDialogProps) {
  // Store our open state in Recoil so function elsewhere in the tree can cause it to open.
  const [open, setOpen] = useRecoilState(addEditGiftDialogOpenAtom);
  const { enqueueSnackbar } = useSnackbar();
  const giftInitialValues = useRecoilValue(giftToBeEditedAtom);
  const history = useHistory();
  const match = useRouteMatch();

  //TODO: There is an issue here when hitting back with the edit dialog open will end you in a loop.
  const handleClose = () => {
    // Remove our edit URL.
    if (match && match.url) {
      let url = match.url;
      let urlParts = url.split("/");
      urlParts.pop();
      let nonEditURL = urlParts.join("/");
      history.push(`${nonEditURL}`);
    }
    setOpen(false);
  };

  const classes = useStyles();

  const currencies = [
    {
      value: "GBP",
      label: "£",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "AUD",
      label: "$AUD",
    },
    {
      value: "USD",
      label: "$USD",
    },
  ];

  const formik = useFormik({
    initialValues: giftInitialValues,
    validationSchema: validationSchema,
    validateOnBlur: true,
    // initialTouched:{donor:true,},
    onSubmit: (values: Gift) => {
      // alert(JSON.stringify(values, null, 2));

      const gift: Gift = values;

      // Pass our gift back up to the parent using its provided function.
      props.receiveGiftFromForm(gift);

      // Close the form.
      handleClose();
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Gift Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the details of the gift being given or received
            below.
          </DialogContentText>
          <hr />
          <TextField
            autoFocus
            id="date"
            label="Date of Gift"
            type="date"
            defaultValue="2020-12-01"
            variant="outlined"
            // This makes sure the pesky label stays at the top!
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.date}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.date)}
            helperText={formik.errors.date}
          />
          <TextField
            margin="dense"
            id="donor"
            label="Donor Name"
            variant="outlined"
            fullWidth
            value={formik.values.donor}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.donor && Boolean(formik.errors.donor)}
            helperText={formik.touched.donor && formik.errors.donor}
          />
          <TextField
            margin="dense"
            id="recipient"
            label="Recipient Name"
            variant="outlined"
            fullWidth
            value={formik.values.recipient}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.recipient && Boolean(formik.errors.recipient)}
            helperText={formik.touched.recipient && formik.errors.recipient}
          />
          <TextField
            margin="dense"
            id="value"
            label="Value of Gift"
            variant="outlined"
            type="number"
            fullWidth
            value={formik.values.value}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
          <TextField
            className={classes.currencyDropdown}
            id="currency"
            select
            label="currency"
            variant="outlined"
            value={formik.values.currency}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange("currency")}
            error={formik.touched.currency && Boolean(formik.errors.currency)}
            helperText={
              (formik.touched.currency && formik.errors.currency) ||
              "Please select the currency for the value entered above"
            }
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <hr />
          <TextField
            margin="dense"
            id="description"
            label="Description of Gift"
            variant="outlined"
            type="number"
            multiline
            //helperText=
            fullWidth
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              (formik.touched.description && formik.errors.description) ||
              "This can be as long as you want."
            }
          />
        </DialogContent>
        {/* <pre>{JSON.stringify(formik.values,null,2)}</pre>
        <pre>{JSON.stringify(formik.touched,null,2)}</pre> */}
        <DialogActions>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              formik.submitForm();
              !formik.isValid &&
                enqueueSnackbar("The form still has errors", {
                  variant: "error",
                });
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
