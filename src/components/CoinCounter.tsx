import { motion } from 'framer-motion'
import { Coins } from 'lucide-react'
import { useGameStore } from '@/context/GameStore'

interface CoinCounterProps {
  showAnimation?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const CoinCounter = ({ showAnimation = false, size = 'md' }: CoinCounterProps) => {
  const coins = useGameStore((state) => state.coins)
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  }
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <motion.div 
      className={`flex items-center gap-2 gradient-gold text-accent-foreground px-3 py-2 rounded-full shadow-coin ${sizeClasses[size]} font-bold`}
      animate={showAnimation ? { 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={showAnimation ? { rotate: 360 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Coins size={iconSizes[size]} className="text-accent-foreground" />
      </motion.div>
      
      <motion.span
        key={coins} // Re-trigger animation when coins change
        initial={showAnimation ? { scale: 0.8, opacity: 0 } : {}}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {coins.toLocaleString('pt-BR')}
      </motion.span>
    </motion.div>
  )
}