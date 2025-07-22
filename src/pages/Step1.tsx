import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameLayout } from '@/components/GameLayout'
import { CTAButton } from '@/components/CTAButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useGameStore } from '@/context/GameStore'
import { AlertTriangle, TrendingDown } from 'lucide-react'

export const Step1 = () => {
  const { userData, setUserData, addCoins, nextStep } = useGameStore()
  const [formData, setFormData] = useState({
    age: userData.age || '',
    salary: userData.salary || '',
    investment: userData.investment || ''
  })
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = () => {
    const data = {
      age: Number(formData.age),
      salary: Number(formData.salary),
      investment: Number(formData.investment)
    }
    
    setUserData(data)
    setShowResults(true)
    addCoins(100) // Initial reward
    
    setTimeout(() => {
      nextStep()
    }, 3000)
  }

  const isValid = formData.age && formData.salary && formData.investment

  // Calculate potential loss based on form data
  const calculatePotentialLoss = () => {
    if (!isValid) return 0
    const monthly = Number(formData.salary)
    const yearlyPotential = monthly * 12 * 0.15 // 15% potential return
    return Math.round(yearlyPotential)
  }

  if (showResults) {
    return (
      <GameLayout showScoreBar={false} showCoins>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="text-6xl mb-4">🚨</div>
          
          <Card className="p-6 border-destructive bg-destructive/10">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-destructive mb-2">
              EMERGÊNCIA FINANCEIRA DETECTADA!
            </h2>
            <p className="text-muted-foreground mb-4">
              Baseado no seu perfil, você pode estar perdendo até:
            </p>
            <div className="text-3xl font-bold text-destructive mb-2">
              R$ {calculatePotentialLoss().toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-muted-foreground">
              por ano em oportunidades não aproveitadas
            </p>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-card p-4 rounded-xl shadow-card"
          >
            <h3 className="font-bold text-profit mb-2">🎉 RECOMPENSA DESBLOQUEADA!</h3>
            <p className="text-sm text-muted-foreground">
              +100 moedas por completar seu diagnóstico
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-sm text-muted-foreground"
          >
            Preparando seu jogo de simulação...
          </motion.div>
        </motion.div>
      </GameLayout>
    )
  }

  return (
    <GameLayout 
      showScoreBar={false}
      title="DIAGNÓSTICO INICIAL"
      subtitle="Descubra quanto dinheiro você pode estar perdendo"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-6 rounded-xl shadow-card border border-warning"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-6 h-6 text-destructive" />
            <h3 className="font-bold text-foreground">
              Você trabalha 30 dias por mês pra deixar o dinheiro apodrecer?
            </h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Enquanto você lê isso, investidores inteligentes estão multiplicando capital com a IA AZZURE.
          </p>
        </motion.div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="age" className="text-foreground font-medium">
              Qual sua idade?
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Ex: 35"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="salary" className="text-foreground font-medium">
              Qual sua renda mensal? (R$)
            </Label>
            <Input
              id="salary"
              type="number"
              placeholder="Ex: 5000"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="investment" className="text-foreground font-medium">
              Quanto você investe por mês? (R$)
            </Label>
            <Input
              id="investment"
              type="number"
              placeholder="Ex: 500"
              value={formData.investment}
              onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        {isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-warning/20 border border-warning rounded-xl p-4 text-center"
          >
            <h4 className="font-bold text-warning mb-2">⚠️ ALERTA DE OPORTUNIDADE</h4>
            <p className="text-sm text-muted-foreground">
              Com sua renda de R$ {formData.salary}/mês, você poderia estar ganhando até{' '}
              <span className="font-bold text-profit">
                R$ {calculatePotentialLoss().toLocaleString('pt-BR')}
              </span>{' '}
              por ano a mais!
            </p>
          </motion.div>
        )}

        <div className="pt-4">
          <CTAButton
            onClick={handleSubmit}
            disabled={!isValid}
            variant="primary"
            size="lg"
          >
            INICIAR SIMULAÇÃO AZZURE (+100 moedas)
          </CTAButton>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          +3.200 jogadores ativos • Último saque: R$298 em bônus
        </div>
      </div>
    </GameLayout>
  )
}