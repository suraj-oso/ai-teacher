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

  const startCamera = () => {
    setIsCameraOn(true);
  };

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

  return (
    <div style={{ marginBottom: '2rem', border: '2px solid white', padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Camera Capture</h2>
      {!isCameraOn && !capturedImage && (
        <button 
          onClick={startCamera}
          style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
        >
          Start Camera
        </button>
      )}
      {isCameraOn && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ width: '100%', border: '2px solid white' }}
          />
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={captureImage}
              style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
            >
              Capture Image
            </button>
            <button 
              onClick={stopCamera}
              style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
            >
              Stop Camera
            </button>
          </div>
        </>
      )}
      {capturedImage && (
        <>
          <img src={capturedImage} alt="Captured" style={{ width: '100%', border: '2px solid white' }} />
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={uploadCapturedImage}
              style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
            >
              Upload Captured Image
            </button>
            <button 
              onClick={retakePhoto}
              style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
            >
              Retake Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;

