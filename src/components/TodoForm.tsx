import { useState } from 'react'
import { 
  Card, 
  Flex, 
  TextField, 
  TextAreaField, 
  SelectField, 
  Button, 
  Heading 
} from '@aws-amplify/ui-react'

interface TodoFormProps {
  onSubmit: (todo: {
    title: string
    content: string
    status: 'pending' | 'in_progress' | 'completed'
    category: string[]
  }) => void
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending')
  const [categoryInput, setCategoryInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const category = categoryInput.split(',').map(c => c.trim()).filter(c => c)
    
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      status,
      category
    })

    setTitle('')
    setContent('')
    setStatus('pending')
    setCategoryInput('')
  }

  return (
    <Card padding="1.5rem" margin="0 0 2rem 0">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="1rem">
          <Heading level={4} margin="0 0 1rem 0">
            ✨ 新しい Todo を追加
          </Heading>
          
          <TextField
            label="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo のタイトルを入力"
            required
          />

          <TextAreaField
            label="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Todo の詳細を入力"
            rows={3}
            required
          />

          <SelectField
            label="ステータス"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'pending' | 'in_progress' | 'completed')}
          >
            <option value="pending">⏳ 未着手</option>
            <option value="in_progress">🔄 進行中</option>
            <option value="completed">✅ 完了</option>
          </SelectField>

          <TextField
            label="カテゴリ"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="カテゴリをカンマ区切りで入力（例: 仕事, 個人）"
          />

          <Button type="submit" variation="primary" size="large">
            📝 Todo を追加
          </Button>
        </Flex>
      </form>
    </Card>
  )
}
