import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Participant } from "../entities/Participant";
import { IRepository } from "./IRepository";

export class ParticipantRepository implements IRepository<Participant> {
  private readonly repository: Repository<Participant>;

  constructor() {
    this.repository = AppDataSource.getRepository(Participant);
  }

  async findByEventId(eventId: number): Promise<Participant[]> {
    return this.repository.find({ where: { event: { id: eventId } } }); 
  }

  async create(participant: Participant): Promise<Participant> {
    return this.repository.save(participant);
  }

  async findById(id: number): Promise<Participant | null> {
    return this.repository.findOne({ where: { id } }); 
  }

  async findAll(): Promise<Participant[]> {
    return this.repository.find();
  }

  async update(participant: Participant): Promise<Participant> {
    return this.repository.save(participant); 
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
