import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useGameStore } from '@/context/GameStore'

export const StepIndicator = () => {
  const { currentStep, totalSteps } = useGameStore()

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              <motion.div
                className={`
                  relative w-10 h-10 rounded-full flex items-center justify-center
                  ${isCompleted ? 'gradient-success' : isCurrent ? 'gradient-primary' : 'bg-muted'}
                  ${isCurrent ? 'shadow-glow' : ''}
                `}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isCurrent ? 1.1 : 1,
                  opacity: isUpcoming ? 0.5 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={`text-sm font-bold ${isCurrent || isCompleted ? 'text-white' : 'text-muted-foreground'}`}>
                    {stepNumber}
                  </span>
                )}

                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary-glow"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>

              {stepNumber < totalSteps && (
                <motion.div
                  className={`w-8 h-1 mx-1 rounded-full ${
                    stepNumber < currentStep ? 'gradient-success' : 'bg-muted'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: stepNumber < currentStep ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}