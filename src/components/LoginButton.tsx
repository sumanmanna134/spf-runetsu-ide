import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <SignInButton mode="modal">
        
      <button
      
        className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-blue-500/20 hover:border-blue-500/40 bg-gradient-to-r from-blue-500/10 
                to-orange-500/10 hover:from-blue-500/20 hover:to-orange-500/20 
                transition-all duration-300"
      >
        
        <LogIn className="w-4 h-4 transition-transform" />
        <span>Log In</span>
      </button>
    </SignInButton>
  );
}
export default LoginButton;

// flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg
//              transition-all duration-200 font-medium shadow-lg shadow-blue-500/20



// flex gap-2 items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg
//              transition-all duration-200 font-medium shadow-lg shadow-blue-500/20 px-4 py-2