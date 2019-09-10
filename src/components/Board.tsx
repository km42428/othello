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
  puttableSquares: number[][]
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
  puttableSquares: [[4,2], [5,3], [2, 4], [3,5]]
};

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  // 周り8箇所について、石を置けるか確認する
  listArountPuttableSquares(stones: number[][], currentStoneNum: number, row: number, column: number): number[][] {
    const puttableSqueares: number[][] = [];
    // 右下チェック
    for (let i = 1; i < Math.min(8 - row, 8 - column); i++) {
      let nextRow = row + i;
      let nextColumn = column + i;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(1);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    // 右チェック
    for (let i = 1; i < 8 - column; i++) {
      let nextRow = row;
      let nextColumn = column + i;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(2);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    // 右上チェック
    for (let i = 1; i < Math.min(row + 1, 8 - column); i++) {
      let nextRow = row - i;
      let nextColumn = column + i;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(3);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    // 上チェック
    for (let i = 1; i < row + 1; i++) {
      let nextRow = row - i;
      let nextColumn = column;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(4);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    // 左上チェック
    for (let i = 1; i < Math.min(row + 1, column + 1); i++) {
      let nextRow = row - i;
      let nextColumn = column - i;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(5);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    // 左チェック
    for (let i = 1; i < column + 1; i++) {
      let nextRow = row;
      let nextColumn = column - i;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(6);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    // 左下チェック
    for (let i = 1; i < Math.min(8 - row, column + 1); i++) {
      let nextRow = row + i;
      let nextColumn = column - i;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(7);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    // 下チェック
    for (let i = 1; i < 8 - row; i++) {
      let nextRow = row + i;
      let nextColumn = column;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
        console.log(8);
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    console.log('puttableSqueares');
    console.log(puttableSqueares);
    return puttableSqueares;
  }

  // 石を返せる場所を割り出し、格納する
  listPuttableSquares(stones: number[][], currentStoneNum: number) {
    console.log('いくでー')
    console.time('1')
    let puttableSqueares: number[][] = [];
    stones.forEach((stoneNums, indexRow) => {
      stoneNums.forEach((stoneNum, indexColumn) => {
        console.log([indexRow, indexColumn]);
        if (currentStoneNum !== stoneNum) return;
        console.log('お！')
        const _puttableSqueares = this.listArountPuttableSquares(stones, currentStoneNum, indexRow, indexColumn);
        console.log(_puttableSqueares);
        puttableSqueares = puttableSqueares.concat(_puttableSqueares);
        console.log('現状', puttableSqueares);
      });
    })
    console.log('最終', puttableSqueares)
    // 重複は取り除く
    console.timeEnd('1')
    return puttableSqueares.filter((_el: number[], index, arr) => {
      return arr.findIndex((_el2: number[]) => {
        return _el[0] === _el2[0] && _el[1] === _el2[1]
      }) === index;
    })
  }


  // 実際に石を返す
  changeStone(row: number, column: number, currentStoneNum: number, canReturn: boolean) {
    if (!canReturn) {
      alert('そこにはおけないよ！')
      return;
    }
    if (currentStoneNum === 0) {
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
        return currentStoneNum;
      });
    });
    let turn = isChanged ? this.state.turn === 1 ? 2 : 1 : this.state.turn;
    let puttableSquares = this.listPuttableSquares(stones, turn);
    if (puttableSquares.length === 0) {
      turn = this.state.turn;
      puttableSquares = this.listPuttableSquares(stones, turn);
    }
    this.setState({ stones, turn, puttableSquares });
    
    if (puttableSquares.length === 0) {
      alert('試合終了や');
      return;
    }
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
                    canReturn={this.state.puttableSquares.some((square: number[]) => {
                      return square[0] === indexRow && square[1] === indexColumn
                    })}
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
