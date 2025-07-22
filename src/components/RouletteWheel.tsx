import { useState } from 'react'
import { motion } from 'framer-motion'
import { CTAButton } from './CTAButton'
import { useGameStore } from '@/context/GameStore'

const prizes = [
  { label: "90% OFF", value: "90_off", color: "bg-warning" },
  { label: "30% OFF", value: "30_off", color: "bg-profit" },
  { label: "20% OFF", value: "20_off", color: "bg-primary" }
]

interface RouletteWheelProps {
  onSpinComplete?: (prize: string) => void
  disabled?: boolean
}

export const RouletteWheel = ({ onSpinComplete, disabled = false }: RouletteWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [finalRotation, setFinalRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const { setRoulettePrize, addCoins } = useGameStore()

  const spinWheel = () => {
    if (isSpinning || disabled) return

    setIsSpinning(true)
    setWinner(null)

    // Random number of full rotations (5-10)
    const spins = Math.floor(Math.random() * 6) + 5
    
    // Calculate exact position to land on 90% OFF segment
    const segmentAngle = 360 / prizes.length
    // 90% OFF is at index 0, positioned at the top (0 degrees)
    // We want to stop at the center of the segment, accounting for the pointer position
    const targetAngle = 0 + (segmentAngle / 2) // Center of first segment
    
    // Final rotation: multiple full spins + exact target position
    const totalRotation = spins * 360 + (360 - targetAngle)

    setFinalRotation(totalRotation)

    // Always select 90% OFF
    const selectedPrize = prizes[0]

    // Apply prize effects after animation
    setTimeout(() => {
      setWinner(selectedPrize.label)
      setRoulettePrize(selectedPrize.value)
      
      setIsSpinning(false)
      onSpinComplete?.(selectedPrize.value)
    }, 4000)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        {/* Roulette Wheel */}
        <motion.div
          className="relative w-80 h-80"
          animate={{ rotate: finalRotation }}
          transition={{
            duration: 4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Wheel Container */}
          <div className="relative w-full h-full">
            <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#16A34A" />
                  <stop offset="100%" stopColor="#15803D" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333EA" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              
              {/* Outer ring */}
              <circle cx="160" cy="160" r="155" fill="#1F2937" stroke="#F59E0B" strokeWidth="4"/>
              
              {/* Prize segments */}
              {prizes.map((prize, index) => {
                const angle = 360 / prizes.length
                const startAngle = index * angle - 90
                const endAngle = (index + 1) * angle - 90
                
                const startAngleRad = (startAngle * Math.PI) / 180
                const endAngleRad = (endAngle * Math.PI) / 180
                
                const x1 = 160 + 150 * Math.cos(startAngleRad)
                const y1 = 160 + 150 * Math.sin(startAngleRad)
                const x2 = 160 + 150 * Math.cos(endAngleRad)
                const y2 = 160 + 150 * Math.sin(endAngleRad)
                
                const largeArcFlag = angle > 180 ? 1 : 0
                
                const gradients = ['goldGradient', 'redGradient', 'greenGradient', 'blueGradient', 'purpleGradient']
                const gradient = gradients[index % gradients.length]
                
                return (
                  <g key={index}>
                    <path
                      d={`M 160 160 L ${x1} ${y1} A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={`url(#${gradient})`}
                      stroke="#1F2937"
                      strokeWidth="2"
                    />
                    <text
                      x={160 + 100 * Math.cos((startAngleRad + endAngleRad) / 2)}
                      y={160 + 100 * Math.sin((startAngleRad + endAngleRad) / 2)}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${startAngle + angle / 2} ${160 + 100 * Math.cos((startAngleRad + endAngleRad) / 2)} ${160 + 100 * Math.sin((startAngleRad + endAngleRad) / 2)})`}
                    >
                      {prize.label}
                    </text>
                  </g>
                )
              })}
              
              {/* Center circle */}
              <circle cx="160" cy="160" r="25" fill="url(#goldGradient)" stroke="#1F2937" strokeWidth="3"/>
              <circle cx="160" cy="160" r="15" fill="#1F2937"/>
              <text x="160" y="165" fill="#F59E0B" fontSize="20" fontWeight="bold" textAnchor="middle">★</text>
            </svg>
          </div>
        </motion.div>

        {/* Pointer */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
          <svg width="20" height="30" viewBox="0 0 20 30">
            <polygon points="10,0 0,20 10,15 20,20" fill="#F59E0B" stroke="#1F2937" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Winner Display */}
      {winner && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-6 rounded-xl shadow-card text-center border border-primary"
        >
          <h3 className="text-xl font-bold text-profit mb-2">🎉 PARABÉNS!</h3>
          <p className="text-lg font-semibold text-foreground">
            Você ganhou: <span className="text-primary">{winner}</span>
          </p>
        </motion.div>
      )}

      {/* Spin Button */}
      <CTAButton
        onClick={spinWheel}
        disabled={isSpinning || disabled}
        loading={isSpinning}
        variant="primary"
        size="lg"
        className="w-64"
      >
        {isSpinning ? "GIRANDO..." : winner ? "GIRE NOVAMENTE" : "GIRAR A ROLETA!"}
      </CTAButton>

      {/* Instructions */}
      {!winner && !isSpinning && (
        <p className="text-muted-foreground text-center text-sm max-w-md">
          Gire a roleta e ganhe recompensas exclusivas! Cada giro pode mudar sua experiência com a IA AZZURE.
        </p>
      )}
    </div>
  )
}