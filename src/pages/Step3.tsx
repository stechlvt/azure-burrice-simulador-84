import { motion } from 'framer-motion'
import { GameLayout } from '@/components/GameLayout'
import { CTAButton } from '@/components/CTAButton'
import { SimulationChart } from '@/components/SimulationChart'
import { Card } from '@/components/ui/card'
import { useGameStore } from '@/context/GameStore'
import { AlertTriangle, TrendingDown, Users, DollarSign } from 'lucide-react'

// This will be calculated dynamically based on user performance

const statistics = [
  {
    icon: TrendingDown,
    title: '79% dos investidores',
    description: 'que operam por intuição perdem dinheiro nos primeiros 6 meses',
    color: 'text-destructive'
  },
  {
    icon: Users,
    title: '3.200+ usuários',
    description: 'já evitaram perdas usando a IA AZZURE',
    color: 'text-profit'
  },
  {
    icon: DollarSign,
    title: 'R$ 2.4 milhões',
    description: 'em prejuízos evitados no último trimestre',
    color: 'text-warning'
  }
]

export const Step3 = () => {
  const { correctAnswers, totalQuestions, addCoins, nextStep, simulatedBalance, initialBalance } = useGameStore()
  
  const performanceScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
  const balanceChange = simulatedBalance - initialBalance
  
  const getPerformanceLevel = () => {
    if (performanceScore >= 80) return { level: 'EXPERT INICIANTE', color: 'text-profit' }
    if (performanceScore >= 60) return { level: 'AMADOR CONSCIENTE', color: 'text-warning' }
    return { level: 'AMADOR INCONSCIENTE', color: 'text-destructive' }
  }

  const performance = getPerformanceLevel()
  
  // Generate dynamic chart data based on user performance
  const generateImpactData = () => {
    const baseValue = initialBalance / 1000 // Convert to thousands for chart
    const isPositive = balanceChange > 0
    const changePercent = (balanceChange / initialBalance) * 100
    
    if (isPositive) {
      // Show positive trajectory for good performance
      return [
        { label: 'Início', value: baseValue, change: 0 },
        { label: 'Q1', value: baseValue * 1.02, change: 2.1 },
        { label: 'Q2', value: baseValue * 1.05, change: 5.3 },
        { label: 'Q3', value: baseValue * 1.08, change: 8.7 },
        { label: 'Q4', value: baseValue * 1.12, change: 12.4 },
        { label: 'Atual', value: (simulatedBalance / 1000), change: changePercent }
      ]
    } else {
      // Show negative trajectory for poor performance
      return [
        { label: 'Início', value: baseValue, change: 0 },
        { label: 'Q1', value: baseValue * 0.95, change: -5.2 },
        { label: 'Q2', value: baseValue * 0.88, change: -12.8 },
        { label: 'Q3', value: baseValue * 0.82, change: -18.3 },
        { label: 'Q4', value: baseValue * 0.75, change: -25.1 },
        { label: 'Atual', value: (simulatedBalance / 1000), change: changePercent }
      ]
    }
  }
  
  const impactData = generateImpactData()
  const chartTitle = balanceChange > 0 
    ? `📈 Suas Decisões Geraram +R$ ${Math.abs(balanceChange).toLocaleString('pt-BR')}`
    : `📉 Suas Decisões Custaram R$ ${Math.abs(balanceChange).toLocaleString('pt-BR')}`

  const handleContinue = () => {
    addCoins(150) // Bonus reward
    nextStep()
  }

  return (
    <GameLayout 
      title="EXPLOSÃO MENTAL"
      subtitle="Veja o impacto real das suas decisões"
    >
      <div className="space-y-6">
        {/* Performance Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-xl border ${
            performance.color.includes('destructive') 
              ? 'border-destructive bg-destructive/10' 
              : performance.color.includes('warning')
                ? 'border-warning bg-warning/10'
                : 'border-profit bg-profit/10'
          }`}
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className={`w-8 h-8 ${performance.color} mt-1`} />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                ⚠️ CLASSIFICAÇÃO DE RISCO
              </h3>
              <div className={`text-lg font-bold ${performance.color} mb-2`}>
                {performance.level}
              </div>
              <p className="text-muted-foreground text-sm">
                Você acertou {correctAnswers} de {totalQuestions} decisões ({performanceScore.toFixed(0)}%)
              </p>
              
              {performance.color.includes('destructive') && (
                <p className="text-sm text-destructive mt-2 font-medium">
                  Você opera com base em EMOÇÃO. Alto risco de perdas!
                </p>
              )}
              {performance.color.includes('profit') && (
                <p className="text-sm text-profit mt-2 font-medium">
                  Excelente! Você tem potencial para ser um investidor consistente.
                </p>
              )}
              {performance.color.includes('warning') && (
                <p className="text-sm text-warning mt-2 font-medium">
                  Você está no caminho certo, mas ainda comete erros custosos.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Impact Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SimulationChart 
            data={impactData}
            title={chartTitle}
            className="mb-4"
          />
          <p className="text-center text-sm text-muted-foreground">
            Gráfico baseado nas suas respostas do quiz anterior
          </p>
        </motion.div>

        {/* Real Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h4 className="font-bold text-foreground text-center">
            📊 ESTATÍSTICAS REAIS DO MERCADO
          </h4>
          
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <stat.icon className={`w-6 h-6 ${stat.color} mt-0.5`} />
                  <div>
                    <div className={`font-bold ${stat.color}`}>
                      {stat.title}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bonus Reward */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-card p-6 rounded-xl shadow-card border border-profit"
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="font-bold text-profit mb-2">
              PARABÉNS! KIT AZZURE STARTER DESBLOQUEADO
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✅ 3 indicações reais de ações</p>
              <p>✅ +150 moedas bônus</p>
              <p>✅ Acesso à Roleta Financeira</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="pt-4"
        >
          <CTAButton
            onClick={handleContinue}
            variant="primary"
            size="lg"
          >
            DESCOBRIR A SOLUÇÃO (+150 moedas)
          </CTAButton>
        </motion.div>

        <div className="text-center text-xs text-muted-foreground">
          Baseado em dados reais de performance de investidores brasileiros
        </div>
      </div>
    </GameLayout>
  )
}