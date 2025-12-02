import Router from './Router.tsx';
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global.ts';


function App() {
  return (
    <>
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
