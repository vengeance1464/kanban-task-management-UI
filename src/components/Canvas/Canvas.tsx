import * as React from "react";
import { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {}, []);

  return <canvas ref={canvasRef} />;
};
