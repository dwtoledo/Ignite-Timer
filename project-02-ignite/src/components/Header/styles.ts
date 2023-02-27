import styled from 'styled-components'

export const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 2.5rem;

  nav {
    align-items: center;
    display: flex;
    gap: 8px;

    a {
      align-items: center;
      display: flex;
      height: 48px;
      justify-content: center;
      width: 48px;
      color: ${(props) => props.theme['gray-700']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &.active {
        color: ${(props) => props.theme['green-dark']};
      }

      &:hover {
        color: ${(props) => props.theme['green-dark']};
        border-bottom: 3px solid ${(props) => props.theme['green-dark']};
      }
    }
  }
`
