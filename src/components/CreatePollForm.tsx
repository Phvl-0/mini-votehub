import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";

interface CreatePollFormProps {
  onPollCreated: (poll: { question: string; options: string[] }) => void;
}

const CreatePollForm = ({ onPollCreated }: CreatePollFormProps) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const { toast } = useToast();

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (indexToRemove: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (validOptions.length < 2) {
      toast({
        title: "Error",
        description: "Please enter at least two options",
        variant: "destructive",
      });
      return;
    }

    onPollCreated({ question, options: validOptions });
    setQuestion("");
    setOptions(["", ""]);
    
    toast({
      title: "Success! 🎉",
      description: "Your poll has been created",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Input
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors duration-200"
        />
      </div>
      
      <div className="space-y-4">
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors duration-200"
            />
            {options.length > 2 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveOption(index)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddOption}
          className="flex items-center gap-2 border-2 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <Plus className="h-4 w-4" />
          Add Option
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
        >
          Create Poll
        </Button>
      </div>
    </form>
  );
};

export default CreatePollForm;