import { motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { CoinCounter } from './CoinCounter'
import { ScoreBar } from './ScoreBar'
import { useGameStore } from '@/context/GameStore'

interface GameLayoutProps {
  children: React.ReactNode
  showScoreBar?: boolean
  showCoins?: boolean
  title?: string
  subtitle?: string
}

export const GameLayout = ({ 
  children, 
  showScoreBar = true, 
  showCoins = true,
  title,
  subtitle
}: GameLayoutProps) => {
  const currentStep = useGameStore((state) => state.currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <motion.img 
                src="/lovable-uploads/6974c57f-e52d-403e-8271-0cfa16031975.png"
                alt="AZZURE"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              />
            </div>
            
            <div className="flex-1 flex justify-center">
              <StepIndicator />
            </div>
            
            {showCoins && (
              <div className="flex items-center">
                <CoinCounter showAnimation />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Score Bar */}
        {showScoreBar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <ScoreBar />
          </motion.div>
        )}

        {/* Page Title */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Page Content */}
        <motion.div
          key={currentStep} // Re-trigger animation when step changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="pb-8 text-center text-xs text-muted-foreground">
        Simulação educativa - Não constitui recomendação de investimento
      </div>
    </div>
  )
}