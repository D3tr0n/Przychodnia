import React, { useState, useEffect } from 'react';
import './CSS/GodzinyPracy.css';

export default function GodzinyPracy() {
  const [slots, setSlots] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(16);

  const fetchSchedule = async () => {
    try {
      const res = await fetch('http://localhost:5246/api/doctor/my-schedule', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSlots(data);
        if (data.length === 0) setIsEditing(true); // Jeśli brak godzin, od razu pokaż edycję
      }
    } catch (err) {
      console.error("Błąd pobierania:", err);
    }
  };

  useEffect(() => { fetchSchedule(); }, []);

  const handleSave = async () => {
    if (startHour >= endHour) return alert("Godzina końcowa musi być późniejsza!");

    const newSlots = [];
    for (let h = startHour; h < endHour; h++) {
      newSlots.push({
        startTime: `${h.toString().padStart(2, '0')}:00`,
        endTime: `${(h + 1).toString().padStart(2, '0')}:00`
      });
    }

    const res = await fetch('http://localhost:5246/api/doctor/update-schedule', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newSlots)
    });

    if (res.ok) {
      alert("Zaktualizowano godziny pracy!");
      setIsEditing(false);
      fetchSchedule();
    } else {
      alert("Błąd zapisu!");
    }
  };

  return (
    <div className="godziny-wrapper">
      <div id="panellogowanie" style={{ width: '450px', flexDirection: 'column', padding: '40px' }}>
        <h2>Twoje godziny pracy</h2>

        {!isEditing ? (
          <>
            <div className="slots-list">
              {slots.length > 0 ? slots.map((s, i) => (
                <div key={i} className="slot-item">
                  <span>{s.startTime} - {s.endTime}</span>
                </div>
              )) : <p>Brak ustawionych godzin.</p>}
            </div>
            <button onClick={() => setIsEditing(true)} style={{ marginTop: '20px', backgroundColor: '#6b7280' }}>
              Zmień godziny pracy
            </button>
          </>
        ) : (
          <div id="formularz">
            <div className="input-group">
              <h4>Godzina rozpoczęcia</h4>
              <input type="number" value={startHour} onChange={e => setStartHour(Number(e.target.value))} min="0" max="23" />
            </div>
            <div className="input-group">
              <h4>Godzina zakończenia</h4>
              <input type="number" value={endHour} onChange={e => setEndHour(Number(e.target.value))} min="0" max="23" />
            </div>
            <button onClick={handleSave} style={{ marginTop: '10px' }}>Zapisz nowe godziny</button>
            <button onClick={() => setIsEditing(false)} style={{ marginTop: '10px', backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6' }}>
              Anuluj
            </button>
          </div>
        )}
      </div>
    </div>
  );
}