import ChatPage from '@/components/ChatPage'
import { Metadata } from 'next'

const TITLE = 'Chat'
const DESCRIPTION = 'A simple chat interface for communication'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
}

const Page = () => <ChatPage />

export default Page
