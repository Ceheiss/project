import { useEffect, useState } from "react";
import Spinner from "./Spinner";
interface SummaryData {
  user_name: string;
  total_training: number;
  average_mood: number;
}

const WelcomeSummary = () => {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({
    username: '',
    totalTraining: 0,
    averageMood: 0
  });
  const url = 'http://localhost:5000/chart-data/summary';
  useEffect(() => {
    async function fetchSummaryData() {
      try {
        const res = await fetch(url, { credentials: 'include'});
        const data = await res.json();
        const normalizeData = (summaryData: SummaryData) => ({
          username: summaryData.user_name,
          totalTraining: summaryData.total_training,
          averageMood: summaryData.average_mood,
        });     
        setSummaryData(normalizeData(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummaryData();
  }, []);
  if (loading) return <Spinner />;
  return (
    <div className="welcome-summary">
      <h2>Hello <span id="username">{summaryData.username}</span>!</h2>
      <h3>You have logged <span id="total-training">{summaryData.totalTraining}</span> Training Sessions</h3>
      <h3>On a scale from 1 to 5, your average feel has been <span id="average-mood">{summaryData.averageMood}</span></h3>
    </div>
  )
}

export default WelcomeSummary;