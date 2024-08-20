import { useEffect, useRef } from 'react';

function CameraComponent() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Access the user's camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Set the video stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing the camera:', err);
      });

    // Cleanup function to stop the video stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ width: '100%' }} />
    </div>
  );
}

export default CameraComponent;
