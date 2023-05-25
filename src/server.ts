import express, { Express } from "express";
import user from "./routes/api/user";

import connectDB from "./lib/dbConnect";

const app: Express = express();
const port: Number = 5000;

connectDB();

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", user);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
