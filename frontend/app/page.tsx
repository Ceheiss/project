'use client'
import WelcomeSummary from './components/welcome-summary/WelcomeSummary';
import BarChart from "./components/techniques-chart/TechniquesChart";
import TrainingChart from "./components/training-chart/TrainingChart";
import DisciplinesChart from "./components/disciplines-chart/DisciplinesChart";

export default function Dashboard() {

  return (
    <section className='page-container'>
      <h1>Dashboard</h1>
      <WelcomeSummary />
      <section className='primary-chart'>
        <TrainingChart />
      </section>
      <section className='secondary-chart'>
        <div>
          <BarChart />
        </div>
        <div>
          <DisciplinesChart />
        </div>
      </section>
    </section>
  );
}
