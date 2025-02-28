
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  BarChart3Icon, 
  PieChartIcon, 
  TrendingUpIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  TrophyIcon
} from "lucide-react";
import { format } from "date-fns";

const ElectionResults = () => {
  const electionDate = new Date(2024, 10, 5); // Nov 5, 2024
  const totalVoters = 868;
  const actualVotes = 542;
  const participationRate = ((actualVotes / totalVoters) * 100).toFixed(1);
  
  // Candidates with extended data
  const candidates = [
    { 
      id: "jane-doe",
      name: "Jane Doe", 
      position: "President",
      motto: "Empowering Every Voice",
      votes: 228, 
      percentage: 42,
      color: "#9333ea",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
      partyAffiliation: "Progress Party",
      keyPlatforms: ["Campus Sustainability", "Student Representation", "Academic Support"],
      prevElectionResult: 38,
      supporters: 320,
      isWinner: true
    },
    { 
      id: "john-smith",
      name: "John Smith", 
      position: "President",
      motto: "Innovate and Elevate",
      votes: 190, 
      percentage: 35,
      color: "#ec4899",
      photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=800&fit=crop",
      partyAffiliation: "Innovation Alliance",
      keyPlatforms: ["Tech Infrastructure", "Research Funding", "International Programs"],
      prevElectionResult: 42,
      supporters: 280,
      isWinner: false
    },
    { 
      id: "maria-rodriguez",
      name: "Maria Rodriguez", 
      position: "President",
      motto: "Building Bridges Together",
      votes: 124, 
      percentage: 23,
      color: "#8b5cf6",
      photo: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=800&h=800&fit=crop",
      partyAffiliation: "Unity Coalition",
      keyPlatforms: ["Diversity Initiatives", "Community Outreach", "Arts Funding"],
      prevElectionResult: 20,
      supporters: 210,
      isWinner: false
    },
  ];
  
  // Historical data for trend analysis
  const historicalData = [
    { year: 2020, "Progress Party": 32, "Innovation Alliance": 45, "Unity Coalition": 23 },
    { year: 2021, "Progress Party": 35, "Innovation Alliance": 42, "Unity Coalition": 23 },
    { year: 2022, "Progress Party": 38, "Innovation Alliance": 40, "Unity Coalition": 22 },
    { year: 2023, "Progress Party": 40, "Innovation Alliance": 38, "Unity Coalition": 22 },
    { year: 2024, "Progress Party": 42, "Innovation Alliance": 35, "Unity Coalition": 23 },
  ];
  
  // Geographic voting data
  const geographicData = [
    { location: "North Campus", "Jane Doe": 45, "John Smith": 32, "Maria Rodriguez": 23 },
    { location: "South Campus", "Jane Doe": 38, "John Smith": 40, "Maria Rodriguez": 22 },
    { location: "East Campus", "Jane Doe": 42, "John Smith": 35, "Maria Rodriguez": 23 },
    { location: "West Campus", "Jane Doe": 40, "John Smith": 38, "Maria Rodriguez": 22 },
    { location: "Online", "Jane Doe": 44, "John Smith": 30, "Maria Rodriguez": 26 },
  ];
  
  // Demographic voting data
  const demographicData = [
    { group: "Freshman", "Jane Doe": 39, "John Smith": 36, "Maria Rodriguez": 25 },
    { group: "Sophomore", "Jane Doe": 40, "John Smith": 35, "Maria Rodriguez": 25 },
    { group: "Junior", "Jane Doe": 42, "John Smith": 38, "Maria Rodriguez": 20 },
    { group: "Senior", "Jane Doe": 45, "John Smith": 32, "Maria Rodriguez": 23 },
    { group: "Graduate", "Jane Doe": 40, "John Smith": 38, "Maria Rodriguez": 22 },
    { group: "Faculty", "Jane Doe": 44, "John Smith": 30, "Maria Rodriguez": 26 },
  ];
  
  const winner = candidates.find(c => c.isWinner);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section with Final Result */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            FINAL RESULTS
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            2024 Community Leadership Election
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Election completed on {format(electionDate, "MMMM d, yyyy")}
          </p>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-300">
                {actualVotes} votes cast out of {totalVoters} eligible voters ({participationRate}% participation)
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Winner Announcement */}
        {winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="border-none shadow-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 -rotate-45 transform translate-x-16 -translate-y-16 opacity-20" />
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg">
                        <AvatarImage src={winner.photo} alt={winner.name} />
                        <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2">
                        <div className="p-1 bg-yellow-400 rounded-full">
                          <TrophyIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center lg:text-left">
                    <Badge className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      WINNER
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                      {winner.name}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                      {winner.position} • {winner.partyAffiliation}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 italic mb-4">
                      "{winner.motto}"
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                      {winner.keyPlatforms.map((platform, index) => (
                        <Badge key={index} variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {winner.votes} votes • {winner.percentage}% of total
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Results Overview & Visualizations */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Election Results & Analytics
          </h2>
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">
                <PieChartIcon className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="trends">
                <TrendingUpIcon className="h-4 w-4 mr-2" />
                Historical Trends
              </TabsTrigger>
              <TabsTrigger value="geographic">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Geographic Analysis
              </TabsTrigger>
              <TabsTrigger value="demographic">
                <UserIcon className="h-4 w-4 mr-2" />
                Demographic Breakdown
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Vote Distribution</CardTitle>
                  <CardDescription>
                    Final vote counts and percentages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={candidates}
                            nameKey="name"
                            dataKey="votes"
                            cx="50%"
                            cy="50%"
                            outerRadius={140}
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                          >
                            {candidates.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} votes`, name]} 
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div>
                      <div className="space-y-5">
                        {candidates.map((candidate, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={candidate.photo} alt={candidate.name} />
                                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <span className="font-medium">{candidate.name}</span>
                                  <span className="block text-xs text-gray-500">{candidate.partyAffiliation}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{candidate.votes} votes</span>
                                <Badge variant="outline">{candidate.percentage}%</Badge>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                              <div
                                className="h-2.5 rounded-full"
                                style={{ 
                                  width: `${candidate.percentage}%`,
                                  backgroundColor: candidate.color 
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>
                                {candidate.prevElectionResult < candidate.percentage ? (
                                  <span className="text-green-600">↑ {(candidate.percentage - candidate.prevElectionResult).toFixed(1)}%</span>
                                ) : (
                                  <span className="text-red-600">↓ {(candidate.prevElectionResult - candidate.percentage).toFixed(1)}%</span>
                                )}
                                {" "}from previous election
                              </span>
                              <span>{candidate.supporters} supporters</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Voting Trends</CardTitle>
                  <CardDescription>
                    Party performance over the last 5 elections
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 50]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Progress Party" 
                        stroke="#9333ea" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Innovation Alliance" 
                        stroke="#ec4899" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Unity Coalition" 
                        stroke="#8b5cf6" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="geographic">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Voting Analysis</CardTitle>
                  <CardDescription>
                    Vote distribution by campus location
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={geographicData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="location" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Jane Doe" fill="#9333ea" />
                      <Bar dataKey="John Smith" fill="#ec4899" />
                      <Bar dataKey="Maria Rodriguez" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="demographic">
              <Card>
                <CardHeader>
                  <CardTitle>Demographic Breakdown</CardTitle>
                  <CardDescription>
                    Voting patterns by demographic group
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={demographicData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="group" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Jane Doe" fill="#9333ea" />
                      <Bar dataKey="John Smith" fill="#ec4899" />
                      <Bar dataKey="Maria Rodriguez" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Candidate Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Candidate Performance Comparison
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={candidate.isWinner ? "border-2 border-purple-500" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={candidate.photo} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{candidate.name}</CardTitle>
                          <CardDescription>{candidate.partyAffiliation}</CardDescription>
                        </div>
                      </div>
                      {candidate.isWinner && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                          WINNER
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <div className="text-4xl font-bold" style={{ color: candidate.color }}>
                        {candidate.percentage}%
                      </div>
                      <p className="text-sm text-gray-500">{candidate.votes} votes</p>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <h4 className="text-sm font-medium">Key Platform Points</h4>
                      <ul className="space-y-1">
                        {candidate.keyPlatforms.map((platform, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: candidate.color }} />
                            {platform}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 flex justify-between">
                        <span>Previous Election: {candidate.prevElectionResult}%</span>
                        <span>
                          {candidate.prevElectionResult < candidate.percentage ? (
                            <span className="text-green-600">+{(candidate.percentage - candidate.prevElectionResult).toFixed(1)}%</span>
                          ) : (
                            <span className="text-red-600">-{(candidate.prevElectionResult - candidate.percentage).toFixed(1)}%</span>
                          )}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Thank you for participating in our democratic process
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            The next election will be held in November 2025. Get involved with the winning campaign
            and help shape the future of our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
              View Inauguration Details
            </Button>
            <Button variant="outline">
              Download Full Election Report
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ElectionResults;
