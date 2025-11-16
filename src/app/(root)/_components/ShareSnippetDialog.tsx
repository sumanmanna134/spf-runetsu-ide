import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { X } from "lucide-react";
import { useState } from "react";
import ModalPortal from "./Modal";

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {
    const [title, setTitle] = useState("");
    const [isSharing, setIsSharing] = useState(false);
    const { language, getCode } = useCodeEditorStore();

    const handleShare = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSharing(true);

    }

return (<ModalPortal>
    <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e2e] rounded-2xl p-6 w-full max-w-md 
                      shadow-xl border border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Share Snippet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleShare}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#181825] border border-[#313244] 
                       rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter snippet title"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="text-gray-400">
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>

      </div>
    </div>
  </ModalPortal>);
}

export default ShareSnippetDialog;