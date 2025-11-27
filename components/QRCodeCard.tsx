"use client";

"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";

interface QRCodeCardProps {
  url: string;
  slug: string;
}

export default function QRCodeCard({ url, slug }: QRCodeCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(url, { width: 256 })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error(err));
  }, [url]);

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qr-${slug}.png`;
    link.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">QR Code for {slug}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {qrCodeUrl && (
          <div className="flex justify-center">
            <img
              src={qrCodeUrl}
              alt={`QR Code for ${slug}`}
              className="w-48 h-48"
            />
          </div>
        )}
        <div className="text-center text-sm text-muted-foreground break-all">
          {url}
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadQR} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex-1"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy URL
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
