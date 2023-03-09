import { createContext, ReactNode, useReducer, useState } from 'react'
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

interface reducerDispatchPayload {
  newCycle: PomodoroCycle
}

interface reducerDispatchModel {
  type: 'COMPLETE_CYCLE' | 'INTERRUPT_CYCLE' | 'CREATE_NEW_CYCLE'
  payload?: reducerDispatchPayload
}

export const ActivePomodoroCycleContext = createContext(
  {} as ActivePomodoroCycleContextModel,
)

export function ActiveCycleContextProvider({
  children,
}: ActiveCycleContextProviderProps) {
  const [pomodoroCycles, dispatch] = useReducer(reducer, [])

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

  function reducer(state: Array<PomodoroCycle>, action: reducerDispatchModel) {
    if (action.type === 'CREATE_NEW_CYCLE' && action.payload?.newCycle) {
      return [...state, action.payload?.newCycle]
    }
    if (action.type === 'COMPLETE_CYCLE') {
      return state.map((pomodoroCycle) => {
        if (pomodoroCycle.id === activePomodoroCycle?.id) {
          return { ...pomodoroCycle, concludedDate: new Date() }
        } else {
          return pomodoroCycle
        }
      })
    }
    if (action.type === 'INTERRUPT_CYCLE') {
      return state.map((pomodoroCycle) => {
        if (pomodoroCycle.id === activePomodoroCycle?.id) {
          return { ...pomodoroCycle, interruptedDate: new Date() }
        } else {
          return pomodoroCycle
        }
      })
    }
    return state
  }

  function completeCycle() {
    dispatch({
      type: 'COMPLETE_CYCLE',
    } as reducerDispatchModel)

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

    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle: newPomodoroCycle,
      },
    } as reducerDispatchModel)

    setActivePomodoroCycleId(newPomodoroCycle.id)
    setActivePomodoroCycleSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
    } as reducerDispatchModel)

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
