"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"

interface PhoneEntryProps {
  onBack: () => void
  onSubmit: (phoneNumber: string, name: string) => void
}

export default function PhoneEntry({ onBack, onSubmit }: PhoneEntryProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [activeInput, setActiveInput] = useState<"phone" | "name">("phone")

  const handleNumberClick = (num: string) => {
    if (activeInput === "phone" && phoneNumber.length < 10) {
      setPhoneNumber((prev) => prev + num)
    }
  }

  const handleBackspace = () => {
    if (activeInput === "phone") {
      setPhoneNumber((prev) => prev.slice(0, -1))
    }
  }

  const handleClear = () => {
    if (activeInput === "phone") {
      setPhoneNumber("")
    }
  }

  const handleSubmit = () => {
    if (phoneNumber.length === 10 && name.trim().length > 0) {
      onSubmit(phoneNumber, name)
    }
  }

  const digitsNeeded = 10 - phoneNumber.length
  const isFormValid = phoneNumber.length === 10 && name.trim().length > 0

  return (
    <div className="flex flex-row h-screen w-screen">
      {/* Left side - Orange section */}
      <div className="w-2/5 bg-[#E05A3A] p-8 flex flex-col">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-16 relative">
            <Image src="/images/le-vietnam-logo.png" alt="LE VIETNAM" fill className="object-contain" />
          </div>
        </div>

        <div className="text-white text-center mb-4">
          <h2 className="text-2xl font-bold">Check-In System</h2>
          <p className="text-sm">0433 605 645</p>
        </div>

        <div className="bg-white rounded-lg p-6 mt-8 text-center">
          <h3 className="text-[#E05A3A] text-4xl font-bold">10% OFF</h3>
          <p className="text-gray-600 text-sm mt-2">WHEN YOU REDEEM</p>
          <p className="text-black text-3xl font-bold mt-1">10 REWARD POINTS</p>

          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-start space-x-2 bg-[#E04A2A] p-4 rounded-md">
            <input
              type="checkbox"
              id="agreement"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1"
            />
            <label htmlFor="agreement" className="text-white text-sm">
              By entering my phone number, I agree to receive <strong>LE VIETNAM</strong> notifications via auto text!
              Unsubscribe anytime and still participate in <strong>LE VIETNAM</strong>.
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      {/* Right side - Phone entry */}
      <div className="w-3/5 bg-white p-8 flex flex-col">
        <div className="flex justify-end">
          <div className="w-16 h-8 relative">
            <Image src="/images/le-vietnam-logo.png" alt="LE VIETNAM" fill className="object-contain" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <h1 className="text-2xl font-bold">PLEASE ENTER PHONE NUMBER</h1>
          <p className="text-sm text-gray-500 mt-1">Your info will not be shared with any third party</p>
        </div>

        <div className="mt-6">
          <div
            className={`border ${activeInput === "phone" ? "border-[#E05A3A]" : "border-gray-300"} rounded-md p-4 text-center mb-4`}
            onClick={() => setActiveInput("phone")}
          >
            <span className="text-xl text-gray-700">{phoneNumber ? phoneNumber : "Enter your number"}</span>
          </div>

          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full text-xl text-center focus:outline-none"
              onClick={() => setActiveInput("name")}
            />
          </div>
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className={`border ${activeInput === "phone" ? "border-[#E05A3A] text-[#E05A3A]" : "border-gray-300 text-gray-400"} rounded-full py-4 text-2xl font-semibold hover:bg-[#E05A3A] hover:text-white transition-colors`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleBackspace}
            className={`border border-gray-300 rounded-full py-4 flex items-center justify-center ${activeInput !== "phone" ? "opacity-50" : ""}`}
            disabled={activeInput !== "phone"}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => handleNumberClick("0")}
            className={`border ${activeInput === "phone" ? "border-[#E05A3A] text-[#E05A3A]" : "border-gray-300 text-gray-400"} rounded-full py-4 text-2xl font-semibold hover:bg-[#E05A3A] hover:text-white transition-colors`}
          >
            0
          </button>

          <button
            onClick={handleClear}
            className={`border border-gray-300 rounded-full py-4 flex items-center justify-center ${activeInput !== "phone" ? "opacity-50" : ""}`}
            disabled={activeInput !== "phone"}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-md text-white text-center ${
              isFormValid ? "bg-[#E05A3A] cursor-pointer" : "bg-[#E5A193] cursor-not-allowed"
            }`}
          >
            {!isFormValid
              ? name.trim().length === 0
                ? "Please enter your name"
                : digitsNeeded > 0
                  ? `${digitsNeeded} more digits needed`
                  : "Submit"
              : "Submit"}
          </button>
        </div>
      </div>
    </div>
  )
}
