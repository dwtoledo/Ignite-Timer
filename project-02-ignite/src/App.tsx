import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'

import { defaultTheme } from './assets/styles/themes/default'
import { GlobalStyle } from './assets/styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}
