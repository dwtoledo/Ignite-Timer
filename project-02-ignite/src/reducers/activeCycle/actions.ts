import { Cycle } from './reducer'

interface CycleReducerDispatchPayloadModel {
  newCycle?: Cycle
  updatedSeconds?: number
}

export interface CycleReducerActionTypes {
  type:
    | 'COMPLETE_CYCLE'
    | 'INTERRUPT_CURRENT_CYCLE'
    | 'ADD_NEW_CYCLE'
    | 'UPDATE_SECONDS_PASSED'
  payload?: CycleReducerDispatchPayloadModel
}

export function completeCycleAction(): CycleReducerActionTypes {
  return {
    type: 'COMPLETE_CYCLE',
  }
}
export function interruptCurrentCycleAction(): CycleReducerActionTypes {
  return {
    type: 'INTERRUPT_CURRENT_CYCLE',
  }
}

export function addNewCycleAction(newCycle: Cycle): CycleReducerActionTypes {
  return {
    type: 'ADD_NEW_CYCLE',
    payload: {
      newCycle,
    },
  }
}

export function updateSecondsPassedAction(
  newValue: number,
): CycleReducerActionTypes {
  return {
    type: 'UPDATE_SECONDS_PASSED',
    payload: {
      updatedSeconds: newValue,
    },
  }
}
