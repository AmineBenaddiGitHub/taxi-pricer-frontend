import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styleguide/theme';
import Form from './components/CustomForm';
import ReservationTile, {
  TaxiReservationData,
} from './components/ReservationTile';
import { initialPayload } from './data/initialPayload';

const App: React.FC = () => {
  const [reservations, setReservations] = useState<TaxiReservationData[]>(
    initialPayload,
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Form setReservations={setReservations} reservations={reservations} />
        {reservations.map(e => (
          <ReservationTile key={e.id} element={e} />
        ))}
      </div>
    </ThemeProvider>
  );
};

export default App;
