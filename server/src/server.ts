import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { connectToDatabase } from './database'
import { employeeRouter } from './employee.routes'

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config()

const { ATLAS_URI } = process.env

if (!ATLAS_URI) {
  console.error('No Atlas URI environment variable has been defined in the .env')
  process.exit(1)
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express()
    const port = 5200
    app.use(cors())

    app.use('/employees', employeeRouter)

    app.listen(port, () => {
      console.log(`Server is currently runniing at:`, port)
    })
  }).catch(error => console.error(error))