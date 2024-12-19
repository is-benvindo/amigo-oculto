import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source"; 
import { Match } from "../entities/Match";
import { IRepository } from "./IRepository";

export class MatchRepository implements IRepository<Match> {
  private readonly repository: Repository<Match>;

  constructor() {
    this.repository = AppDataSource.getRepository(Match);
  }

  async create(match: Match): Promise<Match> {
    return this.repository.save(match); 
  }

  async findById(id: number): Promise<Match | null> {
    return this.repository.findOne({ where: { id } }); 
  }

  async findAll(): Promise<Match[]> {
    return this.repository.find();
  }

  async update(match: Match): Promise<Match> {
    return this.repository.save(match);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async saveMany(matches: Match[]): Promise<Match[]> {
    return this.repository.save(matches); 
  }
}