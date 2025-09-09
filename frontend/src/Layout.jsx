import React, { useState } from 'react'
import FacialExpression from './components/FacialExpression'
import MoodSongs from './components/MoodSongs'

const Layout = () => {
    const [songs, setSongs] = useState([]);
    return (
        <div className="bg-gray-900 min-h-screen w-full text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 pb-2">
                        Moody Player
                    </h1>
                    <p className="text-gray-400 mt-2">Facial Expression Based Music Recommendation</p>
                </header>
                <main className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
                    <div className="w-full lg:w-auto flex-shrink-0">
                        <FacialExpression setSongs={setSongs} />
                    </div>
                    <div className="w-full max-w-md lg:max-w-sm flex-shrink-0">
                        <MoodSongs songs={songs} setSongs={setSongs} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout
