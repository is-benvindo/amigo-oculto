import { EventRepository } from "../../domain/repositories/EventRepository";
import { Event } from "../../domain/entities/Event";

export class CreateEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async execute(name: string, email: string, secret: string): Promise<Event> {
    // Validação simples
    if (!name || !email || !secret) {
      throw new Error("All fields (name, email, secret) are required.");
    }
    
    const existingEvent = await this.eventRepository.findAll(); 
    if (existingEvent.some(event => event.name === name)) {
      throw new Error("An event with this name already exists.");
    }

    const event = new Event(name, email, secret);

    try {
      return await this.eventRepository.create(event);
    } catch (error: any) {
      throw new Error("Error creating event: " + (error as Error).message);
    }
  }
}