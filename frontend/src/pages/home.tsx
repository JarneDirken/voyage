import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import background from "../assets/background.jpg";

export default function Home() {
  return (
    <div
      className="w-full h-full relative"
      style={{ minHeight: "calc(100vh - 73.6px)" }}
    >
      <img
        src={background}
        alt="Background"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="w-full h-full z-10 absolute pt-44 pl-20 flex flex-col gap-4">
        {/* H1 with wave effect on "voyage" */}
        <h1 className="text-6xl font-bold">
          Planificateur de{" "}
          <span className="inline-flex">
            {"voyage".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ y: 0 }}
                animate={{
                  y: [0, -15, 0, 0], 
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: index * 0.2,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <h2 className="text-4xl mb-4">
          Votre prochain voyage,{" "}
          <span className="text-green-500">optimisé</span>
        </h2>
        <h3 className="text-lg">
          Notre planificateur de voyage gratuit et innovant vous permet
          d'organiser et d'améliorer
          <br />
          votre expérience de voyage en toute simplicité.
        </h3>
        <Link
          to="/trip"
          className="text-lg p-4 border border-gray-700 text-white bg-gray-800 w-fit rounded-xl hover:scale-105 transition ease-in-out"
        >
          Commencez à voyager
        </Link>
      </div>
    </div>
  );
}