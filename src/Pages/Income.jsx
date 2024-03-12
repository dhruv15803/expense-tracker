import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, backendUrl } from "../App";
import IncomeCard from "../Components/IncomeCard";

const Income = () => {
  const [incomeCategoryName, setIncomeCategoryName] = useState("");
  const [addIncomeCategoryMsg, setAddIncomeCategoryMsg] = useState("");
  const [addIncomeMsg, setAddIncomeMsg] = useState("");
  const [isAddIncome, setIsAddIncome] = useState(false);
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [incomeDate, setIncomeDate] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomeCategories, setIncomeCategories] = useState([]);
  const {incomes,setIncomes} = useContext(GlobalContext);

  const addIncomeCategory = async (req, res) => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/addIncomeCategory`,
        {
          incomeCategoryName,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setIncomeCategories((prevIncomeCategories) => {
          return [...prevIncomeCategories, response.data.category];
        });
        setAddIncomeCategoryMsg(response.data.message);
        setIncomeCategoryName("");
        setTimeout(() => {
          setAddIncomeCategoryMsg("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setAddIncomeCategoryMsg(error.response.data.message);
      setTimeout(() => {
        setAddIncomeCategoryMsg("");
      }, 3000);
    }
  };

  const getIncomeCategories = async (req, res) => {
    try {
      const response = await axios.get(
        `${backendUrl}/income/getIncomeCategories`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIncomeCategory(response.data.incomeCategories[0].name);
        setIncomeCategories(response.data.incomeCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addIncome = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/income/add`,
        {
          incomeTitle,
          incomeAmount,
          incomeDate,
          incomeCategory,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setIncomes((prevIncomes) => {
          return [...prevIncomes, response.data.income];
        });
        setIncomeTitle("");
        setIncomeAmount(0);
        setIncomeDate("");
        setAddIncomeMsg(response.data.message);
        setTimeout(() => {
          setAddIncomeMsg("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setAddIncomeMsg(error.response.data.message);
      setTimeout(() => {
        setAddIncomeMsg("");
      }, 3000);
    }
  };

  console.log(incomes);

  useEffect(() => {
    getIncomeCategories();
  }, []);
  return (
    <>
      <button
        onClick={() => setIsAddIncome(!isAddIncome)}
        className="mx-10 text-blue-500 hover:underline hover:underline-offset-2 my-2"
      >
        {isAddIncome ? "Cancel" : "Add income"}
      </button>
      {isAddIncome && (
        <>
          <div className="border-2 rounded-lg flex flex-col p-2 mx-10 shadow-lg gap-2">
            <div className="flex items-center gap-4">
              <p>Add income stream</p>
              <input
                className="border-2 rounded-lg p-2"
                value={incomeCategoryName}
                onChange={(e) => setIncomeCategoryName(e.target.value)}
                type="text"
                name="incomeCategoryName"
                placeholder="eg: salary"
              />
              <button
                onClick={addIncomeCategory}
                className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
              >
                Add
              </button>
            </div>
            <div className="text-blue-500 my-2">{addIncomeCategoryMsg}</div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl text-blue-500 font-semibold">
                Add expense
              </div>
              <form className="flex flex-col gap-4" onSubmit={addIncome}>
                <div className="flex items-center gap-2">
                  <label htmlFor="incomeTitle" className="text-xl">
                    Title
                  </label>
                  <input
                    value={incomeTitle}
                    onChange={(e) => setIncomeTitle(e.target.value)}
                    className="border-2 rounded-lg p-2"
                    type="text"
                    name="incomeTitle"
                    id="incomeTitle"
                    placeholder="eg: salary for march"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="incomeAmount" className="text-xl">
                    Enter amount (in Rs)
                  </label>
                  <input
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    className="border-2 rounded-lg p-2"
                    type="number"
                    name="incomeAmount"
                    id="incomeAmount"
                    placeholder="eg: 40000"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="incomeDate" className="text-xl">
                    Enter transaction date
                  </label>
                  <input
                    className="border-2 rounded-lg p-2"
                    value={incomeDate}
                    onChange={(e) => setIncomeDate(e.target.value)}
                    type="date"
                    name="incomeDate"
                    id="incomeDate"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="incomeCategory" className="text-xl">
                    choose category
                  </label>
                  <select
                    className="border-2 rounded-lg p-2"
                    value={incomeCategory}
                    onChange={(e) => setIncomeCategory(e.target.value)}
                    name="incomeCategory"
                    id="incomeCategory"
                  >
                    {incomeCategories?.map((item, i) => {
                      return <option value={item.name}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="text-blue-500 my-2">{addIncomeMsg}</div>
                <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <div className="flex mx-10 flex-col gap-4">
        <div className="my-4 flex items-center text-2xl text-blue-500 font-semibold">
          Your income
        </div>
        {incomes.length===0 && <div className="text-blue-500 text-4xl font-semibold flex justify-center items-center my-28">
          You have no incomes added
        </div>}
        {incomes?.map((item) => {
          return (
            <IncomeCard
              key={item._id}
              id={item._id}
              incomeTitle={item.incomeTitle}
              incomeAmount={item.incomeAmount}
              incomeDate={item.incomeDate}
              incomeCategoryId = {item.incomeCategoryId}
              incomeCategories={incomeCategories}
            />
          );
        })}
      </div>
    </>
  );
};

export default Income;
