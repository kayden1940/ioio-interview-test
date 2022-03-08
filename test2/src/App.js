import "./App.css";
import useSWR from "swr";
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const { data, error } = useSWR(
    "https://oxihr4s9a6.execute-api.ca-central-1.amazonaws.com/prod/9daysweather",
    (...args) => fetch(...args).then((res) => res.json())
  );

  return (
    <div className="App">
      <header className="App-header">
        {!data?.body ? (
          !error ? (
            <Spinner animation="border" />
          ) : (
            <p>error</p>
          )
        ) : (
          data?.body.map((day) => {
            const { forecastWeather, forecastDate } = day;
            return (
              <span
                key={forecastDate}
              >{`${forecastDate}: ${forecastWeather}`}</span>
            );
          })
        )}
      </header>
    </div>
  );
}

export default App;
