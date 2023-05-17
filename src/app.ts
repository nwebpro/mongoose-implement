import express, { Application }  from 'express'
import cors from 'cors'
import { Schema, model } from 'mongoose'
const app: Application = express()

//  Application Routes Import
import UserRoutes from './app/modules/user/user.route'

// using cors
app.use(cors())

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/user', UserRoutes)


export default app