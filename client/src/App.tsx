import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [beatles, setBeatles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/api/beatles', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(({ data }) => {
        console.log(data);
        setBeatles(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <ul>
      {beatles.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

export default App;
