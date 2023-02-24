import { ButtonContainer } from './Button.styles'

export type ButtonVariants = 'green' | 'green-dark' | 'green-light' | 'red' | 'red-dark' | 'gray-100'

interface ButtonProps {
  variant?: ButtonVariants
}

export function Button({ variant = 'gray-100' }: ButtonProps) {
  return (
    <ButtonContainer variant={variant}>{variant}</ButtonContainer>
  )
}