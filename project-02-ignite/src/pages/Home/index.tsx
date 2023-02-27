import { Play } from 'phosphor-react'
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
  return (
    <PomodoroFormContainer action="">
      <PomodoroInfoContainer>
        <label htmlFor="task-name">I will work on</label>
        <TaskNameInput
          type="text"
          id="task-name"
          list="task-suggestions"
          placeholder="task name"
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
