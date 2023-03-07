import { useContext } from 'react'
import { ActivePomodoroCycleContext } from '../..'
import { CountdownContainer, CountdownDivider } from './styles'

export function Countdown() {
  const { activeCycle, secondsPassed } = useContext(ActivePomodoroCycleContext)

  const cycleSecondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const cycleSecondsRemaining = activeCycle
    ? cycleSecondsAmount - secondsPassed
    : 0
  const minutes = activeCycle ? cycleSecondsRemaining / 60 : 0
  const seconds = activeCycle ? cycleSecondsRemaining % 60 : 0
  const minutesFormatted = String(Math.floor(minutes)).padStart(2, '0')
  const secondsFormatted = String(seconds).padStart(2, '0')

  if (activeCycle) {
    document.title = `
    ${minutesFormatted}:${secondsFormatted} | ${activeCycle.taskName} 
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
