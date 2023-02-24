import styled from "styled-components";
import { ButtonVariants } from "./Button";

interface ButtonContainerProps {
  variant: ButtonVariants
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 200px;
  height: 50px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme[props.variant]};
`