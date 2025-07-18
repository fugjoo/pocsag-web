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

type Mask = {
  id: number;
  serial: string;
  model: string;
  manufacturer: string;
  station: Station;
};

type Inspection = {
  id: number;
  date: string;
  notes?: string;
  equipment?: Equipment;
  mask?: Mask;
};

const App = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [masks, setMasks] = useState<Mask[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);

  useEffect(() => {
    fetch('/firestations')
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch(() => setStations([]));

    fetch('/equipment')
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch(() => setEquipment([]));

    fetch('/masks')
      .then((res) => res.json())
      .then((data) => setMasks(data))
      .catch(() => setMasks([]));

    fetch('/inspections')
      .then((res) => res.json())
      .then((data) => setInspections(data))
      .catch(() => setInspections([]));
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
      <h2 className="text-xl font-bold mt-4">Masken</h2>
      <ul className="mt-2 list-disc list-inside">
        {masks.map((m) => (
          <li key={m.id}>
            {m.serial} - {m.station?.name}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Prüfungen</h2>
      <ul className="mt-2 list-disc list-inside">
        {inspections.map((i) => (
          <li key={i.id}>
            {new Date(i.date).toLocaleDateString()} - {i.equipment?.serial || i.mask?.serial}
            {i.notes ? ` (${i.notes})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
