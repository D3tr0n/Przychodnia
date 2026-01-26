import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PanelUzytkownika.css';

export default function PanelUzytkownika() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Nowy stan na błędy
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log("Brak tokena w localStorage - przekierowanie do logowania");
        navigate('/');
        return;
      }

      try {
        console.log("Wysyłam zapytanie do API z tokenem...");
        const res = await fetch('http://localhost:5246/api/account/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log("Status odpowiedzi z API:", res.status);

        if (res.ok) {
          const data = await res.json();
          console.log("Dane pobrane pomyślnie:", data);
          setUser(data);
        } else {
          const errorText = await res.text();
          console.error("Błąd serwera:", errorText);
          setErrorMessage(`Błąd ${res.status}: Serwer odrzucił zapytanie.`);
        }
      } catch (error) {
        console.error("Błąd sieci/połączenia:", error);
        setErrorMessage("Błąd połączenia: Serwer .NET nie odpowiada.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);


  if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Ładowanie danych profilu...</div>;

  if (errorMessage) return (
    <div style={{color: 'red', textAlign: 'center', marginTop: '50px'}}>
      <h2>{errorMessage}</h2>
      <p>Sprawdź konsolę (F12) i upewnij się, że backend działa.</p>
      <button onClick={() => navigate('/')}>Wróć do logowania</button>
    </div>
  );

  if (!user) return null;

  return (
    <div id="dane">
      <div id="lewo">
        <div id="imie">
          <h2>Imię</h2>
          <h3>{user.firstName || "Brak danych"}</h3>
        </div>

        <div id="nazwisko">
          <h2>Nazwisko</h2>
          <h3>{user.lastName || "Brak danych"}</h3>
        </div>

        <div id="email">
          <h2>E-mail</h2>
          <h3>{user.email || "Brak danych"}</h3>
        </div>

        <div id="data-urodzenia">
          <h2>Data urodzenia</h2>
          <h3>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "brak"}</h3>
        </div>
      </div>

      <div id="prawo">
        <div id="telefon">
          <h2>Nr. telefonu</h2>
          <h3>{user.phoneNumber || "Brak danych"}</h3>
        </div>

        <div id="adres">
          <h2>Adres</h2>
          <h3>{user.address || "Brak danych"}</h3>
        </div>

        <div id="miasto">
          <h2>Miasto</h2>
          <h3>{user.city || "Brak danych"}</h3>
        </div>

        <div id="kod-pocztowy">
          <h2>Kod pocztowy</h2>
          <h3>{user.zipCode || "Brak danych"}</h3>
        </div>

        <div id="kraj">
          <h2>Kraj</h2>
          <h3>{user.country || "Polska"}</h3>
        </div>
        
        <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} 
                style={{marginTop: '20px', padding: '10px', cursor: 'pointer', background: 'red', color: 'white', border: 'none', borderRadius: '5px'}}>
          Wyloguj
        </button>
      </div>
    </div>
  );
}