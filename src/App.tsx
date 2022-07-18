import { useState } from "react";
import { DataSetsKeys, DATA_SETS } from "timeline/mocks";
import { TimelineProps } from "timeline/models";
import { Timeline } from "timeline/Timeline";
import css from "./App.module.scss";

function App() {
  const [current, setCurrent] = useState(DATA_SETS.BIG);

  const handleItemClick: TimelineProps["onItemClick"] = (group): void => {
    console.log(group);
  };

  return (
    <>
      <Timeline data={current.data} onItemClick={handleItemClick} />

      <div className={css.footer}>
        {(Object.keys(DATA_SETS) as DataSetsKeys[]).map((key) => (
          <button key={key} onClick={() => setCurrent(DATA_SETS[key])}>
            {DATA_SETS[key].label}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
