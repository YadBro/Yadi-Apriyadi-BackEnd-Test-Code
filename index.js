require('dotenv').config();

const express = require('express');
const router = require('./src/routes');
const app = express();

app.use(express.json());
app.use('/api/v1', router);

app.get('/', (_, res) => {
  return res.end('Server is ready!');
});

app.use((_, res) => {
  return res.status(404).send('Route not found.');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}`));
