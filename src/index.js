const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res
    .json({
      message: 'Welcome to League API access documentation to read more!',
      documentation: 'access documentation on /api/docs',
    })
    .status(200);
});

require('./routes/GetSummoner')(app);
require('./routes/GetMastery')(app);
require('./routes/GetMatchHistory')(app);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
