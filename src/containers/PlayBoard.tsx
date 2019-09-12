import React from "react";
import styled from "styled-components";
import { Board, Score } from "../components/";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 90vh;
  height: 100vh;
`;

type IProps = {};

type IState = {
  turn: number;
  stones: number[][];
  puttableSquares: number[][];
  lastSquare: number[];
  blackNum: number;
  whiteNum: number;
};

const initialState = {
  turn: 1,
  stones: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  puttableSquares: [[4, 2], [5, 3], [2, 4], [3, 5]],
  lastSquare: [],
  blackNum: 2,
  whiteNum: 2
};

class PlayBoard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  updateState(turn: number, stones: number[][], puttableSquares: number[][], lastSquare: number[]) {
    // 石の数を数えておく
    let blackNum = 0;
    let whiteNum = 0;
    stones.forEach(stoneNums => {
      stoneNums.forEach(stoneNum => {
        if (stoneNum === 1) {
          blackNum++;
          return;
        }
        if (stoneNum === 2) {
          whiteNum++;
          return;
        }
      });
    });
    this.setState({
      turn,
      stones,
      puttableSquares,
      blackNum,
      whiteNum,
      lastSquare
    });

    if (puttableSquares.length === 0) {
      alert(`試合終了や\n黒 ${blackNum} - ${whiteNum} 白\nでした`);
      return;
    }
  }

  render() {
    return (
      <Wrapper>
        <Score  {...this.state} />
        <Board updateState={this.updateState.bind(this)} {...this.state} />
      </Wrapper>
    );
  }
}

export default PlayBoard;
