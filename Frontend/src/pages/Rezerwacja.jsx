import React, { useState, useEffect } from 'react';
import './CSS/Rezerwacja.css';

export default function Rezerwacja() {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('/api/getSlots') 
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(err => console.error("Błąd pobierania slotów:", err));
  }, []);

  const isAvailable = (slot) => {
    return !appointments.some(a => a.slotId === slot.id);
  };

  const bookSlot = (slot) => {
    if (!isAvailable(slot)) return;

    const newAppointment = {
      slotId: slot.id,
      date: slot.date,
      start: slot.start,
      end: slot.end,
      status: 'Scheduled'
    };

    setAppointments([...appointments, newAppointment]);

    fetch('/api/bookAppointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment)
    })
    .then(res => res.ok ? alert("Wizyta zarezerwowana!") : alert("Błąd przy rezerwacji"));
  };

  return (
    <div className="rezerwacja">
      <h2>Dostępne sloty</h2>
      {slots.length === 0 ? (
        <p>Brak dostępnych godzin pracy.</p>
      ) : (
        <ul>
          {slots.map(slot => (
            <li key={slot.id} className={isAvailable(slot) ? 'available' : 'taken'}>
              {slot.date}: {slot.start} - {slot.end}
              {isAvailable(slot) ? (
                <button onClick={() => bookSlot(slot)}>Rezerwuj</button>
              ) : (
                <span>Zajęte</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
