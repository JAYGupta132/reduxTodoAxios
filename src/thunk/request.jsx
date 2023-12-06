import axios from "axios";
import {
  addTodo,
  getTodo,
  removeTodo,
  doneTodo,
  editTodo,
} from "../services/Actions/index";

export const addTodoRequest = (data) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3000/todos", data);
      dispatch(addTodo(data));
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
};

export const fetchTodoRequest = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      dispatch(getTodo(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const removeTodoRequest = (index) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const todoId = state.todoReducers.list[index].id;
      await axios.delete(`http://localhost:3000/todos/${todoId}`);
      dispatch(removeTodo(index));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };
};

export const doneTodoRequest = (index) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const todoId = state.todoReducers.list[index].id;
      await axios.patch(`http://localhost:3000/todos/${todoId}`, {
        read: true,
      });
      dispatch(doneTodo(index));
    } catch (error) {
      console.error("Error marking as done:", error);
    }
  };
};

export const editTodoRequest = (index, newData) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      console.log(state.todoReducers.list);
      const todoId = state.todoReducers.list[index].id;
      await axios.patch(`http://localhost:3000/todos/${todoId}`, newData);
      dispatch(editTodo(index, newData));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };
};
