import React, { useState, useEffect } from 'react';
import './CSS/Rezerwacja.css';

export default function Rezerwacja() {
    const [specializations, setSpecializations] = useState(['Kardiolog', 'Pediatra', 'Internista', 'Dermatolog']);
    const [selectedSpec, setSelectedSpec] = useState('');
    const [date, setDate] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedSpec) {
            fetch(`http://localhost:5246/api/patient/doctors?spec=${selectedSpec}`)
                .then(res => res.json())
                .then(data => setDoctors(data));
        }
    }, [selectedSpec]);

    useEffect(() => {
        if (selectedDoctor && date) {
            setLoading(true);
            fetch(`http://localhost:5246/api/patient/available-slots?doctorId=${selectedDoctor.id}&date=${date}`)
                .then(res => res.json())
                .then(data => {
                    setAvailableSlots(data);
                    setLoading(false);
                });
        }
    }, [selectedDoctor, date]);

    const handleBook = async (slot) => {
        const res = await fetch('http://localhost:5246/api/patient/book-appointment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                doctorId: selectedDoctor.id,
                date: date,
                time: slot.startTime
            })
        });

        if (res.ok) {
            alert("Wizyta zarezerwowana pomyślnie!");
            setAvailableSlots(prev => prev.filter(s => s.startTime !== slot.startTime));
        } else {
            alert("Błąd rezerwacji.");
        }
    };

    return (
        <div className="rezerwacja-wrapper">
            <div id="panelrejestracja" style={{ width: '700px' }}>
                
                <div className="form-grid">
                    <div className="input-group">
                        <h4>Specjalizacja</h4>
                        <select onChange={(e) => setSelectedSpec(e.target.value)} value={selectedSpec}>
                            <option value="">Wybierz...</option>
                            {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <h4>Data wizyty</h4>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                    </div>
                </div>

                {selectedSpec && (
                    <div className="doctors-list">
                        <h4>Dostępni lekarze:</h4>
                        {doctors.length > 0 ? (
                            doctors.map(doc => (
                                <div key={doc.id} 
                                     className={`doctor-card ${selectedDoctor?.id === doc.id ? 'active' : ''}`}
                                     onClick={() => setSelectedDoctor(doc)}>
                                    <p><strong>{doc.firstName} {doc.lastName}</strong></p>
                                    <p>{doc.specialization}</p>
                                </div>
                            ))
                        ) : <p className="error-text">Brak lekarzy o tej specjalizacji.</p>}
                    </div>
                )}

                {selectedDoctor && date && (
                    <div className="slots-container">
                        <h4>Dostępne godziny ({date}):</h4>
                        {loading ? <p>Ładowanie...</p> : (
                            <div className="slots-grid">
                                {availableSlots.length > 0 ? (
                                    availableSlots.map((slot, index) => (
                                        <button key={index} className="slot-btn" onClick={() => handleBook(slot)}>
                                            {slot.startTime}
                                        </button>
                                    ))
                                ) : <p className="error-text">Brak wolnych terminów w tym dniu.</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}