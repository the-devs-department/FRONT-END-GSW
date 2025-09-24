import { useState, useEffect } from "react";


export const ScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const handleScreenWidthChange = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleScreenWidthChange)
    return () => {
      window.removeEventListener('resize', handleScreenWidthChange)
    }    
  })

  return screenWidth
}