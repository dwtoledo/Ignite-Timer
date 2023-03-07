import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import * as zod from 'zod'

import { ActivePomodoroCycleContext } from '../..'

import {
  CycleNameInput,
  MinutesAmountInput,
  NewCycleFormContainer,
} from './styles'

const minutesAmountInputStep = 5
const minMinutesAmountInputValue = 5
const maxMinutesAmountInputValue = 60
const cycleNamePreDefinedOptions = ['Task 1', 'Task 2', 'Task 3']

export const NewCycleFormValidatorSchema = zod
  .object({
    cycleName: zod.string().min(1, 'Please inform a task name.'),
    minutesAmount: zod
      .number({
        invalid_type_error: 'Please inform a cycle duration.',
      })
      .positive('Negative cycle durations are not allowed.')
      .min(
        minMinutesAmountInputValue,
        `${minMinutesAmountInputValue.toString()} is the min cycle duration.`,
      )
      .max(
        maxMinutesAmountInputValue,
        `${maxMinutesAmountInputValue.toString()} is the max cycle duration.`,
      ),
  })
  .required()

export const NewCycleFormDefaultValues = {
  minutesAmount: minMinutesAmountInputValue,
  cycleName: '',
}

export function NewCycleForm() {
  const { register } = useFormContext()
  const { activeCycle } = useContext(ActivePomodoroCycleContext)
  const isCycleActive = !!activeCycle

  return (
    <NewCycleFormContainer>
      <label htmlFor="cycleName">I will work on</label>
      <CycleNameInput
        disabled={isCycleActive}
        type="text"
        id="cycleName"
        list="preDefinedCycleNameOptions"
        placeholder="cycle name"
        {...register('cycleName')}
      />

      <datalist id="preDefinedCycleNameOptions">
        {cycleNamePreDefinedOptions.map((preDefinedOption) => {
          return <option key={uuidv4()} value={preDefinedOption} />
        })}
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      <MinutesAmountInput
        disabled={isCycleActive}
        placeholder="00"
        type="number"
        id="minutesAmount"
        step={minutesAmountInputStep}
        min={minMinutesAmountInputValue}
        max={maxMinutesAmountInputValue}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />
      <span>minutes.</span>
    </NewCycleFormContainer>
  )
}
