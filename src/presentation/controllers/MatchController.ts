import express, { Request, Response } from "express";
import { GenerateMatchesUseCase } from "../../application/use-cases/GenerateMatchesUseCase"; 
import { GetMatchByIdUseCase } from "../../application/use-cases/GenerateMatchesUseCase"; 
const matchRouter = express.Router();

matchRouter.post("/matches", async (req: Request, res: Response) => {
  const { giverId, receiverId, eventId } = req.body;

  try {
    const useCase = new GenerateMatchesUseCase(); 
    const match = await useCase.execute(eventId); 
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

matchRouter.get("/matches/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const useCase = new GetMatchByIdUseCase(); 
    const match = await useCase.execute(Number(id));
    if (!match) {
      res.status(404).json({ message: "Match not found" });
      return;
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default matchRouter;
