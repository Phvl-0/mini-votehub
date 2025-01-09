import { Poll } from "@/types/poll";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PollListProps {
  polls: Poll[];
  onVote: (pollId: string, optionId: string) => void;
}

const PollList = ({ polls, onVote }: PollListProps) => {
  const { toast } = useToast();

  const handleVote = (pollId: string, optionId: string) => {
    onVote(pollId, optionId);
    toast({
      title: "Success",
      description: "Vote recorded successfully",
    });
  };

  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <div key={poll.id} className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">{poll.question}</h3>
          <div className="space-y-2">
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>{option.text}</span>
                    <span className="text-sm text-gray-500">
                      {option.votes} votes ({poll.totalVotes > 0
                        ? Math.round((option.votes / poll.totalVotes) * 100)
                        : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          poll.totalVotes > 0
                            ? (option.votes / poll.totalVotes) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={() => handleVote(poll.id, option.id)}
                >
                  Vote
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollList;