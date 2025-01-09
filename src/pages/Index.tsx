import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreatePollForm from "@/components/CreatePollForm";
import PollList from "@/components/PollList";
import { Poll } from "@/types/poll";

const Index = () => {
  const [polls, setPolls] = useState<Poll[]>([]);

  const handlePollCreated = ({
    question,
    options,
  }: {
    question: string;
    options: string[];
  }) => {
    const newPoll: Poll = {
      id: uuidv4(),
      question,
      options: options.map((text) => ({
        id: uuidv4(),
        text,
        votes: 0,
      })),
      totalVotes: 0,
    };
    setPolls([newPoll, ...polls]);
  };

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
          };
        }
        return poll;
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Voting App</h1>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Poll</h2>
          <CreatePollForm onPollCreated={handlePollCreated} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Polls</h2>
          <PollList polls={polls} onVote={handleVote} />
        </div>
      </div>
    </div>
  );
};

export default Index;