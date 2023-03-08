import { useContext } from 'react'
import { ActivePomodoroCycleContext } from '../../contexts/ActiveCycleContextProvider'
import { formatDistanceToNow } from 'date-fns'
import {
  PomodoroHistoryContainer,
  PomodoroHistoryTable,
  TaskStatus,
} from './styles'

export function History() {
  const { cycleHistory } = useContext(ActivePomodoroCycleContext)
  console.log(cycleHistory)
  return (
    <PomodoroHistoryContainer>
      <h1>My history</h1>
      <PomodoroHistoryTable>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycleHistory.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.taskName}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {cycle.concludedDate && (
                      <TaskStatus statusColor={'completed'}>
                        Completed
                      </TaskStatus>
                    )}

                    {cycle.interruptedDate && (
                      <TaskStatus statusColor={'stopped'}>Stopped</TaskStatus>
                    )}

                    {!cycle.concludedDate && !cycle.interruptedDate && (
                      <TaskStatus statusColor={'inProgress'}>
                        In Progress
                      </TaskStatus>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </PomodoroHistoryTable>
    </PomodoroHistoryContainer>
  )
}
