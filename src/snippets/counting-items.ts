import { TimelineData, ItemsCount } from "../timeline/models";

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
