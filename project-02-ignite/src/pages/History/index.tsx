import { useContext, useEffect } from 'react'
import { ActiveCycleContext, resetPageTitle } from '../../contexts/activeCycle'

import { formatDistanceToNow } from 'date-fns'

import { HistoryContainer, HistoryTable, CycleStatus } from './styles'

export function History() {
  const { cycleHistory } = useContext(ActiveCycleContext)

  useEffect(() => {
    resetPageTitle()
  }, [])

  return (
    <HistoryContainer>
      <h1>My history</h1>
      <HistoryTable>
        <table>
          <thead>
            <tr>
              <th>Cycle</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!cycleHistory.length ? (
              <tr>
                <td colSpan={4}>No cycles created yet</td>
              </tr>
            ) : (
              cycleHistory.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.name}</td>
                    <td>{cycle.minutesAmount} minutes</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true,
                      })}
                    </td>
                    <td>
                      {cycle.concludedDate && (
                        <CycleStatus statusColor={'completed'}>
                          Completed
                        </CycleStatus>
                      )}

                      {cycle.interruptedDate && (
                        <CycleStatus statusColor={'stopped'}>
                          Stopped
                        </CycleStatus>
                      )}

                      {!cycle.concludedDate && !cycle.interruptedDate && (
                        <CycleStatus statusColor={'inProgress'}>
                          In Progress
                        </CycleStatus>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </HistoryTable>
    </HistoryContainer>
  )
}
