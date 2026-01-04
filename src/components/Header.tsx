import { Flex, Heading, Button, Text, View } from '@aws-amplify/ui-react'

interface HeaderProps {
  user: any
  signOut?: () => void
}

export default function Header({ user, signOut }: HeaderProps) {
  return (
    <View 
      as="header" 
      backgroundColor="var(--amplify-colors-brand-primary-80)"
      padding="1rem 2rem"
      style={{ borderBottom: "1px solid var(--amplify-colors-border-primary)" }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading level={3} color="white" margin="0">
          📝 Todo アプリ
        </Heading>
        <Flex alignItems="center" gap="1rem">
          <Text color="white">
            ようこそ、{user?.signInDetails?.loginId}さん
          </Text>
          <Button variation="primary" onClick={signOut}>
            サインアウト
          </Button>
        </Flex>
      </Flex>
    </View>
  )
}
