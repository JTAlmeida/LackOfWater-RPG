import styled from 'styled-components';
import bg from '../assets/images/bg.jpg';

export default styled.div`
  height: auto;
  min-height: 100vh;
  width: 100%;
  color: #add8e6;
  padding-top: 10px;
  padding-bottom: 20px;
  font-size: 24px;

  background-color: black;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    height: 100px;
    margin-bottom: 10px;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 22px;
    width: 70%;
    height: 75%;
    padding: 20px;
    border: 1px solid white;
    border-radius: 20px;
    margin-bottom: 20px;

    p {
      margin-bottom: 20px;
    }
  }

  > div > div {
    display: flex;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    gap: 10px;
  }

  @media (max-width: 600px) {
    min-height: 100vh;
    height: auto;
    max-height: initial;
    min-width: 100%;
    max-width: initial;
    font-size: 20px;

    > div {
      width: 90%;
    }
    > div > div {
      justify-content: center;
    }
  }
`;
