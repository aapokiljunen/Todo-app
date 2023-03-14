import React from "react";
import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete'
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Stack from '@mui/system/Stack';
import dayjs from "dayjs";
import 'dayjs/locale/fi';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'




function TodoList() {
    const [value, setValue] = useState('home');

    const handleChange = (event, value) => {
        setValue(value);
    };

    const gridOptions = {
        columnDefs: [
            {
                field: "date", headerName: "Päivämäärä", valueFormatter: (params) => {
                    return dayjs(params.data.date).format("DD.MM.YYYY");
                }
            },
            { field: "desc", headerName: "Tehtävä" },
            {
                field: "priority", headerName: "Tärkeys",
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

    const yourChangeDateFunc = (selectedDate) => {
        setTodoLine({ ...todoLine, date: selectedDate });
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
        <div className="App">
            <Tabs value={value} onChange={handleChange}>
                <Tab value="home" label="Home" />
                <Tab value="todo" label="Todo-list" />
            </Tabs>
            {value === 'home' && <div>Heipä hei</div>}
            {value === 'todo' && <div className="todopage">
                <div className="control-fields">
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
                            <DatePicker value={todoLine.date} onChange={date => yourChangeDateFunc(date)} />
                        </LocalizationProvider>
                        <TextField name="desc" variant="standard" label="Tehtävä" onChange={inputChanged} value={todoLine.desc} />
                        <TextField name="priority" variant="standard" label="Tärkeys" onChange={inputChanged} value={todoLine.priority} />
                        <Button onClick={addTodo} variant="contained">Lisää</Button>
                        <Button onClick={deleteTodo} variant="outlined" startIcon={<DeleteIcon />}>Poista</Button>
                    </Stack>
                </div>
                <div className="ag-theme-material"
                    style={{ height: '700px', width: '70%', margin: 'auto' }} >
                    <AgGridReact
                        gridOptions={gridOptions}
                        rowData={todos}
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api} />
                </div>
            </div>}


        </div>
    );
}

export default TodoList;