import { create } from 'zustand'

interface UserData {
  age: number
  salary: number
  investment: number
}

interface GameState {
  // Navigation
  currentStep: number
  totalSteps: number
  
  // User Data
  userData: UserData
  
  // Gamification
  coins: number
  simulatedBalance: number
  initialBalance: number
  
  // Quiz Progress
  quizAnswers: Record<string, any>
  correctAnswers: number
  totalQuestions: number
  
  // Roulette Prize
  roulettePrize: string | null
  
  // Timer
  offerExpiresAt: Date | null
  
  // Actions
  nextStep: () => void
  goToStep: (step: number) => void
  addCoins: (amount: number) => void
  updateBalance: (amount: number) => void
  setUserData: (data: Partial<UserData>) => void
  addQuizAnswer: (questionId: string, answer: any, isCorrect: boolean) => void
  setRoulettePrize: (prize: string) => void
  spendCoins: (amount: number) => void
  startOfferTimer: (minutes: number) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  currentStep: 1,
  totalSteps: 6,
  
  userData: {
    age: 0,
    salary: 0,
    investment: 0
  },
  
  coins: 0,
  simulatedBalance: 10000, // Initial R$10.000
  initialBalance: 10000,
  
  quizAnswers: {},
  correctAnswers: 0,
  totalQuestions: 0,
  
  roulettePrize: null,
  offerExpiresAt: null,
  
  // Actions
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, state.totalSteps) 
  })),
  
  goToStep: (step: number) => set((state) => ({ 
    currentStep: Math.max(1, Math.min(step, state.totalSteps)) 
  })),
  
  addCoins: (amount: number) => set((state) => ({ 
    coins: state.coins + amount 
  })),
  
  updateBalance: (amount: number) => set((state) => ({ 
    simulatedBalance: state.simulatedBalance + amount 
  })),
  
  setUserData: (data: Partial<UserData>) => set((state) => ({ 
    userData: { ...state.userData, ...data } 
  })),
  
  addQuizAnswer: (questionId: string, answer: any, isCorrect: boolean) => set((state) => ({
    quizAnswers: { ...state.quizAnswers, [questionId]: answer },
    correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
    totalQuestions: state.totalQuestions + 1
  })),
  
  setRoulettePrize: (prize: string) => set({ roulettePrize: prize }),
  
  spendCoins: (amount: number) => set((state) => ({ 
    coins: Math.max(0, state.coins - amount) 
  })),
  
  startOfferTimer: (minutes: number) => set({
    offerExpiresAt: new Date(Date.now() + minutes * 60 * 1000)
  }),
  
  resetGame: () => set({
    currentStep: 1,
    userData: { age: 0, salary: 0, investment: 0 },
    coins: 0,
    simulatedBalance: 10000,
    quizAnswers: {},
    correctAnswers: 0,
    totalQuestions: 0,
    roulettePrize: null,
    offerExpiresAt: null
  })
}))