import '~/common/todo/item';

import Appfairy from 'appfairy';
import React from 'react';
import ReactDOM from 'react-dom';

class TodoItem extends React.Component {
  state = {
    checked: false
  }

  render() {
    const { id, value } = this.props.todo;

    const todoStyle = {
      textDecoration: this.state.checked && 'line-through'
    };

    return (
      <af-todo-item-view>
        <span af-plug="check-box" onClick={this.toggleCheck.bind(this)}>
          {this.state.checked && <span af-plug="check" />}
        </span>

        <span af-plug="todo" style={todoStyle}>{value}</span>
        <span af-plug="rm-btn" onClick={this.props.removeTodo.bind(this, id)} />
      </af-todo-item-view>
    );
  }

  toggleCheck() {
    this.setState({
      checked: !this.state.checked,
    });
  }
}

class TodoItemElement extends Appfairy.Element(HTMLElement) {
  get options() {
    return {
      dependent: true
    };
  }

  render(el, data) {
    ReactDOM.render(<TodoItem {...data} />, el);
  }
}

Appfairy.Element.define('todo-item', TodoItemElement);
