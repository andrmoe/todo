import logo from './logo.svg';
import './App.css';
import EditableList from './EditableList';
import Todo from './Todo';

function App() {
  const initialTodo = ["Bread", "Empty Trash", "Fix Website"]
  return (
    <div className="App">
      <header className="App-header">
        <EditableList initialList={initialTodo.map(todo => <Todo key={todo} text={todo}/>)}/>
      </header>
    </div>
  );
}

export default App;
