import React from "react";
import { useState } from "react";
import TodoTable from './TodoTable';

function TodoList() {

    const [todoLine, setTodoLine] = useState({ desc: '', date: '' });
    const [todos, setTodos] = useState([]);

    const inputChanged = (event) => {
        setTodoLine({...todoLine, [event.target.name]: event.target.value });
        console.log(todos);
    }
    const addTodo = () => {
        setTodos([...todos, todoLine]);
        console.log(todos);
    }

    return (
        <div>  
            Tehtävä: <input type="text" name="date" onChange={inputChanged} value={todoLine.date} />
            Päivämäärä: <input type="text" name="desc" onChange={inputChanged} value={todoLine.desc} />
            <button onClick={addTodo}>Lisää</button>
            <TodoTable todos={todos} />
        </div>
    );
}

export default TodoList;