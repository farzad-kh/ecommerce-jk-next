"use client";
import React from "react";
import {motion } from "framer-motion";
const MotionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
     
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionLayout;
