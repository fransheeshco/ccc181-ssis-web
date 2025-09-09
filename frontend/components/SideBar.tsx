'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from "next/link"

const navItems = [
  { name: "Home", path: "/dashboard" },
  { name: "Students", path: "/students" },
  { name: "Programs", path: "/programs" },
  { name: "Colleges", path: "/colleges" }
]

function SideBar() {
  const pathName = usePathname()

  return (
    <aside className="h-screen w-65 bg-sidebarbg text-white flex flex-col rounded-tr-[50px] rounded-br-[50px]">
      <div className="bg-sidebarheader p-7 rounded-tr-[50px] rounded-br-[45px] flex items-center justify-start">
        <img 
          src="/OracleLogo.png" 
          width={50} 
          height={50} 
          className="object-contain"
          alt="oraclelogo" 
        />
        <h1 className="text-4xl font-bold">Oracle</h1>
      </div>
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
                {/* Text */}
                <span
                  className={`
                    relative z-10 block p-5 
                    ${isActive ? "text-black" : "text-white"} 
                    group-hover:text-black
                  `}
                >
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
