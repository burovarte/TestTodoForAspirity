import React, { useCallback, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";
import { debounce, update } from "lodash";

export const TodoItem = ({ todo }) => {
	const queryClient = useQueryClient();
	const [text, setText] = useState(todo.text);

	const { mutate: updateTodo } = useMutation(
		(updatedTodo) => updateTodoRequest(updatedTodo),
		{
			onSettled: () => {
				queryClient.invalidateQueries("todos");
			},
		}
	);

	const debouncedUpdateTodo = useCallback(debounce(updateTodo, 700), [
		updateTodo,
	]);

	const { mutate: deleteTodo } = useMutation(
		(updatedTodo) => deleteTodoRequest(updatedTodo),
		{
			onSettled: () => {
				queryClient.invalidateQueries("todos");
			},
		}
	);

	useEffect(() => {
		if (text !== todo.text) {
			debouncedUpdateTodo({
				...todo,
				text,
			});
		}
	}, [text]);

	return (
		<div className="todolist">
			<input
				checked={todo.completed}
				type="checkbox"
				onChange={() =>
					updateTodo({
						...todo,
						completed: !todo.completed,
					})
				}
			/>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button onClick={() => deleteTodo(todo)}>delete</button>
		</div>
	);
};
