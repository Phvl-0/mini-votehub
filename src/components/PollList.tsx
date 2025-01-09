import { Poll } from "@/types/poll";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface PollListProps {
  polls: Poll[];
  onVote: (pollId: string, optionId: string) => void;
}

const PollList = ({ polls, onVote }: PollListProps) => {
  const { toast } = useToast();

  const handleVote = (pollId: string, optionId: string) => {
    onVote(pollId, optionId);
    toast({
      title: "Vote Recorded! 🎉",
      description: "Thank you for participating",
    });
  };

  return (
    <div className="space-y-6">
      {polls.map((poll, index) => (
        <motion.div
          key={poll.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            {poll.question}
          </h3>
          <div className="space-y-4">
            {poll.options.map((option) => (
              <div
                key={option.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 mb-2">
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.text}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {option.text}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      {option.votes} votes (
                      {poll.totalVotes > 0
                        ? Math.round((option.votes / poll.totalVotes) * 100)
                        : 0}
                      %)
                    </span>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            poll.totalVotes > 0
                              ? (option.votes / poll.totalVotes) * 100
                              : 0
                          }%`,
                        }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(poll.id, option.id)}
                    className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-0"
                  >
                    Vote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PollList;