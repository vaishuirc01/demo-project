import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import API from "../api";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    await API.post("/todos", { title });
    setTitle("");
    window.location.reload();
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Add Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </Stack>
  );
}
