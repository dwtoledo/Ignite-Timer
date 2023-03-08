import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  NewCycleForm,
  NewCycleFormDefaultValues,
  NewCycleFormValidatorSchema,
} from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  FormErrorContainer,
  PomodoroFormContainer,
  StartButtonContainer,
  StopButtonContainer,
} from './styles'
import { useContext } from 'react'
import { ActivePomodoroCycleContext } from '../../contexts/ActiveCycleContextProvider'

type NewCycleFormData = zod.infer<typeof NewCycleFormValidatorSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(
    ActivePomodoroCycleContext,
  )

  const NewCycleFormContext = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidatorSchema),
    defaultValues: NewCycleFormDefaultValues,
  })

  function handleNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    NewCycleFormContext.reset()
  }

  function handleInterruptCurrentCycle() {
    interruptCurrentCycle()
  }

  return (
    <PomodoroFormContainer
      onSubmit={NewCycleFormContext.handleSubmit(handleNewCycle)}
    >
      <FormProvider {...NewCycleFormContext}>
        <NewCycleForm />
      </FormProvider>

      <Countdown />

      {activeCycle ? (
        <StopButtonContainer
          onClick={handleInterruptCurrentCycle}
          type="button"
        >
          <HandPalm size={24} />
          Stop {activeCycle.taskName}
        </StopButtonContainer>
      ) : (
        <StartButtonContainer type="submit">
          <Play size={24} />
          Start
        </StartButtonContainer>
      )}

      {Object.keys(NewCycleFormContext.formState.errors).length ? (
        <FormErrorContainer>
          {Object.keys(NewCycleFormContext.formState.errors).map(
            (fieldError) => {
              return (
                <p key={uuidv4()}>
                  {
                    NewCycleFormContext.formState.errors[
                      fieldError as keyof NewCycleFormData
                    ]?.message
                  }
                </p>
              )
            },
          )}
        </FormErrorContainer>
      ) : (
        <div></div>
      )}
    </PomodoroFormContainer>
  )
}
