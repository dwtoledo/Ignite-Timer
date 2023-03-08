import { createContext, ReactNode, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface ActiveCycleContextProviderProps {
  children: ReactNode
}

interface NewPomodoroCycleModel {
  minutesAmount: number
  cycleName: string
}

interface PomodoroCycle {
  id: string
  minutesAmount: number
  name: string
  startDate: Date
  interruptedDate?: Date
  concludedDate?: Date
}

interface ActivePomodoroCycleContextModel {
  cycleHistory: Array<PomodoroCycle>
  activeCycle: PomodoroCycle | undefined
  secondsPassed: number
  onComplete: () => void
  onSecondsPassedChange: (newValue: number) => void
  createNewCycle: (newCycle: NewPomodoroCycleModel) => void
  interruptCurrentCycle: () => void
}

export const ActivePomodoroCycleContext = createContext(
  {} as ActivePomodoroCycleContextModel,
)

export function ActiveCycleContextProvider({
  children,
}: ActiveCycleContextProviderProps) {
  const [pomodoroCycles, setPomodoroCycles] = useState<Array<PomodoroCycle>>([])
  const [activePomodoroCycleId, setActivePomodoroCycleId] = useState<
    string | null
  >(null)
  const [
    activePomodoroCycleSecondsPassed,
    setActivePomodoroCycleSecondsPassed,
  ] = useState(0)

  const activePomodoroCycle = pomodoroCycles.find((pomodoroCycle) => {
    return pomodoroCycle.id === activePomodoroCycleId
  })

  function completeCycle() {
    setPomodoroCycles((state) =>
      state.map((pomodoroCycle) => {
        if (pomodoroCycle.id === activePomodoroCycle?.id) {
          return { ...pomodoroCycle, concludedDate: new Date() }
        } else {
          return pomodoroCycle
        }
      }),
    )
    setActivePomodoroCycleId(null)
    setActivePomodoroCycleSecondsPassed(0)
    resetPageTitle()
  }

  function createNewCycle(data: NewPomodoroCycleModel) {
    const newPomodoroCycle: PomodoroCycle = {
      id: uuidv4(),
      minutesAmount: data.minutesAmount,
      name: data.cycleName,
      startDate: new Date(),
    }
    setPomodoroCycles((state) => [...state, newPomodoroCycle])
    setActivePomodoroCycleId(newPomodoroCycle.id)
    setActivePomodoroCycleSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    setPomodoroCycles((state) =>
      state.map((pomodoroCycle) => {
        if (pomodoroCycle.id === activePomodoroCycle?.id) {
          return { ...pomodoroCycle, interruptedDate: new Date() }
        } else {
          return pomodoroCycle
        }
      }),
    )
    setActivePomodoroCycleId(null)
    setActivePomodoroCycleSecondsPassed(0)
    resetPageTitle()
  }

  function updateSecondsPassed(newValue: number) {
    setActivePomodoroCycleSecondsPassed(newValue)
  }

  function resetPageTitle() {
    document.title = 'Ignite Project 02 - @dwtoledo'
  }

  return (
    <ActivePomodoroCycleContext.Provider
      value={{
        cycleHistory: pomodoroCycles,
        activeCycle: activePomodoroCycle,
        secondsPassed: activePomodoroCycleSecondsPassed,
        onComplete: completeCycle,
        onSecondsPassedChange: updateSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </ActivePomodoroCycleContext.Provider>
  )
}
