import { useEffect, useState } from "react";
import customFetch from "../utils/custom-fetch";
import { DoughnutChart } from "../components/DoughnutChart";

function AdminDashboard() {
  const [cityWiseData, setCityWise] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await customFetch(
        `${import.meta.env.VITE_BACKEND_API_URI}/complaints`
      );
      console.log(res);
      setCityWise(res);
    })();
  }, []);
  if (!cityWiseData) return <div>AdminDashboard</div>;

  const cities = cityWiseData.reduce((acc, curr) => [...acc, curr.city], []);
  console.log("cities", cities);
  const labels = Object.keys(cityWiseData[0]).filter((val) => val != "city");
  console.log("labels", labels);
  const finalCityWiseData = [...cityWiseData].reduce((acc, curr) => {
    const wasteWise = Object.entries(curr)
      .filter(([k]) => k != "city")
      .map(([, v]) => v);
    acc[curr.city] = wasteWise;
    return acc;
  }, {});
  console.log("Final-citywise", finalCityWiseData);

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "600px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {cities.map((city, idx) => (
          <button
            key={"city-names" + idx}
            onClick={() => {
              setSelectedCity(city);
            }}
          >
            {city}
          </button>
        ))}
      </div>

      {selectedCity && (
        <DoughnutChart
          values={finalCityWiseData[selectedCity]}
          labels={labels}
        />
      )}
    </main>
  );
}

export default AdminDashboard;
