
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from 'react-bootstrap';

export const AverageTurnAround = () => {
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState(null);

  useEffect(() => {
    // Get the average turnaround time from the Django backend
    axios
      .get("http://127.0.0.1:8000/client/get_average_turn_around/")
      .then((response) => {
        setAverageTurnaroundTime(response.data.average_turnaround_time);
      })
      .catch((error) => {
        console.error("Error fetching average turnaround time:", error);
      });
  }, []);

  // Function to determine the badge color based on averageTurnaroundTime
  const getBadgeColor = () => {
    if (averageTurnaroundTime !== null) {
      return averageTurnaroundTime < 5 ? "danger" : "success";
    }
    return "secondary"; // Default color when averageTurnaroundTime is still null
  };

  return (
    <div style={{margin:"15px"}}>
      <p>
        The average turnaround time is: <Badge bg={getBadgeColor()}>{averageTurnaroundTime}</Badge>
      </p>
    </div>
  );
};
