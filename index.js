var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _todo_items = document.getElementById("todo-items");
var _title_element = document.getElementById("title");
var _add_btn = document.getElementById("add_btn");
var _check_box = document.getElementById('checkbox');
var _title_value = _title_element.value;
var TodoTaskList = /** @class */ (function () {
    function TodoTaskList() {
        this.getTodolocalstorage();
    }
    TodoTaskList.prototype.addTodo = function (todos) {
        this.todo.push(todos);
        this.SavetoLocalstorage();
    };
    TodoTaskList.prototype.AppendTodoToDom = function (Todo) {
        Todo.map(function (task) {
            var todo_item = document.createElement("div");
            var todo_item_checkbox = document.createElement("input");
            var todo_item_label = document.createElement("label");
            var todo_item_remove_btn = document.createElement("span");
            todo_item_remove_btn.classList.add("todo-item-delete");
            todo_item_checkbox.classList.add('checkbox');
            todo_item_checkbox.setAttribute("type", "checkbox");
            todo_item_label.setAttribute('for', "".concat(task._id));
            todo_item.classList.add("todo-item");
            todo_item_remove_btn.id = "".concat(task._id);
            todo_item_checkbox.id = "".concat(task._id);
            todo_item_label.innerText = task.title;
            todo_item_remove_btn.innerHTML = "&#x2715;";
            task._completed ? todo_item_checkbox.checked = true : todo_item_checkbox.checked = false;
            todo_item.appendChild(todo_item_checkbox);
            todo_item.appendChild(todo_item_label);
            todo_item.appendChild(todo_item_remove_btn);
            _todo_items === null || _todo_items === void 0 ? void 0 : _todo_items.appendChild(todo_item);
        });
        this.Removebtnlistener();
        this.Updatebtnlistener();
    };
    Object.defineProperty(TodoTaskList.prototype, "retrivetodo", {
        get: function () {
            var Todo_Task = this.getTodolocalstorage();
            Todo_Task.length < 1 ? null : this.AppendTodoToDom(Todo_Task);
            return Todo_Task;
        },
        enumerable: false,
        configurable: true
    });
    TodoTaskList.prototype.updateTodo = function (id, complete) {
        var updated_todo = this.todo.map(function (todo) { return todo._id === id ? __assign(__assign({}, todo), { _completed: complete }) : todo; });
        this.todo = updated_todo;
        this.SavetoLocalstorage();
    };
    TodoTaskList.prototype.removeTodo = function (id) {
        this.todo = this.todo.filter(function (data) { return data._id !== id; });
        this.SavetoLocalstorage();
        _todo_items.innerHTML = "";
        this.retrivetodo;
    };
    TodoTaskList.prototype.Updatebtnlistener = function () {
        var _this = this;
        var _update_btn = document.querySelectorAll('.checkbox');
        _update_btn === null || _update_btn === void 0 ? void 0 : _update_btn.forEach(function (btn) {
            btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function (e) {
                var target = e.target;
                target.checked ? _this.updateTodo(parseInt(target.id), target.checked)
                    : _this.updateTodo(parseInt(target.id), false);
            });
        });
    };
    TodoTaskList.prototype.Removebtnlistener = function () {
        var _this = this;
        var remove_btns = document.querySelectorAll(".todo-item-delete");
        remove_btns === null || remove_btns === void 0 ? void 0 : remove_btns.forEach(function (btn) {
            btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function (e) {
                var target = e.target;
                _this.removeTodo(parseInt(target.id));
            });
        });
    };
    TodoTaskList.prototype.getTodolocalstorage = function () {
        var storedtodos = localStorage.getItem("todos");
        return storedtodos !== null
            ? (this.todo = JSON.parse(storedtodos))
            : (this.todo = []);
    };
    TodoTaskList.prototype.SavetoLocalstorage = function () {
        localStorage.setItem("todos", JSON.stringify(this.todo));
    };
    return TodoTaskList;
}());
var _Task = new TodoTaskList();
var Todo_Item = _Task.retrivetodo;
var _DisableSubmit_Btn = function () {
    return _title_value.length < 1
        ? (_add_btn.disabled = true)
        : (_add_btn.disabled = false);
};
_title_element === null || _title_element === void 0 ? void 0 : _title_element.addEventListener("input", function (e) {
    e.preventDefault();
    _title_value = _title_element.value;
});
_add_btn === null || _add_btn === void 0 ? void 0 : _add_btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (_DisableSubmit_Btn())
        return null;
    _Task.addTodo({
        title: _title_value,
        _id: Math.floor(1000 + Math.random() * 9000),
        _completed: false,
    });
    _title_element.value = "";
    _todo_items.innerHTML = "";
    _Task.retrivetodo;
});
