import React from "react";
import styled from "styled-components";

type IProps = {
  turn: number;
  blackNum: number;
  whiteNum: number;
};

type IState = {};
interface IContainer {
  turn: number;
  blackNum: number;
  whiteNum: number;
}

const Container = styled.td<IContainer>`
  width: 100%;
  height: 10vh;
  display: flex;
  background-color: #eee;
  font-size: 4vh;
  div {
    text-align: center;
    line-height: 10vh;
  }
  .name {
    width: 20%;
  }
  .point {
    width: 25%;
  }
  .bar {
    width: 10%;
  }
`;

class Score extends React.Component<IProps, IState> {
  render() {
    return (
      <Container {...this.props}>
        <div className="name">黒</div>
        <div className="point">{this.props.blackNum}</div>
        <div className="bar">ー</div>
        <div className="point">{this.props.whiteNum}</div>
        <div className="name">白</div>
      </Container>
    );
  }
}

export default Score;
