import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useContext } from 'react'
import { ActiveCycleContext } from '../../contexts/activeCycle'
import { Countdown } from './components/Countdown'

import {
  NewCycleForm,
  NewCycleFormDefaultValues,
  NewCycleFormValidatorSchema,
} from './components/NewCycleForm'

import {
  FormErrorContainer,
  FormContainer,
  StartButtonContainer,
  StopButtonContainer,
} from './styles'

type NewCycleFormData = zod.infer<typeof NewCycleFormValidatorSchema>

export function Home() {
  const { activeCycle, addNewCycle, interruptCurrentCycle } =
    useContext(ActiveCycleContext)

  const NewCycleFormContext = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidatorSchema),
    defaultValues: NewCycleFormDefaultValues,
  })

  function handleNewCycle(data: NewCycleFormData) {
    addNewCycle(data)
    NewCycleFormContext.reset()
  }

  function handleInterruptCurrentCycle() {
    interruptCurrentCycle()
  }

  return (
    <FormContainer onSubmit={NewCycleFormContext.handleSubmit(handleNewCycle)}>
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
          Stop {activeCycle.name}
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
    </FormContainer>
  )
}
