import React, { useState, useEffect, useRef } from "react";
import FloatingPoint from "../components/floatingPoint";
import "./pointCanvas.css";

function drawCoordinates(ctx, x, y, pointStyle) {
  const { color = "#ff2626", pointSize = 10 } = pointStyle;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
  ctx.fill();
}

function PointCanvas(props) {
  const canvasRef = useRef(null);
  const {
    draw,
    pathPoints,
    points = [],
    pointStyle,
    lineStyle,
    canvasStyle,
    ...rest
  } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    draw(context, pathPoints, lineStyle);
    points.map((point) => {
      drawCoordinates(context, point.x, point.y, pointStyle);
    });
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasStyle.width}
      height={canvasStyle.height}
      position="absolute"
      {...props}
    />
  );
}

export default PointCanvas;