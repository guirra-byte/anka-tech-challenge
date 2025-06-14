import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SSEProvider } from "@/hooks/use-sse";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anka.io Dashboard",
  description: "A modern dashboard to manage your clients and his assets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SSEProvider>{children}</SSEProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
