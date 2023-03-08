import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CountdownContainer, CountdownDivider } from './styles'
import { ActivePomodoroCycleContext } from '../../../../contexts/ActiveCycleContextProvider'

export function Countdown() {
  const { activeCycle, secondsPassed, onComplete, onSecondsPassedChange } =
    useContext(ActivePomodoroCycleContext)

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

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const cycleSecondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (cycleSecondsPassed > cycleSecondsAmount) {
          onComplete()
        } else {
          onSecondsPassedChange(cycleSecondsPassed)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, cycleSecondsAmount, onComplete, onSecondsPassedChange])

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
