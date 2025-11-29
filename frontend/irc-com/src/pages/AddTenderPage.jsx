import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddTenderPage() {
  const [form, setForm] = useState({
    DPT: "",
    TENDER_NUMBER: "",  
    DATE: "",
    TYRES: [{ size: "", quantity: "" }]
  });

  const navigate = useNavigate();

  const handleTyreChange = (i, field, value) => {
    const updated = [...form.TYRES];
    updated[i][field] = value;
    setForm({ ...form, TYRES: updated });
  };

  const addTyreRow = () => {
    setForm({ ...form, TYRES: [...form.TYRES, { size: "", quantity: "" }] });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/tenders", form);
    navigate("/detail"); 
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Add Tender</Typography>

      <TextField
        label="Department"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setForm({ ...form, DPT: e.target.value })}
      />

      <TextField
        label="Tender Number"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setForm({ ...form, TENDER_NUMBER: e.target.value })}
      />

      <TextField
        label="Date"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) => setForm({ ...form, DATE: e.target.value })}
      />

      {form.TYRES.map((t, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Size"
            value={t.size}
            onChange={(e) => handleTyreChange(i, "size", e.target.value)}
          />
          <TextField
            label="Quantity"
            value={t.quantity}
            onChange={(e) => handleTyreChange(i, "quantity", e.target.value)}
          />
        </Box>
      ))}

      <Button onClick={addTyreRow} sx={{ mt: 2 }}>+ Add Tyre</Button>

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
}
