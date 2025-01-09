import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

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
      title: "Success",
      description: "Poll created successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
        />
      </div>
      
      {options.map((option, index) => (
        <Input
          key={index}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="mb-2"
        />
      ))}
      
      <div className="space-x-4">
        <Button type="button" variant="outline" onClick={handleAddOption}>
          Add Option
        </Button>
        <Button type="submit">Create Poll</Button>
      </div>
    </form>
  );
};

export default CreatePollForm;