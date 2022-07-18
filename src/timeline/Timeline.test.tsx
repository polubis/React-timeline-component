import { Timeline } from "./Timeline";
import { render } from "@testing-library/react";
import { DataSetsKeys, DATA_SETS } from "./mocks";

describe("<Timeline />", () => {
  it("renders correctly for different data sets", () => {
    const fragments = (Object.keys(DATA_SETS) as DataSetsKeys[]).map((key) =>
      render(
        <Timeline data={DATA_SETS[key].data} onItemClick={() => {}} />
      ).asFragment()
    );

    fragments.forEach((fragment) => {
      expect(fragment).toMatchSnapshot();
    });
  });
});
