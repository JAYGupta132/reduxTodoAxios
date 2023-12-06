import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "./TodoList";
import Modal from "react-bootstrap/Modal";
import {
  fetchTodoRequest,
  removeTodoRequest,
  doneTodoRequest,
} from "../thunk/request";

const ShowTodo = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.todoReducers);

  const handleEditTodo = (index) => {
    setEditingTodo({ index, data: data.list[index] });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditingTodo(null);
    setShowEditModal(false);
  };

  useEffect(() => {
    dispatch(fetchTodoRequest());
  }, [dispatch]);

  const removeTodoHandler = (index) => {
    dispatch(removeTodoRequest(index));
  };

  const doneTodoHandler = (index) => {
    dispatch(doneTodoRequest(index));
  };

  return (
    <>
      <div className="container">
        <Link to={"/"}>
          <Button className="btn btn-primary mt-3">Add new</Button>
        </Link>
        <h1 className="text-center">To-Do List</h1>
        <Table
          className="text-center mt-5"
          striped
          bordered
          hover
          variant="dark"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.list &&
              data.list.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td className="text-center">
                    <>
                      <Button
                        variant="secondary"
                        onClick={() => handleEditTodo(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => removeTodoHandler(index)}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => doneTodoHandler(index)}
                      >
                        {item.read ? "Completed" : "Done"}
                      </Button>
                    </>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TodoList
              editingTodo={editingTodo}
              handleCloseEditModal={handleCloseEditModal}
            />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ShowTodo;
