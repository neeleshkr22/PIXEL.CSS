"use client"

import type React from "react"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Palette } from "lucide-react"
import type { ImageProcessingSettings } from "@/types"

interface ImageUploadProps {
  settings: ImageProcessingSettings
  onSettingsChange: (settings: ImageProcessingSettings) => void
  onFileUpload: (file: File) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ settings, onSettingsChange, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      onFileUpload(file)
    }
  }

  const updateSettings = (updates: Partial<ImageProcessingSettings>) => {
    onSettingsChange({ ...settings, ...updates })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Resolution:</label>
              <select
                value={settings.resolution}
                onChange={(e) => updateSettings({ resolution: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value={64}>64x64</option>
                <option value={96}>96x96</option>
                <option value={128}>128x128 (Recommended)</option>
                <option value={192}>192x192</option>
                <option value={256}>256x256</option>
                <option value={384}>384x384</option>
                <option value={512}>512x512</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Pixel Size:</label>
              <select
                value={settings.pixelSize}
                onChange={(e) => updateSettings({ pixelSize: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value={1}>1px (Ultra Fine)</option>
                <option value={2}>2px (Super Fine)</option>
                <option value={3}>3px (Fine)</option>
                <option value={4}>4px (Small)</option>
                <option value={6}>6px (Medium)</option>
                <option value={8}>8px (Large)</option>
                <option value={10}>10px (XL)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.useColorQuantization}
                onChange={(e) => updateSettings({ useColorQuantization: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-medium">Color Quantization</span>
            </label>
            {settings.useColorQuantization && (
              <div className="flex items-center gap-2">
                <label className="text-sm">Colors:</label>
                <select
                  value={settings.colorReduction}
                  onChange={(e) => updateSettings({ colorReduction: Number(e.target.value) })}
                  className="px-2 py-1 border rounded text-sm"
                >
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                  <option value={64}>64</option>
                  <option value={128}>128</option>
                  <option value={256}>256</option>
                </select>
              </div>
            )}
          </div>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Palette className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">Click to upload an image</p>
            <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>
      </CardContent>
    </Card>
  )
}
