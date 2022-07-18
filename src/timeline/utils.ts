import { TimelineData, ItemsCount, TimelineSetup } from "./models";

export const scaleSetup = (setup: TimelineSetup): TimelineSetup => {
  return (
    Object.entries(setup) as [
      keyof TimelineSetup,
      TimelineSetup[keyof TimelineSetup]
    ][]
  )
    .filter(([key]) => key !== "scale" && key !== "padding")
    .reduce<TimelineSetup>(
      (acc, [key, value]) => ({
        ...acc,
        [key]: typeof value === "number" ? value * setup.scale : value,
      }),
      {} as TimelineSetup
    );
};

export const countItems = (data: TimelineData): ItemsCount => {
  const { top, bottom } = data.reduce(
    (acc, group) => {
      const itemsLength = group.items.length;

      if (group.location === "top") {
        acc.top = itemsLength > acc.top ? itemsLength : acc.top;
      } else {
        acc.bottom = itemsLength > acc.bottom ? itemsLength : acc.bottom;
      }

      return acc;
    },
    { top: 0, bottom: 0 }
  );

  return { top, bottom };
};

const calculateHalfOfContent = (
  { markerSize, groupPadding, itemHeight, itemsGap }: TimelineSetup,
  value: number
): number => {
  let total = 0;

  if (value > 0) {
    total += markerSize;
    total += groupPadding * 2;
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
    setup.markerSize +
    calculateHalfOfContent(setup, top) +
    calculateHalfOfContent(setup, bottom)
  );
};

export const calculateLineXWidth = (
  dataLength: number,
  { markerSize, markersGap }: TimelineSetup
): number => {
  let lineXWidth = dataLength * markerSize + (dataLength - 1) * markersGap;

  if (lineXWidth < 0) {
    return 0;
  }

  return lineXWidth;
};

export const calculateLineXOffsetTop = (
  { markerSize, groupPadding, itemHeight, itemsGap }: TimelineSetup,
  count: ItemsCount
): number => {
  if (count.top === 0) {
    return 0;
  }

  return (
    markerSize +
    groupPadding * 2 +
    itemHeight * count.top +
    itemsGap * (count.top - 1)
  );
};

export const calculateLineYHeight = (
  setup: TimelineSetup,
  itemsLength: number
): number => {
  const lineYHeight =
    setup.groupPadding * 2 +
    setup.itemHeight * itemsLength +
    setup.itemsGap * (itemsLength - 1);

  return lineYHeight;
};
