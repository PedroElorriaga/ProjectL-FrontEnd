import Router from './Router.tsx';
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global.ts';
import { MainLayoutContainer } from './style.ts';


function App() {
  return (
    <>
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <BrowserRouter>
          <MainLayoutContainer>
            <Router />
          </MainLayoutContainer>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
