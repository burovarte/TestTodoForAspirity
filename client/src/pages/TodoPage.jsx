import React from "react";
import readTodosRequest from "../api/readTodosRequest";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { TodoItem } from "../components/TodoItem";
import { CreateTodoForm } from "../components/CreateTodoForm";

export const TodoPage = () => {
	const { isLoading, data: todos } = useQuery("todos", readTodosRequest);

	return (
		<>
			<h1>Todo list</h1>
			<div className="todopage">
				<CreateTodoForm />
				<div>
					{isLoading ? (
						<ClipLoader size={150} />
					) : (
						todos.map((todo) => <TodoItem todo={todo} key={todo._id} />)
					)}
				</div>
			</div>
		</>
	);
};
