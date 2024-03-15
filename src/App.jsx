import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import { createContext, useEffect, useState } from "react";
import Login from "./Pages/Login";
import axios from "axios";
import Dashboard from "./Pages/Dashboard";
import Income from "./Pages/Income";
import Expenses from "./Pages/Expenses";
import Profile from "./Pages/Profile";
import Category from "./Pages/Category";

export const GlobalContext = createContext();
export const backendUrl = "http://localhost:3000";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense,setTotalExpense] = useState(0);
  const [totalIncome,setTotalIncome] = useState(0);
  const [incomes, setIncomes] = useState([]);
  let funds = 20000;
  const [currBalance,setCurrBalance] = useState(funds);

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/getLoggedInUser`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLoggedInUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/expense/getAllExpenses`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setExpenses(response.data.expenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllIncomes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/income/getAllIncomes`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIncomes(response.data.incomes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalIncomes = ()=>{
    let total = 0;
    for(let i=0;i<incomes.length;i++){
      total+= incomes[i].incomeAmount;
    }
    setTotalIncome(total);
  }

  const getTotalExpense = () => {
    let total = 0;
    for(let i=0; i < expenses.length;i++){
      total+= expenses[i].expenseAmount;
    }
    setTotalExpense(total);
  }

  useEffect(()=>{
    let curr = funds - totalExpense + totalIncome;
    setCurrBalance(curr);
  },[totalIncome,totalExpense])

  useEffect(()=>{
    getTotalIncomes();
  },[incomes])

  useEffect(() => {
    getTotalExpense();
  },[expenses])

  useEffect(() => {
    getAllExpenses();
    getAllIncomes();
    getLoggedInUser();
  }, [isLoggedIn]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser,
          setIsLoggedIn,
          isLoggedIn,
          expenses,
          setExpenses,
          incomes,
          setIncomes,
          totalExpense,
          totalIncome,
          setTotalIncome,
          setTotalExpense,
          currBalance,
          setCurrBalance,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="expenses" element={<Expenses />}/>
                <Route path="categories" element={<Category/>}/>
              </Route>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
