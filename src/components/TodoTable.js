import React from "react";

function TodoTable(props) {
    return (
        <div>
            <table><tbody>
                <tr><th>Date</th><th>Description</th></tr>
                {props.todos.map((item, index) => <tr key={index}>
                    <td>{item.date}</td><td>{item.desc}</td></tr>)}
            </tbody></table>
        </div>
    )
}

export default TodoTable;