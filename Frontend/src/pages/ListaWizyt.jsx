import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './CSS/ListaWizyt.css';

export default function ListaWizyt() {
    const [appointments, setAppointments] = useState([]);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setUserRole(role);
                console.log("Zalogowany jako:", role);
            } catch (error) {
                console.error("Błąd dekodowania tokena:", error);
            }
        }

        fetch('http://localhost:5246/api/appointment/my-appointments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`Błąd: ${res.status}`);
            return res.json();
        })
        .then(data => {
            setAppointments(data);
        })
        .catch(err => console.error("Błąd pobierania wizyt:", err));
    }, []);

    const updateStatus = (appointmentId, newStatus) => {
        fetch(`http://localhost:5246/api/appointment/update-status`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
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
        const dateKey = new Date(app.date).toLocaleDateString();
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(app);
        return acc;
    }, {});

    return (
        <div className="lista-wizyt-container">
            <h2>Twoje wizyty ({userRole === 'Doctor' ? 'Panel Lekarza' : 'Panel Pacjenta'})</h2>

            {appointments.length === 0 ? (
                <p className="no-data">Brak zaplanowanych wizyt.</p>
            ) : (
                Object.keys(groupedByDate).sort().map(date => (
                    <div key={date} className="day-group">
                        <h3 className="date-header">{date}</h3>
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th>Godzina</th>
                                    {userRole === 'Doctor' ? (
                                        <th>Pacjent</th>
                                    ) : (
                                        <>
                                            <th>Lekarz</th>
                                            <th>Specjalizacja</th>
                                        </>
                                    )}
                                    <th>Status</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedByDate[date].sort((a, b) => a.time.localeCompare(b.time)).map(app => (
                                    <tr key={app.id}>
                                        <td>{app.time}</td>
                                        
                                        {userRole === 'Doctor' ? (
                                            <td>{app.patientFirstName} {app.patientLastName}</td>
                                        ) : (
                                            <>
                                                <td>dr {app.doctorFirstName} {app.doctorLastName}</td>
                                                <td>{app.doctorSpecialization}</td>
                                            </>
                                        )}

                                        <td>
                                            <span className={`status-badge ${app.status.toLowerCase()}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>
                                            {app.status === 'Zaplanowana' && (
                                                <div className="action-btns">
                                                    {userRole === 'Doctor' && (
                                                        <button className="btn-done" onClick={() => updateStatus(app.id, 'Zakończona')}>Zakończ</button>
                                                    )}
                                                    <button className="btn-cancel" onClick={() => updateStatus(app.id, 'Odwołana')}>Anuluj</button>
                                                </div>
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