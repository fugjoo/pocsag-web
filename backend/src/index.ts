import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.post('/login', (req: Request, res: Response) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();
  try {
    jwt.verify(auth.split(' ')[1], JWT_SECRET);
    res.json({ data: 'protected data' });
  } catch {
    res.status(401).end();
  }
});

app.get('/firestations', async (_req: Request, res: Response) => {
  const stations = await prisma.fireStation.findMany();
  res.json(stations);
});

app.post('/firestations', async (req: Request, res: Response) => {
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

app.get('/equipment', async (_req: Request, res: Response) => {
  const items = await prisma.equipment.findMany({
    include: { station: true },
  });
  res.json(items);
});

app.post('/equipment', async (req: Request, res: Response) => {
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

app.get('/masks', async (_req: Request, res: Response) => {
  const masks = await prisma.mask.findMany({ include: { station: true } });
  res.json(masks);
});

app.post('/masks', async (req: Request, res: Response) => {
  try {
    const { serial, model, manufacturer, stationId } = req.body;
    const mask = await prisma.mask.create({
      data: { serial, model, manufacturer, stationId },
    });
    res.status(201).json(mask);
  } catch {
    res.status(400).json({ error: 'Failed to create mask' });
  }
});

app.get('/inspections', async (_req: Request, res: Response) => {
  const inspections = await prisma.inspection.findMany({
    include: { equipment: true, mask: true },
    orderBy: { date: 'desc' },
  });
  res.json(inspections);
});

app.post('/inspections', async (req: Request, res: Response) => {
  const { equipmentId, maskId, notes, date } = req.body;
  if (!equipmentId && !maskId) {
    return res.status(400).json({ error: 'equipmentId or maskId required' });
  }
  try {
    const inspection = await prisma.inspection.create({
      data: { equipmentId, maskId, notes, date },
    });
    res.status(201).json(inspection);
  } catch {
    res.status(400).json({ error: 'Failed to create inspection' });
  }
});

const port = parseInt(process.env.PORT || '3000', 10);

if (require.main === module) {
  app.listen(port, () => console.log(`API running on :${port}`));
}

export default app;
