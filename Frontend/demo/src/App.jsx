import { Container, Typography, Paper } from "@mui/material";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo App (MUI + Vite)
        </Typography>

        <TodoForm />
        <TodoList />
      </Paper>
    </Container>
  );
}
