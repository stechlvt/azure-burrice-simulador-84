import { motion } from 'framer-motion'
import { useGameStore } from '@/context/GameStore'

interface ScoreBarProps {
  showBalance?: boolean
  className?: string
}

export const ScoreBar = ({ showBalance = true, className = '' }: ScoreBarProps) => {
  const { simulatedBalance, initialBalance } = useGameStore()
  
  const balanceChange = simulatedBalance - initialBalance
  const isProfit = balanceChange >= 0
  const percentageChange = ((balanceChange / initialBalance) * 100)
  
  const progressPercentage = Math.max(0, Math.min(100, 50 + (percentageChange * 2)))

  return (
    <div className={`bg-card rounded-xl p-4 shadow-card ${className}`}>
      {showBalance && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm">Saldo Simulado</span>
            <motion.span 
              className={`text-lg font-bold ${isProfit ? 'text-profit' : 'text-loss'}`}
              key={simulatedBalance}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              R$ {simulatedBalance.toLocaleString('pt-BR')}
            </motion.span>
          </div>
          
          <motion.div 
            className={`text-sm font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isProfit ? '+' : ''} R$ {balanceChange.toLocaleString('pt-BR')} 
            ({isProfit ? '+' : ''}{percentageChange.toFixed(1)}%)
          </motion.div>
        </div>
      )}
      
      <div className="relative">
        <div className="w-full bg-muted rounded-full h-3">
          <motion.div 
            className={`h-3 rounded-full ${isProfit ? 'gradient-success' : 'bg-loss'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Prejuízo</span>
          <span>Lucro</span>
        </div>
      </div>
    </div>
  )
}