"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const express = require('express')
const path = require('node:path')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

app.use(express.static(path.join(__dirname, '/client/build'))) // Static Files

// Cors
app.use(require('cors')()) // Run with defaults.

// Call static uploadFile:
app.use('/upload', express.static('./upload'))

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// Run Logger:
// app.use(require('./src/middlewares/logger'))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/api/v1/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Stock Management API',
        documents: {
            swagger: '/api/v1/documents/swagger',
            redoc: '/api/v1/documents/redoc',
            json: '/api/v1/documents/json',
        },
        user: req.user
    })
})

// Routes:
app.use('/api/v1', require('./src/routes'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))  
})

app.use('*', (req, res) => {
    res.status(404).json({
        error: true,
        message: '404 Not Found'
    })
})

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`))

/* ------------------------------------------------------- */
