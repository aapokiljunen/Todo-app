import React from "react";

function TodoTable(props) {
    return (
        <div>
            <table><tbody>
                <tr><th>Date</th><th>Description</th></tr>
                {props.todos.map((todoLine, index) => <tr key={index}>
                    <td>{todoLine.date}</td><td>{todoLine.desc}</td><button onClick={() => props.deleteTodo(index)}>Poista</button></tr>)}
            </tbody></table>
        </div>
    )
}

export default TodoTable;