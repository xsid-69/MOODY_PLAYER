import React, { useRef, useEffect } from 'react';
import { RiPauseCircleFill, RiPlayCircleFill } from '@remixicon/react';

const MoodSongs = ({ songs, setSongs }) => {
    const audioRefs = useRef({});

    // Effect to synchronize audio playback with the component's state
    useEffect(() => {
        // Find the song that is marked for playing
        const songToPlay = songs.find(s => s.isPlaying);

        // Pause all audio elements that are not the 'songToPlay'
        songs.forEach(song => {
            const audioEl = audioRefs.current[song.id];
            if (audioEl && (!songToPlay || song.id !== songToPlay.id)) {
                audioEl.pause();
            }
        });

        // If there is a song to play, play it
        if (songToPlay) {
            const audioEl = audioRefs.current[songToPlay.id];
            if (audioEl && audioEl.paused) {
                audioEl.play().catch(e => console.error("Error playing audio:", e));
            }
        }
    }, [songs]); // Rerun this effect whenever the songs state changes

    const togglePlay = (clickedId) => {
        setSongs(
            songs.map((song) => {
                if (song.id === clickedId) {
                    // Toggle the isPlaying state for the clicked song
                    return { ...song, isPlaying: !song.isPlaying };
                }
                // Ensure all other songs are marked as not playing
                return { ...song, isPlaying: false };
            })
        );
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-center">Recommended Songs</h2>
            <div className="space-y-2">
                {songs.map((song) => (
                    <div
                        key={song.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                        <div>
                            <h3 className="font-medium">{song.title}</h3>
                            <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                        <div onClick={() => togglePlay(song.id)} className="cursor-pointer">
                            <audio
                                ref={(el) => (audioRefs.current[song.id] = el)}
                                src={song.audio}
                                onEnded={() => 
                                    setSongs(currentSongs => 
                                        currentSongs.map(s => 
                                            s.id === song.id ? {...s, isPlaying: false} : s
                                        )
                                    )
                                }
                            />
                            {song.isPlaying ? (
                                <RiPauseCircleFill size={28} />
                            ) : (
                                <RiPlayCircleFill size={28} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodSongs;
