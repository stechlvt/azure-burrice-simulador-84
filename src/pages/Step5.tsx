import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameLayout } from '@/components/GameLayout'
import { CTAButton } from '@/components/CTAButton'
import { RouletteWheel } from '@/components/RouletteWheel'
import { Card } from '@/components/ui/card'
import { useGameStore } from '@/context/GameStore'
import { Gift, Sparkles, Crown } from 'lucide-react'

export const Step5 = () => {
  const { roulettePrize, nextStep } = useGameStore()
  const [hasSpun, setHasSpun] = useState(false)

  const handleSpinComplete = (prize: string) => {
    setHasSpun(true)
  }

  const handleContinue = () => {
    nextStep()
  }

  const getPrizeDetails = (prize: string) => {
    switch (prize) {
      case '90_off':
        return { 
          title: '90% DE DESCONTO!', 
          description: 'Primeira mensalidade por apenas R$4,70',
          icon: '🔥'
        }
      case '70_off':
        return { 
          title: '70% DE DESCONTO!', 
          description: 'Primeira mensalidade por apenas R$14,10',
          icon: '💰'
        }
      case '30_days':
        return { 
          title: '30 DIAS GRÁTIS!', 
          description: 'Acesso completo sem pagar nada',
          icon: '🎁'
        }
      case 'first_month_1':
        return { 
          title: 'PRIMEIRA MENSALIDADE R$1!', 
          description: 'Teste completo por quase nada',
          icon: '⚡'
        }
      case 'vip_access':
        return { 
          title: 'ACESSO VIP!', 
          description: 'Indicações antes dos outros usuários',
          icon: '👑'
        }
      case 'secret_bonus':
        return { 
          title: 'BÔNUS SECRETO!', 
          description: 'Surpresa especial será revelada',
          icon: '🎊'
        }
      case '500_coins':
        return { 
          title: '+500 MOEDAS!', 
          description: 'Adicionadas ao seu saldo',
          icon: '🪙'
        }
      case '200_coins':
        return { 
          title: '+200 MOEDAS!', 
          description: 'Adicionadas ao seu saldo',
          icon: '🟡'
        }
      default:
        return { 
          title: 'PRÊMIO ESPECIAL!', 
          description: 'Você ganhou algo incrível',
          icon: '🎉'
        }
    }
  }

  return (
    <GameLayout 
      title="APOSTA FINAL"
      subtitle="Gire a roleta e multiplique suas recompensas"
    >
      <div className="space-y-6">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="text-6xl mb-4">🎰</div>
          <h2 className="text-xl font-bold text-foreground">
            Tá pronto pra girar a roleta ou vai continuar no modo "medo"?
          </h2>
          <p className="text-muted-foreground">
            Uma única rodada pode transformar sua experiência com a IA AZZURE. 
            Prêmios exclusivos te esperando!
          </p>
        </motion.div>

        {/* Prize Preview */}
        {!hasSpun && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-6 rounded-xl shadow-card border border-warning"
          >
            <div className="text-center">
              <Crown className="w-8 h-8 text-warning mx-auto mb-3" />
              <h3 className="font-bold text-warning mb-2">
                PRÊMIOS DISPONÍVEIS NA ROLETA
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>• 90% de desconto</div>
                <div>• 30 dias grátis</div>
                <div>• Acesso VIP</div>
                <div>• +500 moedas</div>
                <div>• Bônus secreto</div>
                <div>• E muito mais...</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Roulette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <RouletteWheel 
            onSpinComplete={handleSpinComplete}
            disabled={hasSpun}
          />
        </motion.div>

        {/* Prize Won */}
        {hasSpun && roulettePrize && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <Card className="p-6 border-profit bg-profit/10 text-center">
              <div className="text-4xl mb-3">
                {getPrizeDetails(roulettePrize).icon}
              </div>
              <h3 className="text-xl font-bold text-profit mb-2">
                {getPrizeDetails(roulettePrize).title}
              </h3>
              <p className="text-muted-foreground">
                {getPrizeDetails(roulettePrize).description}
              </p>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card p-4 rounded-xl shadow-card"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-warning" />
                <span className="font-bold text-warning">BÔNUS ATIVADO!</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Seu prêmio será aplicado automaticamente na próxima etapa
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Continue Button */}
        {hasSpun && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <CTAButton
              onClick={handleContinue}
              variant="success"
              size="lg"
            >
              APLICAR MEU PRÊMIO - CONTINUAR
            </CTAButton>
          </motion.div>
        )}

        {/* Incentive to spin */}
        {!hasSpun && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-muted/50 rounded-xl p-4 text-center"
          >
            <Gift className="w-6 h-6 text-profit mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              100% dos jogadores ganham algo na roleta. Sua vez de testar a sorte!
            </p>
          </motion.div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          Todos os prêmios são válidos e serão aplicados na oferta final
        </div>
      </div>
    </GameLayout>
  )
}