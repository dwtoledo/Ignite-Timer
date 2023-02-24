import { Button } from './components/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './assets/styles/themes/default'

import { GlobalStyle } from './assets/styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <Button variant="red" />
      <Button variant="red-dark" />
      <Button variant="green" />
      <Button variant="green-dark" />
      <Button variant="green-light" />
      <Button />
    </ThemeProvider>
  )
}
