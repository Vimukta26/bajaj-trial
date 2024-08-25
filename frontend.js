import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      // Validate JSON input
      const data = JSON.parse(jsonInput);

      // Call the API
      const res = await axios.post('https://your-heroku-app.herokuapp.com/bfhl', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input or server error.');
    }
  };

  const handleOptionChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const filteredResponse = {
      numbers: selectedOptions.includes('Numbers') ? numbers : [],
      alphabets: selectedOptions.includes('Alphabets') ? alphabets : [],
      highest_lowercase_alphabet: selectedOptions.includes('Highest lowercase alphabet') ? highest_lowercase_alphabet : []
    };

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Vimukta's Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON data here...'
          rows="6"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <label>
        Select options to display:
        <select multiple={true} onChange={handleOptionChange}>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </label>
      <br />
      {error && <div className="error">{error}</div>}
      {renderResponse()}
    </div>
  );
};

export default App;
