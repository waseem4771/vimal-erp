
"use client";

import { FaArrowRightFromBracket } from "react-icons/fa6";

/**
 * Enterprise SidebarFooter (Senior Elite - Micro-Precision MASTER)
 * Priority: Visual Separation & Floor Attachment.
 * Fix: Increased top padding to push button away from the line, and applied ultra-thin hairline border. ✅
 */
export default function SidebarFooter({ onLogout }) {
  return (
    /* 
       mt-auto: Pushes to absolute bottom.
       pt-12: Creates a significant gap to move the button DOWN from the line. ✅
       border-t-[0.1px]: Ultra-hairline thickness for the top line. ✅
    */
    <div className="mt-auto border-t-[0.1px] border-white/5 -mx-5 -mb-5 pt-12 pb-0 bg-slate-900 overflow-hidden">
      
      {/* 
         TERMINATE SESSION TRIGGER 
         - rounded-none: Flush attachment to the floor.
         - style borderWidth 0.1px: Ultra-thin button border. ✅
      */}
      <button 
        onClick={onLogout}
        style={{ borderWidth: '0.1px', borderColor: 'rgba(248, 113, 113, 0.2)' }}
        className="cursor-pointer group w-full py-3 px-4 bg-slate-800/10 hover:bg-red-600/90 text-red-400 hover:text-white rounded-none text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 shadow-2xl"
      >
        <FaArrowRightFromBracket size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        Terminate Session
      </button>

    </div>
  );
}








