import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Paper,
  Typography,
  Autocomplete
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
const [password, setPassword] = useState("");

const CORRECT_PASSWORD = "irc-tender"; // change to your password


  const departmentList = [
    "Northern Railway", "Panjayati Raj Department", "Department of Military Affairs",
    "West Central Rly", "Diesal Loco Modernisation Works", "North Eastern Railway",
    "South Central Rly", "Southern Rly", "Home Department", "Police Department",
    "Eastern Railway", "South Western Rly", "North Western Rly",
    "Home Department Bihar", "Western Rly", "BLW", "East Central Rly",
    "Armoured Vehicles Nigam Limited", "Ministry Of Mines",
    "Ai Airport Services Limited", "Bharat Heavy Electricals Limited (BHEL)",
    "Yantra India Limited", "Ministry Of Defence", "Home Department Maharashtra",
    "South Eastern Railway", "Home Department Gujarat",
    "Youth Services Department West Bengal", "Indian Air Force",
    "National Security Guard (NSG)", "Ministry of Railways",
    "Ministry Of Home Affairs", "Steel Authority Of India Limited",
    "Northern Coalfields Limited"
  ];

  const sizeOptions = [
    "6.50-10", "7.00-12", "8.15-15", "10.00-20", "7.50-16", "6.00-9",
    "18x7-8", "16x5", "21x8x15", "9.00-20", "6.50x10", "7.00x12"
  ];

  const [form, setForm] = useState({
    department: "",
    size: ""
  });

  const handleSearch = () => {
    const params = new URLSearchParams(form).toString();
    navigate(`/detail?${params}`);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Dashboard</Typography>
    
     <Box display="flex" flexDirection="column" gap={3}>
        
        <Autocomplete
          freeSolo
          disableClearable
          options={departmentList}
          value={form.department}
          onChange={(e, val) => setForm({ ...form, department: val || "" })}
          onInputChange={(e, val) => setForm({ ...form, department: val })}
          renderInput={(params) => (
            <TextField {...params} label="Department" />
          )}
        />

        <FormControl fullWidth>
          <InputLabel>Tyre Size</InputLabel>
          <Select
            name="size"
            label="Tyre Size"
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          >
            <MenuItem value="">All Sizes</MenuItem>
            {sizeOptions.map((s, i) => (
              <MenuItem key={i} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box> <br></br>
      <Button 
  variant="contained" 
  color="success"
  onClick={() => setShowPassword(true)}
>
  Add Tender
</Button>

{showPassword && (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Paper sx={{ p: 4, width: 300, textAlign: "center" }}>
      <Typography variant="h6" mb={2}>Enter Password</Typography>

      <TextField
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
      />

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            if (password === CORRECT_PASSWORD) {
              navigate("/add");
            } else {
              alert("Incorrect Password!");
            }
          }}
        >
          Submit
        </Button>

        <Button 
          variant="outlined" 
          color="error"
          onClick={() => {
            setShowPassword(false);
            setPassword("");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  </Box>
)}

    </Box>
  );
}
