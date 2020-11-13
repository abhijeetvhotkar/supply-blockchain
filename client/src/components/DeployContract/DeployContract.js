import "date-fns";
import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function DeployContract(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [deployState, setDeployState] = React.useState("Deploy");
  const [contractAddress, setContractAddress] = React.useState(null);

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
        props.constractValue(addr);
        setDeployState("Redeploy");
      }
    } catch (err) {
      setErrorMsg(err.stack);
      setDeployState("Error! - Retry Deploy");
    }
    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        disabled={loading}
        onClick={deployContract}
      >
        {deployState} Contract
      </Button>
      {contractAddress && <p>Contract Address: {contractAddress}</p>}
      { errorMsg && <pre class="App-error">
          Error: {errorMsg}
        </pre>}
    </div>
  );
}
