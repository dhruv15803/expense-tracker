import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { GlobalContext } from "../App";

const Dashboard = () => {

  const { totalIncome, totalExpense,currBalance } = useContext(GlobalContext);
  console.log(currBalance);

  return (
    <>
      <div className="flex items-center gap-4 justify-center mx-10">
        <div className="flex flex-col justify-center items-center text-xl shadow-lg border-2 rounded-lg p-8">
          <p>My funds</p>
          <p className="text-blue-500">{currBalance}</p>
        </div>
        <div className="flex flex-col justify-center items-center text-xl shadow-lg border-2 rounded-lg p-8">
          <p>Total income</p>
          <p className="text-blue-500">{totalIncome} Rs</p>
        </div>
        <div className="flex flex-col justify-center items-center text-xl shadow-lg border-2 rounded-lg p-8">
          <p>Total expense</p>
          <p className="text-blue-500">{totalExpense} Rs</p>
        </div>
      </div>
      <div className="flex items-center gap-2 m-10">
        <div className="w-[50%]">
          <Bar
            data={{
              labels: ['current balance',"total income", "total expense"],
              datasets: [
                {
                  label: "total income vs total expense",
                  data: [currBalance,totalIncome, totalExpense],
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
