import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, backendUrl } from "../App";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const IncomeCard = ({
  incomeTitle,
  incomeAmount,
  incomeDate,
  incomeCategoryId,
  id,
}) => {
  const [incomeCategoryCardName, setIncomeCategoryCardName] = useState("");
  const { incomes, setIncomes } = useContext(GlobalContext);

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

  const deleteIncome = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/delete`,
        {
          id,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const newIncomes = incomes.filter((income) => income._id !== id);
        setIncomes(newIncomes);
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
      <div className="flex flex-col p-2 border-2 rounded-lg shadow-lg gap-4">
        <div className="flex items-center">
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
            {incomeDate.replaceAll("-", "/")}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xl" onClick={() => deleteIncome(id)}>
            <FaTrash />
          </button>
          <button className="text-xl">
            <FaEdit />
          </button>
        </div>
      </div>
    </>
  );
};

export default IncomeCard;
