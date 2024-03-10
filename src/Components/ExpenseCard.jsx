import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { GlobalContext, backendUrl } from "../App";
import axios from "axios";

const ExpenseCard = ({
  expenseTitle,
  expenseAmount,
  expenseDate,
  expenseCategoryId,
  id,
  expenseCategories,
}) => {
  const [expenseCategory, setExpenseCategory] = useState("");
  const [isEditExpense, setIsEditExpense] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [newExpenseTitle,setNewExpenseTitle] = useState("");
  const [newExpenseAmount,setNewExpenseAmount] = useState("");
  const [newExpenseDate,setNewExpenseDate] = useState("");
  const [newExpenseCategory,setNewExpenseCategory] = useState("");
  const {expenses,setExpenses} = useContext(GlobalContext);

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

  const updateExpense = async () => {
    const response = await axios.patch(`${backendUrl}/expense/updateExpense`,{
        "id":editExpenseId,
        newExpenseTitle,
        newExpenseAmount,
        newExpenseDate,
        newExpenseCategory,
    },{withCredentials:true})
    if(response.status===200){
        const newExpenses = expenses.map((item,i)=>{
            if(item._id===editExpenseId){
                return response.data.newExpense;
            } else{
                return item;
            }
        })
        setExpenses(newExpenses);
        setIsEditExpense(false);
    }
  }

  const editExpense = async (id) => {
    setIsEditExpense(true);
    setEditExpenseId(id);
    setNewExpenseTitle(expenseTitle);
    setNewExpenseAmount(expenseAmount);
    setNewExpenseDate(expenseDate);
    setNewExpenseCategory(expenseCategory);
  };

  useEffect(() => {
    getExpenseCategoryNameById();
  }, [expenses]);

  return (
    <>
      <div className="border-2 shadow-lg flex flex-col p-2 gap-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex flex-wrap w-[40%] text-xl">
            {isEditExpense ? (
              <>
                <input
                  className="border-2 p-2 rounded-lg"
                  value={newExpenseTitle}
                  onChange={(e) => setNewExpenseTitle(e.target.value)}
                  type="text"
                  name="newExpenseTitle"
                />
              </>
            ) : (
              expenseTitle
            )}
          </div>
          <div className="flex flex-wrap w-[30%] items-center gap-1">
            Rs{" "}
            {isEditExpense ? (
              <>
                <input
                  className="border-2 p-2 rounded-lg w-fit"
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  type="number"
                  name="newExpenseAmount"
                />
              </>
            ) : (
              expenseAmount
            )}
          </div>
          <div className="flex flex-wrap w-[30%]">
            {isEditExpense ? (
              <>
              <select value={newExpenseCategory} onChange={(e) => setNewExpenseCategory(e.target.value)} name="newExpenseCategory">
                {expenseCategories?.map((item)=>{
                    return <option key={item._id} value={item.name}>{item.name}</option>
                })}
              </select>
              </>
            ) : (
              expenseCategory
            )}
          </div>
          <div className="flex flex-wrap">
            {isEditExpense ? (
              <>
                <input
                  className="border-2 p-2 rounded-lg"
                  value={newExpenseDate}
                  onChange={(e) => setNewExpenseDate(e.target.value)}
                  type="date"
                  name="newExpenseDate"
                />
              </>
            ) : (
              expenseDate?.replaceAll("-", "/")
            )}
          </div>
        </div>
        {isEditExpense ? <>
        <div className="flex items-center gap-2">
         <button onClick={updateExpense} className=" w-[25%]  border-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300 p-2" >submit</button>
         <button onClick={() => setIsEditExpense(false)}>Cancel</button>
        </div>
        </>:
        <div className="flex items-center gap-4">
          <button onClick={() => deleteExpense(id)} className="text-xl">
            <FaTrash />
          </button>
          <button onClick={() => editExpense(id)} className="text-xl">
            <FaRegEdit />
          </button>
        </div>}
      </div>
    </>
  );
};

export default ExpenseCard;
