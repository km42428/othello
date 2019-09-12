import React from "react";
import styled from "styled-components";

interface IContainer {
  canReturn: boolean;
}

const Container = styled.td<IContainer>`
  width: 12.5%;
  height: 12.5%;
  text-align: center;
  background-color: ${props => (props.canReturn ? "#0f0" : "#0a0")};
  cursor: pointer;
  .stone {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    border: 0px;
    .last {
      width: 20%;
      height: 16%;
      margin: 0 auto;
      border: 0px;
      background-color: #f00;
    }
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
  isLastSquare: boolean;
  changeStone(
    row: number,
    column: number,
    stoneNum: number,
    canReturn: boolean
  ): void;
};

type IState = {};

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
        >
          <div className={this.props.isLastSquare ? 'last' : ''} />
        </button>
      </Container>
    );
  }
}

export default Square;
