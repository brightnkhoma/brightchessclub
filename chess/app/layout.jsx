import './ui/globals.css'
import React from 'react'
import { Header } from './ui/Header'


function Layout({children}) {
  return (
    <html lang='en'>
        <div className='flex flex-col justify-center '>            
        <body>
            <Header/>
            <div>
            {children}
            </div>
            </body>
        </div>
    </html>
  )
}

export default Layout