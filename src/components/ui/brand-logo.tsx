import * as React from "react";
import logoUrl from "../../Black and Green Modern Fitness Gym Logo_20260625_101204_0000.png";

interface BrandLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "full" | "horizontal" | "icon";
  height?: number;
}

export function BrandLogo({
  variant = "horizontal",
  height = 40,
  className,
  alt = "Velrion Logo",
  ...props
}: BrandLogoProps) {
  const [croppedSrc, setCroppedSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.src = logoUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setCroppedSrc(logoUrl);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Determine bounding box search area based on variant
      // In the 1000x1000 logo:
      // - Icon: Y is roughly 30% to 50%
      // - "VELRION" text: Y is roughly 50% to 61%
      // - Tagline: Y is roughly 61% to 66%
      let scanMaxY = img.height;
      if (variant === "icon") {
        scanMaxY = Math.floor(img.height * 0.51);
      } else if (variant === "horizontal") {
        scanMaxY = Math.floor(img.height * 0.62);
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, scanMaxY);
      const data = imageData.data;

      let minX = canvas.width;
      let maxX = 0;
      let minY = canvas.height;
      let maxY = 0;

      // Find the bounding box of non-black pixels in the scan region
      for (let y = 0; y < scanMaxY; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const brightness = (r + g + b) / 3;

          if (brightness > 20) { // Non-black threshold
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      // If we found valid content, extract it and make the background transparent
      if (maxX >= minX && maxY >= minY) {
        // Add a small padding (5px)
        const padding = 5;
        minX = Math.max(0, minX - padding);
        minY = Math.max(0, minY - padding);
        maxX = Math.min(canvas.width, maxX + padding);
        maxY = Math.min(scanMaxY, maxY + padding);

        const cropWidth = maxX - minX;
        const cropHeight = maxY - minY;

        // Get the cropped image data from the original context
        const croppedImageData = ctx.getImageData(minX, minY, cropWidth, cropHeight);
        const croppedData = croppedImageData.data;

        // Set near-black background pixels to transparent
        for (let i = 0; i < croppedData.length; i += 4) {
          const r = croppedData[i];
          const g = croppedData[i + 1];
          const b = croppedData[i + 2];
          const brightness = (r + g + b) / 3;

          // If the pixel is very dark, make it fully transparent
          if (brightness < 20) {
            croppedData[i + 3] = 0;
          }
        }

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCanvas.width = cropWidth;
          tempCanvas.height = cropHeight;
          tempCtx.putImageData(croppedImageData, 0, 0);
          setCroppedSrc(tempCanvas.toDataURL());
        } else {
          setCroppedSrc(logoUrl);
        }
      } else {
        setCroppedSrc(logoUrl);
      }
    };
    img.onerror = () => {
      setCroppedSrc(logoUrl);
    };
  }, [variant]);

  if (!croppedSrc) {
    // Show empty placeholder space styled to the height
    return (
      <div 
        className={className} 
        style={{ height, aspectRatio: variant === "icon" ? "1" : "3.5" }} 
      />
    );
  }

  return (
    <img
      src={croppedSrc}
      className={className}
      alt={alt}
      style={{ height, width: "auto", objectFit: "contain" }}
      {...props}
    />
  );
}
