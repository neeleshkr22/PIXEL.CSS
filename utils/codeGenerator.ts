import type { PixelData } from "@/types"

export const generateHTML = (pixels: PixelData[], pixelSize: number): string => {
  const htmlPixels = pixels
    .map(
      (pixel) =>
        `  <div class="pixel" style="left: ${pixel.x * pixelSize}px; top: ${pixel.y * pixelSize}px; background-color: ${pixel.color};"></div>`,
    )
    .join("\n")

  return `<div class="css-image">
${htmlPixels}
</div>`
}

export const generateCSS = (resolution: number, pixelSize: number): string => {
  return `.css-image {
  position: relative;
  width: ${resolution * pixelSize}px;
  height: ${resolution * pixelSize}px;
  background: #ffffff;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  border: 1px solid #e0e0e0;
}

.css-image .pixel {
  position: absolute;
  width: ${pixelSize}px;
  height: ${pixelSize}px;
  image-rendering: pixelated;
}`
}

export const generateFullHTML = (cssCode: string, htmlCode: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Generated Image</title>
    <style>
${cssCode}
    </style>
</head>
<body>
${htmlCode}
</body>
</html>`
}
