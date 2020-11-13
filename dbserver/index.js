import config from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/ProductRoutes";
import cors from "cors";

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 4005;

app.use(cors());

app.use("/api/products", productRoutes);

// when a random route is inputed
app.get("*", (req, res) =>
  res.status(200).send({
    message: "DB API has started",
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
