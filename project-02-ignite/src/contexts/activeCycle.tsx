import { createContext, ReactNode, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  cyclesReducer,
  initialCycleReducerStates,
  Cycle,
} from '../reducers/activeCycles'

interface ActiveCycleContextProviderProps {
  children: ReactNode
}

interface NewCycleModel {
  minutesAmount: number
  cycleName: string
}

interface ActiveCycleContextModel {
  cycleHistory: Array<Cycle>
  activeCycle: Cycle | undefined
  secondsPassed: number
  onComplete: () => void
  onSecondsPassedChange: (newValue: number) => void
  createNewCycle: (newCycle: NewCycleModel) => void
  interruptCurrentCycle: () => void
}

export const ActiveCycleContext = createContext({} as ActiveCycleContextModel)

export function ActiveCycleContextProvider({
  children,
}: ActiveCycleContextProviderProps) {
  const [state, dispatch] = useReducer(cyclesReducer, initialCycleReducerStates)

  function createNewCycle(data: NewCycleModel) {
    const newCycle: Cycle = {
      id: uuidv4(),
      minutesAmount: data.minutesAmount,
      name: data.cycleName,
      startDate: new Date(),
    }

    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle,
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

  const activeCycle = state.cycles.find((cycle) => {
    return cycle.id === state.activeCycleId
  })

  return (
    <ActiveCycleContext.Provider
      value={{
        cycleHistory: state.cycles,
        activeCycle,
        secondsPassed: state.activeCycleSecondsPassed,
        onComplete: completeCycle,
        onSecondsPassedChange,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </ActiveCycleContext.Provider>
  )
}
