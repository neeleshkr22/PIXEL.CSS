"use client"

import { useState } from "react"
import { ImageUpload } from "@/components/ImageUpload"
import { ImagePreview } from "@/components/ImagePreview"
import { PixelArtDisplay } from "@/components/PixelArtDisplay"
import { CodeDisplay } from "@/components/CodeDisplay"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useImageProcessor } from "@/hooks/useImageProcessor"
import type { ImageProcessingSettings, ProcessedImageData } from "@/types"

export default function CSSImageGenerator() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedData, setProcessedData] = useState<ProcessedImageData | null>(null)
  const [settings, setSettings] = useState<ImageProcessingSettings>({
    resolution: 128,
    pixelSize: 4,
    colorReduction: 32,
    useColorQuantization: false,
  })

  const { processImage, isProcessing, canvasRef } = useImageProcessor()

  const handleFileUpload = async (file: File) => {
    try {
      // Set original image for preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Process the image
      const result = await processImage(file, settings)
      setProcessedData(result)
    } catch (error) {
      console.error("Error processing image:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CSS Pixel Art Generator</h1>
          <p className="text-lg text-gray-600">Convert images into crisp, pixelated CSS art</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ImageUpload settings={settings} onSettingsChange={setSettings} onFileUpload={handleFileUpload} />
          <ImagePreview originalImage={originalImage} />
        </div>

        {isProcessing && <LoadingSpinner />}

        {processedData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PixelArtDisplay pixelData={processedData.pixelData} settings={settings} />
            <CodeDisplay cssCode={processedData.cssCode} htmlCode={processedData.htmlCode} />
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
