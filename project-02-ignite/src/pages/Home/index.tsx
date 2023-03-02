import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PomodoroFormData>({
    resolver: zodResolver(pomodoroFormValidatorSchema),
  })

  function handlePomodoroFormSubmit(data: PomodoroFormData) {
    console.log('Submit Pomodoro Form:', data)
  }

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
          type="number"
          id="minutesAmount"
          step={5}
          min={5}
          max={60}
          {...register('minutesAmount', {
            valueAsNumber: true,
            max: 60,
            min: 5,
            value: 5,
          })}
        />
        <span>minutes.</span>
      </PomodoroInfoContainer>

      <PomodoroCountdownContainer>
        <span>0</span>
        <span>0</span>
        <PomodoroCountdownDivider>:</PomodoroCountdownDivider>
        <span>0</span>
        <span>0</span>
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
