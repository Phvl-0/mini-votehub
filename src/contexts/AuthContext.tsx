
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define user types
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  district?: string;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  idDocument?: string;
  registrationDate: Date;
  votingHistory: VotingRecord[];
}

export interface VotingRecord {
  electionId: string;
  electionName: string;
  date: Date;
  candidateVoted?: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (userData: Omit<UserProfile, 'id' | 'registrationDate' | 'verificationStatus' | 'votingHistory'>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'facebook') => Promise<void>;
  logout: () => Promise<void>;
  verifyIdentity: (idDocument: File) => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  confirmVote: (electionId: string, candidateId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: UserProfile[] = [
  {
    id: '1',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, AN 12345',
    district: 'District 5',
    verificationStatus: 'verified',
    registrationDate: new Date(2023, 5, 15),
    votingHistory: [
      {
        electionId: 'past-election-1',
        electionName: '2023 City Council Election',
        date: new Date(2023, 6, 10),
        candidateVoted: 'candidate-2'
      }
    ]
  },
  {
    id: '2',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave, Othertown, OT 67890',
    district: 'District 3',
    verificationStatus: 'verified',
    registrationDate: new Date(2023, 2, 20),
    votingHistory: []
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Register a new user
  const register = async (userData: Omit<UserProfile, 'id' | 'registrationDate' | 'verificationStatus' | 'votingHistory'>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      const existingUser = mockUsers.find(user => user.email === userData.email);
      if (existingUser) {
        throw new Error('Email already registered');
      }
      
      // Create new user
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        ...userData,
        verificationStatus: 'unverified',
        registrationDate: new Date(),
        votingHistory: []
      };
      
      // In a real app, you would save the user to your database
      mockUsers.push(newUser);
      
      // Save user to localStorage for demo purposes
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Registration successful!",
        description: "Please verify your identity to access all features.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, you would verify the password here
      
      // Save user to localStorage for demo purposes
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.fullName}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with OAuth
  const loginWithOAuth = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would handle OAuth authentication here
      
      // For demo purposes, just log in as Jane
      const user = mockUsers[0];
      
      // Save user to localStorage for demo purposes
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: `${provider} login successful!`,
        description: `Welcome back, ${user.fullName}!`,
      });
    } catch (error) {
      toast({
        title: `${provider} login failed`,
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear localStorage
      localStorage.removeItem('currentUser');
      
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify identity
  const verifyIdentity = async (idDocument: File) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Update verification status
      const updatedUser = {
        ...currentUser,
        verificationStatus: 'pending' as const,
        idDocument: URL.createObjectURL(idDocument)
      };
      
      // Save updated user
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      setCurrentUser(updatedUser);
      
      toast({
        title: "Identity verification submitted",
        description: "Your ID document is being reviewed. This usually takes 1-2 business days.",
      });
    } catch (error) {
      toast({
        title: "Identity verification failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Update user profile
      const updatedUser = {
        ...currentUser,
        ...profileData
      };
      
      // Save updated user
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      setCurrentUser(updatedUser);
      
      toast({
        title: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Profile update failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email exists
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('Email not found');
      }
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Record a vote
  const confirmVote = async (electionId: string, candidateId: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Get election details (in a real app, fetch from database)
      const electionName = "2024 Community Leadership Election";
      
      // Add voting record
      const updatedUser = {
        ...currentUser,
        votingHistory: [
          ...currentUser.votingHistory,
          {
            electionId,
            electionName,
            date: new Date(),
            candidateVoted: candidateId
          }
        ]
      };
      
      // Save updated user
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      setCurrentUser(updatedUser);
      
      toast({
        title: "Vote recorded successfully",
        description: "Thank you for participating in the democratic process!",
      });
    } catch (error) {
      toast({
        title: "Voting failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated,
    register,
    login,
    loginWithOAuth,
    logout,
    verifyIdentity,
    updateProfile,
    requestPasswordReset,
    confirmVote
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
