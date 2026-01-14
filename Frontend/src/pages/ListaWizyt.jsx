import React, { useState, useEffect } from 'react';
import './CSS/ListaWizyt.css';

export default function ListaWizyt() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
    fetch('/api/getMyAppointments')
        .then(res => res.json())
        .then(data => setAppointments(data))
        .catch(err => console.error("Błąd pobierania wizyt:", err));
}, []);

    const updateStatus = (appointmentId, newStatus) => {
    fetch(`/api/updateAppointmentStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId, status: newStatus })
    })
    .then(res => {
    if (res.ok) {
        setAppointments(appointments.map(a =>
        a.id === appointmentId ? { ...a, status: newStatus } : a
        ));
    }
    });
};

    const groupedByDate = appointments.reduce((acc, app) => {
    if (!acc[app.date]) acc[app.date] = [];
    acc[app.date].push(app);
    return acc;
}, {});

return (
    <div className="lista-wizyt">
    <h2>Twoje wizyty</h2>

    {appointments.length === 0 ? (
        <p>Brak zaplanowanych wizyt.</p>
    ) : (
        Object.keys(groupedByDate).sort().map(date => (
        <div key={date} className="day-group">
            <h3>{date}</h3>
            <table>
            <thead>
                <tr>
                <th>Pacjent</th>
                <th>Godzina</th>
                <th>Status</th>
                <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {groupedByDate[date].sort((a, b) => a.start.localeCompare(b.start)).map(app => (
                <tr key={app.id}>
                    <td>{app.patientName || app.patientId}</td>
                    <td>{app.start} - {app.end}</td>
                    <td>{app.status}</td>
                    <td>
                        {app.status === 'Scheduled' && (
                        <>
                        <button onClick={() => updateStatus(app.id, 'Completed')}>Zakończ</button>
                        <button onClick={() => updateStatus(app.id, 'Cancelled')}>Anuluj</button>
                        </>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        ))
    )}
    </div>
);
}
