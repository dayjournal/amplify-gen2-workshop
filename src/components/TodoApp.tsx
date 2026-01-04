import { useState, useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'
import { Flex, Loader, Text } from '@aws-amplify/ui-react'
import type { Schema } from '../../amplify/data/resource'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const client = generateClient<Schema>()

export default function TodoApp() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const { data } = await client.models.Todo.list()
      setTodos(data)
    } catch (error) {
      console.error('Todo の取得に失敗しました:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async (todoData: {
    title: string
    content: string
    status: 'pending' | 'in_progress' | 'completed'
    category: string[]
  }) => {
    try {
      await client.models.Todo.create(todoData)
      fetchTodos()
    } catch (error) {
      console.error('Todo の作成に失敗しました:', error)
    }
  }

  const updateTodo = async (id: string, updates: Partial<Schema["Todo"]["type"]>) => {
    try {
      await client.models.Todo.update({ id, ...updates })
      fetchTodos()
    } catch (error) {
      console.error('Todo の更新に失敗しました:', error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await client.models.Todo.delete({ id })
      fetchTodos()
    } catch (error) {
      console.error('Todo の削除に失敗しました:', error)
    }
  }

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="200px">
        <Loader size="large" />
        <Text margin="0 0 0 1rem">読み込み中...</Text>
      </Flex>
    )
  }

  return (
    <Flex direction="column" gap="2rem">
      <TodoForm onSubmit={createTodo} />
      <TodoList 
        todos={todos} 
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </Flex>
  )
}
