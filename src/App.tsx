import React from "react";
import Square from "./components/Square";
import styled from "styled-components";

const Table = styled.table`
  margin: 0 auto;
`;
class App extends React.Component {
  render() {
    const rows = [0, 1, 2, 3, 4, 5, 6, 7];
    const columns = [0, 1, 2, 3, 4, 5, 6, 7];
    return (
      <div className="App">
        <Table>
          {rows.map(row => {
            {
              return (
                <tr key={row}>
                  {columns.map(column => {
                    {
                      return (
                          <Square
                          key={`${row}_${column}`}
                            row={row}
                            column={column}
                            stone={(row + column) % 3}
                          />
                      );
                    }
                  })}
                </tr>
              );
            }
          })}
        </Table>
      </div>
    );
  }
}

export default App;
