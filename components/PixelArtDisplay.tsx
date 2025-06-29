import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PixelData, ImageProcessingSettings } from "@/types"

interface PixelArtDisplayProps {
  pixelData: PixelData[]
  settings: ImageProcessingSettings
}

export const PixelArtDisplay: React.FC<PixelArtDisplayProps> = ({ pixelData, settings }) => {
  const uniqueColors = new Set(pixelData.map((p) => p.color)).size

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Pixel Art Recreation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div
            className="css-image"
            style={{
              position: "relative",
              width: `${settings.resolution * settings.pixelSize}px`,
              height: `${settings.resolution * settings.pixelSize}px`,
              background: "#ffffff",
              imageRendering: "pixelated",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {pixelData.map((pixel, index) => (
              <div
                key={index}
                className="pixel"
                style={{
                  position: "absolute",
                  left: `${pixel.x * settings.pixelSize}px`,
                  top: `${pixel.y * settings.pixelSize}px`,
                  width: `${settings.pixelSize}px`,
                  height: `${settings.pixelSize}px`,
                  backgroundColor: pixel.color,
                  imageRendering: "pixelated",
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          {pixelData.length} pixels • {uniqueColors} unique colors
        </div>
      </CardContent>
    </Card>
  )
}
