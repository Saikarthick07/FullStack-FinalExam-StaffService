const express = require('express');
const app = express();
app.use(express.json());

let staffMembers = []; // In-memory store for staff data

// Create staff
app.post('/staff', (req, res) => {
    const staff = req.body;
    staff.id = Date.now(); // Using timestamp as unique ID
    staffMembers.push(staff);
    res.status(201).send(staff);
});

// Read all staff
app.get('/staff', (req, res) => {
    res.status(200).json(staffMembers);
});

// Read specific staff by ID
app.get('/staff/:id', (req, res) => {
    const staff = staffMembers.find(staff => staff.id === parseInt(req.params.id));
    if (!staff) return res.status(404).send('Staff not found');
    res.status(200).json(staff);
});

// Update staff by ID
app.put('/staff/:id', (req, res) => {
    const staff = staffMembers.find(staff => staff.id === parseInt(req.params.id));
    if (!staff) return res.status(404).send('Staff not found');
    Object.assign(staff, req.body); // Update staff info
    res.status(200).json(staff);
});

// Delete staff by ID
app.delete('/staff/:id', (req, res) => {
    const index = staffMembers.findIndex(staff => staff.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Staff not found');
    staffMembers.splice(index, 1);
    res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Staff service is running on port ${port}`);
});
