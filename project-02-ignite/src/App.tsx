
import { Button } from './components/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './assets/styles/themes/default'

import './reset.css'
import { GlobalStyle } from './assets/styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant='error'/>
      <Button variant='info'/>
      <Button variant='success'/>
      <Button variant='warning'/>
      <Button />
      <GlobalStyle/>
    </ThemeProvider>
  )
}
