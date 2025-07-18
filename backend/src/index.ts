import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.post('/login', (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();
  try {
    jwt.verify(auth.split(' ')[1], JWT_SECRET);
    res.json({ data: 'protected data' });
  } catch {
    res.status(401).end();
  }
});

const port = parseInt(process.env.PORT || '3000', 10);
app.listen(port, () => console.log(`API running on :${port}`));
