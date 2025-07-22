import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  showIcon?: boolean
  className?: string
}

export const CTAButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  showIcon = true,
  className = ''
}: CTAButtonProps) => {
  
  const variantClasses = {
    primary: 'gradient-primary hover:shadow-glow',
    success: 'gradient-success',
    warning: 'bg-warning hover:bg-warning/90'
  }
  
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4'
  }

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="w-full"
    >
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          w-full ${variantClasses[variant]} ${sizeClasses[size]} 
          text-white font-bold border-0 transition-all duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
      >
        <motion.div 
          className="flex items-center justify-center gap-2"
          animate={loading ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
        >
          {loading ? (
            <Zap className="w-5 h-5 animate-pulse" />
          ) : showIcon ? (
            <ArrowRight className="w-5 h-5" />
          ) : null}
          
          <span>{children}</span>
        </motion.div>
      </Button>
    </motion.div>
  )
}