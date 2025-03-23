"use clint"
import {motion} from "framer-motion";
import {Button} from "@/components/atoms";


export function NewsLetterCard() {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="max-w-screen-xl mx-auto px-4"
        >
            <div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12">
                <div className="absolute inset-0 bg-grid-white/10"/>
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Restez informé
                    </h2>
                    <p className="text-blue-100 mb-8">
                        Recevez nos derniers articles et actualités directement dans votre boîte mail.
                    </p>
                    <form className="flex gap-2 max-w-md">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="flex-1 rounded-lg px-4 tex-white placeholder-white outline-gray-50 outline text-white py-2 focus:outline-none  focus:ring-2 focus:ring-white/50"
                        />
                        <Button variant="secondary">
                            S&apos;abonner
                        </Button>
                    </form>
                </div>
                <div
                    className="absolute right-0 top-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl"/>
                <div
                    className="absolute right-0 bottom-0 -mb-16 -mr-16 h-64 w-64 rounded-full bg-purple-500 opacity-20 blur-3xl"/>
            </div>
        </motion.div>
    )
}