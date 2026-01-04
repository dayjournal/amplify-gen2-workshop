import { useState } from 'react'
import { 
  Card, 
  Flex, 
  Text, 
  Button, 
  Badge, 
  TextField, 
  TextAreaField, 
  SelectField,
  Heading,
  Divider
} from '@aws-amplify/ui-react'
import type { Schema } from '../../amplify/data/resource'

interface TodoListProps {
  todos: Array<Schema["Todo"]["type"]>
  onUpdate: (id: string, updates: Partial<Schema["Todo"]["type"]>) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    status: 'pending' as 'pending' | 'in_progress' | 'completed',
    category: [] as string[]
  })

  const startEdit = (todo: Schema["Todo"]["type"]) => {
    setEditingId(todo.id)
    setEditForm({
      title: todo.title || '',
      content: todo.content || '',
      status: todo.status || 'pending',
      category: todo.category?.filter((cat): cat is string => cat !== null) || []
    })
  }

  const saveEdit = () => {
    if (editingId) {
      onUpdate(editingId, editForm)
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { label: '⏳ 未着手', variation: 'warning' as const }
      case 'in_progress': return { label: '🔄 進行中', variation: 'info' as const }
      case 'completed': return { label: '✅ 完了', variation: 'success' as const }
      default: return { label: status, variation: 'info' as const }
    }
  }

  if (todos.length === 0) {
    return (
      <Card padding="2rem" textAlign="center">
        <Heading level={4} margin="0 0 1rem 0">📋 Todo リスト</Heading>
        <Text color="var(--amplify-colors-font-secondary)">
          Todo がありません。新しい Todo を追加してください。
        </Text>
      </Card>
    )
  }

  return (
    <Flex direction="column" gap="1rem">
      <Heading level={4} margin="0">
        📋 Todo リスト ({todos.length}件)
      </Heading>
      
      {todos.map((todo) => (
        <Card key={todo.id} padding="1.5rem">
          {editingId === todo.id ? (
            <Flex direction="column" gap="1rem">
              <TextField
                label="タイトル"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <TextAreaField
                label="内容"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={3}
              />
              <SelectField
                label="ステータス"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
              >
                <option value="pending">⏳ 未着手</option>
                <option value="in_progress">🔄 進行中</option>
                <option value="completed">✅ 完了</option>
              </SelectField>
              <TextField
                label="カテゴリ"
                value={editForm.category.join(', ')}
                onChange={(e) => setEditForm({ 
                  ...editForm, 
                  category: e.target.value.split(',').map(c => c.trim()).filter(c => c)
                })}
                placeholder="カテゴリをカンマ区切りで入力"
              />
              <Flex gap="0.5rem">
                <Button onClick={saveEdit} variation="primary">💾 保存</Button>
                <Button onClick={cancelEdit}>❌ キャンセル</Button>
              </Flex>
            </Flex>
          ) : (
            <Flex direction="column" gap="1rem">
              <Flex justifyContent="space-between" alignItems="flex-start">
                <Heading level={5} margin="0" flex="1">
                  {todo.title}
                </Heading>
                <Badge variation={getStatusInfo(todo.status || 'pending').variation}>
                  {getStatusInfo(todo.status || 'pending').label}
                </Badge>
              </Flex>
              
              <Text>{todo.content}</Text>
              
              {todo.category && todo.category.length > 0 && (
                <Flex gap="0.5rem" wrap="wrap">
                  {todo.category.map((cat, index) => (
                    <Badge key={index} variation="info" size="small">
                      🏷️ {cat}
                    </Badge>
                  ))}
                </Flex>
              )}
              
              <Divider />
              
              <Flex gap="0.5rem">
                <Button onClick={() => startEdit(todo)} size="small">
                  ✏️ 編集
                </Button>
                <Button 
                  onClick={() => onDelete(todo.id)} 
                  variation="destructive" 
                  size="small"
                >
                  🗑️ 削除
                </Button>
              </Flex>
            </Flex>
          )}
        </Card>
      ))}
    </Flex>
  )
}
