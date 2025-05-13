"use client"

import { useState } from "react"
import { Cake, Coffee, Croissant, Cookie, CroissantIcon as Bread, UtensilsCrossed, ShoppingCart } from "lucide-react"
import { TransparentLogo } from "@/components/transparent-logo"
import PhoneEntry from "./phone-entry"
import { useCustomerStore } from "@/lib/store"
import Link from "next/link"

export default function KioskCheckin() {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [showPhoneEntry, setShowPhoneEntry] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [customerName, setCustomerName] = useState("")
  const addCustomer = useCustomerStore((state) => state.addCustomer)

  const handleCheckIn = () => {
    setShowPhoneEntry(true)
  }

  const handlePhoneSubmit = (phone: string, name: string) => {
    setPhoneNumber(phone)
    setCustomerName(name)
    setShowPhoneEntry(false)
    setIsCheckedIn(true)

    // Add customer to the store
    addCustomer(name, phone)

    // In a real app, you would handle the check-in logic here
    setTimeout(() => {
      setIsCheckedIn(false)
    }, 3000)
  }

  const handleBack = () => {
    setShowPhoneEntry(false)
  }

  // If showing phone entry screen
  if (showPhoneEntry) {
    return <PhoneEntry onBack={handleBack} onSubmit={handlePhoneSubmit} />
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#FFD943] overflow-hidden">
      {/* Admin link */}
      <div className="absolute top-4 right-4 z-20">
        <Link href="/kitchen" className="text-sm text-gray-700 underline">
          Kitchen Display
        </Link>
      </div>

      {/* Logo */}
      <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 z-10">
        <TransparentLogo />
      </div>

      {/* Icons around the edges */}
      <div className="absolute top-[220px] left-[80px]">
        <Bread className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-[290px] left-[380px]">
        <Croissant className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-[290px] right-[380px]">
        <Cookie className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-[520px] left-[380px]">
        <Coffee className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-[520px] right-[380px]">
        <Cake className="w-8 h-8 text-white" />
      </div>
      <div className="absolute bottom-[220px] left-[80px]">
        <UtensilsCrossed className="w-8 h-8 text-white" />
      </div>
      <div className="absolute bottom-[220px] right-[80px]">
        <ShoppingCart className="w-8 h-8 text-white" />
      </div>

      {/* Check-in Button */}
      <button
        onClick={handleCheckIn}
        className="relative w-[320px] h-[320px] rounded-full flex items-center justify-center focus:outline-none"
        aria-label="Tap to check in"
      >
        {/* Outer circle - light orange */}
        <div className="absolute w-full h-full rounded-full bg-[#F9C97C] animate-pulse-slow"></div>

        {/* Middle circle - darker orange */}
        <div className="absolute w-[75%] h-[75%] rounded-full bg-[#E86F4A] animate-pulse-medium"></div>

        {/* Inner circle - pinkish red */}
        <div className="absolute w-[50%] h-[50%] rounded-full bg-[#E05A6D] animate-pulse-fast"></div>

        {/* Center circle - black with white text */}
        <div className="absolute w-[33%] h-[33%] rounded-full bg-black flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-white text-2xl font-bold">TAP TO</div>
            <div className="text-white text-4xl font-bold">CHECKIN</div>
          </div>
        </div>
      </button>

      {/* Success overlay - shown when checked in */}
      {isCheckedIn && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Check-in Successful!</h2>
            <p className="text-lg">
              Welcome, <span className="font-semibold">{customerName}</span>!
            </p>
            <p className="mt-2">Phone: {phoneNumber}</p>
          </div>
        </div>
      )}
    </div>
  )
}
