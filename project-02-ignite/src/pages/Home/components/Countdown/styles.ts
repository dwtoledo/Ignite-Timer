import styled from 'styled-components'

export const CountdownContainer = styled.div`
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

export const CountdownDivider = styled.div`
  color: ${(props) => props.theme.green};
  font-family: 'Ubuntu Mono', monospace;
  font-size: 10rem;
  font-weight: 700;
  line-height: 1;
`
