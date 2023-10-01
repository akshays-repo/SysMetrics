import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SysMetrics',
  description: 'SysMetrics is the utility application that renders charts for heap memory, mouse clicks, mouse speed, and screen heat map.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <div className="grid min-h-screen grid-rows-header bg-zinc-100">
          <div className="bg-white shadow-sm z-10">
            <Navbar/>
          </div>

          <div className="grid md:grid-cols-sidebar bg-white">
            <div className="shadow-md bg-zinc-50">
              <SideBar/>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
