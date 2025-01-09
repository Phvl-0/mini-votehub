import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Plus, X, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreatePollFormProps {
  onPollCreated: (poll: { question: string; options: { text: string; image?: string }[] }) => void;
}

const PLACEHOLDER_IMAGES = [
  "photo-1649972904349-6e44c42644a7",
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1581091226825-a6a2a5aee158",
  "photo-1485827404703-89b55fcc595e",
  "photo-1526374965328-7f61d4dc18c5",
  "photo-1531297484001-80022131f5a1",
  "photo-1487058792275-0ad4aaf24ca7",
];

const CreatePollForm = ({ onPollCreated }: CreatePollFormProps) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Array<{ text: string; image?: string }>>([
    { text: "" },
    { text: "" },
  ]);
  const { toast } = useToast();

  const handleAddOption = () => {
    setOptions([...options, { text: "" }]);
  };

  const handleRemoveOption = (indexToRemove: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], text: value };
    setOptions(newOptions);
  };

  const handleImageSelect = (index: number, imageId: string) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      image: `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=200&h=200`,
    };
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

    const validOptions = options.filter((opt) => opt.text.trim() !== "");
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
    setOptions([{ text: "" }, { text: "" }]);
    
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
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option.text}
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
            </div>
            
            <div className="flex items-center gap-2">
              <Select onValueChange={(value) => handleImageSelect(index, value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select candidate image" />
                </SelectTrigger>
                <SelectContent>
                  {PLACEHOLDER_IMAGES.map((imageId) => (
                    <SelectItem key={imageId} value={imageId}>
                      Image {PLACEHOLDER_IMAGES.indexOf(imageId) + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {option.image && (
                <img
                  src={option.image}
                  alt={`Option ${index + 1}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </div>
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