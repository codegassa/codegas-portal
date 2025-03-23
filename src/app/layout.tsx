import './globals.css'
import { openSans } from './utils/fonts';
import { Inter } from 'next/font/google'
import Nav from './components/navigation/nav'
import {DataProvider} from './context/context';
const inter = Inter({ subsets: ['latin-ext'] })

export const metadata = {
  title: 'App codegas',
  description: 'Aplicación que tiene seguimiento de los pedidos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <DataProvider>
          <Nav>
            {children}
          </Nav>
        </DataProvider>
      </body>
    </html>
  )
}
