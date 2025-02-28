
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  HomeIcon, 
  LockIcon, 
  EyeIcon, 
  EyeOffIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  InfoIcon
} from "lucide-react";

// Custom Google icon component with proper typing
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
    <path d="M12 16l-4-4 4-4 4 4-4 4z"></path>
  </svg>
);

// Custom Facebook icon component with proper typing
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// Define validation schema
const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }).optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);
  
  // Get user's location
  const detectLocation = () => {
    toast({
      title: "Detecting location...",
      description: "Please allow location access when prompted",
    });
    
    setTimeout(() => {
      setDetectedLocation("District 5");
      toast({
        title: "Location detected",
        description: "You're in District 5",
      });
    }, 2000);
  };
  
  // Initialize form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: RegisterFormValues) => {
    setIsRegistering(true);
    
    try {
      await register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        district: detectedLocation || "Unknown",
      });
      
      navigate("/verify-identity");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsRegistering(false);
    }
  };
  
  // Handle OAuth login
  const handleOAuthLogin = (provider: 'google' | 'facebook') => {
    toast({
      title: `${provider} authentication`,
      description: "This feature is not implemented in the demo",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Account</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Register to vote in upcoming elections
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Fill in your details to create an account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="John Doe"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="your.email@example.com"
                                type="email"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="555-123-4567"
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <Label>Voting District</Label>
                        <div className="relative">
                          <HomeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            value={detectedLocation || ""}
                            placeholder="Auto-detect your district"
                            className="pl-10"
                            readOnly
                          />
                        </div>
                        <Button
                          type="button"
                          variant="link"
                          onClick={detectLocation}
                          className="text-xs p-0 h-auto mt-1"
                        >
                          Detect my location
                        </Button>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Residential Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HomeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="123 Main St, Anytown, AN 12345"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="pl-10 pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                  <EyeIcon className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="********"
                                className="pl-10 pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                  <EyeIcon className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <Button type="submit" className="w-full" disabled={isRegistering}>
                        {isRegistering ? "Creating Account..." : "Create Account"}
                        {!isRegistering && <ArrowRightIcon className="ml-2 h-4 w-4" />}
                      </Button>
                      
                      <div className="flex items-center gap-4 my-4">
                        <Separator className="flex-grow" />
                        <span className="text-sm text-gray-500">or continue with</span>
                        <Separator className="flex-grow" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleOAuthLogin('google')}
                          className="w-full"
                        >
                          <span className="mr-2">
                            <GoogleIcon />
                          </span>
                          Google
                        </Button>
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleOAuthLogin('facebook')}
                          className="w-full"
                        >
                          <span className="mr-2">
                            <FacebookIcon />
                          </span>
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                    Log In
                  </Link>
                </p>
                
                <div className="w-full mt-6 p-4 bg-blue-50 rounded-md flex items-start gap-3 dark:bg-blue-900/30">
                  <InfoIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>ID Verification Required</strong>
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      After registration, you'll need to verify your identity by uploading a government-issued ID to participate in official elections.
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
