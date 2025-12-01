import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleComplete = async (todo) => {
    await API.put(`/todos/${todo._id}`, {
      ...todo,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo._id}
          secondaryAction={
            <Stack direction="row">
              <IconButton onClick={() => deleteTodo(todo._id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          }
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleComplete(todo)}
          />
          <ListItemText
            primary={todo.title}
            sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
          />
        </ListItem>
      ))}
    </List>
  );
}
