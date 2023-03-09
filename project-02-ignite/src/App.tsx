import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'

import { defaultTheme } from './assets/styles/themes/default'
import { GlobalStyle } from './assets/styles/global'
import { ActiveCycleContextProvider } from './contexts/activeCycle'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ActiveCycleContextProvider>
        <RouterProvider router={routes} />
      </ActiveCycleContextProvider>
    </ThemeProvider>
  )
}
