import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface SimulationChartProps {
  data: Array<{
    label: string
    value: number
    change: number
  }>
  title?: string
  className?: string
}

export const SimulationChart = ({ data, title = "Simulação de Resultados", className = "" }: SimulationChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  return (
    <div className={`bg-card rounded-xl p-4 shadow-card ${className}`}>
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      
      <div className="space-y-3">
        {data.map((item, index) => {
          const height = range > 0 ? ((item.value - minValue) / range) * 100 : 50
          const isProfit = item.change >= 0
          
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-16 text-xs text-muted-foreground">
                {item.label}
              </div>
              
              <div className="flex-1 relative h-8 bg-muted rounded-md overflow-hidden">
                <motion.div
                  className={`h-full ${isProfit ? 'gradient-success' : 'bg-loss'} rounded-md`}
                  initial={{ width: 0 }}
                  animate={{ width: `${height}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              
              <div className="flex items-center gap-1 w-20 justify-end">
                {isProfit ? (
                  <TrendingUp className="w-4 h-4 text-profit" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-loss" />
                )}
                <span className={`text-sm font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
                  {isProfit ? '+' : ''}{item.change.toFixed(1)}%
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 bg-muted rounded-lg text-center"
      >
        <div className="text-sm text-muted-foreground">
          Resultado Total Simulado
        </div>
        {(() => {
          const totalResult = data.reduce((acc, item) => acc + (item.value * item.change / 100), 0)
          const isPositive = totalResult >= 0
          return (
            <div className={`text-lg font-bold ${isPositive ? 'text-profit' : 'text-loss'}`}>
              {isPositive ? '+' : ''}R$ {totalResult.toLocaleString('pt-BR')}
            </div>
          )
        })()}
      </motion.div>
    </div>
  )
}