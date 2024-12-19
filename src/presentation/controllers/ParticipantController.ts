import express, { Request, Response } from "express";
import { AddParticipantUseCase } from "../../application/use-cases/AddParticipantUseCase"; 
import { GetParticipantByIdUseCase } from "../../application/use-cases/GetParticipantByIdUseCase"; 
import { ParticipantRepository } from "../../domain/repositories/ParticipantRepository";
import { EventRepository } from "../../domain/repositories/EventRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";

const participantRouter = express.Router();

participantRouter.post("/participants", async (req: Request, res: Response) => {
  const { name, email, eventId } = req.body;

  try {
    const participantRepository = new ParticipantRepository();
    const eventRepository = new EventRepository();
    const userRepository = new UserRepository();
    const useCase = new AddParticipantUseCase(participantRepository, eventRepository, userRepository); 
    const participant = await useCase.execute(name, email, eventId);
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

participantRouter.get("/participants/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const useCase = new GetParticipantByIdUseCase(); 
    const participant = await useCase.execute(Number(id));
    if (!participant) {
      res.status(404).json({ message: "Participant not found" });
      return;
    }
    res.status(200).json(participant);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default participantRouter;