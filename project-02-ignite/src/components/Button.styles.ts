import styled, { css } from "styled-components";
import { ButtonVariants } from "./Button";

interface ButtonContainerProps {
  variant: ButtonVariants
}

enum BackgroundColorForButtonVariants {
  success = 'green',
  warning = 'orange',
  error = 'red',
  info = 'gray'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 200px;
  height: 50px;
  color: white;

  ${(props) => {
    return css`
      background-color: ${BackgroundColorForButtonVariants[props.variant]};
    `
  }}
`