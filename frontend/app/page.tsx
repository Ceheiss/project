'use client'
import WelcomeSummary from './components/WelcomeSummary';
import BarChart from "./components/TechniquesChart";
import TrainingChart from "./components/TrainingChart";
import DisciplinesChart from "./components/DisciplinesChart";

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
