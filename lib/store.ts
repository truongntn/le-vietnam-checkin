import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Customer {
  id: string
  name: string
  phone: string
  timestamp: number
  completed: boolean
}

interface CustomerStore {
  customers: Customer[]
  addCustomer: (name: string, phone: string) => void
  markCompleted: (id: string) => void
  removeCustomer: (id: string) => void
  getActiveCustomers: () => Customer[]
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customers: [],

      addCustomer: (name, phone) => {
        const newCustomer: Customer = {
          id: Date.now().toString(),
          name,
          phone,
          timestamp: Date.now(),
          completed: false,
        }

        set((state) => ({
          customers: [...state.customers, newCustomer],
        }))

        return newCustomer.id
      },

      markCompleted: (id) => {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, completed: true } : customer,
          ),
        }))
      },

      removeCustomer: (id) => {
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        }))
      },

      getActiveCustomers: () => {
        return get().customers.filter((customer) => !customer.completed)
      },
    }),
    {
      name: "customer-storage",
    },
  ),
)
