export interface TimelineSetup {
  itemHeight: number;
  markerSize: number;
  markersGap: number;
  itemsGap: number;
  groupPadding: number;
  lineXHeight: number;
  lineYWidth: number;
  itemWidth: number;
  scale: number;
  padding: string;
}

export interface TimelineDataItem {
  avatar: string;
  title: string;
}

export type TimelineGroupLocation = "top" | "bottom";

export interface TimelineGroup {
  date: Date;
  location: TimelineGroupLocation;
  displayed: boolean;
  blank: boolean;
  empty: boolean;
  items: TimelineDataItem[];
}

export type TimelineData = TimelineGroup[];

export interface TimelineProps {
  data: TimelineData;
  setup?: TimelineSetup;
  onItemClick: (group: TimelineGroup) => void;
}

export interface ItemsCount {
  bottom: number;
  top: number;
}
