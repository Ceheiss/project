import { useEffect, useState } from "react";
import Spinner from "./Spinner";
interface SummaryData {
  user_name: string;
  total_training: number;
  average_mood: number;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const WelcomeSummary = () => {
  const [summaryData, setSummaryData] = useState({
    username: '',
    totalTraining: 0,
    averageMood: 0
  });
  const url = `${baseURL}/chart-data/summary`;
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(url, { credentials: 'include'});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const normalizeData = (summaryData: SummaryData) => ({
          username: summaryData.user_name,
          totalTraining: summaryData.total_training,
          averageMood: summaryData.average_mood,
        });     
        setSummaryData(normalizeData(data));
      } catch (error) {
        console.error('Error getting data summary:', error);
      }
    }
    fetchInfo();
  }, [url]);


  return summaryData ? (
    <div className="welcome-summary">
      <h2>Hello <span id="username">{summaryData.username}</span>!</h2>
      <h3>You have logged <span id="total-training">{summaryData.totalTraining}</span> Training Sessions</h3>
      <h3>On a scale from 1 to 5, your average feel has been <span id="average-mood">{summaryData.averageMood + 1}</span></h3>
    </div>
  ) : <Spinner />;
}

export default WelcomeSummary;