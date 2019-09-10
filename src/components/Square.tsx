import React from "react";
import styled from "styled-components";

interface IContainer {
  canReturn: boolean;
}

const Container = styled.td<IContainer>`
  width: 40px;
  height: 40px;
  text-align: center;
  background-color: ${props => (props.canReturn ? "#0f0" : "#0a0")};
  cursor: pointer;
  .stone {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 0px;
  }
  .stone-none {
    background-color: ${props => (props.canReturn ? "#0f0" : "#0a0")};
  }
  .stone-black {
    background-color: #000;
  }
  .stone-white {
    background-color: #fff;
  }
`;

type IProps = {
  row: number;
  column: number;
  stoneNum: number; // 0: none, 1: black, 2: white
  turn: number;
  canReturn: boolean;
  changeStone(
    row: number,
    column: number,
    stoneNum: number,
    canReturn: boolean
  ): void;
};

type IState = {
  row: number;
  column: number;
  stone: number; // 0: none, 1: black, 2: white
};

function stoneName(stoneNum: number) {
  switch (stoneNum) {
    case 1:
      return "black";
    case 2:
      return "white";
    default:
      return "none";
  }
}

class Square extends React.Component<IProps, IState> {
  // constructor(props: IProps) {
  //   super(props);
  // }
  render() {
    const { row, column, stoneNum, turn, canReturn } = this.props;
    return (
      <Container canReturn={canReturn}>
        <button
          className={`stone stone-${stoneName(stoneNum)}`}
          onClick={() => this.props.changeStone(row, column, turn, canReturn)}
        ></button>
      </Container>
    );
  }
}

export default Square;
