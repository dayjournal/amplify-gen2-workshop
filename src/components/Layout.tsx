import { type ReactNode } from 'react'
import { Flex, View } from '@aws-amplify/ui-react'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
  user: any
  signOut?: () => void
}

export default function Layout({ children, user, signOut }: LayoutProps) {
  return (
    <Flex direction="column" height="100vh">
      <Header user={user} signOut={signOut} />
      <Flex flex="1">
        <Sidebar />
        <View as="main" flex="1" padding="1rem" backgroundColor="var(--amplify-colors-background-secondary)">
          {children}
        </View>
      </Flex>
    </Flex>
  )
}
