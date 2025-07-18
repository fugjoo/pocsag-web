import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
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

app.get('/firestations', async (_req, res) => {
  const stations = await prisma.fireStation.findMany();
  res.json(stations);
});

app.post('/firestations', async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    const station = await prisma.fireStation.create({
      data: { name, contact, address },
    });
    res.status(201).json(station);
  } catch {
    res.status(400).json({ error: 'Failed to create fire station' });
  }
});

app.get('/equipment', async (_req, res) => {
  const items = await prisma.equipment.findMany({
    include: { station: true },
  });
  res.json(items);
});

app.post('/equipment', async (req, res) => {
  try {
    const { serial, type, model, manufacturer, stationId } = req.body;
    const item = await prisma.equipment.create({
      data: { serial, type, model, manufacturer, stationId },
    });
    res.status(201).json(item);
  } catch {
    res.status(400).json({ error: 'Failed to create equipment' });
  }
});

const port = parseInt(process.env.PORT || '3000', 10);
app.listen(port, () => console.log(`API running on :${port}`));
