import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError(null);
      const data = JSON.parse(input);
      const res = await axios.post('https://bajaj-backend-oogj.onrender.com/bfhl', data);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input or request failed.');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    const options = {
      Alphabets: alphabets,
      Numbers: numbers,
      'Highest lowercase alphabet': highest_lowercase_alphabet
    };

    return (
      <div>
        {selectedOptions.map(option => (
          <div key={option}>
            <h3>{option}</h3>
            <pre>{JSON.stringify(options[option], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Bajaj Finserv contest</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          rows="10"
          cols="50"
          placeholder='{"data": ["A", "C", "z"]}'
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <label>Select options to display:</label>
        <select multiple={true} onChange={handleSelectChange}>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      {renderResponse()}
    </div>
  );
}

export default App;
