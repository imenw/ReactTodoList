import React, {Component} from 'react';
import {List, Input} from 'antd';

import TodoItem from './todoitem';
import "antd/dist/antd.css";
import './todo.css';


class Todo extends Component {
  constructor(){
    super();
    this.state ={
      todos:[]
    };
  }

  handelPressEnter = e => {

    // Create a todo object containing its index and content
    const todo = {
      index: this.state.todos.length,
      content: e.target.value,
      date: null,
      dateString: ""
    };

    // Add the todo to our array
    const newTodos=this.state.todos.concat(todo);
    this.setState(
      {todos:newTodos});

    // Clear input
    e.target.value="";
  };

  removeTodo = index => {

    let newTodos=[...this.state.todos];

    //remove element
    newTodos.splice(index,1);

    // Decrement greater indexes
    for (let i = index; i < newTodos.length; i++) {
      newTodos[i].index -= 1;
    };

    //update state
    this.setState(
      {todos:newTodos}
    );

  };

  setDate = (index, date, dateString) => {
    // Set the date of the given todo
    let newTodos = [...this.state.todos];
    newTodos[index].date = date;
    newTodos[index].dateString = dateString;

    // Initialize the state
    this.setState({
      todos: newTodos
    });
  };

  render(){

    return(
      <div className="todoContainer">
        <h1> My Todo List</h1>
        <Input
          placeholder="What needs to be done?"
          onPressEnter={this.handelPressEnter}/>
        <List
          locale={{ emptyText: "No todo items" }}
          dataSource={this.state.todos}
          renderItem={item => (
            <TodoItem
              todo={item}
              removeTodo={this.removeTodo}
              setDate={this.setDate}
            />
          )}
        />
      </div>
    )
  }
}

export default Todo;
