import React from 'react'
import { Inter } from 'next/font/google'
import MarsVisitorForm from '@/components/MarsVisitorForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>

      <h1 className="text-4xl font-bold text-center">
        Barlos Wurld!
      </h1> 
      
      <MarsVisitorForm />
    </main>
  )
}
