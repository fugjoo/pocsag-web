import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type Station = { id: number; name: string };

const App = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch('/firestations')
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch(() => setStations([]));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Feuerwehren</h1>
      <ul className="mt-2 list-disc list-inside">
        {stations.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
