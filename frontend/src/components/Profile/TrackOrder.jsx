import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import Chart from "chart.js/auto";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [timelineChart, setTimelineChart] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  useEffect(() => {
    if (orders && id) {
      const data = orders.find((item) => item._id === id);
      if (data) {
        updateTimelineChart(data.status);
      }
    }
  }, [orders, id]);

  const updateTimelineChart = (status) => {
    if (timelineChart) {
      const statusIndex = getStatusIndex(status);
      timelineChart.data.labels = [
        "Processing",
        "Transferred to delivery partner",
        "Shipping",
        "Received",
        "On the way",
        "Delivered",
        "Processing refund",
        "Refund Success",
      ];
      timelineChart.data.datasets[0].data = Array.from({ length: 8 }, (_, i) =>
        i === statusIndex ? 1 : 0
      );
      timelineChart.update();
    }
  };

  const getStatusIndex = (status) => {
    switch (status) {
      case "Processing":
        return 0;
      case "Transferred to delivery partner":
        return 1;
      case "Shipping":
        return 2;
      case "Received":
        return 3;
      case "On the way":
        return 4;
      case "Delivered":
        return 5;
      case "Processing refund":
        return 6;
      case "Refund Success":
        return 7;
      default:
        return -1;
    }
  };

  useEffect(() => {
    const ctx = document.getElementById("timelineChart");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Processing",
          "Transferred to delivery partner",
          "Shipping",
          "Received",
          "On the way",
          "Delivered",
          "Processing refund",
          "Refund Success",
        ],
        datasets: [
          {
            label: "Order Status",
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    setTimelineChart(chart);

    return () => {
      if (timelineChart) {
        timelineChart.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <canvas id="timelineChart" />
    </div>
  );
};

export default TrackOrder;
