import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Checkbox } from './components/ui/checkbox'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="text-2xl font-bold text-center">TODOアプリ</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex space-x-2 mb-6">
            <Input
              placeholder="新しいタスクを入力..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addTodo} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500">タスクがありません。新しいタスクを追加してください。</p>
            ) : (
              todos.map(todo => (
                <div 
                  key={todo.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label 
                      htmlFor={`todo-${todo.id}`}
                      className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 flex justify-between">
              <span>合計: {todos.length} タスク</span>
              <span>完了: {todos.filter(t => t.completed).length} タスク</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
