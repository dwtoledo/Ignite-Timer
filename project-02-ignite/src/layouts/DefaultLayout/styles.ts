import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  background-color: ${(props) => props.theme['gray-200']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  max-width: 70rem;
`
