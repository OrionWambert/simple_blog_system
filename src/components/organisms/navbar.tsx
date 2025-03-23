'use client'

import Link from 'next/link'
import { NavbarAuth } from './navbar_auth'

export function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Kpriss2Dev
          </Link>

          <NavbarAuth />
        </div>
      </div>
    </nav>
  )
}
