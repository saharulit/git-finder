import { useEffect, useState } from 'react';
import './App.css';
import GitHubUsersList from './routes/GitHubUsersList';

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
  return <GitHubUsersList />;
}

export default App;
