import type { Metadata } from "next";
import "../globals.css";
import AdminSidebar from "../components/AdminSidebar";

export const metadata: Metadata = {
   title: "ADMIN DASHBOARD",
   description: "This is the admin dashboard pages",
};



export default async function RootLayout({ children }:{children:React.ReactNode}) {
   return (

      <html
         
         suppressHydrationWarning
         className={`h-full antialiased`}
      >
         <div className="min-h-full flex bg-white dark:bg-black pt-36">
            <AdminSidebar/>
            {children}
         </div>
      </html>
   );
}
