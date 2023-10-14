import React, { useState } from "react";
import TodoModel from "../models/todo";

interface TodosContextIF {
    items: TodoModel[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextIF>({
    items: [],
    addTodo: () => { },
    removeTodo: (id: string) => { }
});

interface TodosContextProps {
    children?: React.ReactNode;
};

const TodosContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const [todos, setTodos] = useState<TodoModel[]>([]);

    const addTodoHandler = (text: string) => {
        setTodos([new TodoModel(text), ...todos]);
        // setTodos((prevTodos)=>{
        //   return prevTodos.concat(new TodoModel(text))
        // });
    };

    const removeTodoHandler = (id: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== id);
        });
    };

    const contextValue: TodosContextIF = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;