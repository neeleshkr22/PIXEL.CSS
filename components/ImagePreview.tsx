import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ImagePreviewProps {
  originalImage: string | null
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Original Image</CardTitle>
      </CardHeader>
      <CardContent>
        {originalImage ? (
          <div className="flex justify-center">
            <img
              src={originalImage || "/placeholder.svg"}
              alt="Original"
              className="max-w-full max-h-64 object-contain rounded-lg shadow-md"
            />
          </div>
        ) : (
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No image uploaded</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
