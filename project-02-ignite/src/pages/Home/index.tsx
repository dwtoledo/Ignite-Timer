import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { Play } from 'phosphor-react'
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
  TaskNameInput,
} from './styles'

interface PomodoroCycle {
  id: string
  minutesAmount: number
  taskName: string
  startDate: Date
}

export function Home() {
  const pomodoroFormValidatorSchema = zod
    .object({
      taskName: zod.string().min(1, 'Please inform a task name.'),
      minutesAmount: zod
        .number({
          invalid_type_error: 'Please inform a cycle duration.',
        })
        .positive('Negative cycle durations are not allowed.')
        .min(5, '5 is the min cycle duration.')
        .max(60, '60 is the max cycle duration.'),
    })
    .required()

  type PomodoroFormData = zod.infer<typeof pomodoroFormValidatorSchema>

  const pomodoroFormDefaultValues = {
    minutesAmount: 5,
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

  useEffect(() => {
    let interval: number

    if (activePomodoroCycle) {
      interval = setInterval(() => {
        setActivePomodoroCycleSecondsPassed(
          differenceInSeconds(new Date(), activePomodoroCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activePomodoroCycle])

  const activePomodoroCycleSecondsAmount = activePomodoroCycle
    ? activePomodoroCycle.minutesAmount * 60
    : 0

  const activePomodoroCycleSecondsAmountRemaining = activePomodoroCycle
    ? activePomodoroCycleSecondsAmount - activePomodoroCycleSecondsPassed
    : 0

  const activePomodoroCycleMinutesRemaning = activePomodoroCycle
    ? Math.floor(activePomodoroCycleSecondsAmountRemaining / 60)
    : 0

  const activePomodoroCycleSecondsRemaning = activePomodoroCycle
    ? activePomodoroCycleSecondsAmountRemaining % 60
    : 0

  return (
    <PomodoroFormContainer onSubmit={handleSubmit(handlePomodoroFormSubmit)}>
      <PomodoroInfoContainer>
        <label htmlFor="taskName">I will work on</label>
        <TaskNameInput
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
          placeholder="00"
          type="number"
          id="minutesAmount"
          step={5}
          min={5}
          max={60}
          {...register('minutesAmount', {
            valueAsNumber: true,
          })}
        />
        <span>minutes.</span>
      </PomodoroInfoContainer>

      <PomodoroCountdownContainer>
        <span>
          {String(activePomodoroCycleMinutesRemaning).padStart(2, '0')[0]}
        </span>
        <span>
          {String(activePomodoroCycleMinutesRemaning).padStart(2, '0')[1]}
        </span>
        <PomodoroCountdownDivider>:</PomodoroCountdownDivider>
        <span>
          {String(activePomodoroCycleSecondsRemaning).padStart(2, '0')[0]}
        </span>
        <span>
          {String(activePomodoroCycleSecondsRemaning).padStart(2, '0')[1]}
        </span>
      </PomodoroCountdownContainer>

      <StartButtonContainer type="submit">
        <Play size={24} />
        Start
      </StartButtonContainer>

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
