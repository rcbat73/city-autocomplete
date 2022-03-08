import React, { useState, useEffect, useRef } from "react";
import CustomAutocomplete from "./components/CustomAutocomplete/CustomAutocomplete";
import useDebounce from "./hooks/useDebounce";
import CityData from "./components/CityData/CityData";
import { getCities } from "./api/getCities";
import "./App.css";

function App() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const citiesRef = useRef([]);

  useEffect(() => {
    const handleCities = (results) => {
      const data = results.data.slice(0, 1000);
      citiesRef.current = data;
      setOptions(data);
    };
    getCities(handleCities);
  }, []);

  const handleinputChange = useDebounce((event) => {
    setOptions([]);
    const newOptions = citiesRef.current.filter((city) => {
      return city.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setOptions(newOptions);
    setLoading(false);
  }, 1000);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedOption(newValue ? newValue.name : "");
    setLoading(false);
  };

  const handleAutocompleteInputChange = () => setLoading(true);

  return (
    <div className="App">
      <header className="App-header">
        <CustomAutocomplete
          options={options}
          label="city"
          onInputChange={handleinputChange}
          onAutocompleteInputChange={handleAutocompleteInputChange}
          onAutocompleteChange={handleAutocompleteChange}
          loading={loading}
          loadingText="Loading..."
          size="20"
          width="300px"
        />
        {selectedOption && (
          <CityData data={citiesRef.current} selectedOption={selectedOption} />
        )}
      </header>
    </div>
  );
}

export default App;
