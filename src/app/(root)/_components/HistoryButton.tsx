"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";

export default function HistoryButton(){
    return(
        <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.95}}
        onClick={()=> console.log("")}
        className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors relative"
        aria-label="history"
        >
            <History className="size-4 text-gray-400" />
            
        </motion.button>
    )
}