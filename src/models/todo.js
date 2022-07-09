export default class Todo {
    constructor(content) {
        if (typeof content !== 'object')
            throw new Error('wrong arguments');
        this._id = this._generateID();
        this.content = content;
        this.isDone = false;
    }

    _generateID() {
        return Math.ceil(Math.random() * 1000);
    }

    get id() { return this._id; }

    toggleDone() {
        this.isDone = !this.isDone;
    }

    toJson() {
        return {
            id: this.id,
            content: this.content,
            isDone: this.isDone,
        };
    }

    static fromJson(json) {
        if (typeof (json.id) !== 'number'
            || typeof (json.content) !== 'object'
            || typeof (json.isDone) !== 'boolean')
            throw new Error('wrong type');

        const todo = new Todo(json.content);
        todo._setID(json.id);
        todo.isDone = json.isDone;
        return todo;
    }

    _setID(id) {
        this._id = id;
    }
}
