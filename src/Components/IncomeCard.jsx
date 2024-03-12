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
  incomeCategories,
}) => {
  const [incomeCategoryCardName, setIncomeCategoryCardName] = useState("");
  const [isIncomeEdit, setIsIncomeEdit] = useState(false);
  const [newIncomeTitle, setNewIncomeTitle] = useState("");
  const [newIncomeAmount, setNewIncomeAmount] = useState("");
  const [newIncomeCategory, setNewIncomeCategory] = useState("");
  const [newIncomeDate, setNewIncomeDate] = useState("");
  const [incomeEditId, setIncomeEditId] = useState("");

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

  const updateIncome = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/updateIncome`,
        {
          newIncomeTitle,
          newIncomeAmount,
          newIncomeCategory,
          newIncomeDate,
          id: incomeEditId,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        const newIncomes = incomes.map((item, i) => {
          if (item._id === incomeEditId) {
            return response.data.income;
          } else {
            return item;
          }
        });
        setIncomes(newIncomes);
        setIsIncomeEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editIncome = (id) => {
    setIsIncomeEdit(true);
    setIncomeEditId(id);
    setNewIncomeTitle(incomeTitle);
    setNewIncomeAmount(incomeAmount);
    setNewIncomeCategory(incomeCategoryCardName);
    setNewIncomeDate(incomeDate);
  };

  useEffect(() => {
    getIncomeCategoryNameById();
  }, [incomes]);

  return (
    <>
      <div className="flex flex-col p-2 border-2 rounded-lg shadow-lg gap-4">
        <div className="flex items-center">
          <div className="flex items-center flex-wrap text-xl w-[40%]">
            {isIncomeEdit ? (
              <>
                <input
                  className="border-2 rounded-lg p-2"
                  value={newIncomeTitle}
                  onChange={(e) => setNewIncomeTitle(e.target.value)}
                  type="text"
                  name="newIncomeTitle"
                />
              </>
            ) : (
              <>{incomeTitle}</>
            )}
          </div>
          <div className="flex items-center flex-wrap w-[30%]">
            {isIncomeEdit ? (
              <>
                <input
                  className="border-2 rounded-lg p-2"
                  value={newIncomeAmount}
                  onChange={(e) => setNewIncomeAmount(e.target.value)}
                  type="number"
                  name="newIncomeAmount"
                  id=""
                />
              </>
            ) : (
              <p>Rs {incomeAmount}</p>
            )}
          </div>
          <div className="flex items-center flex-wrap w-[20%]">
            {isIncomeEdit ? (
              <>
                <select
                  className="border-2 rounded-lg p-2"
                  value={newIncomeCategory}
                  onChange={(e) => setNewIncomeCategory(e.target.value)}
                  name="newIncomeCategory"
                >
                  {incomeCategories?.map((item, i) => {
                    return <option value={item.name}>{item.name}</option>;
                  })}
                </select>
              </>
            ) : (
              incomeCategoryCardName
            )}
          </div>
          <div className="flex items-center flex-wrap">
            {isIncomeEdit ? (
              <>
                <input
                  className="border-2 rounded-lg p-2"
                  value={newIncomeDate}
                  onChange={(e) => setNewIncomeDate(e.target.value)}
                  type="date"
                  name="newIncomeDate"
                />
              </>
            ) : (
              <> {incomeDate.replaceAll("-", "/")}</>
            )}
          </div>
        </div>
        {isIncomeEdit ? (
          <>
            <div className="flex items-center gap-2">
              <button
                onClick={updateIncome}
                className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-blue-500 duration-300"
              >
                submit
              </button>
              <button
                className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-blue-500 duration-300"
                onClick={() => setIsIncomeEdit(false)}
              >
                cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <button className="text-xl" onClick={() => deleteIncome(id)}>
              <FaTrash />
            </button>
            <button onClick={() => editIncome(id)} className="text-xl">
              <FaEdit />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default IncomeCard;
