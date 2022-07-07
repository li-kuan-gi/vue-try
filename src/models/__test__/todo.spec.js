import { beforeEach, describe, expect, it, test } from 'vitest';
import Todo from '@/models/todo';

const title = "test title";
const description = "test description";

test('constructor requires string arguments: title, description', () => {
    expect(() => new Todo(title)).toThrowError(/wrong argument/);
});


let todo;
beforeEach(() => {
    todo = new Todo(title, description);
});

test('instance has properties: id, title, description, isDone.', () => {
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('title');
    expect(todo).toHaveProperty('description');
    expect(todo).toHaveProperty('isDone');
});

describe('toggleDone', () => {
    it('change isDone from false to true, and vice versa', () => {
        expect(todo.isDone).toBe(false);
        todo.toggleDone();
        expect(todo.isDone).toBe(true);
        todo.toggleDone();
        expect(todo.isDone).toBe(false);
    });
});

describe('toJson', () => {
    it('return an object contains id, title, description, isDone', () => {
        const serialized = todo.toJson();
        expect(serialized).toEqual({
            id: todo.id,
            title,
            description,
            isDone: false,
        });
    });
});

describe('fromJson', () => {
    const json = { id: 1, title, description, isDone: true };

    describe('given json of correct type', () => {

        it('return Todo.', () => {
            const deserialized = Todo.fromJson(json);
            expect(deserialized).toBeInstanceOf(Todo);
        });
        it('return Todo with the same values of json.', () => {
            const deserialized = Todo.fromJson(json);
            expect(deserialized.id).toBe(json.id);
            expect(deserialized.title).toBe(json.title);
            expect(deserialized.description).toBe(json.description);
            expect(deserialized.isDone).toBe(json.isDone);
        });
    });

    describe('given json of wrong type', () => {
        it('throw error.', () => {
            const wrongJson = { id: 1, title: 'r', description: [], isDone: {} };
            expect(() => Todo.fromJson(wrongJson)).toThrowError(/wrong type/);
        });
    });
});
