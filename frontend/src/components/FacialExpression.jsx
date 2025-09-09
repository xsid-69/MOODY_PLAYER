import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
  // Use the root path to access assets in the public folder
  const MODEL_URL = "/models";
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    console.log("✅ Models loaded successfully");
    startVideo();
  } catch (err) {
    console.error("❌ Model loading error:", err);
  }
};

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            videoRef.current.onplay = handleVideoPlay;
          }
        })
        .catch((err) => console.error("❌ Webcam error:", err));
    };

    const handleVideoPlay = () => {
      console.log("Video has started. Mood detection will only run when you click the 'Detect Mood' button.");
    };

    loadModels();
  }, []);

  const handleDetectMood = async () => {
    
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No faces detected");
      return;
    }

    // Log dominant expression to console
    detections.forEach((detection) => {
      const expressions = detection.expressions;

      if (expressions) {
        const expressionValues = Object.values(expressions);
        if (expressionValues.length > 0) {
          const maxValue = Math.max(...expressionValues);
          const dominantExpression = Object.keys(expressions).find(
            (key) => expressions[key] === maxValue
          );

          // Log expression only to console
          console.log(`Detected Mood: ${dominantExpression}`);
          axios.get(`http://localhost:3000/songs?mood=${dominantExpression}`)
          .then(response=>{
            console.log(response.data); 
            setSongs(response.data.songs)           
          })
        }
      }
    });
  };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-center">Facial Expression Analysis</h2>
            <div className="relative w-full h-[30vh] lg:h-[50vh] aspect-video">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg border-2 border-gray-700"
                />
                <button
          onClick={handleDetectMood}
          className="absolute cursor-pointer bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Detect Mood
        </button>
            </div>
        </div>
    );
}
