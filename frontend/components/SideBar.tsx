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
    <aside className="h-screen w-65 bg-sidebarbg text-white flex flex-col rounded-tr-50 rounded-br-45">
      <div className="bg-sidebarheader p-7 rounded-tr-50 rounded-br-45 flex items-center justify-center">
        <img 
          src="/OracleLogo.png" 
          width={40} 
          height={40} 
          className="object-contain"
        alt="oraclelogo" />
        <h1 className="text-4xl font-bold">Oracle</h1>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-2 rounded-lg hover:bg-gray-700 ${
              pathName === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default SideBar
