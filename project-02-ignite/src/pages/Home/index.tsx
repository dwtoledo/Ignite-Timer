import { Play } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
  MinutesAmountInput,
  PomodoroCountdownContainer,
  PomodoroCountdownDivider,
  PomodoroFormContainer,
  PomodoroInfoContainer,
  StartButtonContainer,
  TaskNameInput,
} from './styles'

export function Home() {
  const [taskName, setTaskName] = useState('')
  const [minutesAmount, setMinutesAmount] = useState(0)

  function handleNewTaskName(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value)
  }

  function handleNewMinutesAmount(event: ChangeEvent<HTMLInputElement>) {
    setMinutesAmount(parseInt(event.target.value))
  }

  function handlePomodoroFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(
      `Submit Pomodoro Form using Controlled Component > Task name is '${taskName}' and minutes amount is '${minutesAmount}'`,
    )
  }

  return (
    <PomodoroFormContainer onSubmit={handlePomodoroFormSubmit}>
      <PomodoroInfoContainer>
        <label htmlFor="task-name">I will work on</label>
        <TaskNameInput
          type="text"
          id="task-name"
          list="task-suggestions"
          placeholder="task name"
          onChange={handleNewTaskName}
          value={taskName}
        />

        <datalist id="task-suggestions">
          <option value="Task 1" />
          <option value="Task 2" />
          <option value="Task 3" />
        </datalist>

        <label htmlFor="minutes-amount">for</label>
        <MinutesAmountInput
          type="number"
          id="minutes-amount"
          placeholder="00"
          onChange={handleNewMinutesAmount}
          value={minutesAmount}
          min={5}
          max={60}
          step={5}
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
    </PomodoroFormContainer>
  )
}
