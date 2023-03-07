import styled from 'styled-components'

export const NewCycleFormContainer = styled.div`
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

export const MinutesAmountInput = styled(DefaultInput)`
  width: 74px;
`

export const CycleNameInput = styled(DefaultInput)`
  flex: 1;
`
