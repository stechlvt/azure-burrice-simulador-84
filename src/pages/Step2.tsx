import { useState } from 'react'
import { motion } from 'framer-motion'
import { GameLayout } from '@/components/GameLayout'
import { CTAButton } from '@/components/CTAButton'
import { Card } from '@/components/ui/card'
import { useGameStore } from '@/context/GameStore'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

const questions = [
  {
    id: 'q1',
    title: 'VALE3 despenca 8% após notícia sobre minério. O que você faz?',
    options: [
      { text: 'Vendo tudo na emoção', isCorrect: false, feedback: 'Erro! Você vendeu no pânico e perdeu R$1.240' },
      { text: 'Compro mais aproveitando a queda', isCorrect: true, feedback: 'Acertou! A IA AZZURE indicou compra. +R$890' },
      { text: 'Fico paralisado sem ação', isCorrect: false, feedback: 'Perdeu oportunidade! Poderia ter ganho R$890' }
    ]
  },
  {
    id: 'q2', 
    title: 'PETR4 sobe 12% em 2 dias. Todos estão comprando. Sua decisão?',
    options: [
      { text: 'Compro na euforia do mercado', isCorrect: false, feedback: 'Comprou no topo! Perdeu R$670 em 1 semana' },
      { text: 'Espero uma correção para entrar', isCorrect: true, feedback: 'Correto! A IA previu correção. Economia de R$670' },
      { text: 'Ignoro, não entendo de petróleo', isCorrect: false, feedback: 'Perdeu chance de +R$340 com entrada técnica' }
    ]
  },
  {
    id: 'q3',
    title: 'Mercado americano em alta. ITUB4 lateralizando. Qual estratégia?',
    options: [
      { text: 'Vendo tudo e compro dólar', isCorrect: false, feedback: 'Timing errado! Perdeu rally de R$1.120' },
      { text: 'Mantenho posição e aguardo', isCorrect: true, feedback: 'Disciplinado! A IA confirma: aguardar. +R$780' },
      { text: 'Dobro a posição apostando', isCorrect: false, feedback: 'Arriscou demais! Exposição excessiva custou R$450' }
    ]
  },
  {
    id: 'q4',
    title: 'BBAS3 anuncia aumento de dividendos. Mercado celebra com alta de 6%. Sua ação?',
    options: [
      { text: 'Compro rapidamente antes de subir mais', isCorrect: false, feedback: 'Comprou caro! Preço já estava inflado. Perdeu R$520' },
      { text: 'Analiso se o yield justifica a valorização', isCorrect: true, feedback: 'Excelente! IA confirma: yield ainda atrativo. +R$650' },
      { text: 'Espero cair para entrar', isCorrect: false, feedback: 'Perdeu oportunidade! Continuou subindo mais R$430' }
    ]
  },
  {
    id: 'q5',
    title: 'MGLU3 despenca 15% após balanço ruim. Analistas divididos. O que fazer?',
    options: [
      { text: 'Aproveito a queda para entrar', isCorrect: false, feedback: 'Pegou uma faca caindo! Perdeu mais R$380' },
      { text: 'Aguardo estabilização antes de agir', isCorrect: true, feedback: 'Prudente! IA detectou mais quedas. Economia de R$380' },
      { text: 'Vendo se já tenho na carteira', isCorrect: false, feedback: 'Vendeu no fundo! Perdeu recuperação de R$290' }
    ]
  }
]

export const Step2 = () => {
  const { addCoins, updateBalance, addQuizAnswer, nextStep } = useGameStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return
    
    setSelectedOption(optionIndex)
    setShowFeedback(true)
    
    const question = questions[currentQuestion]
    const option = question.options[optionIndex]
    const isCorrect = option.isCorrect
    
    // Add to store
    addQuizAnswer(question.id, optionIndex, isCorrect)
    
    // Reward coins and update balance
    if (isCorrect) {
      addCoins(50)
      updateBalance(Math.floor(Math.random() * 500) + 300) // Random gain 300-800
    } else {
      addCoins(10) // Consolation prize
      updateBalance(-Math.floor(Math.random() * 400) - 200) // Random loss 200-600
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setShowFeedback(false)
      } else {
        setQuizComplete(true)
        setTimeout(() => nextStep(), 2000)
      }
    }, 3000)
  }

  if (quizComplete) {
    return (
      <GameLayout title="QUIZ COMPLETO!">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="text-6xl mb-4">🎯</div>
          
          <Card className="p-6 border-profit bg-profit/10">
            <h2 className="text-xl font-bold text-profit mb-4">
              SUAS DECISÕES FORAM ANALISADAS!
            </h2>
            <p className="text-muted-foreground">
              Vamos ver o impacto real das suas escolhas na próxima etapa...
            </p>
          </Card>
          
          <div className="text-sm text-muted-foreground">
            Preparando relatório de performance...
          </div>
        </motion.div>
      </GameLayout>
    )
  }

  const question = questions[currentQuestion]

  return (
    <GameLayout 
      title="QUIZ DE DECISÕES"
      subtitle={`Pergunta ${currentQuestion + 1} de ${questions.length}`}
    >
      <div className="space-y-6">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card p-6 rounded-xl shadow-card"
        >
          <div className="flex items-start gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-warning mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-foreground mb-2">
                {question.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Sua decisão afetará seu saldo simulado. Escolha com cuidado!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedOption !== null}
                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all duration-300
                  ${selectedOption === index 
                    ? option.isCorrect 
                      ? 'border-profit bg-profit/20' 
                      : 'border-destructive bg-destructive/20'
                    : selectedOption !== null 
                      ? 'border-muted bg-muted/20 opacity-50'
                      : 'border-border bg-card hover:border-primary hover:shadow-glow'
                  }
                  ${selectedOption !== null ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                whileTap={selectedOption === null ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                    ${selectedOption === index 
                      ? option.isCorrect 
                        ? 'border-profit bg-profit text-white' 
                        : 'border-destructive bg-destructive text-white'
                      : 'border-muted-foreground text-muted-foreground'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option.text}</span>
                  
                  {selectedOption === index && (
                    <div className="ml-auto">
                      {option.isCorrect ? (
                        <TrendingUp className="w-5 h-5 text-profit" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              question.options[selectedOption!].isCorrect 
                ? 'border-profit bg-profit/10' 
                : 'border-destructive bg-destructive/10'
            }`}
          >
            <div className="flex items-start gap-3">
              {question.options[selectedOption!].isCorrect ? (
                <TrendingUp className="w-5 h-5 text-profit mt-0.5" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive mt-0.5" />
              )}
              <div>
                <h4 className={`font-bold mb-1 ${
                  question.options[selectedOption!].isCorrect ? 'text-profit' : 'text-destructive'
                }`}>
                  {question.options[selectedOption!].isCorrect ? '✅ DECISÃO CORRETA!' : '❌ DECISÃO ERRADA!'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {question.options[selectedOption!].feedback}
                </p>
                
                <div className="mt-2 text-xs">
                  <span className="font-medium">
                    Moedas ganhas: +{question.options[selectedOption!].isCorrect ? '50' : '10'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          Baseado em dados reais do mercado brasileiro
        </div>
      </div>
    </GameLayout>
  )
}