import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { Notifications } from "@mantine/notifications";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

createEmotionCache({ key: "mantine" });

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <MantineProvider>
            <Notifications />
            <Outlet />
          </MantineProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
