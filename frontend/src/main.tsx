import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type Station = { id: number; name: string };
type Equipment = {
  id: number;
  serial: string;
  type: string;
  model: string;
  manufacturer: string;
  station: Station;
};

const App = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    fetch('/firestations')
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch(() => setStations([]));

    fetch('/equipment')
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch(() => setEquipment([]));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Feuerwehren</h1>
      <ul className="mt-2 list-disc list-inside">
        {stations.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Geräte</h2>
      <ul className="mt-2 list-disc list-inside">
        {equipment.map((e) => (
          <li key={e.id}>
            {e.serial} ({e.type}) - {e.station?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
