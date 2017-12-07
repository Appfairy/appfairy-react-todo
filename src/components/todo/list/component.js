import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-motion-ui-pack'
import TodoListElement from './element';

class TodoList extends React.Component {
  get todoInput() {
    return this._todoInput.target;
  }

  set todoInput(ref) {
    return this._todoInput = ref;
  }

  state = {
    todos: []
  }

  constructor(props) {
    super(props);

    this._currId = 0;

    this.afScopes = {
      todo: {
        removeTodo: this.removeTodo.bind(this),
      }
    };
  }

  render() {
    return (
      <af_view-todo-list>
        <add-btn onClick={onAddBtnClick.bind(this)} />
        <todo-input onKeyDown={onTodoInputKeyDown.bind(this)}
                    ref={ref => this.todoInput = ref} />

        <Transition component="todos"
                    enter={{
                      opacity: 1,
                      translateX: 0,
                    }}
                    leave={{
                      opacity: 0,
                      translateX: 200,
                    }}>
          {this.state.todos.map(({ id, value }) => (
            <af-li key={id} scope="todo" data-id={id} data-value={value} />
          ))}
        </Transition>
      </af_view-todo-list>
    );
  }

  submitTodoInput() {
    const value = this.todoInput.value;

    if (!value) return;

    this.todoInput.value = '';
    this.addTodo(value);
  }

  addTodo(todo) {
    this.state.todos.push({
      id: this._currId++,
      value: todo,
    });

    this.forceUpdate();
  }

  removeTodo(id) {
    const todo = this.state.todos.find(todo => todo.id == id);

    if (!todo) return;

    const index = this.state.todos.indexOf(todo);
    this.state.todos.splice(index, 1);

    this.forceUpdate();
  }
}

function onAddBtnClick() {
  this.submitTodoInput();
}

function onTodoInputKeyDown(e) {
  if (e.key != 'Enter') {
    return;
  }

  this.submitTodoInput();
}

TodoListElement.implement({
  get options() {
    return {
      events: {
        stopPropagation: true,
      }
    };
  },

  render(container, data, callback) {
    ReactDOM.render(<TodoList {...data} />, container, function () {
      callback(this);
    });
  }
});

export default TodoList;
