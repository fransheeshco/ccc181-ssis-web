'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from "next/link"

const navItems = [
  { name: "Home", iconChosen: "/home-black.png", iconNotChosen: "/home-white.png", path: "/dashboard" },
  { name: "Students", iconChosen: "/student-black.png", iconNotChosen: "/student-white.png", path: "/students" },
  { name: "Programs", iconChosen: "/book-black.png", iconNotChosen: "/book-white.png", path: "/programs" },
  { name: "Colleges", iconChosen: "/school-black.png", iconNotChosen: "/school-white.png", path: "/colleges" }
]

function SideBar() {
  const pathName = usePathname()

  return (
    <aside className="h-screen w-65 bg-sidebarbg text-white flex flex-col rounded-tr-[50px] rounded-br-[50px]">
      {/* Header */}
      <div className="bg-sidebarheader p-7 rounded-tr-[50px] rounded-br-[45px] flex items-center justify-start gap-3">
        <img 
          src="/OracleLogo.png" 
          width={50} 
          height={50} 
          className="object-contain"
          alt="oraclelogo" 
        />
        <h1 className="text-4xl font-bold">Oracle</h1>
      </div>

      {/* Nav */}
      <div className="pt-5">
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathName === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative group w-[225px] rounded-tr-[25px] rounded-br-[25px] overflow-hidden"
              >
                {/* Animated background */}
                <span
                  className={`
                    absolute inset-0 bg-white 
                    ${isActive ? "w-full" : "w-0"} 
                    group-hover:w-full
                    transition-all duration-500 ease-out
                    rounded-tr-[25px] rounded-br-[25px]
                  `}
                />

                {/* Icon + Text */}
                <span
                  className={`
                    relative z-10 flex items-center gap-3 p-5 
                    ${isActive ? "text-black" : "text-white"} 
                    group-hover:text-black
                  `}
                >
                  <img 
                    src={isActive ? item.iconChosen : item.iconNotChosen} 
                    alt={`${item.name} icon`} 
                    className="w-5 h-5 object-contain"
                  />
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default SideBar
