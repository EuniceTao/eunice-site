/**
 * Sheet Component (Bottom Sheet)
 * 
 * A slide-over panel that appears from the bottom of the screen.
 * Optimized for mobile touch interactions.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sheet = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children,
  className = "" 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Sheet Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[20px] bg-white p-6 shadow-lg outline-none ${className}`}
            style={{ maxHeight: "90vh" }}
          >
            {/* Handle bar for visual cue */}
            <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />
            
            {(title || description) && (
              <div className="mb-4 space-y-1.5">
                {title && <h2 className="text-lg font-semibold text-slate-950">{title}</h2>}
                {description && <p className="text-sm text-slate-500">{description}</p>}
              </div>
            )}
            
            <div className="relative flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
