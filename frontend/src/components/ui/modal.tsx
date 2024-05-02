'use client'

import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  isOpen: boolean
  setIsOpen: Function
  className?: string
}

export function Modal({ isOpen, setIsOpen, children, className }: Props) {
  if (typeof window !== 'undefined')
    document.getElementsByTagName('body')[0].style.overflow = isOpen ? 'hidden' : 'auto'

  return (
    <div
      className={`${
        isOpen ? 'flex items-center justify-center top-0 left-0' : 'hidden'
      } w-screen h-screen absolute z-20`}
    >
      <div className="w-full h-full bg-[#00000050] cursor-pointer fixed" onClick={() => setIsOpen()} />
      <div
        className={`flex flex-col justify-between min-h-[13.5rem] max-h-[90%] p-7 mx-4 bg-white rounded-lg w-[30.875rem] z-30 overflow-auto ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
