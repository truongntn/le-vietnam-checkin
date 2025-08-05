"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "./confetti"
import Image from "next/image"

interface SuccessScreenProps {
  points: number
  customerName: string
  customerPhone: string
}

export default function SuccessScreen({ points, customerName, customerPhone }: SuccessScreenProps) {
  const [showPoints, setShowPoints] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showFinalElements, setShowFinalElements] = useState(false)

  useEffect(() => {
    // Sequence the animations
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 500)

    const pointsTimer = setTimeout(() => {
      setShowPoints(true)
    }, 1500)

    const finalTimer = setTimeout(() => {
      setShowFinalElements(true)
    }, 2500)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(pointsTimer)
      clearTimeout(finalTimer)
    }
  }, [])

  // Generate random positions for floating elements
  const generateRandomPositions = (count: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 5 + Math.random() * 15,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 5,
    }))
  }

  const floatingElements = generateRandomPositions(10)

  // Matrix effect data
  const matrixEffect = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.querySelector(".matrix-container")?.appendChild(canvas)

    const chars = "0123456789ABCDEF"
    const fontSize = 16
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    function draw() {
      if (!ctx) return
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#0F0"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    setInterval(draw, 33)

    return () => {
      canvas.remove()
    }
  }

  useEffect(() => {
    const cleanup = matrixEffect()
    return cleanup
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-start justify-start overflow-hidden matrix-container"
      style={{ backgroundColor: "#000" }}
    >
      <Confetti />

      {/* Background animated elements */}
      {showFinalElements && (
        <>
          {floatingElements.map((el, index) => (
            <motion.div
              key={`float-${index}`}
              className="absolute rounded-full"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.size}px`,
                height: `${el.size}px`,
                backgroundColor: index % 2 === 0 ? "#f05122" : "#ffb347",
                opacity: 0.3,
              }}
              animate={{
                y: [`${el.y}%`, `${el.y - 10}%`, `${el.y}%`],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: el.duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: el.delay,
              }}
            />
          ))}
        </>
      )}

      {/* Radial pulse animation */}
      <AnimatePresence>
        {showPoints && (
          <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0, 2, 3] }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          >
            <div
              className="w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, #f05122 0%, rgba(240, 81, 34, 0) 70%)" }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="text-left z-10 max-w-lg px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {showText && (
            <motion.h1
              className="text-4xl md:text-2xl font-bold mb-6"
              style={{
                color: "#0F0",
                textShadow: "0 0 5px #0F0, 0 0 10px #0F0, 0 0 15px #0F0",
                fontFamily: "monospace",
                fontWeight: 900
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.3 }}>
                Loading….
              </motion.span>
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showText && (
            <motion.p
              className="text-xl mb-6"
              style={{
                color: "#31DCFF",
                textShadow: "0 0 8px #31DCFF, 0 0 16px #31DCFF, 0 0 32px #31DCFF",
                fontWeight: 700
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {customerName}, your order is ready!
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPoints && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <motion.div
                className="relative mx-auto w-32 h-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#ffda44" }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {/* Animated ring around points */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px dashed #f05122",
                    width: "calc(100% + 16px)",
                    height: "calc(100% + 16px)",
                    top: "-8px",
                    left: "-8px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#ffb347" }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}