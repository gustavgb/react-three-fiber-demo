import React from 'react'
import ThreeView from './ThreeView'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

const Main = styled.main`
  background-color: #222;
  width: 100%;
  height: 100%;
  padding: 5vw;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
  background-color: white;
`

export default function App() {
  return (
    <Main>
      <GlobalStyle />
      <Container>
        <ThreeView />
      </Container>
    </Main>
  )
}
