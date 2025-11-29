import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button
} from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useSearchParams,useNavigate } from "react-router-dom";

export default function DetailPage() {
  const [tenders, setTenders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  const department = searchParams.get("department")?.toLowerCase() || "";
  const size = searchParams.get("size")?.toLowerCase() || "";

  // Fetch tenders from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tenders")
      .then((res) => setTenders(res.data))
      .catch(console.error);
  }, []);

  // Apply filtering whenever tenders or query changes
  useEffect(() => {
    let result = tenders;

    if (department) {
      result = result.filter((t) =>
        t.DPT.toLowerCase().includes(department)
      );
    }

    if (size) {
      result = result.filter((t) =>
        t.TYRES.some((ty) => ty.size.toLowerCase().includes(size))
      );
    }

    setFiltered(result);
  }, [tenders, department, size]);


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" mb={3}>
        Tender Results
      </Typography>

      {filtered.length === 0 ? (
        <Typography color="error" align="center">
          No matches found.
        </Typography>
      ) : (
        <Paper elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Department</TableCell>
                <TableCell sx={{ color: "white" }}>Tender Number</TableCell>
                <TableCell sx={{ color: "white" }}>Date</TableCell>
                <TableCell sx={{ color: "white" }}>Tyre Size</TableCell>
                <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
  {filtered.map((item) =>
    item.TYRES.map((ty, index) => (
      <TableRow key={`${item._id}-${index}`}>
        
        {index === 0 && (
          <>
            <TableCell rowSpan={item.TYRES.length}>
              {item.DPT}
            </TableCell>

            <TableCell rowSpan={item.TYRES.length}>
              {item.TENDER_NUMBER}
            </TableCell>

            <TableCell rowSpan={item.TYRES.length}>
              {item.DATE}
            </TableCell>
          </>
        )}

        {/* Tyre Data */}
        <TableCell>{ty.size}</TableCell>
        <TableCell>{ty.quantity}</TableCell>

        {/* Action Column (arrow for every row) */}
        <TableCell>
          <IconButton color="primary" onClick={() => navigate(`/view/${item._id}`)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </TableCell>

      </TableRow>
    ))
  )}
</TableBody>

          </Table>
        </Paper>
      )}
    </Container>
  );
}
