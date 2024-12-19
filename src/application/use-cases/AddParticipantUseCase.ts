import { ParticipantRepository } from "../../domain/repositories/ParticipantRepository";
import { EventRepository } from "../../domain/repositories/EventRepository";
import { Participant } from "../../domain/entities/Participant";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class AddParticipantUseCase {
  constructor(
    private participantRepository: ParticipantRepository,
    private eventRepository: EventRepository,
    private userRepository: UserRepository 
  ) {}

  async execute(eventId: number, name: string, email: string): Promise<Participant> {
    if (!name || !email) {
      throw new Error("Name and email are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    const existingParticipant = await this.participantRepository.findAll();
    if (existingParticipant.some(participant => participant.user.email === email && participant.event.id === eventId)) {
      throw new Error("Participant with this email is already added to the event.");
    }

    let user = await this.userRepository.findAll().then(users => users.find(user => user.email === email));

    if (!user) {
      user = new User(name, email, '', event); 
      await this.userRepository.create(user);
    }

    const participant = new Participant(user, event);

    try {
      return await this.participantRepository.create(participant);
    } catch (error: any) {
      throw new Error("Error adding participant: " + (error as Error).message);
    }
  }
}