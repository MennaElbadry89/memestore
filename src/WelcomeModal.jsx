import { useEffect } from "react";
import { FaSmile } from "react-icons/fa";


export default function WelcomeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60">
      <div className="w-4/5 rounded-xl bg-white p-6 text-center sm:w-1/2">
        <h2 className="mb-2 flex items-center justify-center font-bold text-blue-500 md:text-2xl">
          Welcome Friend  <FaSmile className="text-yellow-400"/>
        </h2>

        <div className="mb-4 flex flex-col items-start text-left text-sm md:text-base">
          <p>
            To be able to see and deal with products and other APIs, you need to:
          </p>
          <span>1- download code on your PC</span>
          <span>2- npm start (run db.json server)</span>
          <span>3- npm run dev (run app)</span>
        </div>

        <button
          onClick={onClose}
          className="animate-pulse rounded bg-gray-600 p-2 text-white">
          Enjoy 
        </button>
      </div>
    </div>
  );
}
