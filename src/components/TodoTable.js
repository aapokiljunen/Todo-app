import React from "react";

function TodoTable(props) {
    console.log(props)
    return (
        <div>
            <table><tbody>
                {props.todos.map((todoLine, index) => <tr key={index}>
                    <td>{todoLine.date}</td><td>{todoLine.desc}</td><td>{todoLine.priority}</td></tr>)}
            </tbody></table>
        </div>
    )
}

export default TodoTable;