import express from 'express'
import { pool } from './db.js'
import { serverPort } from './config.js'

// create express app
const app = express()
app.use(express.json())

// POST Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required to login."});
  }

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [username])
  const user = rows[0]

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password"})
  }

  return res.status(200).json({
    message: 'Login successful!',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    }
  });
})

// POST Sign Up
app.post('/api/signup', async (req, res) => {
  const { email, password, firstName, lastName, birthdate } = req.body;

  if (!email || !password || !firstName || !lastName || !birthdate) {
    return res.status(400).json({ error: "All fields are required to sign up." });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name, birthdate)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, last_name`,
      [email, password, firstName, lastName, birthdate],
    )
    const user = rows[0]

    return res.status(201).json({
      message: 'Sign up successful!',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      }
    });
  } catch (err) {
    // 23505 is Postgres' unique_violation -- the users.email UNIQUE constraint.
    if (err.code === '23505') {
      return res.status(409).json({ error: "An account with that email already exists." })
    }
    throw err
  }
})

app.listen(serverPort, () => {
  console.log(`API listening on http://localhost:${serverPort}`)
})
