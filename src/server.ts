import express from "express";
import eventRouter from "./presentation/controllers/EventController";
import userRouter from "./presentation/controllers/UserController";
import participantRouter from "./presentation/controllers/ParticipantController";
import matchRouter from "./presentation/controllers/MatchController";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());
app.use(cors()); 

app.use("/api/events", eventRouter);
app.use("/api/users", userRouter);
app.use("/api/participants", participantRouter);
app.use("/api/matches", matchRouter);


interface Error {
  stack?: string;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});