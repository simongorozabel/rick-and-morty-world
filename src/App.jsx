import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Location from "./components/Location";
import { getLocationById } from "./services/getLocationById";
import { getRandomNumber } from "./services/getRandomNumber";
import Loader from "./components/Loader";
import ResidentCard from "./components/ResidentCard";

function App() {
  const [location, setLocation] = useState(null);
  const [inputLocation, setInputLocation] = useState("");
  const [errorInputLocation, setErrorInputLocation] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    // if (!/^\d$/.test(newValue)) {
    //   return;
    // } else
    if (newValue && !Number(newValue)) {
      setErrorInputLocation("ID must be a number.");
    } else if (newValue && Number(newValue) < 1) {
      setErrorInputLocation("ID must be greater than 0");
    } else if (newValue && Number(newValue) > 126) {
      setErrorInputLocation("ID must be lower than 127");
    } else {
      setErrorInputLocation("");
    }

    setInputLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    if (errorInputLocation) return;

    let locationInfo;

    if (!inputLocation) {
      const randomId = getRandomNumber(1, 126);
      locationInfo = await getLocationById(randomId);
    } else {
      locationInfo = await getLocationById(inputLocation);
    }
    setLocation(locationInfo);
  };

  useEffect(() => {
    const loadLocation = async () => {
      const locationInfo = await getLocationById(getRandomNumber(1, 126));
      setLocation(locationInfo);
      console.log(locationInfo);
    };
    loadLocation();
  }, []);

  return (
    <>
      <Header />
      {location ? <Location location={location} /> : <Loader />}

      <form className="form__container" onSubmit={handleSubmit}>
        <input type="text" value={inputLocation} onChange={handleChange} />
        <p style={{ color: "red", margin: "10px" }} role="alert">
          {errorInputLocation}
        </p>

        <button type="submit">Search Location</button>
      </form>

      <main>
        {location ? (
          location.residents ? (
            location.residents.map((resident) => (
              <ResidentCard key={resident} link={resident} />
            ))
          ) : (
            "No Data..."
          )
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}

export default App;
