import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RegisterForm from "../RegisterProduct/RegisterForm";
import Product from "../Product/Product";
import ProductsTable from "../ProductsTable/ProductsTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  deployContract: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    display: 'block'
  },
  inputRoot: {
    color: "inherit",
  },

  floatingButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    background: theme.palette.error.light,
  },
}));

export default function AppBarTop() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [deployState, setDeployState] = React.useState("Deploy");
  const [contractAddress, setContractAddress] = React.useState(null);

  //Floating button dialog
  const [open, setOpen] = React.useState(false);

  // Deploy action
  async function deployContract() {
    setLoading(true);
    setErrorMsg(null);
    setDeployState("Deploying...");
    try {
      const res = await fetch("http://localhost:4000/api/contract", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      });
      const { contractAddress: addr, error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
        setDeployState("Error! - Retry Deploy");
      } else {
        setContractAddress(addr);
        setDeployState("Redeploy");
      }
    } catch (err) {
      setErrorMsg(err.stack);
      setDeployState("Error! - Retry Deploy");
    }
    setLoading(false);
  }

  // Floating button

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
            Get Your favorite product
          </Typography>
        </Toolbar>
      </AppBar>
      { errorMsg && <pre class="App-error">
          Error: {errorMsg}
        </pre>}
      <div className={classes.deployContract}>
        <Button
          variant="contained"
          color="secondary"
          disabled={loading}
          onClick={deployContract}
        >
          {deployState} Contract
        </Button>
        {contractAddress && <p>Contract Address: {contractAddress}</p>}
      </div>

      <Fab
        color="primary"
        aria-label="add"
        disabled={!contractAddress || loading}
        className={classes.floatingButton}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <ProductsTable contractAddress={contractAddress}></ProductsTable>
      <Product
        open={open}
        onClose={handleClose}
        contractAddress={contractAddress}
      ></Product>

      <RegisterForm
        open={open}
        onClose={handleClose}
        contractAddress={contractAddress}
      />
    </div>
  );
}
