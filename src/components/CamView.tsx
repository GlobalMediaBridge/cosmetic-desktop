import React, { useEffect, useRef } from "react";

interface Props {}

const CamView = (props: Props) => {
  const videoElement = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoElement === null || videoElement.current === null) return;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        videoElement.current!.srcObject = stream;
        videoElement.current!.play();
      })
      .catch(function(err) {
        console.error("An error occurred! " + err);
      });
  }, [videoElement]);
  return (
    <div>
      <video ref={videoElement} />
      <canvas />
    </div>
  );
};

export default CamView;
