import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";

const IncomeCard = ({
  incomeTitle,
  incomeAmount,
  incomeDate,
  incomeCategoryId,
}) => {
  const [incomeCategoryCardName, setIncomeCategoryCardName] = useState("");

  const getIncomeCategoryNameById = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/getIncomeCategoryNameById`,
        {
          incomeCategoryId,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setIncomeCategoryCardName(response.data.categoryName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIncomeCategoryNameById();
  }, []);

  return (
    <>
      <div className="flex items-center p-2 border-2 rounded-lg shadow-lg">
        <div className="flex items-center flex-wrap text-xl w-[40%]">
          {incomeTitle}
        </div>
        <div className="flex items-center flex-wrap w-[30%]">
          <p>Rs {incomeAmount}</p>
        </div>
        <div className="flex items-center flex-wrap w-[20%]">
          {incomeCategoryCardName}
        </div>
        <div className="flex items-center flex-wrap">
            {incomeDate.replaceAll('-','/')}
        </div>
      </div>
    </>
  );
};

export default IncomeCard;
