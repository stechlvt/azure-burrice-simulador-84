import { motion } from 'framer-motion'
import { GameLayout } from '@/components/GameLayout'
import { CTAButton } from '@/components/CTAButton'
import { Card } from '@/components/ui/card'
import { useGameStore } from '@/context/GameStore'
import { Brain, Zap, Target, Shield, TrendingUp, X } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'IA Superinteligente',
    description: 'Analisa 10.000+ variáveis em tempo real',
    color: 'text-primary'
  },
  {
    icon: Target,
    title: 'Só 3 Ações por Dia',
    description: 'As melhores oportunidades, sem ruído',
    color: 'text-profit'
  },
  {
    icon: Shield,
    title: 'Risco Calculado',
    description: 'Stop loss e racional embutido em cada indicação',
    color: 'text-warning'
  },
  {
    icon: Zap,
    title: 'Alertas Instantâneos',
    description: 'Notificações antes do pregão abrir',
    color: 'text-destructive'
  }
]

const objections = [
  {
    objection: 'Já tentei cursos e não funcionou',
    response: 'Cursos ensinam teoria. A AZZURE age na prática.'
  },
  {
    objection: 'Não entendo de análise técnica',
    response: 'Não precisa entender. Só seguir as indicações.'
  },
  {
    objection: 'E se a IA errar?',
    response: 'Stop loss automático protege seu capital.'
  }
]

export const Step4 = () => {
  const { nextStep, coins, spendCoins } = useGameStore()

  return (
    <GameLayout 
      title="LUZ NO FIM DO TÚNEL"
      subtitle="A solução que você estava esperando"
    >
      <div className="space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-foreground">
            Apresentando a IA AZZURE
          </h2>
          <p className="text-muted-foreground">
            A única inteligência artificial que entrega as 3 melhores ações do dia 
            com racional completo e risco calculado.
          </p>
        </motion.div>

        {/* Problem/Solution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-xl shadow-card border-l-4 border-l-primary"
        >
          <h3 className="font-bold text-foreground mb-3">
            🎯 Você quer acertar ou continuar brincando de adivinhar?
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Você já tentou cursos, vídeos e gurus... Nada funcionou. 
            Porque o que você precisa não é mais conteúdo.
          </p>
          <div className="text-primary font-bold">
            É uma MÁQUINA de decisão.
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="p-4 h-full">
                <feature.icon className={`w-8 h-8 ${feature.color} mb-3`} />
                <h4 className="font-bold text-sm text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card p-6 rounded-xl shadow-card"
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-profit" />
            Como Funciona na Prática
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
              <p className="text-muted-foreground">
                Todo dia às 8h você recebe 3 indicações com racional completo
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
              <p className="text-muted-foreground">
                Cada indicação vem com preço de entrada, stop loss e target
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
              <p className="text-muted-foreground">
                Você executa a estratégia e acompanha os resultados
              </p>
            </div>
          </div>
        </motion.div>

        {/* Objection Handling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <h4 className="font-bold text-foreground text-center">
            🤔 Quebrando Suas Objeções
          </h4>
          
          {objections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="bg-muted/50 rounded-lg p-4"
            >
              <div className="flex items-start gap-3 mb-2">
                <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium text-destructive">
                  "{item.objection}"
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-profit rounded-full" />
                </div>
                <span className="text-sm text-profit font-medium">
                  {item.response}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          className="bg-profit/10 border border-profit rounded-xl p-4 text-center"
        >
          <h4 className="font-bold text-profit mb-2">
            📈 RESULTADO DOS ÚLTIMOS 30 DIAS
          </h4>
          <div className="text-2xl font-bold text-profit mb-1">
            +23.7%
          </div>
          <p className="text-sm text-muted-foreground">
            Performance média dos usuários ativos
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="pt-4"
        >
          <CTAButton
            onClick={() => {
              spendCoins(coins) // Gasta todas as moedas
              nextStep()
            }}
            variant="primary"
            size="lg"
          >
            TESTAR POR {coins} MOEDAS - 7 DIAS
          </CTAButton>
        </motion.div>

        <div className="text-center text-xs text-muted-foreground">
          Sem compromisso • Cancele quando quiser • Resultados não garantidos
        </div>
      </div>
    </GameLayout>
  )
}