import Papa from "papaparse";
import cityData from "../assets/world-cities_csv.csv";

export const getCities = async (callback) => {
  try {
    const result = await fetch(cityData);
    const text = await result.text();
    Papa.parse(text, {
      header: true,
      complete: callback,
    });
  } catch (error) {
    console.log(error);
  }
};
