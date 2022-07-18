const SETUP = {
  itemHeight: 50,
  markerSize: 24,
  markersGap: 32,
  itemsGap: 12,
  groupPadding: 48,
  lineXHeight: 4,
  lineYWidth: 2,
  itemWidth: 206,
  scale: 1,
  padding: "22px 36px 22px 36px",
};

const ITEM = { avatar: "url", title: "TDD in React ddd" };

const DATA = [
  {
    date: new Date(),
    displayed: true, // Determines whether the group is displayed
    blank: false, // Determines whether the group & mid marker is displayed
    empty: false, // Determines whether the group item text is visible
    location: "bottom", // Determines whether the group is located on top or bottom
    items: [ITEM, ITEM, ITEM],
  },
];

// Usage
const App = () => <Timeline data={DATA} setup={SETUP} />;
