"use client"

import { useStore } from "../components/utils/store";

const Background: React.FC = () => {

    const { backgroundEnabled } = useStore();

    if (backgroundEnabled)
    {
        return (
            <div className="fixed w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-800 via-pink-900 to-purple-900">
                <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute w-72 h-72 bg-gradient-to-r from-yellow-400 via-green-500 to-teal-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob2"></div>
                <div className="absolute w-72 h-72 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob3"></div>
            </div>
        );
    }
    else
    {
        return (
            <div className="fixed w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-800 via-pink-900 to-purple-900"></div>
        );
    }
};
  
export default Background;