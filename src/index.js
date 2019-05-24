import React from "react";
import ReactDOM from "react-dom";

import { TodoList } from "./TodoList";

function App() {
	return (
		<div className="App">
			<h1>useReduder</h1>
			<TodoList />
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
