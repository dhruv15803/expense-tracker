import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { backendUrl } from "../App";
import axios from "axios";

const ExpenseCard = ({
  expenseTitle,
  expenseAmount,
  expenseDate,
  expenseCategoryId,
  id,
  deleteExpense,
}) => {
  const [expenseCategory, setExpenseCategory] = useState("");

  const getExpenseCategoryNameById = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/expense/getExpenseCategoryNameById`,
        {
          expenseCategoryId,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setExpenseCategory(response.data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenseCategoryNameById();
  }, []);

  return (
    <>
      <div className="border-2 shadow-lg flex flex-col p-2 gap-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex flex-wrap w-[50%] text-xl">{expenseTitle}</div>
          <div className="flex flex-wrap w-[10%]">Rs {expenseAmount}</div>
          <div className="flex flex-wrap w-[20%]">{expenseCategory}</div>
          <div className="flex flex-wrap">
            {expenseDate?.replaceAll("-", "/")}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => deleteExpense(id)} className="text-xl">
            <FaTrash />
          </button>
          <button className="text-xl">
            <FaRegEdit />
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseCard;
