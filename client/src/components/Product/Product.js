import React from "react";
import Dialog from "@material-ui/core/Dialog";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function Product(props) {
  const { onClose, open } = props;
  const {productName, manufacturer, description, dateArrived} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h3">
            {productName}
          </Typography>
          <Typography gutterBottom variant="h5">
            By: <strong>{manufacturer}</strong>
          </Typography>
          <Typography gutterBottom variant="h5">
          Description:
          </Typography>
          <Typography gutterBottom variant="h6">
            <strong>"{description}"</strong>
          </Typography>
          <hr/>
          <Typography gutterBottom variant="h6">
            Date Arrived: {dateArrived}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Dialog>
  );
}
