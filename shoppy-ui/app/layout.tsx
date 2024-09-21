import localFont from "next/font/local";
import "./globals.css";

import { Container, CssBaseline } from "@mui/material";
import Header from "./header/header";
import Providers from "./providers";
import authenticated from "./[auth]/actions/authenticated";
import logout from "./[auth]/logout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticated();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Header logout={logout} />
          <Container className={isAuthenticated ? "mt-10" : ""}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
