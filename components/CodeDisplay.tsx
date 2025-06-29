"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { useClipboard } from "@/hooks/useClipboard"
import { generateFullHTML } from "@/utils/codeGenerator"

interface CodeDisplayProps {
  cssCode: string
  htmlCode: string
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ cssCode, htmlCode }) => {
  const { copyToClipboard, copied } = useClipboard()

  const downloadCode = () => {
    const fullCode = generateFullHTML(cssCode, htmlCode)
    const blob = new Blob([fullCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "css-pixel-art.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Generated Code
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(cssCode + "\n\n" + htmlCode)}>
              <Copy className="w-4 h-4 mr-1" />
              {copied ? "Copied!" : "Copy All"}
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCode}>
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">CSS</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(cssCode)}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs overflow-auto max-h-48 font-mono">
              <code>{cssCode}</code>
            </pre>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">HTML</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(htmlCode)}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <pre className="bg-gray-900 text-blue-400 p-3 rounded-lg text-xs overflow-auto max-h-48 font-mono">
              <code>{htmlCode}</code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
