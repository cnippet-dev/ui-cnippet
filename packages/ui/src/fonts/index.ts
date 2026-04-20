import localFont from "next/font/local";

export const fontMono = localFont({
  display: "swap",
  src: "./PaperMono-Regular.woff2",
  variable: "--font-mono",
});

export const fontSans = localFont({
  display: "swap",
  src: "./CalSansUI[wght,GEOM].woff2",
  variable: "--font-sans",
  weight: "300 700",
});

export const fontHeading = localFont({
  display: "swap",
  src: "./CalSans-Regular.woff2",
  variable: "--font-heading",
  weight: "400 600",
});
