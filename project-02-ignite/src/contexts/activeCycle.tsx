import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  cyclesReducer,
  initialCycleReducerStates,
  Cycle,
} from '../reducers/activeCycle/reducer'

import {
  completeCycleAction,
  addNewCycleAction,
  interruptCurrentCycleAction,
  updateSecondsPassedAction,
} from '../reducers/activeCycle/actions'

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
  completeCycle: () => void
  updateSecondsPassed: (newValue: number) => void
  addNewCycle: (newCycle: NewCycleModel) => void
  interruptCurrentCycle: () => void
}

export const ActiveCycleContext = createContext({} as ActiveCycleContextModel)

export function resetPageTitle() {
  document.title = 'Ignite Project 02 - @dwtoledo'
}

export function ActiveCycleContextProvider({
  children,
}: ActiveCycleContextProviderProps) {
  const [state, dispatch] = useReducer(
    cyclesReducer,
    initialCycleReducerStates,
    (initialState) => {
      const storedStateJSON = localStorage.getItem(
        '@ignite-project-02:cycle-state-1.0.0',
      )
      if (storedStateJSON) {
        return JSON.parse(storedStateJSON)
      }
      return initialState
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(state)
    localStorage.setItem('@ignite-project-02:cycle-state-1.0.0', stateJSON)
  }, [state])

  function createNewCycle(data: NewCycleModel): Cycle {
    return {
      id: uuidv4(),
      minutesAmount: data.minutesAmount,
      name: data.cycleName,
      startDate: new Date(),
    }
  }

  function addNewCycle(data: NewCycleModel) {
    dispatch(addNewCycleAction(createNewCycle(data)))
  }

  function completeCycle() {
    dispatch(completeCycleAction())
    resetPageTitle()
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
    resetPageTitle()
  }

  function updateSecondsPassed(newValue: number) {
    dispatch(updateSecondsPassedAction(newValue))
  }

  const activeCycle = state.cycles.find((cycle) => {
    return cycle.id === state.activeCycleId
  })

  return (
    <ActiveCycleContext.Provider
      value={{
        activeCycle,
        cycleHistory: state.cycles,
        secondsPassed: state.activeCycleSecondsPassed,
        completeCycle,
        updateSecondsPassed,
        addNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </ActiveCycleContext.Provider>
  )
}
