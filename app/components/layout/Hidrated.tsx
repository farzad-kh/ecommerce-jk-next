"use client"
import { useState, useEffect ,ReactNode} from 'react'
 import Loading from '@/app/loading'
export default function Hidrated({children}:{children:ReactNode}) {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return (
    <>{isClient ? <>{children}</> : <Loading/>}</>
  )
}