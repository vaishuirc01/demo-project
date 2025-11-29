import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function EditTenderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tenders")
      .then((res) => {
        const data = res.data.find(t => t._id === id);
        setForm(data);
      });
  }, [id]);

  const handleSubmit = async () => {
    await axios.put(`http://localhost:5000/api/tenders/${id}`, form);
    navigate("/detail");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Edit Tender</Typography>

      <TextField
        fullWidth
        label="Department"
        sx={{ mt: 2 }}
        value={form.DPT}
        onChange={(e) => setForm({ ...form, DPT: e.target.value })}
      />

      <TextField
        fullWidth
        label="Tender Number"
        sx={{ mt: 2 }}
        value={form.TENDER_NUMBER}
        onChange={(e) => setForm({ ...form, TENDER_NUMBER: e.target.value })}
      />

      <TextField
        fullWidth
        label="Date"
        sx={{ mt: 2 }}
        value={form.DATE}
        onChange={(e) => setForm({ ...form, DATE: e.target.value })}
      />

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        Update
      </Button>
    </Box>
  );
}
