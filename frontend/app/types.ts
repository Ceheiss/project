export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[] | string[];
    backgroundColor: string | string[];
    pointBackgroundColor?: string | string[];
    borderColor: string | string[];
    borderWidth?: number;
    pointStyle?: string,
    pointRadius?: number;
    pointHoverRadius?: number;
  }[];
}