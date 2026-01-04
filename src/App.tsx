import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Layout from './components/Layout'
import TodoApp from './components/TodoApp'

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Layout user={user} signOut={signOut}>
          <TodoApp />
        </Layout>
      )}
    </Authenticator>
  )
}

export default App
