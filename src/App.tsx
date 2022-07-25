import { useState } from "react";
import { Timeline, DataSetsKeys, DATA_SETS } from "./timeline";

function App() {
  const [current, setCurrent] = useState(DATA_SETS.BIG);

  return (
    <>
      <Timeline data={current.data} />

      <div
        style={{
          display: "flex",
          padding: "24px",
        }}
      >
        {(Object.keys(DATA_SETS) as DataSetsKeys[]).map((key) => (
          <button
            key={key}
            style={{
              marginRight: "24px",
              padding: "12px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={() => setCurrent(DATA_SETS[key])}
          >
            {DATA_SETS[key].label}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
