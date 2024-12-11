'use client'
import WelcomeSummary from './components/WelcomeSummary';
import BarChart from "./components/TechniquesChart";
import TrainingChart from "./components/TrainingChart";
import DisciplinesChart from "./components/DisciplinesChart";

export default function Dashboard() {

  return (
    <div>
      <h1>Dashboard</h1>
      <WelcomeSummary />
      <TrainingChart />
      <BarChart />
      <DisciplinesChart />
    </div>
  );
}
