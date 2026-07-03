import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import * as React from "react";
import logoUrl from "../Black and Green Modern Fitness Gym Logo_20260625_101204_0000.png";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Velrion | Delhi NCR's #1 Contractor Marketplace" },
      { name: "description", content: "Apka Kaam, Hamari Reach. Delhi NCR ke verified contractors ke liye free platform — genuine customer leads, seedha aapke paas." },
      { name: "author", content: "Velrion" },
      { property: "og:title", content: "Velrion | Delhi NCR's #1 Contractor Marketplace" },
      { property: "og:description", content: "Delhi NCR ke verified contractors ke liye free platform — genuine customer leads, seedha aapke paas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Velrion" },
      { name: "twitter:title", content: "Velrion | Delhi NCR's #1 Contractor Marketplace" },
      { name: "twitter:description", content: "Delhi NCR ke verified contractors ke liye free platform — genuine customer leads, seedha aapke paas." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5f257a29-d9ae-4234-b303-284170974229/id-preview-885b92fc--ec082d82-60d1-4b59-8f08-6591912efb80.lovable.app-1777174151892.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5f257a29-d9ae-4234-b303-284170974229/id-preview-885b92fc--ec082d82-60d1-4b59-8f08-6591912efb80.lovable.app-1777174151892.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  React.useEffect(() => {
    const img = new Image();
    img.src = logoUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Scan only the top half (for the S icon symbol)
      const scanMaxY = Math.floor(img.height * 0.51);
      const imageData = ctx.getImageData(0, 0, canvas.width, scanMaxY);
      const data = imageData.data;

      let minX = canvas.width;
      let maxX = 0;
      let minY = canvas.height;
      let maxY = 0;

      for (let y = 0; y < scanMaxY; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const brightness = (r + g + b) / 3;

          if (brightness > 20) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX >= minX && maxY >= minY) {
        // Crop the icon with tiny padding
        const padding = 5;
        minX = Math.max(0, minX - padding);
        minY = Math.max(0, minY - padding);
        maxX = Math.min(canvas.width, maxX + padding);
        maxY = Math.min(scanMaxY, maxY + padding);

        const cropWidth = maxX - minX;
        const cropHeight = maxY - minY;

        const croppedImageData = ctx.getImageData(minX, minY, cropWidth, cropHeight);
        const croppedData = croppedImageData.data;

        // Transparent background
        for (let i = 0; i < croppedData.length; i += 4) {
          const r = croppedData[i];
          const g = croppedData[i + 1];
          const b = croppedData[i + 2];
          const brightness = (r + g + b) / 3;
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

          const faviconUrl = tempCanvas.toDataURL("image/png");

          // Find or create favicon link tag
          let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
          if (!link) {
            link = document.createElement("link");
            document.head.appendChild(link);
          }
          link.type = "image/png";
          link.rel = "shortcut icon";
          link.href = faviconUrl;
        }
      }
    };
  }, []);

  return <Outlet />;
}
