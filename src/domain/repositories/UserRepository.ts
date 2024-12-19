import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source"; 
import { User } from "../entities/User";
import { IRepository } from "./IRepository"; 

export class UserRepository implements IRepository<User> {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user); 
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } }); 
  }

  async findAll(): Promise<User[]> {
    return this.repository.find(); 
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async update(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
