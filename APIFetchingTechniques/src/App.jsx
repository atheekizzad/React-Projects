import Joke from "./components/Joke";
import QuotesS from "./components/QuotesS";
import Dogs from "./components/Dogs";
import Cat from "./components/Cat";
import styled from "styled-components";

function App() {
  const Body = styled.div`
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #272020;
    color: #fff;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const ContentWrapper = styled.div`
    max-width: 1280px;
    width: 100%;
  `;

  const Header = styled.h1`
    text-align: center;
    margin-bottom: 50px;
    font-size: 2rem;
    color: #ff4d94;
    line-height: 1.4;
  `;

  const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 50px;
    justify-content: center;
    align-items: stretch;
  `;

  return (
    <Body>
      <ContentWrapper>
        <Header>
          Jokes, Quotes & Cat ,Dog Image Preview <br /> Powered by React & APIs
        </Header>
        <GridContainer>
          <Joke />
          <QuotesS />
          <Dogs />
          <Cat />
        </GridContainer>
      </ContentWrapper>
    </Body>
  );
}

export default App;
