import React, { useState, useEffect } from "react";
import "./style.css";
const ToDoApp = () => {
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const editItem = (id) => {
    const editItems = item.find((element) => {
      return element.id === id;
    });
    setInputData(editItems.name);
    setToggleButton(true);
    setIsEditItem(id);
  };

  const getLocalStroageData = () => {
    const list = localStorage.getItem("todolist");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState();
  const [item, setItems] = useState(getLocalStroageData());

  const addItems = () => {
    if (!inputData) {
      alert("Plz Add Something");
    } else if (inputData && toggleButton) {
      setItems(
        item.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setInputData("");
      setToggleButton(false);
      setIsEditItem(null);
    } else {
      const ItemIdentity = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...item, ItemIdentity]);
      setInputData("");
    }
  };
  const toBeDeleteItem = (id) => {
    const updatedItems = item.filter((element) => {
      return element.id !== id;
    });

    setItems(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(item));
  }, [item]);

  return (
    <div className="container">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={inputData}
          onChange={(event) => {
            setInputData(event.target.value);
            console.log(inputData);
          }}
        />
        <button onClick={addItems}>Add</button>
      </div>
      {/* <ul className="todo-list"></ul> */}
      {item.map((currElm, index) => (
        <div className="DisplayItems" key={index}>
          <div className="eachItem">
            <h3 className="ToDoItem">{currElm.name}</h3>
            <div>
              {/* <i class="fa-solid fa-plus "></i> */}
              <i
                class="fa-solid fa-pen-to-square plusIcon"
                onClick={() => {
                  editItem(currElm.id);
                }}
              ></i>
              <i
                class="fa-solid fa-trash deleteIcon "
                onClick={() => {
                  toBeDeleteItem(currElm.id);
                }}
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoApp;
