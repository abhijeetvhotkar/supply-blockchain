import "date-fns";
import React from "react";
import { Button, Dialog, DialogContent, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: theme.palette.secondary.main,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function RegisterForm(props) {
  const { onClose, open, contractAddress } = props;
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [state, setState] = React.useState({
    productName: "",
    description: "",
    manufacturer: "",
  });
  const [countId, setCountId] = React.useState(6);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const [dateArrived, handleDateChange] = React.useState(new Date());
  const { register, handleSubmit, errors } = useForm();

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const handleClose = () => {
    onClose(contractAddress);
  };
  async function handleAddProduct() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `http://localhost:4000/api/contract/${contractAddress}/value`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: countId,
            name: state.productName,
            description: state.description,
            manufacturer: state.manufacturer,
            dateArrived: dateArrived,
          }),
        }
      );
      setSuccess(true);
      setCountId(countId + 1);
      const { error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      }
    } catch (err) {
      setErrorMsg(err.stack);
    }
    setLoading(false);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register a new product
            </Typography>
            <p>{contractAddress}</p>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(handleAddProduct)}
            >
              <TextField
                required
                name="productName"
                inputRef={register({
                  required: "Name required",
                  maxLength: {
                    value: 50,
                    message: "Name should be less than 50 charachters",
                  },
                  minLength: {
                    value: 1,
                    message: "Name should be more than 1 charachters",
                  },
                  pattern: {
                    value: /[a-zA-Z]/,
                    message: "Name should only include alphabets",
                  },
                })}
                fullWidth
                margin="normal"
                onChange={handleChange}
                id="productName"
                label="Name"
                placeholder="Cookies"
                variant="outlined"
              />
              <p className={classes.error}>
                {errors.productName && "Product Name is required"}
              </p>
              <TextField
                required
                name="description"
                inputRef={register({
                  required: "Description required",
                  maxLength: {
                    value: 250,
                    message: "Name should be less than 250 charachters",
                  },
                  minLength: {
                    value: 1,
                    message: "Name should be more than 1 charachters",
                  },
                  pattern: {
                    value: /[a-zA-Z]/,
                    message: "Name should only include alphabets",
                  },
                })}
                fullWidth
                margin="normal"
                onChange={handleChange}
                id="description"
                label="Description"
                placeholder="A sweet treat"
                variant="outlined"
              />
              <p className={classes.error}>
                {errors.description && "Description is required"}
              </p>
              <TextField
                required
                name="manufacturer"
                inputRef={register({
                  required: "Manufacturer required",
                  maxLength: {
                    value: 100,
                    message: "Manufacturer should be less than 100 charachters",
                  },
                  minLength: {
                    value: 1,
                    message: "Manufacturer should be more than 1 charachters",
                  },
                  pattern: {
                    value: /[a-zA-Z]/,
                    message: "Manufacturer should only include alphabets",
                  },
                })}
                fullWidth
                margin="normal"
                onChange={handleChange}
                id="manufacturer"
                label="Manufacturer"
                placeholder="Giants"
                variant="outlined"
              />
              <p className={classes.error}>
                {errors.manufacturer && "Manufacturer is required"}
              </p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="dateArrived"
                  label="Date Arrived"
                  inputRef={register({
                    required: "Date required",
                  })}
                  value={dateArrived}
                  onChange={handleDateChange}
                />
                <p className={classes.error}>
                  {errors.dateArrived && "Date Arrived is required"}
                </p>
              </MuiPickersUtilsProvider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!contractAddress || loading}
                className={buttonClassname}
              >
                Add Product
              </Button>
            </form>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
