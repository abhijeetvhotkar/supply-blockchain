import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Product from "../Product/Product";



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
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
});

export default function ProductsTable(props) {
  const { contractAddress } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [productName, setProductName]  = React.useState("No data");
  const [manufacturer, setManufacturer]  = React.useState("No data");
  const [description, setDescription]  = React.useState("No data");
  const [dateArrived, setDateArrived]  = React.useState("2020-11-13T06:58:18.846Z");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleClickOpen = async (e) => {
    setLoading(true);
    // setErrorMsg(null);
    try {
      const res = await fetch(
        `http://localhost:4000/api/contract/${contractAddress}/value/${e}`,
        {
          method: "GET",
        }
      );
      const x = await res.json();
      if (!res.ok) {
        // setErrorMsg(error);
      } else {
        setProductName(x._name);
        setDescription(x._description);
        setManufacturer(x._manufacturer);
        setDateArrived(x._dateArrived.substring(0,10));
        setSuccess(true);
        setOpen(true);
      }
    } catch (err) {
      // setErrorMsg(err.stack);
    }
    setLoading(false);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  async function getProductsFromDb() {
    setLoading(true);
    // setErrorMsg(null);
    try {
      const res = await fetch("http://localhost:4005/api/products/", {
        method: "GET",
      });
      if (!res.ok) {
        // setErrorMsg(error);
      } else {
        setSuccess(true);
        const data = await res.json();
        setRows(data.data);
      }
    } catch (err) {
      // setErrorMsg(err.stack);
    }
    setLoading(false);
  }

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        className={buttonClassname}
        onClick={getProductsFromDb}
      >
        GET DB DATA
      </Button>
      <hr></hr>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={!contractAddress || loading}
                    onClick={(e) => handleClickOpen(row.id)}
                  >
                    VIEW
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Product
        productName={productName}
        manufacturer={manufacturer}
        description={description}
        dateArrived={dateArrived}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
