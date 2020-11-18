import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ todo, setTodo ] = useState([]);
  const [ single, setSingle ] = useState('')

  const change_letter = (e) => {
    setSingle(e.target.value)
  }

  const add = () => {
    if (single === '') { return }

    const found = todo.find(e => { return e === single })
    const item = localStorage.getItem('todo')
    if (item) {
      const arr = item.split(',')
      const one = arr.find(i => { return i === single })
      if (one) { return }    }

    if (found) { return }

    todo.push(single)
    localStorage.setItem('todo', todo.toString());
    setTodo([...todo])
    setSingle('')
  }


  useEffect(() => {
    const item = localStorage.getItem('todo')
    if (item) {
      const store = item.split(',')
      setTodo(store)
    }
  }, [])


  const delete_todo = (e) => {
    const item = localStorage.getItem('todo')
    if (item) {
      const arr = item.split(',')
      const found = arr.filter(el => { return el !== e })
      setTodo(found)
      localStorage.setItem('todo', found.toString());
    }
  }



  return (
    <div className="App">

      <input onChange={ change_letter } value={ single } type='text' placeholder='todo . . .' />
      <button onClick={ add }>Add Todo</button>
      <div>

      {
        todo.map((e, i) => {
          return (
            <div key={i} className="single">
              <h3 key={i}>{e}</h3>
              <button onClick={() => {delete_todo(e) }}>delete</button>
            </div>
          )
        })
      }
      </div>

    </div>
  );
}

export default App;
