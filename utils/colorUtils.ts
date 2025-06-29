import type { PixelData } from "@/types"

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export const quantizeColor = (r: number, g: number, b: number, levels: number): string => {
  const factor = 255 / (levels - 1)
  const qR = Math.round(Math.round(r / factor) * factor)
  const qG = Math.round(Math.round(g / factor) * factor)
  const qB = Math.round(Math.round(b / factor) * factor)
  return rgbToHex(qR, qG, qB)
}

export const getDominantColors = (pixels: PixelData[], maxColors: number): string[] => {
  const colorCount: { [key: string]: number } = {}

  pixels.forEach((pixel) => {
    colorCount[pixel.color] = (colorCount[pixel.color] || 0) + 1
  })

  return Object.entries(colorCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxColors)
    .map(([color]) => color)
}

export const findClosestColor = (targetColor: string, palette: string[]): string => {
  const target = {
    r: Number.parseInt(targetColor.slice(1, 3), 16),
    g: Number.parseInt(targetColor.slice(3, 5), 16),
    b: Number.parseInt(targetColor.slice(5, 7), 16),
  }

  let closest = palette[0]
  let minDistance = Number.POSITIVE_INFINITY

  palette.forEach((color) => {
    const c = {
      r: Number.parseInt(color.slice(1, 3), 16),
      g: Number.parseInt(color.slice(3, 5), 16),
      b: Number.parseInt(color.slice(5, 7), 16),
    }

    const distance = Math.sqrt(Math.pow(target.r - c.r, 2) + Math.pow(target.g - c.g, 2) + Math.pow(target.b - c.b, 2))

    if (distance < minDistance) {
      minDistance = distance
      closest = color
    }
  })

  return closest
}
