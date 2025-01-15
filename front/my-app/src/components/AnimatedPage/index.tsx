'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const AnimatedPage = ({ children } : { children: ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;