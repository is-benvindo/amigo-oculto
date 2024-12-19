import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { Event } from "../../domain/entities/Event";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, preferences: string, event: Event): Promise<User> {
    if (!name || !email || !preferences || !event) {
      throw new Error("All fields (name, email, preferences, event) are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    const existingUser = await this.userRepository.findAll();
    if (existingUser.some(user => user.email === email)) {
      throw new Error("User with this email already exists.");
    }

    const user = new User(name, email, preferences, event);

    try {
      return await this.userRepository.create(user);
    } catch (error: any) {
      throw new Error("Error creating user: " + (error as Error).message);
    }
  }
}
