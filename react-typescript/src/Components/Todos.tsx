import TodoModel from '../models/todo';
import TodoItem from './TodoItem';
import { TodosContext } from '../store/todos-context';
import classes from './Todos.module.css';
import { useContext } from 'react';

// interface is the same as type
interface TodosProps {
    items: TodoModel[]; //you can use class as a type
    onRemoveTodo: (id: string) => void;
    children?: React.ReactNode;
};

// function Todos(props:{items:string[], children})
const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    return (
        <ul className={classes.todos}>
            {todosCtx.items.map(item => (
                <TodoItem
                    item={item}
                    onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
                />
            ))}
        </ul>
    );
};

export default Todos;
