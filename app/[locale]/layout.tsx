import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "./components/Navbar";
import ThemeProvider from "./components/theme-provider";
import Footer from "./components/Footer";
export const metadata: Metadata = {
  title: "Mohammad Samer ",
  description: "Mohammad Samer || Full-Stack Web Developer",
};




export default async function RootLayout({ children, params }:{children:React.ReactNode, params:Promise<{ locale: string }>}) {
  
  const { locale } = await params
  return (

    <html
      lang={locale}
      dir={locale==="en"?"ltr":"rtl"}
      suppressHydrationWarning
      className={`h-full antialiased`}
    >


      <body className="min-h-full flex flex-col bg-white dark:bg-black">
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
              <Navbar/>
              {children}
              <Footer/>
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      
      
    </html>
  );
}
