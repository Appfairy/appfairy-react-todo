import Appfairy from 'appfairy';
import ReactDOM from 'react-dom';
import styleSheet from './style.scss'
import viewHTML from './view.html';

class TodoItemView extends Appfairy.View(HTMLLIElement) {
  initializeStyle(style) {
    style.innerHTML = styleSheet;
  }

  initializeView(view) {
    view.innerHTML = viewHTML;
  }
}

export default Appfairy.View.define('todo-item', TodoItemView, {
  extends: 'li'
});
