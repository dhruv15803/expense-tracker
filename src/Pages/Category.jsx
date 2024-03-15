import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { FaTrash } from "react-icons/fa";

const Category = () => {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories,setExpenseCategories] = useState([]);
  const [deleteIncomeCategoryErrorMsg,setDeleteIncomeCategoryErrorMsg] = useState("");
  const [deleteExpenseCategoryMsg,setDeleteExpenseCategoryMsg] = useState("");

  const getIncomeCategories = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/income/getIncomeCategories`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIncomeCategories(response.data.incomeCategories);
      }
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIncomeCategory = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/deleteIncomeCategory`,
        {
          id,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const newIncomeCategories = incomeCategories.filter(
          (income) => income._id !== id
        );
        setIncomeCategories(newIncomeCategories);
      }
    } catch (error) {
      console.log(error);
      setDeleteIncomeCategoryErrorMsg(error.response.data.message);
      setTimeout(()=>{
        setDeleteIncomeCategoryErrorMsg("");
      },3000)
    }
  };

  const deleteExpenseCategory = async (id)=>{
try {
        const response = await axios.post(`${backendUrl}/expense/deleteExpenseCategory`,{
            id,
        },{withCredentials:true})
        if(response.status===200){
            const newExpenseCategories = expenseCategories.filter(expense => expense._id!==id);
            setExpenseCategories(newExpenseCategories);
        }
} catch (error) {
    console.log(error);
    setDeleteExpenseCategoryMsg(error.response.data.message);
    setTimeout(()=>{
        setDeleteExpenseCategoryMsg("");
    },3000)
}
  }


  useEffect(() => {
    getIncomeCategories();
    getExpenseCategories();
  }, []);

  return (
    <>
      <div className=" flex border-2 mx-10 rounded-lg shadow-lg gap-[10%]">
        <div className="flex flex-col w-[45%]">
          <div className="flex items-center gap-2 mx-4 p-2">
            <div className="text-2xl text-blue-500 font-semibold">Income categories</div>
            <div className=" text-red-500">
                {deleteIncomeCategoryErrorMsg}
              </div>
          </div>
          {incomeCategories?.map((item) => {
            return (
                <div                 key={item._id}
                className="flex flex-col border-2 p-2 rounded-lg mx-4 my-2">
                <div
                className=" flex items-center"
              >
                <div className="w-[90%] flex flex-wrap text-xl">{item.name}</div>
                <FaTrash onClick={() => deleteIncomeCategory(item._id)} />
              </div>
                </div>
            );
          })}
        </div>
        <div className="flex flex-col  w-[45%]">
          <div className="flex items-center gap-2 p-2">
            <div className="text-2xl font-semibold text-blue-500">Expense categories</div>
            <div className=" text-red-500">
                    {deleteExpenseCategoryMsg}
            </div>
          </div>
          {expenseCategories?.map((item,i)=>{
            return <div key={item._id} className="flex flex-col border-2 p-2 rounded-lg my-2">
                <div className="flex items-center">
                    <div className="flex flex-wrap w-[90%]">{item.name}</div>
                    <FaTrash onClick={()=>deleteExpenseCategory(item._id)}/>
                </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
};

export default Category;
