"use client"
import {motion} from 'framer-motion'
import {PropsWithChildren} from "react";

const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export function Gridview({children}: PropsWithChildren) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {children}
        </motion.div>
    )
}