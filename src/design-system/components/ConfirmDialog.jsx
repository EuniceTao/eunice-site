/**
 * ConfirmDialog Component
 * 
 * A centered modal for confirming critical actions.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

export const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "确认操作",
    description = "你确定要执行此操作吗？此操作可能无法撤销。",
    confirmText = "确认",
    cancelText = "取消",
    variant = "destructive"
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
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Dialog Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="w-full max-w-[320px] rounded-2xl bg-white p-6 shadow-xl pointer-events-auto"
                        >
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{title}</h3>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                {description}
                            </p>

                            <div className="mt-6 flex flex-col gap-2">
                                <Button
                                    variant={variant}
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="w-full rounded-xl py-6 text-sm font-semibold"
                                >
                                    {confirmText}
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={onClose}
                                    className="w-full rounded-xl py-6 text-sm font-medium text-slate-500 hover:text-slate-900"
                                >
                                    {cancelText}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
