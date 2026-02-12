import logo from './logo.svg';
import './App.css';
import Header from './MyFile/Header';
import Todos from './MyFile/Todos';
import Footer from './MyFile/Footer';
import About from './MyFile/About';
import React, { useState, useEffect } from 'react';
import AddTodo from './MyFile/AddTodo';
import {
  BrowserRouter as Router,
  Routes,
  Route
  } from "react-router-dom";

function App() {
  let initTodo;
     if(localStorage.getItem("todos")=== null){
     initTodo = [];  
     }
     else{
      initTodo = JSON.parse(localStorage.getItem("todos"));
     }

  const onDelete = (todo) => {

   
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
     
  }

  const addTodo = (title, desc)=>{
    console.log("I am adding this todo", title, desc)
    let sno;
    if(todos.length===0){
      sno = 0;
    }
    else{
    sno = todos[todos.length-1].sno + 1;
    }
     const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo)

  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() =>{
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

  return (
    <>
    <Router>
      <Header title="My Todos List" searchBar={false} />
      <Routes>    
        <Route path="/" element={
        <>
          <AddTodo addTodo={addTodo}/>
          <Todos todos={todos} onDelete={onDelete} />
       </>
        
        } />
        
        <Route path='/about' element={<About />}>
        </Route >
        
      </Routes>

      <Footer />
      </Router>
    </>
  );
}

export default App;
