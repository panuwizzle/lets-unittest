const app  = require('./src/app')

const port = 3000;
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});