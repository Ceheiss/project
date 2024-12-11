import { useEffect, useState } from "react";

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
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Hello {summaryData.username}!</h2>
      <h3>You have logged {summaryData.totalTraining} Training sessions</h3>
      <h3>From 1 to 5, your average feel has been {summaryData.averageMood}</h3>
    </div>
  )
}

export default WelcomeSummary;