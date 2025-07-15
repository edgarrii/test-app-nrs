export interface State {
  state: string;
  population: number;
  counties: number;
  detail: string;
}

export interface StateDetail {
  county: string;
  population: number;
}

export interface StateListItem extends State {
  highlighted: boolean;
}
