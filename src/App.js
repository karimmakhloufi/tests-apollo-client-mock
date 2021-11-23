import { useQuery, gql } from "@apollo/client";
import "./App.css";

export const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      details
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      {data.launches.map((launch) => (
        <li key={launch.launch_date_utc}>{launch.launch_date_utc}</li>
      ))}
    </div>
  );
}

export default App;
