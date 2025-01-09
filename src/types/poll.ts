export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export interface PollOption {
  id: string;
  text: string;
  image?: string;
  votes: number;
}