interface MessagesTypes {
  id: number,
  unique_id: string,
  user_id: number,
  receiver_id: number,
  created_at: string,
  updated_at: string,
  content: string,
  opponent: string,
  status: number|null,
}

export interface MessagesData {
  [key: string]: MessagesTypes[]
}

export interface WithUnreadMessages extends MessagesTypes {
  unreadMessages: number
}

export default MessagesTypes