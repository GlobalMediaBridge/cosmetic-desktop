import React, { useRef } from "react";
import Webcam from "react-webcam";

interface Props {}
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
const CamView = (props: Props) => {
  const webcamRef = useRef(null);
  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export default CamView;
