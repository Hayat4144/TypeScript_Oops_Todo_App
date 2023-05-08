let _todo_items = document.getElementById("todo-items") as HTMLDivElement;
let _title_element = document.getElementById("title") as HTMLInputElement;
let _add_btn = document.getElementById("add_btn") as HTMLButtonElement;
let _check_box = document.getElementById('checkbox') as HTMLInputElement ;
let _title_value: string = _title_element.value;

interface Todo {
  readonly _id: number;
  title: string;
  description?: string;
  created_at?: string;
  _completed: boolean;
}

class TodoTaskList {
  todo: Todo[];

  constructor() {
    this.getTodolocalstorage();
  }

  addTodo(todos: Todo): void {
    this.todo.push(todos);
    this.SavetoLocalstorage();
  }

  private AppendTodoToDom(Todo:Todo[]){
    Todo.map((task)=>{
        const todo_item = document.createElement("div") as HTMLDivElement;
        const todo_item_checkbox = document.createElement("input") as HTMLInputElement;
        const todo_item_label = document.createElement("label") as HTMLLabelElement;
        const todo_item_remove_btn = document.createElement("span") as HTMLSpanElement;
        todo_item_remove_btn.classList.add("todo-item-delete");
        todo_item_checkbox.classList.add('checkbox')
        todo_item_checkbox.setAttribute("type", "checkbox");
        todo_item_label.setAttribute('for',`${task._id}`)
        todo_item.classList.add("todo-item");
        todo_item_remove_btn.id = `${task._id}`;
        todo_item_checkbox.id = `${task._id}`;
        todo_item_label.innerText = task.title;
        todo_item_remove_btn.innerHTML = "&#x2715;";
        task._completed ? todo_item_checkbox.checked = true : todo_item_checkbox.checked = false;

        todo_item.appendChild(todo_item_checkbox);
        todo_item.appendChild(todo_item_label);
        todo_item.appendChild(todo_item_remove_btn);
        _todo_items?.appendChild(todo_item)
    })
    this.Removebtnlistener();
    this.Updatebtnlistener();
  }

  get retrivetodo():Todo[]{
    const Todo_Task: Todo[] = this.getTodolocalstorage();
    Todo_Task.length < 1 ? null : this.AppendTodoToDom(Todo_Task)
    return Todo_Task ;
  }

  updateTodo(id:number,complete:boolean){
   const updated_todo : Todo[] = this.todo.map((todo)=> todo._id === id ? {...todo,_completed:complete} : todo )
   this.todo  = updated_todo ;
   this.SavetoLocalstorage()
  }

  removeTodo(id: number): void {
    this.todo = this.todo.filter((data) => data._id !== id);
    this.SavetoLocalstorage();
    _todo_items.innerHTML = "";
    this.retrivetodo;
  }


  Updatebtnlistener(){
    const _update_btn = document.querySelectorAll('.checkbox');
    _update_btn?.forEach((btn)=>{
        btn?.addEventListener('click',(e:Event)=>{
            const target = e.target as HTMLInputElement ;
            target.checked ? this.updateTodo(parseInt(target.id),target.checked) 
            : this.updateTodo(parseInt(target.id),false)
        })
    })
  }

  Removebtnlistener() {
    const remove_btns = document.querySelectorAll(".todo-item-delete");
    remove_btns?.forEach((btn) => {
      btn?.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLButtonElement;
        this.removeTodo(parseInt(target.id));
      });
    });
  }

  private getTodolocalstorage(): [] {
    let storedtodos = localStorage.getItem("todos");
    return storedtodos !== null
      ? (this.todo = JSON.parse(storedtodos))
      : (this.todo = []);
  }

  private SavetoLocalstorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todo));
  }
}


let _Task = new TodoTaskList();
var Todo_Item = _Task.retrivetodo;


let _DisableSubmit_Btn = (): boolean => {
    return _title_value.length < 1
      ? (_add_btn.disabled = true)
      : (_add_btn.disabled = false);
  };

_title_element?.addEventListener("input", (e) => {
    e.preventDefault();
    _title_value = _title_element.value;
  });

_add_btn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (_DisableSubmit_Btn()) return null;
    _Task.addTodo({
      title: _title_value,
      _id: Math.floor(1000 + Math.random() * 9000),
      _completed: false,
    });
    _title_element.value = "";
    _todo_items.innerHTML = "";
    _Task.retrivetodo;
});