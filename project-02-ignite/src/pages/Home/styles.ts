import styled from 'styled-components'

export const FormContainer = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
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

export const FormErrorContainer = styled.div`
  background-color: ${(props) => props.theme['red-dark']};
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
`
