const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ROUTERS
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const customerRoutes = require('./routes/customer');
const toolRoutes = require('./routes/tool');
const materialRoutes = require('./routes/material');
const workRoutes = require('./routes/work');
const dailyTask = require('./routes/dailyTask');

const app = express();

// const corsOptions = {
//     origin: 'http://example.com',
// }

app.use(cors());
app.use(express.json());

// Connection URI
const uri = 'mongodb+srv://us-electricals:T1lbGQP7WSs9M9Gg@uselectricals.pr972cz.mongodb.net/uselectricalsecperiment'; 

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// API routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/tool', toolRoutes);
app.use('/api/v1/material', materialRoutes);
app.use('/api/v1/work', workRoutes);
app.use('/api/v1/daily-task', dailyTask);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
