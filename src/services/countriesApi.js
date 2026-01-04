import axios from "axios";

export const getCountries = async () => {
  const res = await axios.get("http://localhost:5000/countries");

  return res.data.map((country) => ({
    name: country.name.common,        
    official: country.name.official,
    flag: country.flags.png || country.flags.svg,           
  }));
};
