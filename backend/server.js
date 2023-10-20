import path from 'path'
import express, {urlencoded} from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
import {errorHandler, notFound} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

const port = process.env.PORT || 8000

// Middleware for parsing json data
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use('/api', userRoutes)

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
}else{
    app.get('/', (req, res) => {
        res.send('Server is ready')
    })
}


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

