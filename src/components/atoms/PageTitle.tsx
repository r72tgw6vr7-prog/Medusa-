import React from 'react';
import { motion } from 'framer-motion';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <motion.header
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="medusa-page-title">{title}</h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-brand-chrome max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
};