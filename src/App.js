import TodoForm from "./components/TodoList";
import ShowTodo from "./components/ShowTodo";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<TodoForm />} />
        <Route exact path="/Show-Todo" element={<ShowTodo />} />
      </Routes>
    </div>
  );
}

export default App;
