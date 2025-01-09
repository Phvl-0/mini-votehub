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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text animate-fade-in">
          Interactive Voting App
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 transform hover:scale-[1.01] transition-transform duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 animate-scale-in">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Create New Poll
              </h2>
              <CreatePollForm onPollCreated={handlePollCreated} />
            </div>
          </div>
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Active Polls
            </h2>
            <PollList polls={polls} onVote={handleVote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;