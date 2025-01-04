import React from 'react'
import Webcam from 'react-webcam'

export default function WebcamCapture({ webcamRef }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full border-4 border-white rounded-lg"
      />
      <div className="absolute top-2 left-2 bg-red-600 w-3 h-3 rounded-full animate-pulse" />
    </div>
  )
}

