import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, backendUrl } from "../App";
import ExpenseCard from "../Components/ExpenseCard";

const Expenses = () => {
  const [expenseCategoryName, setExpenseCategoryName] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenseCategoryMsg, setExpenseCategoryMsg] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const { expenses, setExpenses } = useContext(GlobalContext);
  const [expenseMsg, setExpenseMsg] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [isAddExpense,setIsAddExpense] = useState(false);


  const addExpenseCategory = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/expense/addExpenseCategory`,
        {
          expenseCategoryName,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setExpenseCategoryName("");
        setExpenseCategoryMsg(response.data.message);
        setTimeout(() => {
          setExpenseCategoryMsg("");
        }, 3000);
        setExpenseCategories((prevCategories) => {
          return [...prevCategories, response.data.expenseCategory];
        });
      }
    } catch (error) {
      console.log(error);
      setExpenseCategoryMsg(error.response.data.message);
      setTimeout(() => {
        setExpenseCategoryMsg("");
      }, 3000);
    }
  };

  const getExpenseCategories = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/expense/getExpenseCategories`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setExpenseCategories(response.data.expenseCategories);
        setExpenseCategory(response.data.expenseCategories[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExpense = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/expense/add`,
        {
          expenseTitle,
          expenseAmount,
          expenseCategory,
          expenseDate,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 201) {
        setExpenseMsg("Expense added");
        setExpenses((prevExpenses) => {
          return [...prevExpenses, response.data.expense];
        });
        setExpenseTitle("");
        setExpenseAmount(0);
        setExpenseCategory(expenseCategories[0].name);
        setTimeout(() => {
          setExpenseMsg("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setExpenseMsg(error.response.data.message);
      setTimeout(() => {
        setExpenseMsg("");
      }, 3000);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/expense/deleteExpense`,
        {
          id,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        const newExpenses = expenses.filter((expense) => expense._id !== id);
        setExpenses(newExpenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(expenses);

  useEffect(() => {
    getExpenseCategories();
  }, []);

  return (
    <>
    <div className="flex mx-10 items-center text-blue-500">
      <button className="hover:underline hover:underline-offset-2" onClick={() => setIsAddExpense(!isAddExpense)}>{isAddExpense ? 'Cancel':'Add expense'}</button>
    </div>
    {isAddExpense && <>
      <form
        className="flex gap-4 items-center my-4 mx-10"
        onSubmit={addExpenseCategory}
      >
        <label htmlFor="expenseCategoryName">Add expense category</label>
        <input
          value={expenseCategoryName}
          onChange={(e) => setExpenseCategoryName(e.target.value)}
          className="border-2 rounded-lg p-2"
          type="text"
          name="expenseCategoryName"
          id="expenseCategoryName"
          placeholder="eg: entertainment"
        />
        <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
          Add
        </button>
      </form>
      <div className="flex items-center mx-10 text-blue-500">
        {expenseCategoryMsg}
      </div>
      <div className="flex flex-col gap-2 mx-10">
        <div className="text-xl text-blue-500 font-semibold mb-8">
          Add expense
        </div>
        <form className="flex flex-col gap-6" onSubmit={addExpense}>
          <div className="flex items-center gap-2">
            <label htmlFor="expenseTitle" className="text-xl">
              Title
            </label>
            <input
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="text"
              name="expenseTitle"
              id="expenseTitle"
              placeholder="eg: movie tickets"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="expenseAmount">Enter amount (in Rs)</label>
            <input
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="number"
              name="expenseAmount"
              id="expenseAmount"
              placeholder="eg:750"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="expenseDate">Enter transaction date</label>
            <input
              className="border-2 rounded-lg p-2"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              type="date"
              name="expenseDate"
              id="expenseDate"
            />
          </div>
          {expenseCategories.length !== 0 && (
            <>
              <div className="flex items-center gap-2">
                <label htmlFor="expenseCategory">Choose category</label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="border-2 rounded-lg p-2"
                  name="expenseCategory"
                  id="expenseCategory"
                >
                  {expenseCategories?.map((item, i) => {
                    return (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center text-blue-500">
                {expenseMsg}
              </div>
            </>
          )}
          <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
            Submit
          </button>
        </form>
      </div>
    </>}
      <div className="flex flex-col gap-2 my-4 mx-10">
        <div className="text-2xl text-blue-500 font-semibold">Your expenses</div>
        {expenses?.map((item, i) => {
          return (
            <ExpenseCard
              key={item._id}
              id={item._id}
              expenseTitle={item.expenseTitle}
              expenseAmount={item.expenseAmount}
              expenseDate={item.expenseDate}
              deleteExpense={deleteExpense}
              expenseCategoryId={item.expenseCategoryId}
            />
          );
        })}
        {expenses.length===0 && <>
        <div className="my-[40%] flex items-center text-blue-500 justify-center text-4xl font-semibold">
          You have no current expenses
        </div>
        </>}
      </div>
    </>
  );
};

export default Expenses;
