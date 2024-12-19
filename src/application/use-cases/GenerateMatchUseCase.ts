import { MatchRepository } from "../../domain/repositories/MatchRepository";
import { ParticipantRepository } from "../../domain/repositories/ParticipantRepository";
import { Match } from "../../domain/entities/Match";
import { shuffleArray } from "../../utils/shuffle";
import { User } from "../../domain/entities/User";
import { EventRepository } from "../../domain/repositories/EventRepository";

export class GenerateMatchesUseCase {
  constructor(
    private matchRepository: MatchRepository,
    private participantRepository: ParticipantRepository,
    private eventRepository: EventRepository 
  ) {}

  async execute(eventId: number): Promise<Match[]> {
    const participants = await this.participantRepository.findByEventId(eventId);

    if (participants.length < 2) {
      throw new Error("Not enough participants to generate matches");
    }

    const shuffled = shuffleArray(participants);
    const matches: Match[] = [];

    for (let i = 0; i < shuffled.length; i++) {
      const currentParticipant = shuffled[i];
      const nextParticipant = shuffled[(i + 1) % shuffled.length];

      const match = new Match(
        currentParticipant.user, 
        nextParticipant.user,     
        currentParticipant.event 
      );

      matches.push(match);
    }

    await this.matchRepository.saveMany(matches);

    return matches;
  }
}