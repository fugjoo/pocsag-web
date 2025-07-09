import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const dbPath = process.env.DB_PATH || path.join('/data', 'alarms.sqlite');
const db = new sqlite3.Database(dbPath);
const schema = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf-8');
db.exec(schema);

app.post('/webhook', (req, res) => {
  const alarm = req.body;
  const stmt = db.prepare(
    'INSERT INTO alarms(time, organisation, loop, level, keyword, subkeyword, type) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  stmt.run(
    alarm.time,
    alarm.organisation,
    alarm.loop,
    alarm.level,
    alarm.keyword,
    alarm.subkeyword,
    alarm.type
  );
  stmt.finalize();
  res.sendStatus(200);
});

app.get('/api/alarms', (req, res) => {
  const { dateFrom, dateTo, level, search } = req.query as Record<string, string>;
  const conditions: string[] = [];
  const params: string[] = [];
  if (dateFrom) {
    conditions.push('time >= ?');
    params.push(dateFrom);
  }
  if (dateTo) {
    conditions.push('time <= ?');
    params.push(dateTo);
  }
  if (level) {
    conditions.push('level = ?');
    params.push(level);
  }
  if (search) {
    conditions.push('(keyword LIKE ? OR organisation LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  db.all(`SELECT * FROM alarms ${where} ORDER BY time DESC`, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
}
export default app;
