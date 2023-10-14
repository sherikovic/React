class TodoModel {
    // in JS you wouldn't have those two lines, but in TS you have to define the types ahead
    id: string;
    text: string;

    constructor(todoText: string) {
        this.text = todoText;
        this.id = new Date().toISOString();
    }
}

export default TodoModel;