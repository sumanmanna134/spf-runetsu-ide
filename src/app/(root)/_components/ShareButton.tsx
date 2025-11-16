"use client"
import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ShareSnippetDialog from "./ShareSnippetDialog";

const ShareButton = ({ hasAccess}: {hasAccess: boolean}) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);



  return (
    <>
    {hasAccess && <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={()=> setIsShareDialogOpen(true)}
      className="
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
      "
    >
      <Share2 className="size-4 text-blue-400" />
      <span className="text-sm tracking-wide">Share</span>
    </motion.button>}
      {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
    </>

    
  );
};

export default ShareButton;
