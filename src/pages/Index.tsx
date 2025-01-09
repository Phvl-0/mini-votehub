import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreatePollForm from "@/components/CreatePollForm";
import PollList from "@/components/PollList";
import { Poll } from "@/types/poll";
import { motion } from "framer-motion";

const Index = () => {
  const [polls, setPolls] = useState<Poll[]>([]);

  const handlePollCreated = ({
    question,
    options,
  }: {
    question: string;
    options: { text: string; image?: string }[];
  }) => {
    const newPoll: Poll = {
      id: uuidv4(),
      question,
      options: options.map((option) => ({
        id: uuidv4(),
        text: option.text,
        image: option.image,
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Votehub
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create and participate in polls with style
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 transform hover:scale-[1.01] transition-transform duration-200"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Create New Poll
              </h2>
              <CreatePollForm onPollCreated={handlePollCreated} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Active Polls
            </h2>
            <PollList polls={polls} onVote={handleVote} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;