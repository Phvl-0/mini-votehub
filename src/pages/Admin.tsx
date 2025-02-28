
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LockIcon, 
  UsersIcon, 
  BarChartIcon, 
  PieChartIcon, 
  ClockIcon, 
  DownloadIcon,
  RefreshCwIcon,
  BellIcon,
  ArrowUpIcon,
  ArrowDownIcon 
} from "lucide-react";
import { format } from "date-fns";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [voteCount, setVoteCount] = useState(542);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isVotingActive, setIsVotingActive] = useState(true);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) + 1;
      setVoteCount(prev => prev + change);
      
      toast({
        title: `${change} new votes received`,
        description: `Total votes: ${voteCount + change}`,
        duration: 3000,
      });
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [voteCount, toast]);
  
  const refreshData = () => {
    const change = Math.floor(Math.random() * 8) + 1;
    setVoteCount(prev => prev + change);
    setLastRefreshed(new Date());
    
    toast({
      title: "Data refreshed",
      description: `${change} new votes recorded`,
    });
  };
  
  const toggleVoting = () => {
    setIsVotingActive(!isVotingActive);
    toast({
      title: isVotingActive ? "Voting paused" : "Voting resumed",
      description: isVotingActive ? "Users can no longer submit votes" : "Users can now submit votes",
    });
  };
  
  const downloadResults = () => {
    toast({
      title: "Report generated",
      description: "Election_Results.csv has been downloaded",
    });
  };
  
  // Candidates data
  const candidates = [
    { name: "Jane Doe", votes: 228, percentage: 42, color: "#9333ea" },
    { name: "John Smith", votes: 190, percentage: 35, color: "#ec4899" },
    { name: "Maria Rodriguez", votes: 124, percentage: 23, color: "#8b5cf6" },
  ];
  
  // Voting timeline data
  const timeline = [
    { name: "9 AM", votes: 25 },
    { name: "10 AM", votes: 38 },
    { name: "11 AM", votes: 42 },
    { name: "12 PM", votes: 55 },
    { name: "1 PM", votes: 47 },
    { name: "2 PM", votes: 60 },
    { name: "3 PM", votes: 70 },
    { name: "4 PM", votes: 112 },
    { name: "5 PM", votes: 93 },
  ];
  
  // Demographics data
  const demographics = [
    { name: "18-24", votes: 138, percentage: 25.5 },
    { name: "25-34", votes: 220, percentage: 40.6 },
    { name: "35-44", votes: 97, percentage: 17.9 },
    { name: "45-54", votes: 52, percentage: 9.6 },
    { name: "55+", votes: 35, percentage: 6.4 },
  ];
  
  // Recent voter activity (anonymized)
  const recentActivity = [
    { id: "voter1", time: "5 mins ago", location: "Campus Library" },
    { id: "voter2", time: "7 mins ago", location: "Mobile App" },
    { id: "voter3", time: "12 mins ago", location: "Student Center" },
    { id: "voter4", time: "15 mins ago", location: "Mobile App" },
    { id: "voter5", time: "18 mins ago", location: "Science Building" },
    { id: "voter6", time: "22 mins ago", location: "Mobile App" },
    { id: "voter7", time: "26 mins ago", location: "Off-campus" },
    { id: "voter8", time: "30 mins ago", location: "Campus Library" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Election Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor votes and election activity in real-time
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <Badge className={isVotingActive 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }>
              {isVotingActive ? "Voting Active" : "Voting Paused"}
            </Badge>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              Last updated: {format(lastRefreshed, "h:mm:ss a")}
            </p>
            
            <Button size="sm" variant="outline" onClick={refreshData}>
              <RefreshCwIcon className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </motion.div>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Total Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{voteCount}</div>
                  <UsersIcon className="h-10 w-10 text-purple-500 opacity-20" />
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  <span>+32 in last hour</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Participation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">62.4%</div>
                  <BarChartIcon className="h-10 w-10 text-pink-500 opacity-20" />
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  <span>+5.2% from last election</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Mobile Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">43%</div>
                  <BellIcon className="h-10 w-10 text-blue-500 opacity-20" />
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  <span>+12% from last election</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Time Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">2d 4h</div>
                  <ClockIcon className="h-10 w-10 text-green-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Closes on Nov 5, 2024
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Charts Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Election Analytics</CardTitle>
                  <CardDescription>
                    Visual breakdown of voting patterns and results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="results">
                    <TabsList className="mb-6">
                      <TabsTrigger value="results">
                        <PieChartIcon className="h-4 w-4 mr-2" />
                        Current Results
                      </TabsTrigger>
                      <TabsTrigger value="timeline">
                        <BarChartIcon className="h-4 w-4 mr-2" />
                        Voting Timeline
                      </TabsTrigger>
                      <TabsTrigger value="demographics">
                        <UsersIcon className="h-4 w-4 mr-2" />
                        Demographics
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="results" className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={candidates}
                            nameKey="name"
                            dataKey="votes"
                            cx="50%"
                            cy="50%"
                            outerRadius={110}
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
                    </TabsContent>
                    
                    <TabsContent value="timeline" className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={timeline}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} votes`, 'Votes']} />
                          <Bar dataKey="votes" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                      <p className="text-sm text-center mt-4 text-gray-500">
                        Hourly voting activity
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="demographics" className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={demographics}
                          layout="vertical"
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={80} />
                          <Tooltip formatter={(value) => [`${value} votes`, 'Votes']} />
                          <Bar dataKey="votes" fill="#ec4899" />
                        </BarChart>
                      </ResponsiveContainer>
                      <p className="text-sm text-center mt-4 text-gray-500">
                        Voter age distribution
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Activity & Controls */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Admin Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Controls</CardTitle>
                  <CardDescription>
                    Manage the election process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    variant={isVotingActive ? "destructive" : "default"}
                    onClick={toggleVoting}
                  >
                    <LockIcon className="h-4 w-4 mr-2" />
                    {isVotingActive ? "Pause Voting" : "Resume Voting"}
                  </Button>
                  
                  <Button className="w-full" variant="outline" onClick={downloadResults}>
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download Results CSV
                  </Button>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    View Detailed Results
                  </Button>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Anonymous voting activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[250px]">
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                Anon
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Anonymous Voter</p>
                              <p className="text-xs text-gray-500">{activity.location}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Candidate Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Candidate Performance</CardTitle>
              <CardDescription>
                Current vote distribution and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {candidates.map((candidate, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: candidate.color }} />
                        <span className="font-medium">{candidate.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{candidate.votes} votes</span>
                        <Badge variant="outline">{candidate.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{ 
                          width: `${candidate.percentage}%`,
                          backgroundColor: candidate.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
