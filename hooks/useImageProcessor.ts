"use client"

import { useState, useRef, useCallback } from "react"
import type { PixelData, ImageProcessingSettings, ProcessedImageData } from "@/types"
import { rgbToHex, quantizeColor, getDominantColors, findClosestColor } from "@/utils/colorUtils"
import { generateHTML, generateCSS } from "@/utils/codeGenerator"

export const useImageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const processImage = useCallback((file: File, settings: ImageProcessingSettings): Promise<ProcessedImageData> => {
    return new Promise((resolve, reject) => {
      setIsProcessing(true)
      const reader = new FileReader()

      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          try {
            const canvas = canvasRef.current
            if (!canvas) throw new Error("Canvas not available")

            const ctx = canvas.getContext("2d")
            if (!ctx) throw new Error("Canvas context not available")

            canvas.width = settings.resolution
            canvas.height = settings.resolution

            // Disable image smoothing for pixelated effect
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(img, 0, 0, settings.resolution, settings.resolution)

            const imageData = ctx.getImageData(0, 0, settings.resolution, settings.resolution)
            const pixels: PixelData[] = []

            for (let y = 0; y < settings.resolution; y++) {
              for (let x = 0; x < settings.resolution; x++) {
                const index = (y * settings.resolution + x) * 4
                const r = imageData.data[index]
                const g = imageData.data[index + 1]
                const b = imageData.data[index + 2]
                const a = imageData.data[index + 3]

                // Only skip completely transparent pixels
                if (a > 10) {
                  let color: string
                  if (settings.useColorQuantization) {
                    color = quantizeColor(r, g, b, settings.colorReduction)
                  } else {
                    color = rgbToHex(r, g, b)
                  }

                  pixels.push({ color, x, y })
                }
              }
            }

            // Apply color palette reduction if enabled
            let finalPixels = pixels
            if (settings.useColorQuantization && pixels.length > 0) {
              const dominantColors = getDominantColors(pixels, Math.min(settings.colorReduction, pixels.length))
              finalPixels = pixels.map((pixel) => ({
                ...pixel,
                color: findClosestColor(pixel.color, dominantColors),
              }))
            }

            const htmlCode = generateHTML(finalPixels, settings.pixelSize)
            const cssCode = generateCSS(settings.resolution, settings.pixelSize)

            setIsProcessing(false)
            resolve({
              pixelData: finalPixels,
              cssCode,
              htmlCode,
            })
          } catch (error) {
            setIsProcessing(false)
            reject(error)
          }
        }

        img.onerror = () => {
          setIsProcessing(false)
          reject(new Error("Failed to load image"))
        }

        img.src = e.target?.result as string
      }

      reader.onerror = () => {
        setIsProcessing(false)
        reject(new Error("Failed to read file"))
      }

      reader.readAsDataURL(file)
    })
  }, [])

  return {
    processImage,
    isProcessing,
    canvasRef,
  }
}
