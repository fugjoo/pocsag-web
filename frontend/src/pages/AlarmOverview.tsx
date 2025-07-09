import React, { useEffect, useState } from 'react';

interface Alarm {
  id: number;
  time: string;
  organisation: string;
  level: string;
  keyword: string;
}

const AlarmOverview: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const fetchAlarms = async () => {
    const res = await fetch('/api/alarms');
    setAlarms(await res.json());
  };

  useEffect(() => {
    fetchAlarms();
    const es = new EventSource('/api/alarms/stream'); // TODO implement server side
    es.onmessage = () => fetchAlarms();
    return () => es.close();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Alarme</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Zeit</th>
            <th>Organisation</th>
            <th>Stufe</th>
            <th>Stichwort</th>
          </tr>
        </thead>
        <tbody>
          {alarms.map(a => (
            <tr key={a.id}>
              <td>{a.time}</td>
              <td>{a.organisation}</td>
              <td>{a.level}</td>
              <td>{a.keyword}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlarmOverview;
