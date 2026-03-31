import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-6"
      >
        Play. Win. Give Back.
      </motion.h1>

      <p className="text-gray-400 mb-6 text-center max-w-xl">
        Enter your golf scores, win monthly rewards, and support charities.
      </p>

      <Link to="/register">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl">
          Get Started
        </button>
      </Link>
    </div>
  );
}