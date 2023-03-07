import { useContext } from 'react'
import { ActivePomodoroCycleContext } from '../..'

import { CountdownContainer, CountdownDivider } from './styles'

export function Countdown() {
  const { cycle, secondsPassed } = useContext(ActivePomodoroCycleContext)

  const cycleSecondsAmount = cycle ? cycle.minutesAmount * 60 : 0
  const cycleSecondsRemaining = cycle ? cycleSecondsAmount - secondsPassed : 0
  const minutes = cycle ? cycleSecondsRemaining / 60 : 0
  const seconds = cycle ? cycleSecondsRemaining % 60 : 0
  const minutesFormatted = String(Math.floor(minutes)).padStart(2, '0')
  const secondsFormatted = String(seconds).padStart(2, '0')

  if (cycle) {
    document.title = `
    ${minutesFormatted}:${secondsFormatted} | ${cycle.taskName} 
    - Ignite Timer by @dwtoledo`
  }

  return (
    <CountdownContainer>
      <span>{minutesFormatted[0]}</span>
      <span>{minutesFormatted[1]}</span>
      <CountdownDivider>:</CountdownDivider>
      <span>{secondsFormatted[0]}</span>
      <span>{secondsFormatted[1]}</span>
    </CountdownContainer>
  )
}
