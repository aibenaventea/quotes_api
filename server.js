const mongoose = require("./server/config/mongoose");
const express = require('express');
const cors = require('cors');
const router = require("./server/config/routes");
const app = express();
app.use(express.json());
app.use(cors());


app.use(router);

const port = 8000;

app.listen(port);
console.log(`server is listening on port ${port}`)
