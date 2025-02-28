
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  CalendarIcon, 
  CheckIcon, 
  ClockIcon, 
  ExternalLinkIcon, 
  FileTextIcon, 
  HomeIcon, 
  LockIcon, 
  LogOutIcon, 
  ShieldIcon, 
  ThumbsUpIcon, 
  TrendingUpIcon, 
  UserIcon, 
  VoteIcon,
  MapPinIcon,
  AlertTriangleIcon,
  BellIcon,
  SettingsIcon,
  HistoryIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { format } from "date-fns";

interface Election {
  id: string;
  title: string;
  type: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'upcoming' | 'active' | 'past';
  hasVoted?: boolean;
}

const Dashboard = () => {
  const { currentUser, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, isLoading, navigate]);
  
  const [selectedTab, setSelectedTab] = useState("upcoming");
  
  // Mock data for elections
  const elections: Election[] = [
    {
      id: "election-1",
      title: "2024 Community Leadership Election",
      type: "Local Leadership",
      startDate: new Date(2024, 10, 1),
      endDate: new Date(2024, 10, 5),
      location: "District 5",
      status: 'active',
    },
    {
      id: "election-2",
      title: "City Budget Referendum",
      type: "Referendum",
      startDate: new Date(2024, 10, 15),
      endDate: new Date(2024, 11, 1),
      location: "Citywide",
      status: 'upcoming',
    },
    {
      id: "election-3",
      title: "School Board Special Election",
      type: "Board Election",
      startDate: new Date(2024, 11, 10),
      endDate: new Date(2024, 11, 15),
      location: "District 5",
      status: 'upcoming',
    },
    {
      id: "past-election-1",
      title: "2023 City Council Election",
      type: "Local Government",
      startDate: new Date(2023, 5, 5),
      endDate: new Date(2023, 5, 10),
      location: "District 5",
      status: 'past',
      hasVoted: true,
    },
    {
      id: "past-election-2",
      title: "Community Center Funding Initiative",
      type: "Referendum",
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 9, 15),
      location: "Citywide",
      status: 'past',
      hasVoted: false,
    },
  ];
  
  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  // Filter elections by status
  const activeElections = elections.filter(e => e.status === 'active');
  const upcomingElections = elections.filter(e => e.status === 'upcoming');
  const pastElections = elections.filter(e => e.status === 'past');
  
  // Get verification badge
  const getVerificationBadge = () => {
    switch (currentUser.verificationStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
            Pending Verification
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            Not Verified
          </Badge>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="sticky top-8">
                <CardHeader className="pb-2">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        {currentUser.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl text-center">{currentUser.fullName}</CardTitle>
                    <div className="mt-1">{getVerificationBadge()}</div>
                    <CardDescription className="text-center mt-2">
                      {currentUser.email}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-2">
                    <div className="flex items-center gap-3 text-sm">
                      <HomeIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{currentUser.district || "District not set"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPinIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{currentUser.address || "Address not provided"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Registered on {format(new Date(currentUser.registrationDate), "MMMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {currentUser.verificationStatus !== 'verified' && (
                    <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200 mb-4">
                      <AlertTriangleIcon className="h-4 w-4" />
                      <AlertTitle>Action Required</AlertTitle>
                      <AlertDescription>
                        {currentUser.verificationStatus === 'pending'
                          ? "Your identity verification is pending review."
                          : "Please verify your identity to unlock all voting features."}
                      </AlertDescription>
                      {currentUser.verificationStatus === 'unverified' && (
                        <Button size="sm" className="mt-2 w-full" onClick={() => navigate("/verify-identity")}>
                          Verify Now
                        </Button>
                      )}
                    </Alert>
                  )}
                  
                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/dashboard">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/voting-history">
                        <HistoryIcon className="mr-2 h-4 w-4" />
                        Voting History
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/notifications">
                        <BellIcon className="mr-2 h-4 w-4" />
                        Notifications
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/settings">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" onClick={handleLogout}>
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Voting Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Discover and participate in elections that matter to you
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/browse-elections">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Browse All Elections
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/">
                      <VoteIcon className="mr-2 h-4 w-4" />
                      Vote Now
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Active Elections */}
            {activeElections.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                    <TrendingUpIcon className="mr-2 h-5 w-5 text-green-500" />
                    Active Elections
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {activeElections.map((election) => (
                      <Card key={election.id} className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                VOTE NOW
                              </Badge>
                              <CardTitle>{election.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <MapPinIcon className="mr-1 h-3 w-3" />
                                {election.location} • {election.type}
                              </CardDescription>
                            </div>
                            {election.hasVoted && (
                              <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-300">
                                <CheckIcon className="mr-1 h-3 w-3" /> Voted
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <ClockIcon className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                            Voting ends on {format(election.endDate, "MMMM d, yyyy")} ({
                              Math.ceil((election.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                            } days remaining)
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild>
                            <Link to="/">
                              {election.hasVoted ? "View Your Vote" : "Vote Now"}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Elections Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="upcoming" onValueChange={setSelectedTab}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Elections</h2>
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="upcoming" className="mt-0">
                  {upcomingElections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {upcomingElections.map((election) => (
                        <Card key={election.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{election.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <MapPinIcon className="mr-1 h-3 w-3" />
                              {election.location} • {election.type}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(election.startDate, "MMMM d")} - {format(election.endDate, "MMMM d, yyyy")}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/elections/${election.id}`}>
                                Learn More
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link to={`/elections/${election.id}/reminder`}>
                                <BellIcon className="mr-2 h-4 w-4" />
                                Set Reminder
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center">
                          <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Upcoming Elections</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            There are no upcoming elections in your area at this time.
                          </p>
                          <Button className="mt-4" asChild>
                            <Link to="/browse-elections">
                              Browse All Elections
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="past" className="mt-0">
                  {pastElections.length > 0 ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Voting History</CardTitle>
                        <CardDescription>
                          Past elections you were eligible to vote in
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[300px]">
                          <div className="space-y-4">
                            {pastElections.map((election) => (
                              <div key={election.id} className="flex items-start justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-start gap-3">
                                  {election.hasVoted ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                                  ) : (
                                    <XCircleIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                  )}
                                  <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">{election.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {format(election.startDate, "MMMM d")} - {format(election.endDate, "MMMM d, yyyy")}
                                    </p>
                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                      <MapPinIcon className="mr-1 h-3 w-3" />
                                      {election.location} • {election.type}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {election.hasVoted ? (
                                    <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-300">
                                      <CheckIcon className="mr-1 h-3 w-3" /> Voted
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="border-gray-200 text-gray-700 dark:border-gray-800 dark:text-gray-300">
                                      Did Not Vote
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/voting-history">
                            <HistoryIcon className="mr-2 h-4 w-4" />
                            View Complete History
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center">
                          <HistoryIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Voting History</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            You haven't participated in any elections yet.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
            
            {/* Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShieldIcon className="mr-2 h-5 w-5 text-blue-500" />
                      Security & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Your voting data is encrypted and your privacy is protected. We use advanced security measures to ensure the integrity of the election process.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">End-to-end encryption</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">Anonymous vote recording</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">GDPR compliant data handling</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/security">
                        <LockIcon className="mr-2 h-4 w-4" />
                        Security Settings
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ThumbsUpIcon className="mr-2 h-5 w-5 text-purple-500" />
                      Get Involved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Participating in elections is just the beginning. Get more involved in your community by volunteering or becoming a poll worker.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <ExternalLinkIcon className="h-4 w-4 text-purple-500" />
                        <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                          Volunteer opportunities
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <ExternalLinkIcon className="h-4 w-4 text-purple-500" />
                        <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                          Become a poll worker
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <ExternalLinkIcon className="h-4 w-4 text-purple-500" />
                        <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                          Join your neighborhood council
                        </a>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to="/community">
                        Learn More
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
