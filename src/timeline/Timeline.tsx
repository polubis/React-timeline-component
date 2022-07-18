import { format } from "date-fns";
import { Fragment } from "react";
import { Container } from "./components";
import { DEFAULT_SETUP } from "./config";
import { TimelineProps } from "./models";
import css from "./Timeline.module.scss";
import {
  calculateContentHeight,
  calculateLineXOffsetTop,
  calculateLineXWidth,
  calculateLineYHeight,
  countItems,
  scaleSetup,
} from "./utils";

export const Timeline = ({
  data,
  setup = DEFAULT_SETUP,
  onItemClick,
}: TimelineProps) => {
  const {
    itemHeight,
    markerSize,
    markersGap,
    itemsGap,
    groupPadding,
    lineXHeight,
    lineYWidth,
    itemWidth,
  } = scaleSetup(setup);
  const count = countItems(data);
  const contentHeight = calculateContentHeight(setup, count);
  const lineXContainerTop = calculateLineXOffsetTop(setup, count);
  const lineXWidth = calculateLineXWidth(data.length, setup);

  return (
    <Container height={contentHeight} padding={setup.padding}>
      <div
        className={css.lineXContainer}
        style={{
          height: markerSize,
          transform: `translate(0px, ${lineXContainerTop}px)`,
          width: lineXWidth,
        }}
      >
        <div className={css.lineX} style={{ height: lineXHeight }} />

        {data.map((group, groupIdx) => {
          const { date, location, displayed, blank, empty, items } = group;
          const left = groupIdx * (markersGap + markerSize);
          const style = {
            height: markerSize,
            width: markerSize,
            borderWidth: lineYWidth,
          };
          const lineYHeight = calculateLineYHeight(setup, items.length);
          const lineYOffset = lineYHeight / 2 + markerSize / 2;
          const isTop = location === "top";

          return (
            <Fragment key={date.toDateString()}>
              {blank || (
                <div
                  className={`${css.marker} ${css.midMarker}`}
                  style={{
                    ...style,
                    transform: `translate(${left}px)`,
                  }}
                />
              )}

              {items.length > 0 && displayed && !blank && (
                <>
                  <div
                    className={css.lineY}
                    style={{
                      width: lineYWidth,
                      transform: `translate(${
                        left + markerSize / 2 - lineYWidth / 2
                      }px, ${isTop ? "-" : ""}${lineYOffset}px`,
                      height: lineYHeight,
                    }}
                  />

                  <div
                    className={`${css.marker} ${css.edgeMarker}`}
                    style={{
                      ...style,
                      transform: `translate(${left}px, ${
                        isTop
                          ? `-${lineYHeight + markerSize}px`
                          : `${lineYHeight + markerSize}px`
                      })`,
                    }}
                  >
                    {empty || (
                      <span
                        style={{
                          paddingLeft: `${
                            markerSize / 2 + itemHeight / 2 + markerSize / 2
                          }px`,
                        }}
                      >
                        {format(date, "dd/MM/yyyy")}
                      </span>
                    )}
                  </div>

                  {items.map((item, itemIdx) => {
                    const offsetTop =
                      groupPadding +
                      itemHeight +
                      itemHeight * itemIdx +
                      itemsGap * itemIdx;

                    return (
                      <div
                        key={itemIdx}
                        className={css.item}
                        onClick={() => onItemClick(group)}
                        style={{
                          height: itemHeight,
                          width: itemWidth,
                          transform: `translate(${
                            groupIdx * (markersGap + markerSize) -
                            markerSize / 2
                          }px, ${
                            isTop ? `-${offsetTop}px` : `${offsetTop}px`
                          })`,
                          ...(isTop ? { top: 0 } : { bottom: 0 }),
                        }}
                      >
                        <img src={item.avatar} alt="Timeline avatar" />
                        {empty || (
                          <span style={{ marginLeft: markerSize / 2 + "px" }}>
                            {item.title}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </Fragment>
          );
        })}
      </div>
    </Container>
  );
};
