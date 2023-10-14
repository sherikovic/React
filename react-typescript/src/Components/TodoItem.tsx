import TodoModel from '../models/todo';
import classes from './TodoItem.module.css';

interface TodoItemProps {
    item: TodoModel;
    onRemoveTodo: () => void;
    children?: React.ReactNode;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
    return (
        <li
            key={props.item.id}
            className={classes.item}
            onClick={props.onRemoveTodo}
        >
            {props.item.text}
        </li>
    );
};

export default TodoItem;
