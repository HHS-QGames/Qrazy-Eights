const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // You can change the port number if needed

// Serve files from the 'public' directory
app.use(express.static(path.join(__dirname, '.')));

// Handle 404 errors by serving a single HTML page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '.', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});