
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Poll, PollOption } from "@/types/poll";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon, FileTextIcon, InfoIcon, AwardIcon, ThumbsUpIcon, ShieldIcon, CheckIcon, AlertCircleIcon, BarChart3Icon, ActivityIcon } from "lucide-react";
import { format } from "date-fns";

const Index = () => {
  const electionStartDate = new Date(2024, 10, 1); // Nov 1, 2024
  const electionEndDate = new Date(2024, 10, 5); // Nov 5, 2024
  const resultsDate = new Date(2024, 10, 7); // Nov 7, 2024

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample candidates data
  const candidates = [
    {
      id: uuidv4(),
      name: "Jane Doe",
      position: "President",
      motto: "Empowering Every Voice",
      bio: "3-year member of the Student Council, focused on inclusivity and campus-wide events. Plans to implement monthly town halls.",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
      votingPercentage: 42,
      manifestoUrl: "#jane-manifesto"
    },
    {
      id: uuidv4(),
      name: "John Smith",
      position: "President",
      motto: "Innovate and Elevate",
      bio: "Tech coordinator passionate about campus sustainability and digital infrastructure. Aims to modernize campus facilities.",
      photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=800&fit=crop",
      votingPercentage: 35,
      manifestoUrl: "#john-manifesto"
    },
    {
      id: uuidv4(),
      name: "Maria Rodriguez",
      position: "President",
      motto: "Building Bridges Together",
      bio: "International student advocate with experience in diverse community programs. Focused on creating cross-cultural initiatives.",
      photo: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=800&h=800&fit=crop",
      votingPercentage: 23,
      manifestoUrl: "#maria-manifesto"
    },
    {
      id: uuidv4(),
      name: "Michael Chen",
      position: "President",
      motto: "Excellence Through Collaboration",
      bio: "STEM researcher and tutor committed to academic support programs. Plans to expand peer mentoring and study resources.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
      votingPercentage: 15,
      manifestoUrl: "#michael-manifesto"
    },
  ];

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };

  const handleSubmitVote = () => {
    setHasVoted(true);
    // Here you would typically send the vote to a backend service
    console.log(`Vote submitted for candidate: ${selectedCandidate}`);
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Admin and Results Links */}
        <div className="flex justify-end gap-4 mb-4">
          <Link to="/admin">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ActivityIcon className="h-4 w-4" />
              Admin Dashboard
            </Button>
          </Link>
          <Link to="/results">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              View Results
            </Button>
          </Link>
        </div>
        
        {/* Banner/Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 shadow-lg mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              2024 Community Leadership Election
            </h1>
            <p className="text-xl md:text-2xl font-light mb-6">
              Your Vote Shapes Our Future!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>
                  Voting Open: {format(electionStartDate, "MMM d")}–
                  {format(electionEndDate, "d, yyyy")}
                </span>
              </div>
              <Badge className="bg-white text-purple-600 hover:bg-gray-100">
                {hasVoted ? "You've Voted" : "Active Election"}
              </Badge>
            </div>
            
            {!hasVoted ? (
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <CheckIcon className="mr-2 h-4 w-4" /> Vote Now
              </Button>
            ) : (
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" onClick={handleViewResults}>
                <AwardIcon className="mr-2 h-4 w-4" /> 
                {showResults ? "View Current Results" : "Thank You For Voting!"}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Instructions & Rules */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-purple-600 dark:text-purple-400">
                <InfoIcon className="mr-2 h-5 w-5" /> 
                Instructions & Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Select ONE candidate below.</strong> Votes cannot be changed after submission. 
                Review your choice in the preview before confirming your vote.
              </p>
              <div className="flex items-center gap-3">
                <ShieldIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Your vote is anonymous and encrypted for security
                </span>
              </div>
              <div className="mt-2">
                <Button variant="link" className="text-sm p-0 h-auto">
                  View FAQ for Troubleshooting
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Candidate Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Candidates
          </h2>

          {showResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {candidates.map((candidate) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-hover"
                >
                  <Card className="h-full border-none shadow-md overflow-hidden bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
                    <CardHeader className="relative pb-0">
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100">
                          {candidate.votingPercentage}% Votes
                        </Badge>
                      </div>
                      <div className="w-full h-40 mb-2 rounded-md overflow-hidden">
                        <img 
                          src={candidate.photo} 
                          alt={candidate.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <CardTitle className="text-xl">{candidate.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span className="font-medium text-purple-600 dark:text-purple-400">{candidate.position}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="mb-3 italic text-sm text-gray-600 dark:text-gray-300">
                        "{candidate.motto}"
                      </div>
                      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${candidate.votingPercentage}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <RadioGroup 
              value={selectedCandidate || ""} 
              onValueChange={handleSelectCandidate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {candidates.map((candidate) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Label
                    htmlFor={candidate.id}
                    className="cursor-pointer block h-full"
                  >
                    <Card className={`h-full border-2 transition-all duration-200 ${
                      selectedCandidate === candidate.id 
                        ? "border-purple-500 shadow-lg shadow-purple-100 dark:shadow-purple-900/30" 
                        : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                    } overflow-hidden`}
                    >
                      <CardHeader className="relative pb-2">
                        <div className="absolute top-3 right-3 z-10">
                          <RadioGroupItem 
                            value={candidate.id} 
                            id={candidate.id} 
                            className="h-5 w-5"
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={candidate.photo} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{candidate.name}</CardTitle>
                            <CardDescription className="flex items-center">
                              <span className="font-medium text-purple-600 dark:text-purple-400">{candidate.position}</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-3 italic text-sm text-gray-600 dark:text-gray-300">
                          "{candidate.motto}"
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {candidate.bio}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FileTextIcon className="h-4 w-4 mr-1" /> Learn More
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{candidate.name} - Manifesto</DialogTitle>
                              <DialogDescription>
                                Platform and detailed campaign promises
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <h3 className="font-medium">Vision Statement:</h3>
                              <p>
                                {candidate.bio} Additionally, I plan to implement regular town halls, improve campus facilities, and create more opportunities for student engagement.
                              </p>
                              <h3 className="font-medium">Key Initiatives:</h3>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Expand student representation in administration meetings</li>
                                <li>Create a dedicated budget for student-led projects</li>
                                <li>Implement sustainable practices across campus</li>
                                <li>Establish new scholarship opportunities</li>
                              </ul>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Voting Mechanism */}
        {!hasVoted && !showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-10"
          >
            <div className="flex flex-col items-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none"
                    disabled={!selectedCandidate}
                  >
                    <CheckIcon className="mr-2 h-5 w-5" /> Submit Vote
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
                    <AlertDialogDescription>
                      {selectedCandidate ? (
                        <>
                          <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <p className="font-medium">You are voting for:</p>
                            <div className="flex items-center mt-3 gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage 
                                  src={candidates.find(c => c.id === selectedCandidate)?.photo} 
                                  alt={candidates.find(c => c.id === selectedCandidate)?.name} 
                                />
                                <AvatarFallback>
                                  {candidates.find(c => c.id === selectedCandidate)?.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold">{candidates.find(c => c.id === selectedCandidate)?.name}</p>
                                <p className="text-sm text-gray-500">
                                  {candidates.find(c => c.id === selectedCandidate)?.position}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-amber-600 dark:text-amber-400 flex items-center gap-2 mt-2">
                            <AlertCircleIcon className="h-4 w-4" />
                            This action cannot be undone after confirmation.
                          </p>
                        </>
                      ) : (
                        <p>Please select a candidate first.</p>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmitVote}>
                      Confirm Vote
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 flex items-center gap-2">
                <ShieldIcon className="h-4 w-4" />
                Your vote is secure and anonymous
              </p>
            </div>
          </motion.div>
        )}

        {/* Post-Vote Confirmation */}
        {hasVoted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Card className="border-none shadow-md bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                    <ThumbsUpIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Thank you for voting!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your vote has been recorded successfully. Results will be announced on {format(resultsDate, "MMMM d, yyyy")}.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleViewResults}
                    className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/50"
                  >
                    <AwardIcon className="mr-2 h-4 w-4" /> 
                    {showResults ? "Hide Results" : "View Current Results"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
