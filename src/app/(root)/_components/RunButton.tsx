"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Loader2, PlayIcon } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";

function RunButton() {
  const { isSignedIn, user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    if (!isSignedIn) return;

    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };

  // If user not signed in, wrap button in SignInButton
  const ButtonContent = (
    <motion.button
      whileHover={{ scale: isRunning ? 1 : 1.05 }}
      whileTap={{ scale: isRunning ? 1 : 0.95 }}
      onClick={handleRun}
      disabled={isRunning}
      className={`
        flex items-center gap-2 
        px-4 py-2
        rounded-xl
        bg-gradient-to-r from-[#1e1e2e] to-[#2b2b3b]
        hover:from-[#2b2b3b] hover:to-[#3a3a4a]
        text-gray-200
        font-medium
        shadow-md shadow-black/30
        ring-1 ring-white/10
        transition-all
        ${isRunning ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {isRunning ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="size-4 text-green-400" />
        </motion.div>
      ) : (
        <PlayIcon className="size-4 text-green-400" />
      )}
      <span className="text-sm tracking-wide">
        {isRunning ? "Running..." : !isSignedIn ? "Run" : "Run"}
      </span>
    </motion.button>
  );

  return isSignedIn ? (
    ButtonContent
  ) : (
    <SignInButton mode="modal">{ButtonContent}</SignInButton>
  );
}

export default RunButton;
