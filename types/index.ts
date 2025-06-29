export interface PixelData {
  color: string
  x: number
  y: number
}

export interface ImageProcessingSettings {
  resolution: number
  pixelSize: number
  colorReduction: number
  useColorQuantization: boolean
}

export interface ProcessedImageData {
  pixelData: PixelData[]
  cssCode: string
  htmlCode: string
}
