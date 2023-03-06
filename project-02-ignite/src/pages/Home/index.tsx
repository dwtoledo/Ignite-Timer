import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'
import * as zod from 'zod'

import {
  FormErrorContainer,
  MinutesAmountInput,
  PomodoroCountdownContainer,
  PomodoroCountdownDivider,
  PomodoroFormContainer,
  PomodoroInfoContainer,
  StartButtonContainer,
  StopButtonContainer,
  TaskNameInput,
} from './styles'

interface PomodoroCycle {
  id: string
  minutesAmount: number
  taskName: string
  startDate: Date
  interruptedDate?: Date
  concludedDate?: Date
}

export function Home() {
  function updatePageTitleWithPrefix(prefix: string = '') {
    document.title = `${
      prefix.length ? prefix + ' - ' : prefix
    } Ignite Project 02 - @dwtoledo`
  }

  const pomodoroFormValidatorSchema = zod
    .object({
      taskName: zod.string().min(1, 'Please inform a task name.'),
      minutesAmount: zod
        .number({
          invalid_type_error: 'Please inform a cycle duration.',
        })
        .positive('Negative cycle durations are not allowed.')
        .min(1, '1 is the min cycle duration.')
        .max(60, '60 is the max cycle duration.'),
    })
    .required()

  type PomodoroFormData = zod.infer<typeof pomodoroFormValidatorSchema>

  const pomodoroFormDefaultValues = {
    minutesAmount: 1,
    taskName: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PomodoroFormData>({
    resolver: zodResolver(pomodoroFormValidatorSchema),
    defaultValues: pomodoroFormDefaultValues,
  })

  const [pomodoroCycles, setPomodoroCycles] = useState<Array<PomodoroCycle>>([])
  const [activePomodoroCycleId, setActivePomodoroCycleId] = useState<
    string | null
  >(null)
  const [
    activePomodoroCycleSecondsPassed,
    setActivePomodoroCycleSecondsPassed,
  ] = useState(0)

  function handlePomodoroFormSubmit(data: PomodoroFormData) {
    const newPomodoroCycle: PomodoroCycle = {
      id: uuidv4(),
      minutesAmount: data.minutesAmount,
      taskName: data.taskName,
      startDate: new Date(),
    }
    setPomodoroCycles((state) => [...state, newPomodoroCycle])
    setActivePomodoroCycleId(newPomodoroCycle.id)
    setActivePomodoroCycleSecondsPassed(0)
    reset()
  }

  const activePomodoroCycle = pomodoroCycles.find((pomodoroCycle) => {
    return pomodoroCycle.id === activePomodoroCycleId
  })

  const activePomodoroCycleSecondsAmount = activePomodoroCycle
    ? activePomodoroCycle.minutesAmount * 60
    : 0

  const activePomodoroCycleSecondsAmountRemaining = activePomodoroCycle
    ? activePomodoroCycleSecondsAmount - activePomodoroCycleSecondsPassed
    : 0

  const activePomodoroCycleMinutesRemaning = activePomodoroCycle
    ? String(
        Math.floor(activePomodoroCycleSecondsAmountRemaining / 60),
      ).padStart(2, '0')
    : '00'

  const activePomodoroCycleSecondsRemaning = activePomodoroCycle
    ? String(activePomodoroCycleSecondsAmountRemaining % 60).padStart(2, '0')
    : '00'

  if (activePomodoroCycle) {
    updatePageTitleWithPrefix(
      `${activePomodoroCycleMinutesRemaning}:${activePomodoroCycleSecondsRemaning} | ${activePomodoroCycle.taskName}`,
    )
  }

  function handleInterruptPomodoroCycle() {
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
    updatePageTitleWithPrefix()
  }

  useEffect(() => {
    let interval: number

    if (activePomodoroCycle) {
      interval = setInterval(() => {
        const differenceInSecondsFromStartDate = differenceInSeconds(
          new Date(),
          activePomodoroCycle.startDate,
        )
        const isPomodoroCycleConcluded =
          differenceInSecondsFromStartDate > activePomodoroCycleSecondsAmount

        if (isPomodoroCycleConcluded) {
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
          updatePageTitleWithPrefix()
        } else {
          setActivePomodoroCycleSecondsPassed(differenceInSecondsFromStartDate)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activePomodoroCycle, activePomodoroCycleSecondsAmount])

  return (
    <PomodoroFormContainer onSubmit={handleSubmit(handlePomodoroFormSubmit)}>
      <PomodoroInfoContainer>
        <label htmlFor="taskName">I will work on</label>
        <TaskNameInput
          disabled={!!activePomodoroCycle}
          type="text"
          id="taskName"
          list="task-suggestions"
          placeholder="task name"
          {...register('taskName')}
        />

        <datalist id="task-suggestions">
          <option value="Task 1" />
          <option value="Task 2" />
          <option value="Task 3" />
        </datalist>

        <label htmlFor="minutesAmount">for</label>
        <MinutesAmountInput
          disabled={!!activePomodoroCycle}
          placeholder="00"
          type="number"
          id="minutesAmount"
          step={1}
          min={1}
          max={60}
          {...register('minutesAmount', {
            valueAsNumber: true,
          })}
        />
        <span>minutes.</span>
      </PomodoroInfoContainer>

      <PomodoroCountdownContainer>
        <span>{activePomodoroCycleMinutesRemaning[0]}</span>
        <span>{activePomodoroCycleMinutesRemaning[1]}</span>
        <PomodoroCountdownDivider>:</PomodoroCountdownDivider>
        <span>{activePomodoroCycleSecondsRemaning[0]}</span>
        <span>{activePomodoroCycleSecondsRemaning[1]}</span>
      </PomodoroCountdownContainer>

      {activePomodoroCycle ? (
        <StopButtonContainer
          onClick={handleInterruptPomodoroCycle}
          type="button"
        >
          <HandPalm size={24} />
          Stop {activePomodoroCycle.taskName}
        </StopButtonContainer>
      ) : (
        <StartButtonContainer type="submit">
          <Play size={24} />
          Start
        </StartButtonContainer>
      )}

      {Object.keys(errors).length ? (
        <FormErrorContainer>
          {Object.keys(errors).map((fieldError) => {
            return (
              <p key={fieldError}>
                {errors[fieldError as keyof PomodoroFormData]?.message}
              </p>
            )
          })}
        </FormErrorContainer>
      ) : (
        <div></div>
      )}
    </PomodoroFormContainer>
  )
}
