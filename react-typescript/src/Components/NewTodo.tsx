import { useContext, useRef } from "react";
import { TodosContext } from '../store/todos-context';
import classes from './NewTodo.module.css';

interface NewTodoProps {
    onAddTodo: (text: string) => void;
};

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const textRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textRef.current!.value; // ! indictaes that value will never be null
        if (enteredText.trim().length === 0) return;
        todosCtx.addTodo(enteredText);
        textRef.current!.value = "";
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Todo Text</label>
            <input type="text" id="text" ref={textRef} />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
