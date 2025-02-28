
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Upload,
  ShieldIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon,
  ChevronRightIcon,
  FileTextIcon,
  XIcon
} from "lucide-react";

const VerifyIdentity = () => {
  const { currentUser, verifyIdentity } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  
  // Redirect if not logged in
  if (!currentUser) {
    navigate("/login");
    return null;
  }
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or PDF file",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDF files
      setPreviewUrl(null);
    }
  };
  
  // Clear selected file
  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      await verifyIdentity(selectedFile);
      setVerificationStep(2);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Continue to dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Identity Verification</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Verify your identity to access all voting features
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Verify Your Identity</CardTitle>
                  <Badge variant={verificationStep === 1 ? "outline" : "default"} className="bg-blue-500">
                    Step {verificationStep} of 2
                  </Badge>
                </div>
                <CardDescription>
                  {verificationStep === 1
                    ? "Upload a government-issued ID to verify your identity"
                    : "Your ID has been submitted for verification"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {verificationStep === 1 ? (
                  <div className="space-y-6">
                    <Alert className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800">
                      <AlertTriangleIcon className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        Upload a clear, unobstructed photo of a valid government-issued ID (driver's license, passport, or state ID).
                      </AlertDescription>
                    </Alert>
                    
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        previewUrl ? 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                      />
                      
                      {previewUrl ? (
                        <div className="relative">
                          <img
                            src={previewUrl}
                            alt="ID Preview"
                            className="max-h-48 mx-auto rounded-md object-contain"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={clearFile}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            {selectedFile?.name} ({(selectedFile?.size || 0) / 1024 < 1000
                              ? `${Math.round((selectedFile?.size || 0) / 1024)} KB`
                              : `${Math.round((selectedFile?.size || 0) / 1024 / 1024 * 10) / 10} MB`})
                          </p>
                        </div>
                      ) : (
                        <div onClick={triggerFileInput} className="cursor-pointer">
                          <Upload className="h-12 w-12 mx-auto text-gray-400" />
                          <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Drag and drop your ID, or{" "}
                            <span className="text-blue-600 dark:text-blue-400">browse</span>
                          </p>
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            JPG, PNG, or PDF up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">Your data is encrypted and secure</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">ID will only be used for verification purposes</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">Review by trained verification specialists</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                        <ShieldIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Verification In Progress</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                        Your ID has been submitted for verification. This process usually takes 1-2 business days.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">What happens next?</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3 text-sm">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Our team will review your ID document</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">You'll receive an email when verification is complete</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Once verified, you'll gain access to all voting features</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Alert className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800">
                      <FileTextIcon className="h-4 w-4" />
                      <AlertTitle>While you wait</AlertTitle>
                      <AlertDescription>
                        You can still access your dashboard and explore upcoming elections.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {verificationStep === 1 ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Skip for now
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={!selectedFile || isUploading}
                    >
                      {isUploading ? "Uploading..." : "Submit ID"}
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={goToDashboard}
                  >
                    Go to Dashboard <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyIdentity;
