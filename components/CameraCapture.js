import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const CameraCapture = ({ setImage }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user"
  };

  const startCamera = () => setIsCameraOn(true);
  const stopCamera = () => {
    setIsCameraOn(false);
    setCapturedImage(null);
  };

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCameraOn(false);
  }, [webcamRef]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsCameraOn(true);
  };

  const uploadCapturedImage = () => {
    setImage(capturedImage);
    setCapturedImage(null);
  };

  const ButtonStyle = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`relative group w-full sm:w-auto ${className}`}
    >
      <div className="absolute -inset-1 bg-black transition-all group-hover:-inset-2"></div>
      <span className="relative block bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black font-bold text-sm sm:text-base">
        {children}
      </span>
    </button>
  );

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4">Camera Capture</h2>
      {!isCameraOn && !capturedImage && (
        <ButtonStyle onClick={startCamera}>Start Camera</ButtonStyle>
      )}
      {isCameraOn && (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-black"></div>
            <div className="relative border-2 border-black overflow-hidden">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonStyle onClick={captureImage}>Capture Image</ButtonStyle>
            <ButtonStyle onClick={stopCamera}>Stop Camera</ButtonStyle>
          </div>
        </div>
      )}
      {capturedImage && (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-black"></div>
            <div className="relative border-2 border-black overflow-hidden">
              <img src={capturedImage} alt="Captured" className="w-full h-auto" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonStyle onClick={uploadCapturedImage}>Upload Captured Image</ButtonStyle>
            <ButtonStyle onClick={retakePhoto}>Retake Photo</ButtonStyle>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;

