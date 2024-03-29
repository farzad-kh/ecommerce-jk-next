'use client'

import {NextUIProvider} from '@nextui-org/react'

export function ProvidersUI({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}