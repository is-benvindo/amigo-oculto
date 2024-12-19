import express from "express";
import { Request, Response } from "express-serve-static-core";
import { CreateEventUseCase } from "../../application/use-cases/CreateEventUseCase";
import { EventRepository } from "../../domain/repositories/EventRepository";
import { AppDataSource } from "../../../data-source";

const eventRepository = new EventRepository();
const createEventUseCase = new CreateEventUseCase(eventRepository);

const router = express.Router();

router.post("/events", async (req: Request, res: Response): Promise<Response> => {
  const { name, email, secret } = req.body;

  // Validação simples de entradas
  if (!name || !email || !secret) {
    return res.status(400).json({ message: "Name, email, and secret are required" });
  }

  try {
    // Execução do Use Case
    const event = await createEventUseCase.execute(name, email, secret);
    return res.status(201).json(event);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
