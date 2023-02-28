import {
  PomodoroHistoryContainer,
  PomodoroHistoryTable,
  TaskStatus,
} from './styles'

export function History() {
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
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>1h ago</td>
              <td>
                <TaskStatus statusColor={'completed'}>Completed</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>1h ago</td>
              <td>
                <TaskStatus statusColor={'completed'}>Completed</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>1h ago</td>
              <td>
                <TaskStatus statusColor={'completed'}>Completed</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>1h ago</td>
              <td>
                <TaskStatus statusColor={'completed'}>Completed</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>1h ago</td>
              <td>
                <TaskStatus statusColor={'completed'}>Completed</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>1h ago</td>
              <td>
                <TaskStatus statusColor={'inProgress'}>In Progress</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>25 minutes</td>
              <td>1h ago</td>
              <td>
                <TaskStatus statusColor={'stopped'}>Stopped</TaskStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </PomodoroHistoryTable>
    </PomodoroHistoryContainer>
  )
}
