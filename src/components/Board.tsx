import React from "react";
import styled from "styled-components";
import Square from "./Square";

const Table = styled.table`
  margin: 0 auto;
  width: 100%;
  height: 90%;
`;

type IProps = {
  turn: number,
  stones: number[][];
  puttableSquares: number[][];
  lastSquare: number[];
  updateState(turn: number, stones: number[][], puttableSquares: number[][], lastSquare: number[]): void;
};

type IState = {
  turn: number,
  stones: number[][];
  puttableSquares: number[][]
};

class Board extends React.Component<IProps, IState> {

  // 周り8箇所について、石を置けるか確認する
  listAroundPuttableSquares(stones: number[][], currentStoneNum: number, row: number, column: number): number[][] {
    const puttableSqueares: number[][] = [];
    // 右下チェック
    for (let i = 1; i < Math.min(8 - row, 8 - column); i++) {
      let nextRow = row + i;
      let nextColumn = column + i;
      if (stones[nextRow][nextColumn] === currentStoneNum) break;
      if (stones[nextRow][nextColumn] === 0) {
        if (i === 1) break;
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
        puttableSqueares.push([nextRow, nextColumn]);
        break;
      }
    }
    return puttableSqueares;
  }

  // 石を返せる場所を割り出し、格納する
  listPuttableSquares(stones: number[][], currentStoneNum: number) {
    let puttableSqueares: number[][] = [];
    stones.forEach((stoneNums, indexRow) => {
      stoneNums.forEach((stoneNum, indexColumn) => {
        if (currentStoneNum !== stoneNum) return;
        const _puttableSqueares = this.listAroundPuttableSquares(stones, currentStoneNum, indexRow, indexColumn);
        puttableSqueares = puttableSqueares.concat(_puttableSqueares);
      });
    })
    // 重複は取り除く
    return puttableSqueares.filter((_el: number[], index, arr) => {
      return arr.findIndex((_el2: number[]) => {
        return _el[0] === _el2[0] && _el[1] === _el2[1]
      }) === index;
    })
  }

  // 周り8箇所について、石をひっくり返す
  returnAroundPuttableSquares(stones: number[][], currentStoneNum: number, row: number, column: number): number[][] {
    // 右下チェック
    for (let i = 1; i < Math.min(8 - row, 8 - column); i++) {
      let nextRow = row + i;
      let nextColumn = column + i;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row + j][column + j] = currentStoneNum;
        }
        break;
      }
    }
    // 右チェック
    for (let i = 1; i < 8 - column; i++) {
      let nextRow = row;
      let nextColumn = column + i;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row][column + j] = currentStoneNum;
        }
        break;
      }
    }
    // 右上チェック
    for (let i = 1; i < Math.min(row + 1, 8 - column); i++) {
      let nextRow = row - i;
      let nextColumn = column + i;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row - j][column + j] = currentStoneNum;
        }
        break;
      }
    }
    // 上チェック
    for (let i = 1; i < row + 1; i++) {
      let nextRow = row - i;
      let nextColumn = column;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row - j][column] = currentStoneNum;
        }
        break;
      }
    }
    // 左上チェック
    for (let i = 1; i < Math.min(row + 1, column + 1); i++) {
      let nextRow = row - i;
      let nextColumn = column - i;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row - j][column - j] = currentStoneNum;
        }
        break;
      }
    }
    // 左チェック
    for (let i = 1; i < column + 1; i++) {
      let nextRow = row;
      let nextColumn = column - i;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row][column - j] = currentStoneNum;
        }
        break;
      }
    }
    // 左下チェック
    for (let i = 1; i < Math.min(8 - row, column + 1); i++) {
      let nextRow = row + i;
      let nextColumn = column - i;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row + j][column - j] = currentStoneNum;
        }
        break;
      }
    }
    // 下チェック
    for (let i = 1; i < 8 - row; i++) {
      let nextRow = row + i;
      let nextColumn = column;
      if (stones[nextRow][nextColumn] === 0) break;
      if (stones[nextRow][nextColumn] === currentStoneNum) {
        if (i === 1) break;
        for (let j = 0; j < i; j++) {
          stones[row + j][column] = currentStoneNum;
        }
        break;
      }
    }
    return stones;
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
    const stones = this.returnAroundPuttableSquares(this.props.stones, currentStoneNum, row, column);
    let turn = this.props.turn === 1 ? 2 : 1;
    let puttableSquares = this.listPuttableSquares(stones, turn);
    if (puttableSquares.length === 0) {
      turn = this.props.turn;
      puttableSquares = this.listPuttableSquares(stones, turn);
    }
    this.props.updateState(turn, stones, puttableSquares, [row, column]);
    return;
  }

  render() {
    return (
      <Table>
        {this.props.stones.map((stoneNums, indexRow) => {
          return (
            <tr key={indexRow}>
              {stoneNums.map((stoneNum, indexColumn) => {
                return (
                  <Square
                    key={`${indexRow}_${indexColumn}`}
                    row={indexRow}
                    column={indexColumn}
                    stoneNum={stoneNum}
                    turn={this.props.turn}
                    canReturn={this.props.puttableSquares.some((square: number[]) => {
                      return square[0] === indexRow && square[1] === indexColumn
                    })}
                    changeStone={this.changeStone.bind(this)}
                    isLastSquare={this.props.lastSquare[0] === indexRow && this.props.lastSquare[1] === indexColumn}
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
