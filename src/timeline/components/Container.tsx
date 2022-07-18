import { ReactElement } from "react";
import { TimelineSetup } from "timeline/models";
import css from "./Container.module.scss";

export interface ContainerProps {
  padding: TimelineSetup["padding"];
  children: ReactElement;
  height: number;
}

export const Container = ({ children, height, padding }: ContainerProps) => {
  return (
    <div className={css.container} style={{ padding }}>
      <div className={css.content} style={{ height }}>
        {children}
      </div>
    </div>
  );
};
