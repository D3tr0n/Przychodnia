import './CSS/rejestracja.css'; // Używamy tego samego CSS
import lekarzImg from './media/loginlekarze.jpg'; // Możesz użyć tego samego lub innego zdjęcia
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RejestracjaLekarza() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!firstName) newErrors.firstName = "Imię jest wymagane.";
        if (!lastName) newErrors.lastName = "Nazwisko jest wymagane.";
        if (!specialization) newErrors.specialization = "Specjalizacja jest wymagana.";
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) newErrors.username = "Nieprawidłowy format e-mail.";

        if (password !== confirmPassword) newErrors.password = "Hasła nie są identyczne.";
        if (password.length < 6) newErrors.passwordLength = "Minimum 6 znaków.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await fetch("http://localhost:5246/api/account/register/doctor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email: username,
                    password,
                    firstName,
                    lastName,
                    specialization
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                alert("Błąd: " + (errData.message || "Rejestracja nieudana"));
                return;
            }

            alert("Konto lekarza utworzone pomyślnie!");
            navigate('/');
        } catch (err) {
            console.error(err);
            alert("Błąd połączenia z API!");
        }
    };

    return (
        <div className="registration-container">
            <div id="panellogowanie">
                <div id="srodek">
                    <h2>Rejestracja Lekarza</h2>
                    <form id="formularz" onSubmit={handleRegister}>
                        
                        <div className="input-group">
                            <h4>E-mail (Login)</h4>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="lekarz@przychodnia.pl"/>
                            {errors.username && <p className="error-text">{errors.username}</p>}
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <h4>Hasło</h4>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <h4>Potwierdź</h4>
                                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                            </div>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}

                        <div className="input-row">
                            <div className="input-group">
                                <h4>Imię</h4>
                                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                            </div>
                            <div className="input-group">
                                <h4>Nazwisko</h4>
                                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="input-group">
                            <h4>Specjalizacja</h4>
                            <select 
                                value={specialization} 
                                onChange={e => setSpecialization(e.target.value)}
                                className="custom-select"
                            >
                                <option value="">Wybierz specjalizację...</option>
                                <option value="Kardiolog">Kardiolog</option>
                                <option value="Pediatra">Pediatra</option>
                                <option value="Ortopeda">Ortopeda</option>
                                <option value="Internista">Internista</option>
                                <option value="Neurolog">Neurolog</option>
                            </select>
                            {errors.specialization && <p className="error-text">{errors.specialization}</p>}
                        </div>

                        <button type="submit">Zarejestruj Lekarza</button>

                        <div className="lekarz-link">
                            <span>Jesteś pacjentem? </span>
                            <Link to="/rejestracja">Wróć do rejestracji pacjenta</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}