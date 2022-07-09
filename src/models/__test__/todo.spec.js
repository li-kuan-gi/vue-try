import { beforeEach, describe, expect, it, test } from 'vitest';
import Todo from '@/models/todo';

const content = { title: "test title" };

test('constructor requires object arguments.', () => {
    expect(() => new Todo()).toThrowError(/wrong argument/);
});


let todo;
beforeEach(() => {
    todo = new Todo(content);
});

test('instance has properties: id, content, isDone.', () => {
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('content');
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
    it('return an object contains id, content, isDone', () => {
        const serialized = todo.toJson();
        expect(serialized).toEqual({
            id: todo.id,
            content,
            isDone: false,
        });
    });
});

describe('fromJson', () => {
    const json = { id: 1, content, isDone: true };

    describe('given json of correct type', () => {

        it('return Todo.', () => {
            const deserialized = Todo.fromJson(json);
            expect(deserialized).toBeInstanceOf(Todo);
        });
        it('return Todo with the same values of json.', () => {
            const deserialized = Todo.fromJson(json);
            expect(deserialized.id).toBe(json.id);
            expect(deserialized.content).toBe(json.content);
            expect(deserialized.isDone).toBe(json.isDone);
        });
    });

    describe('given json of wrong type', () => {
        it('throw error.', () => {
            const wrongJson = { id: 1, content: 'wrong', isDone: {} };
            expect(() => Todo.fromJson(wrongJson)).toThrowError(/wrong type/);
        });
    });
});
