import React, { useReducer, useState } from "react";
import { initialTodos } from "./list";

const toDoReducer = (state, action) => {
	let todos;
	switch (action.type) {
		case "check":
			todos = state.todoList.map(todo => {
				if (todo.id === action.payload.id) {
					return { ...todo, isCompleted: true };
				} else {
					return todo;
				}
			});
			return { ...state, todoList: todos };
		case "uncheck":
			todos = state.todoList.map(todo => {
				if (todo.id === action.payload.id) {
					return { ...todo, isCompleted: false };
				} else {
					return todo;
				}
			});
			return { ...state, todoList: todos };
		case "add":
			const newTodo = {
				id:
					state.todoList.length === 0
						? 1
						: Math.max(...state.todoList.map(todo => todo.id)) + 1,
				name: action.payload.newTodo,
				isCompleted: false
			};
			todos = [...state.todoList, newTodo];
			console.log({ ...state, newTodo: "", todoList: todos });
			return { ...state, newTodo: "", todoList: todos };
		case "delete":
			todos = state.todoList.filter(todo => {
				if (todo.id === action.payload.id) {
					return false;
				} else {
					return true;
				}
			});
			return { ...state, todoList: todos };
		default:
			return state;
	}
};

function TodoList() {
	const [todos, dispatch] = useReducer(toDoReducer, initialTodos);
	const [newTodo, setNewTodo] = useState("");

	const changetodoStatus = (e, id) => {
		e.persist();
		const action = {
			type: e.target.checked ? "check" : "uncheck",
			payload: {
				id: +id
			}
		};
		dispatch(action);
	};

	const addTodo = e => {
		if (!newTodo) return;

		e.persist();
		const action = {
			type: "add",
			payload: {
				newTodo
			}
		};
		dispatch(action);
		setNewTodo("");
	};

	const deleteTodo = (e, id) => {
		e.persist();
		const action = {
			type: "delete",
			payload: {
				id
			}
		};
		dispatch(action);
	};
	const handleChange = e => {
		e.persist();
		setNewTodo(e.target.value);
	};

	return (
		<>
			<input type="text" value={newTodo} onChange={handleChange} />
			<input type="button" value="add" onClick={addTodo} />
			<ol>
				{todos.todoList.map(todo => {
					return (
						<li key={todo.id}>
							<span>{todo.name}</span>
							<input
								type="checkbox"
								onChange={e => changetodoStatus(e, todo.id)}
								checked={todo.isCompleted}
							/>
							<input
								type="button"
								value="x"
								onClick={e => deleteTodo(e, todo.id)}
								style={{
									border: "none"
								}}
							/>
						</li>
					);
				})}
			</ol>
		</>
	);
}

export { TodoList };
