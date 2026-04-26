import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

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
      { title: "Velrion Media — Where Fitness Meets Influence" },
      { name: "description", content: "India's premier fitness influencer marketing agency. We connect creators with brands that match their vision." },
      { name: "author", content: "Velrion Media" },
      { property: "og:title", content: "Velrion Media — Where Fitness Meets Influence" },
      { property: "og:description", content: "India's premier fitness influencer marketing agency. We connect creators with brands that match their vision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Velrion Media — Where Fitness Meets Influence" },
      { name: "twitter:description", content: "India's premier fitness influencer marketing agency. We connect creators with brands that match their vision." },
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
  return <Outlet />;
}
