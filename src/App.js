import React, { Component } from 'react';
import './App.css';
import Loader from "./Loader";
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      isLoading: true,
    }
  };

  /* loader M */
  loaded = (x) => {
    if (x === true && this.state.isLoading === true) {
      this.setState({ isLoading: false });
      console.log("LOADED !!!");
    }
  }

  /* axios */
  componentDidMount() {
    Axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => { this.setState({ todoList: res.data }) })
  }

  /*crud */
  update = (e) => {
    let part = e.target.parentNode.parentNode;
    let elt = part.childNodes[1];
    if (elt.contentEditable !== "true") {
      e.target.innerHTML = "save";
      e.target.style.backgroundColor = "blue";
      elt.className = "editable";
      elt.contentEditable = "true";
    } else if (elt.contentEditable === "true") {
      e.target.innerHTML = "update";
      e.target.style.backgroundColor = "";
      elt.className = "";
      elt.contentEditable = "false";
    }
  }
  add = (e) => {
    let y = [{ id: this.state.todoList.length + 1, title: e.target.parentNode.firstChild.value }, ...this.state.todoList];
    this.setState({ todoList: y })
  }
  delete = (e) => {
    let i = e.target.parentNode.parentNode.firstChild.innerHTML * 1;
    let cleanArray = this.state.todoList.filter(item => item.id !== i);
    this.setState({ todoList: [...cleanArray] })
  }


  render() {

    return (
      <div>

        <div className="app">
          <div className='item'>
            <input id="add-input"></input>
            <button id="add-btn" onClick={e => { this.add(e) }}>add</button>
          </div>
          {
            this.state.todoList.map(x =>
              <div key={x.id} className="item">
                <button>{x.id}</button>
                <p>{x.title}</p>
                <div>
                  <button onClick={e => this.update(e)}>update</button>
                  <button id="del" onClick={e => this.delete(e)}>delete</button>
                </div>
              </div>)
          }
        </div>
      </div>
    );
  }
}

export default App;


