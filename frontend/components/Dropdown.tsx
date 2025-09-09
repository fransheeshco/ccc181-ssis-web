'use client'
import React, { useState } from 'react'

interface DropdownProps {
  label: string
  items: string[]
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-2 h-10 w-26 rounded-lg flex items-center"
      >
        {label}
        <svg className="w-2.5 h-2.5 ml-2" viewBox="0 0 10 6" fill="none">
          <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-lg shadow-sm z-10">
          <ul className="py-2 text-sm text-gray-700">
            {items.map((item, idx) => (
              <li key={idx}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
