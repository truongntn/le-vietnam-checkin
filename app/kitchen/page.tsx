"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCustomerStore, type Customer } from "@/lib/store"
import { Check, ArrowLeft } from "lucide-react"

export default function KitchenDisplay() {
  const { customers, markCompleted, removeCustomer } = useCustomerStore()
  const [activeCustomers, setActiveCustomers] = useState<Customer[]>([])
  const [completedCustomers, setCompletedCustomers] = useState<Customer[]>([])

  useEffect(() => {
    // Filter customers into active and completed
    setActiveCustomers(customers.filter((c) => !c.completed))
    setCompletedCustomers(customers.filter((c) => c.completed).slice(0, 5)) // Show only last 5 completed
  }, [customers])

  const handleMarkCompleted = (id: string) => {
    markCompleted(id)
  }

  const handleRemoveCustomer = (id: string) => {
    removeCustomer(id)
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#E05A3A] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="w-24 h-12 relative">
              <Image src="/images/le-vietnam-logo.png" alt="LE VIETNAM" fill className="object-contain" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Kitchen Display Screen</h1>
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#FFD2CC] p-4">
            <h2 className="text-2xl font-bold text-center">Arrived Customers</h2>
            <p className="text-center text-sm mt-1">
              Staff must tick the box after delivering the food to the customer
            </p>
          </div>

          <div className="p-4">
            {activeCustomers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No customers waiting</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-4">Name</th>
                    <th className="text-left py-2 px-4">Phone</th>
                    <th className="text-left py-2 px-4">Time</th>
                    <th className="text-center py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100">
                      <td className="py-4 px-4 font-semibold">{customer.name}</td>
                      <td className="py-4 px-4">{customer.phone}</td>
                      <td className="py-4 px-4">{formatTime(customer.timestamp)}</td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleMarkCompleted(customer.id)}
                          className="w-8 h-8 border-2 border-gray-400 rounded inline-flex items-center justify-center hover:bg-green-50 hover:border-green-500 transition-colors"
                          aria-label="Mark as completed"
                        >
                          {customer.completed && <Check className="h-5 w-5 text-green-600" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {completedCustomers.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-100 p-4">
              <h2 className="text-xl font-bold text-center text-green-800">Recently Completed</h2>
            </div>

            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-4">Name</th>
                    <th className="text-left py-2 px-4">Phone</th>
                    <th className="text-left py-2 px-4">Time</th>
                    <th className="text-center py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completedCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 text-gray-500">
                      <td className="py-3 px-4 line-through">{customer.name}</td>
                      <td className="py-3 px-4 line-through">{customer.phone}</td>
                      <td className="py-3 px-4 line-through">{formatTime(customer.timestamp)}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleRemoveCustomer(customer.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
