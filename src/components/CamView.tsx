import React, { useState, useEffect, useRef, useCallback } from "react";

interface Props {}

const CamView = (props: Props) => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const outCanvasElement = useRef<HTMLCanvasElement>(null);

  const [requestId, setRequestId] = useState<number>(0);

  const processVideo = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      let begin = performance.now();
      let FPS = 30;
      let width = 640,
        height = 480;
      ctx.drawImage(videoElement.current!, 0, 0, width, height);
      let frame = ctx.getImageData(0, 0, width, height);
      /*src.data.set(frame.data);
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
      cv.imshow("canvasOutput", dst); // canvasOutput is the id of another <canvas>;
      */
      let delay = 1000 / FPS - (performance.now() - begin);
      setRequestId(requestAnimationFrame(() => processVideo(ctx)));
    },
    [videoElement]
  );
  
  useEffect(() => {
    if (videoElement === null || videoElement.current === null) return;
    if (canvasElement === null || canvasElement.current === null) return;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        videoElement.current!.srcObject = stream;
        videoElement.current!.play();
        const canvas = canvasElement.current!;
        const ctx = canvas.getContext("2d");
        setRequestId(requestAnimationFrame(() => processVideo(ctx!)));
      })
      .catch(function(err) {
        console.error("An error occurred! " + err);
      });

    return cancelAnimationFrame(requestId)
  }, [videoElement, canvasElement, processVideo]);

  return (
    <div>
      <video ref={videoElement} />
      <canvas ref={canvasElement} width={640} height={480} />
      <canvas ref={outCanvasElement} width={640} height={480} />
    </div>
  );
};

export default CamView;
