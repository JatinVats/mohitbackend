import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });



app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

let FRONTEND_URL="https://vocal-stardust-0baf34.netlify.app"
// let FRONTEND_URL="http://localhost:5173"
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservationRouter);
console.log("hi")
dbConnection();

app.use(errorMiddleware);

export default app;