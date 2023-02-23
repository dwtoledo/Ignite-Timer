import { ButtonContainer } from './Button.styles'

export type ButtonVariants = 'success' | 'warning' | 'error' | 'info'

interface ButtonProps {
  variant?: ButtonVariants
}

export function Button({ variant = 'info' }: ButtonProps) {
  return (
    <ButtonContainer variant={variant}>{variant}</ButtonContainer>
  )
}