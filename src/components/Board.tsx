import React from "react";
import styled from "styled-components";
import Square from "./Square";

const Table = styled.table`
  margin: 0 auto;
`;

type IProps = {};

type IState = {
  turn: number,
  stones: number[][];
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
  ]
};

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }
  changeStone(row: number, column: number, stoneNum: number) {
    if (stoneNum === 0) {
      alert('置けるの黒か白です')
      return;
    }
    let isChanged = false;
    const stones = (this.state.stones || []).map((stoneNums, indexRow) => {
      if (indexRow !== row) return stoneNums;
      return stoneNums.map((_stoneNum, indexColumn) => {
        if (indexColumn !== column) return _stoneNum;
        if (_stoneNum !== 0) {
          alert('すでにおかれています');
          return _stoneNum
        }
        isChanged = true;
        return stoneNum;
      });
    });
    const turn = isChanged ? this.state.turn === 1 ? 2 : 1 : this.state.turn;
    this.setState({ stones, turn });
    return;
  }
  render() {
    return (
      <Table>
        {this.state.stones.map((stoneNums, indexRow) => {
          return (
            <tr key={indexRow}>
              {stoneNums.map((stoneNum, indexColumn) => {
                return (
                  <Square
                    key={`${indexRow}_${indexColumn}`}
                    row={indexRow}
                    column={indexColumn}
                    stoneNum={stoneNum}
                    turn={this.state.turn}
                    changeStone={this.changeStone.bind(this)}
                  />
                );
              })}
            </tr>
          );
        })}
      </Table>
    );
  }
}

export default Board;
