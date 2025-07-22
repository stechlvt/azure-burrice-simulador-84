import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: Date
  onExpire?: () => void
  className?: string
}

export const CountdownTimer = ({ targetDate, onExpire, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setIsExpired(true)
        onExpire?.()
        clearInterval(timer)
        return
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onExpire])

  if (isExpired) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-destructive/20 border border-destructive rounded-xl p-4 text-center ${className}`}
      >
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <div className="text-destructive font-bold">OFERTA EXPIRADA!</div>
      </motion.div>
    )
  }

  const isUrgent = timeLeft.minutes < 5

  return (
    <motion.div
      className={`bg-card border rounded-xl p-4 text-center ${isUrgent ? 'border-destructive animate-pulse' : 'border-warning'} ${className}`}
      animate={isUrgent ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className={`w-5 h-5 ${isUrgent ? 'text-destructive' : 'text-warning'}`} />
        <span className={`text-sm font-medium ${isUrgent ? 'text-destructive' : 'text-warning'}`}>
          {isUrgent ? 'ÚLTIMOS MINUTOS!' : 'Oferta por tempo limitado'}
        </span>
      </div>
      
      <div className="flex justify-center gap-2">
        <motion.div
          key={timeLeft.minutes}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`bg-muted rounded-lg px-3 py-2 min-w-[60px]`}
        >
          <div className={`text-2xl font-bold ${isUrgent ? 'text-destructive' : 'text-foreground'}`}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground">MIN</div>
        </motion.div>
        
        <div className={`text-2xl font-bold ${isUrgent ? 'text-destructive' : 'text-foreground'} flex items-center`}>
          :
        </div>
        
        <motion.div
          key={timeLeft.seconds}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`bg-muted rounded-lg px-3 py-2 min-w-[60px]`}
        >
          <div className={`text-2xl font-bold ${isUrgent ? 'text-destructive' : 'text-foreground'}`}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground">SEG</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-xs text-muted-foreground"
      >
        {isUrgent ? 'Não perca essa oportunidade!' : 'Aproveite antes que expire'}
      </motion.div>
    </motion.div>
  )
}