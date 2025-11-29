import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data.json");

// Read file function
const readData = () => {
  const json = fs.readFileSync(dataPath);
  return JSON.parse(json);
};

// Write file function
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all tenders
export const getTenders = (req, res) => {
  const data = readData();
  res.json(data);
};

// ADD tender
export const addTender = (req, res) => {
  const data = readData();
  const newTender = req.body;

  data.push(newTender);
  writeData(data);

  res.status(201).json(newTender);
};

// UPDATE tender by TENDER_NUMBER
export const updateTender = (req, res) => {
  const { id } = req.params;
  const updatedTender = req.body;

  let data = readData();
  const index = data.findIndex(t => t.TENDER_NUMBER === id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  data[index] = { ...data[index], ...updatedTender };
  writeData(data);

  res.json(data[index]);
};

// DELETE tender
export const deleteTender = (req, res) => {
  const { id } = req.params;

  let data = readData();
  const newData = data.filter(t => t.TENDER_NUMBER !== id);

  writeData(newData);

  res.json({ message: "Deleted successfully" });
};
