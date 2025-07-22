import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { GameLayout } from '@/components/GameLayout'
import { CTAButton } from '@/components/CTAButton'
import { CountdownTimer } from '@/components/CountdownTimer'
import { useGameStore } from '@/context/GameStore'
import { Check, TrendingUp, DollarSign } from 'lucide-react'
import azzureOfferCard from '@/assets/azzure-offer-card.png'

export const Step6 = () => {
  const { roulettePrize, offerExpiresAt, startOfferTimer } = useGameStore()

  useEffect(() => {
    if (!offerExpiresAt) {
      startOfferTimer(20) // 20 minutes timer
    }
  }, [offerExpiresAt, startOfferTimer])

  const getPriceDetails = () => {
    switch (roulettePrize) {
      case '90_off':
        return { originalPrice: 470, finalPrice: 47, savings: 423, period: 'anual' }
      case '30_off':
        return { originalPrice: 470, finalPrice: 329, savings: 141, period: 'anual' }
      case '20_off':
        return { originalPrice: 470, finalPrice: 376, savings: 94, period: 'anual' }
      default:
        return { originalPrice: 470, finalPrice: 47, savings: 423, period: 'anual' }
    }
  }

  const priceDetails = getPriceDetails()

  const handleSubscribe = () => {
    // Here would be the payment integration
    alert('Redirecionando para pagamento... (demo)')
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_49%,_rgba(255,255,255,0.02)_50%,_transparent_51%)] bg-[length:20px_20px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-yellow-500 text-lg font-light tracking-wider mb-8">
            AZZURE
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
            GANHE MAIS QUE UM<br />
            <span className="font-bold">INVESTIDOR –</span>{' '}
            <span className="underline decoration-yellow-500 decoration-2 underline-offset-8">
              NO<br />PILOTO AUTOMÁTICO!
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Nossa inteligência artificial analisa o mercado brasileiro em tempo real e mostra quais ações{' '}
            <strong className="text-white">comprar, manter ou vender.</strong> Você investe com segurança, mesmo começando do zero!
          </p>

          <div className="max-w-4xl mx-auto text-left space-y-8 mb-16">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Pare de <span className="text-red-400">PERDER DINHEIRO</span> com estas atitudes:
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="text-red-400 mt-1">❌</div>
                  <div>
                    <h3 className="font-semibold mb-2 text-red-400">
                      Manter o dinheiro parado rendendo sempre muito pouco...
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Poupança e CDB rendem menos que a inflação
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-red-400 mt-1">❌</div>
                  <div>
                    <h3 className="font-semibold mb-2 text-red-400">
                      Investir em ações de forma aleatória, sem estratégia.
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Apostar no "achômetro" é a forma mais rápida de perder dinheiro
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                <span className="text-yellow-500">✅ FAÇA ISSO</span> e veja seu dinheiro crescer:
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-yellow-500 mt-1">✅</div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Use uma <span className="text-yellow-500">Inteligência Artificial</span> especialista em ações
                    </h3>
                    <p className="text-gray-300">
                      A Azzure analisa mais de 300 ações brasileiras todos os dias e te diz exatamente o que fazer
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-yellow-500 mt-1">✅</div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Receba alertas <span className="text-yellow-500">semanais</span> com recomendações precisas
                    </h3>
                    <p className="text-gray-300">
                      Toda semana você recebe quais ações comprar, quais manter e quais vender
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-yellow-500 mt-1">✅</div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Invista com <span className="text-yellow-500">linguagem simples</span> e objetiva
                    </h3>
                    <p className="text-gray-300">
                      Nada de economês complicado. Você entende exatamente o que fazer, mesmo sem experiência
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center py-8">
              <h2 className="text-3xl font-bold mb-4">
                Imagine ter um <span className="text-yellow-500">consultor especialista</span><br />
                trabalhando 24h para você...
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                É exatamente isso que a <strong>Azzure</strong> faz por você!
              </p>
              
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4 text-yellow-500">O que você ganha:</h3>
                <ul className="text-left space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500">•</span>
                    <span>Ações recomendadas por uma IA que pensa como investidor de longo prazo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500">•</span>
                    <span>Indicações seguras com linguagem simples e objetiva</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500">•</span>
                    <span>Alertas semanais com o que fazer com cada papel (comprar, manter ou vender)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500">•</span>
                    <span>Visão clara da sua carteira — como se tivesse uma consultoria especializada</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Veja os <span className="text-yellow-500">RESULTADOS REAIS</span> de quem já usa:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">+87%</div>
              <p className="text-sm text-gray-300">Rentabilidade média em 12 meses</p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">+15.000</div>
              <p className="text-sm text-gray-300">Investidores ativos usando a Azzure</p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
              <p className="text-sm text-gray-300">Taxa de assertividade das recomendações</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-bold mb-6 text-center text-green-400">
              💰 Casos de Sucesso Reais:
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <p className="text-gray-300 mb-3">
                  "Comecei com R$ 5.000 e em 8 meses já tinha R$ 12.000. A Azzure me ensinou quando comprar e quando vender. Mudou minha vida financeira!"
                </p>
                <p className="text-sm text-yellow-500 font-semibold">- Maria Silva, Contadora</p>
              </div>
              
              <div className="bg-gray-900/30 rounded-lg p-4">
                <p className="text-gray-300 mb-3">
                  "Eu não entendia nada de ações. Com a Azzure, em 6 meses consegui 45% de rentabilidade. Muito melhor que deixar na poupança!"
                </p>
                <p className="text-sm text-yellow-500 font-semibold">- João Santos, Engenheiro</p>
              </div>
              
              <div className="bg-gray-900/30 rounded-lg p-4">
                <p className="text-gray-300 mb-3">
                  "A linguagem é tão simples que até meu filho de 16 anos conseguiu entender. Estamos investindo juntos agora!"
                </p>
                <p className="text-sm text-yellow-500 font-semibold">- Ana Costa, Professora</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-6">
              🚀 Como a <span className="text-yellow-500">Azzure</span> funciona:
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Análise em Tempo Real</h4>
                <p className="text-gray-300 text-sm">
                  Nossa IA monitora mais de 300 ações da B3 24 horas por dia
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Recomendações Semanais</h4>
                <p className="text-gray-300 text-sm">
                  Toda semana você recebe um relatório com ações para comprar, manter ou vender
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Você Investe e Lucra</h4>
                <p className="text-gray-300 text-sm">
                  Segue as orientações e vê seu patrimônio crescer de forma consistente
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-yellow-500/20 via-yellow-600/10 to-black border-2 border-yellow-500 rounded-2xl p-8 mb-12 text-center max-w-md mx-auto">
            <h3 className="text-5xl font-bold mb-8 text-yellow-500 tracking-wider">
              AZZURE
            </h3>
            
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-gray-400 text-xl line-through">DE R$470,00</p>
                <p className="text-5xl font-bold text-yellow-500 mb-6">POR R$47,00</p>
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-xl mb-8"
              >
                Conecte-se agora
              </button>

              <div className="bg-black/80 border border-yellow-500/30 rounded-xl p-6 text-left space-y-4">
                <h4 className="text-xl font-bold text-yellow-500 text-center">Teste a Azzure por 7 dias. Livre de riscos!</h4>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  Se realizar a sua assinatura não tiver o resultado que esperamos, devolvemos 100% do seu dinheiro.
                </p>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ou seja, você tem 7 dias para testar a Azzure, sem qualquer risco de perder o seu dinheiro.
                </p>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  Se você começar a investir com a gente, e não gostar, ou não ganhar nada.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Central CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <button
            onClick={handleSubscribe}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-12 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-xl"
          >
            🎯 QUERO COMEÇAR A LUCRAR AGORA
          </button>
          
          <div className="mt-6 space-y-2 text-sm text-gray-400">
            <p>✅ Acesso imediato após o pagamento</p>
            <p>✅ Funciona mesmo se você nunca investiu</p>
            <p>✅ Linguagem 100% simples e didática</p>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        {offerExpiresAt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mb-8"
          >
            <CountdownTimer 
              targetDate={offerExpiresAt}
              onExpire={() => alert('Oferta expirada!')}
            />
          </motion.div>
        )}

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-center"
        >
          <div className="mb-6">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              R$ {priceDetails.finalPrice.toFixed(2)}
            </div>
            <div className="text-gray-400 line-through text-lg">
              De R$ {priceDetails.originalPrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Pagamento único anual
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg mb-8"
          >
            QUERO ACESSO À IA AZZURE
          </button>

          <div className="text-xs text-gray-500 space-y-1">
            <p>Pagamento 100% seguro</p>
            <p>Cancelamento a qualquer momento</p>
            <p>Garantia de 30 dias</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}