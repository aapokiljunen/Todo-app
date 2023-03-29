import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from './components/TodoList';


function addTodo(description) {
    render(<TodoList />);
    const desc = screen.getByLabelText('Tehtävä');
    fireEvent.change(desc, { target: { value: description } });
    const button = screen.getByText('Lisää');
    fireEvent.click(button);
}

test('test Add Todo', () => {
    addTodo('Go to coffee');
    const tablecell = screen.getByText(/go to coffee/i);
    expect(tablecell).toBeInTheDocument();
});

test('clear All', () => {
    addTodo('Go to coffee');
    const delButton = screen.getByText('Tyhjennä');
    fireEvent.click(delButton);
    const tablecell = screen.queryByText(/go to coffee/i);
    expect(tablecell).not.toBeInTheDocument();
});