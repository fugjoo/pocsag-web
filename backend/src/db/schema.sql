CREATE TABLE IF NOT EXISTS alarms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT NOT NULL,
  organisation TEXT,
  loop TEXT,
  level TEXT,
  keyword TEXT,
  subkeyword TEXT,
  type TEXT
);
