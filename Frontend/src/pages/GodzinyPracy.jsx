import React, { useState } from 'react';
import './CSS/GodzinyPracy.css';

export default function GodzinyPracy() {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [startHour, setStartHour] = useState(7);
  const [endHour, setEndHour] = useState(18);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const generateSlots = (startHour, endHour, date) => {
    const newSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const start = hour.toString().padStart(2, '0') + ":00";
      const end = (hour + 1).toString().padStart(2, '0') + ":00";
      newSlots.push({ id: Date.now() + hour, date, start, end });
    }
    return newSlots;
  };

  const addSlots = () => {
    if (!date) return alert("Wybierz datę!");
    if (startHour >= endHour) return alert("Godzina końcowa musi być późniejsza niż start!");

    const newSlots = generateSlots(startHour, endHour, date);

    const conflict = newSlots.some(ns =>
      slots.some(s => s.date === ns.date && s.start === ns.start)
    );
    if (conflict) return alert("Niektóre sloty już istnieją!");

    setSlots([...slots, ...newSlots]);
    alert("Sloty dodane!");
  };

  const saveToBackend = () => {
    fetch('/api/saveSchedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slots })
    })
    .then(res => res.ok ? alert("Zapisano godziny pracy!") : alert("Błąd przy zapisie"));
  };

  return (
    <div className="godziny-pracy">
      <h2>Ustaw godziny pracy</h2>

      <div className="form">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />

        <select value={startHour} onChange={e => setStartHour(Number(e.target.value))}>
          <option value="">Start</option>
          {hours.map(h => <option key={h} value={h}>{h}:00</option>)}
        </select>

        <select value={endHour} onChange={e => setEndHour(Number(e.target.value))}>
          <option value="">Koniec</option>
          {hours.map(h => <option key={h} value={h}>{h}:00</option>)}
        </select>

        <button onClick={addSlots}>Dodaj sloty</button>
      </div>

      <h3>Twoje godziny pracy:</h3>
      <ul>
        {slots.map(slot => (
          <li key={slot.id}>{slot.date}: {slot.start} - {slot.end}</li>
        ))}
      </ul>

      <button onClick={saveToBackend}>Zapisz</button>
    </div>
  );
}
