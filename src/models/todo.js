export default class Todo {
    constructor(title, description) {
        if (typeof title !== 'string'
            || typeof description !== 'string')
            throw new Error('wrong arguments');
        this._id = this._generateID();
        this.title = title;
        this.description = description;
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
            title: this.title,
            description: this.description,
            isDone: this.isDone,
        };
    }

    static fromJson(json) {
        if (typeof (json.id) !== 'number'
            || typeof (json.title) !== 'string'
            || typeof (json.description) !== 'string'
            || typeof (json.isDone) !== 'boolean')
            throw new Error('wrong type');

        const todo = new Todo(json.title, json.description);
        todo._setID(json.id);
        todo.isDone = json.isDone;
        return todo;
    }

    _setID(id) {
        this._id = id;
    }
}
