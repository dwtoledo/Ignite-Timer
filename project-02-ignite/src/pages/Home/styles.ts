import styled from 'styled-components'

export const PomodoroFormContainer = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`

export const PomodoroInfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;

  label,
  span {
    font-size: 1.125rem;
    font-weight: 700;
  }
`

const DefaultInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme['gray-400']};
  color: ${(props) => props.theme['gray-700']};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme['gray-400']};
    text-align: center;
  }
`

export const TaskNameInput = styled(DefaultInput)`
  flex: 1;
`

export const MinutesAmountInput = styled(DefaultInput)`
  width: 74px;
`

const BaseButtonContainer = styled.button`
  cursor: pointer;
  align-items: center;
  border: none;
  border-radius: 8px;
  box-shadow: none;
  color: ${(props) => props.theme['gray-700']};
  display: flex;
  font-weight: 700;
  gap: 8px;
  justify-content: center;
  max-width: 250px;
  padding: 1.25rem;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

export const StartButtonContainer = styled(BaseButtonContainer)`
  background-color: ${(props) => props.theme.green};

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background-color: ${(props) => props.theme['green-dark']};
  }
`

export const StopButtonContainer = styled(BaseButtonContainer)`
  background-color: ${(props) => props.theme.red};

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background-color: ${(props) => props.theme['red-dark']};
  }
`

export const PomodoroCountdownDivider = styled.div`
  color: ${(props) => props.theme.green};
  font-family: 'Ubuntu Mono', monospace;
  font-size: 10rem;
  font-weight: 700;
  line-height: 1;
`
export const PomodoroCountdownContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;

  span {
    background-color: ${(props) => props.theme['gray-300']};
    border-radius: 8px;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 10rem;
    font-weight: 700;
    line-height: 1;
    padding: 1rem;
  }

  @media (max-width: 715px) {
    span,
    div {
      font-size: 5rem;
    }
  }

  @media (max-width: 500px) {
    span,
    div {
      font-size: 2.5rem;
    }
  }
`

export const FormErrorContainer = styled.div`
  background-color: ${(props) => props.theme['red-dark']};
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
`
