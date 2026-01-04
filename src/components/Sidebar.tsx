import { View, Flex, Heading, Text, Divider } from '@aws-amplify/ui-react'

export default function Sidebar() {
  return (
    <View 
      as="aside"
      width="250px"
      backgroundColor="var(--amplify-colors-background-primary)"
      style={{ borderRight: "1px solid var(--amplify-colors-border-primary)" }}
      padding="1.5rem"
    >
      <Flex direction="column" gap="1.5rem">
        <View>
          <Heading level={5} margin="0 0 0.5rem 0">
            📊 ダッシュボード
          </Heading>
          <Text fontSize="0.9rem" color="var(--amplify-colors-font-secondary)">
            タスクの管理と進捗確認
          </Text>
        </View>
        
        <Divider />
        
        <View>
          <Heading level={6} margin="0 0 0.5rem 0">
            🏷️ カテゴリ
          </Heading>
          <Flex direction="column" gap="0.5rem">
            <Text fontSize="0.9rem">📋 すべて</Text>
            <Text fontSize="0.9rem">⏳ 進行中</Text>
            <Text fontSize="0.9rem">✅ 完了済み</Text>
          </Flex>
        </View>
        
        <Divider />
        
        <View>
          <Heading level={6} margin="0 0 0.5rem 0">
            📈 統計
          </Heading>
          <Text fontSize="0.8rem" color="var(--amplify-colors-font-secondary)">
            今日のタスク管理
          </Text>
        </View>
      </Flex>
    </View>
  )
}
