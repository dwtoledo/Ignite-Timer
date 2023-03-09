import { createContext, ReactNode, useReducer } from 'react'
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

interface ReducerStates {
  pomodoroCycles: Array<PomodoroCycle>
  activePomodoroCycleId: string | null
  activePomodoroCycleSecondsPassed: number
}

interface ReducerDispatchPayload {
  newCycle?: PomodoroCycle
  updatedSeconds?: number
}

interface ReducerDispatchModel {
  type:
    | 'COMPLETE_CYCLE'
    | 'INTERRUPT_CYCLE'
    | 'CREATE_NEW_CYCLE'
    | 'UPDATE_SECONDS_PASSED'
  payload?: ReducerDispatchPayload
}

export const ActivePomodoroCycleContext = createContext(
  {} as ActivePomodoroCycleContextModel,
)

export function ActiveCycleContextProvider({
  children,
}: ActiveCycleContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    pomodoroCycles: [],
    activePomodoroCycleId: null,
    activePomodoroCycleSecondsPassed: 0,
  })

  function reducer(state: ReducerStates, action: ReducerDispatchModel) {
    if (action.type === 'CREATE_NEW_CYCLE' && action.payload?.newCycle) {
      return {
        activePomodoroCycleSecondsPassed: 0,
        activePomodoroCycleId: action.payload.newCycle.id,
        pomodoroCycles: [...state.pomodoroCycles, action.payload.newCycle],
      }
    }

    if (action.type === 'COMPLETE_CYCLE') {
      return {
        activePomodoroCycleSecondsPassed: 0,
        activePomodoroCycleId: null,
        pomodoroCycles: state.pomodoroCycles.map((cycle) => {
          if (cycle.id === state.activePomodoroCycleId) {
            return { ...cycle, concludedDate: new Date() }
          } else {
            return cycle
          }
        }),
      }
    }

    if (action.type === 'INTERRUPT_CYCLE') {
      return {
        activePomodoroCycleSecondsPassed: 0,
        activePomodoroCycleId: null,
        pomodoroCycles: state.pomodoroCycles.map((cycle) => {
          if (cycle.id === state.activePomodoroCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
      }
    }

    if (
      action.type === 'UPDATE_SECONDS_PASSED' &&
      action.payload?.updatedSeconds
    ) {
      return {
        ...state,
        activePomodoroCycleSecondsPassed: action.payload.updatedSeconds,
      }
    }

    return state
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
    })
  }

  function completeCycle() {
    dispatch({
      type: 'COMPLETE_CYCLE',
    })
    resetPageTitle()
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
    })
    resetPageTitle()
  }

  function onSecondsPassedChange(newValue: number) {
    dispatch({
      type: 'UPDATE_SECONDS_PASSED',
      payload: {
        updatedSeconds: newValue,
      },
    })
  }

  function resetPageTitle() {
    document.title = 'Ignite Project 02 - @dwtoledo'
  }

  const activePomodoroCycle = state.pomodoroCycles.find((cycle) => {
    return cycle.id === state.activePomodoroCycleId
  })

  return (
    <ActivePomodoroCycleContext.Provider
      value={{
        cycleHistory: state.pomodoroCycles,
        activeCycle: activePomodoroCycle,
        secondsPassed: state.activePomodoroCycleSecondsPassed,
        onComplete: completeCycle,
        onSecondsPassedChange,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </ActivePomodoroCycleContext.Provider>
  )
}
