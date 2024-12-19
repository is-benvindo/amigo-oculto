import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Event } from "../entities/Event";
import { IRepository } from "./IRepository";

export class EventRepository implements IRepository<Event> {
  private readonly repository: Repository<Event>;

  constructor() {
    this.repository = AppDataSource.getRepository(Event);
  }

  async create(event: Event): Promise<Event> {
    return this.repository.save(event);  
  }

  async findById(id: number): Promise<Event | null> {
    return this.repository.findOne({ where: { id } }); 
  }

  async findAll(): Promise<Event[]> {
    return this.repository.find(); 
  }

  async update(event: Event): Promise<Event> {
    await this.repository.save(event);  
    const updatedEvent = await this.findById(event.id);
    if (!updatedEvent) {
      throw new Error(`Event with ID ${event.id} not found after update`);
    }
    return updatedEvent; 
  }

  async delete(id: number): Promise<void> {
    const event = await this.findById(id);
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);  
    }
    await this.repository.delete(id);  
  }
}