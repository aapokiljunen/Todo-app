import React from "react";
import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css';

function TodoList() {
    const gridOptions = {
        columnDefs: [
            { field: "date", headerName: "Päivämäärä" },
            { field: "desc", headerName: "Tehtävä" },
            { field: "priority", headerName: "Tärkeys",
                cellStyle: params => params.value.toLowerCase() === "high" ? { color: 'red' } : { color: 'black' }
            }, 
        ],
        defaultColDef: {
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        animateRows: true,
        rowSelection: "single" 
    }

    const [todoLine, setTodoLine] = useState({ desc: '', date: '', priority: '' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const inputChanged = (event) => {
        setTodoLine({ ...todoLine, [event.target.name]: event.target.value });
    }
    const addTodo = () => {
        setTodos([...todos, todoLine]);
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todoLine, i) => i !== gridRef.current.getSelectedNodes()[0].childIndex));
        }
        else {
            alert('Valitse ensin rivi');
        }
    };

    return (
        <div>
            <div>ToDo-lista</div>
            <div>
                <input type="text" name="desc" placeholder="Päivämäärä" onChange={inputChanged} value={todoLine.desc} />
                <input type="text" name="date" placeholder="Tehtävä" onChange={inputChanged} value={todoLine.date} />
                <input type="text" name="priority" placeholder="Tärkeys" onChange={inputChanged} value={todoLine.priority} />
                <button onClick={addTodo}>Lisää</button>
                <button onClick={deleteTodo}>Poista</button></div>
            <div className="ag-theme-material"
                style={{ height: '700px', width: '70%', margin: 'auto' }} >
                <AgGridReact
                    gridOptions={gridOptions}
                    rowData={todos}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api} />
            </div>
        </div>
    );
}

export default TodoList;