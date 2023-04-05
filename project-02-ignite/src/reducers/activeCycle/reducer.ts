import { CycleReducerActionTypes } from './actions'

export interface Cycle {
  id: string
  minutesAmount: number
  name: string
  startDate: Date
  interruptedDate?: Date
  concludedDate?: Date
}

interface CycleReducerStates {
  activeCycleId: string | null
  activeCycleSecondsPassed: number
  cycles: Array<Cycle>
}

export const initialCycleReducerStates = {
  activeCycleId: null,
  activeCycleSecondsPassed: 0,
  cycles: [],
}

export function cyclesReducer(
  state: CycleReducerStates,
  action: CycleReducerActionTypes,
) {
  switch (action.type) {
    case 'ADD_NEW_CYCLE':
      if (action.payload?.newCycle) {
        return {
          activeCycleSecondsPassed: 0,
          activeCycleId: action.payload.newCycle.id,
          cycles: [...state.cycles, action.payload.newCycle],
        }
      } else {
        return state
      }

    case 'COMPLETE_CYCLE':
      return {
        activeCycleSecondsPassed: 0,
        activeCycleId: null,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, concludedDate: new Date() }
          } else {
            return cycle
          }
        }),
      }

    case 'INTERRUPT_CURRENT_CYCLE':
      return {
        activeCycleSecondsPassed: 0,
        activeCycleId: null,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
      }

    case 'UPDATE_SECONDS_PASSED':
      if (action.payload?.updatedSeconds) {
        return {
          ...state,
          activeCycleSecondsPassed: action.payload?.updatedSeconds,
        }
      } else {
        return state
      }

    default:
      return state
  }
}
