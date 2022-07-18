import { ItemsCount, TimelineSetup } from "../timeline/models";

const calculateHalfOfContent = (
  { markerSize, groupPadding, itemHeight, itemsGap }: TimelineSetup,
  value: number
): number => {
  let total = 0;

  if (value > 0) {
    total += markerSize;
    total += groupPadding * 2; // * 2 because top/bottom
    total += itemHeight * value;
    total += itemsGap * (value - 1);
  }

  return total;
};

export const calculateContentHeight = (
  setup: TimelineSetup,
  { top, bottom }: ItemsCount
) => {
  return (
    setup.markerSize + // height of mid marker
    calculateHalfOfContent(setup, top) + // top height
    calculateHalfOfContent(setup, bottom) // bottom height
  );
};
