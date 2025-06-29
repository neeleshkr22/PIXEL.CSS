import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

export const LoadingSpinner: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mr-3"></div>
          <p>Processing image...</p>
        </div>
      </CardContent>
    </Card>
  )
}
