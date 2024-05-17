// ---------- APPLICATION ----------
// Packages import
import express, { Application, Request, Response } from "express";
import cors from "cors";

// Routes import
import { moviesRouter } from "./routes/movies";

// Create server
const app: Application = express();

// Enable JSON format and Cross-Origin request
app.use(cors());
app.use(express.json());

// Importing routes
app.use(moviesRouter);

// ---------- Welcome ROUTE ----------
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json("Welcome to my TS server with Express");
  } catch (error) {
    //res.status(500).json({ message: error.message });
  }
});

// ---------- Routes ALL ----------
app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "This route does not exists !" });
});

// Listening
app.listen(3000, () => {
  console.log("Server started 🚀");
});
