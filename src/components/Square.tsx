import React from "react";
import styled from "styled-components";

const Container = styled.td`
  width: 40px;
  height: 40px;
  text-align: center;
  background-color: #0f0;
`;

type IProps = {
  row: number;
  column: number;
  stone: number; // 0: none, 1: black, 2: white
};

type IState = {
  row: number;
  column: number;
  stone: number; // 0: none, 1: black, 2: white
};

class Square extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // this.state = {
    //   row: props.row || 0,
    //   column: props.column || 0,
    //   stone: props.stone || 0,
    // };
  }
  render() {
    const props = this.props;
    return <Container>{props.stone}</Container>;
  }
}

export default Square;
