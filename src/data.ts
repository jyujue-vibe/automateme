/* Sample content for the Quick Reply prototype.
 *
 * NOTE: the Figma screens this is based on were too small to read, so all
 * text below is plausible generic support content written for this sample —
 * nothing here is copied from Figma. */

export const QUICK_REPLY_CATEGORIES = [
  'All',
  'Greetings',
  'Delivery',
  'Payment',
  'Closing',
] as const

export type QuickReplyCategory = (typeof QUICK_REPLY_CATEGORIES)[number]

export interface QuickReply {
  id: string
  title: string
  category: Exclude<QuickReplyCategory, 'All'>
  text: string
}

export const QUICK_REPLIES: QuickReply[] = [
  {
    id: 'greet-welcome',
    title: 'Welcome',
    category: 'Greetings',
    text: 'Hello! Thanks for reaching out. How can I help you today?',
  },
  {
    id: 'greet-wait',
    title: 'Please hold',
    category: 'Greetings',
    text: 'Thanks for your patience — I am checking that for you now and will be right back.',
  },
  {
    id: 'greet-apology',
    title: 'Apology for the wait',
    category: 'Greetings',
    text: 'I am very sorry for the wait. Let me look into this for you right away.',
  },
  {
    id: 'delivery-status',
    title: 'Delivery status',
    category: 'Delivery',
    text: 'Your order is on its way and should arrive within the estimated delivery window shown in your app.',
  },
  {
    id: 'delivery-delay',
    title: 'Delivery delayed',
    category: 'Delivery',
    text: 'I am sorry — your delivery is running a little late due to high demand in your area. We will update you as soon as the rider is nearby.',
  },
  {
    id: 'delivery-address',
    title: 'Confirm address',
    category: 'Delivery',
    text: 'Could you please confirm your delivery address and a phone number the rider can reach you on?',
  },
  {
    id: 'payment-methods',
    title: 'Payment methods',
    category: 'Payment',
    text: 'We accept cash on delivery, mobile banking, and card payment. You can change your payment method before the rider arrives.',
  },
  {
    id: 'payment-refund',
    title: 'Refund timing',
    category: 'Payment',
    text: 'Your refund has been processed. It should appear in your account within 3–5 working days, depending on your bank.',
  },
  {
    id: 'payment-failed',
    title: 'Payment failed',
    category: 'Payment',
    text: 'It looks like the payment did not go through. Please try again, or choose cash on delivery and we will keep your order ready.',
  },
  {
    id: 'closing-thanks',
    title: 'Thank you',
    category: 'Closing',
    text: 'Thank you for contacting us! If you need anything else, just send us a message here.',
  },
  {
    id: 'closing-resolved',
    title: 'Issue resolved',
    category: 'Closing',
    text: 'Glad we could sort that out for you. I will close this chat for now — feel free to reopen it anytime.',
  },
  {
    id: 'closing-feedback',
    title: 'Ask for feedback',
    category: 'Closing',
    text: 'Before you go, we would love to hear how we did today. Your feedback helps us serve you better.',
  },
]

export interface Conversation {
  id: string
  customer: string
  initials: string
  avatarColor: 'neutral' | 'blue' | 'lime' | 'pink'
  snippet: string
  time: string
  unread?: number
  channel: string
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    customer: 'Aye Chan Moe',
    initials: 'AC',
    avatarColor: 'pink',
    snippet: 'Hi, my order still has not arrived yet',
    time: '09:41',
    unread: 2,
    channel: 'Messenger',
  },
  {
    id: 'c2',
    customer: 'Thura Zaw',
    initials: 'TZ',
    avatarColor: 'blue',
    snippet: 'Can I pay by mobile banking?',
    time: '09:12',
    channel: 'Messenger',
  },
  {
    id: 'c3',
    customer: 'May Thazin',
    initials: 'MT',
    avatarColor: 'lime',
    snippet: 'Thank you so much!',
    time: '08:57',
    channel: 'Viber',
  },
  {
    id: 'c4',
    customer: 'Ko Phyo',
    initials: 'KP',
    avatarColor: 'neutral',
    snippet: 'The rider called me just now, all good',
    time: 'Yesterday',
    channel: 'Messenger',
  },
  {
    id: 'c5',
    customer: 'Su Myat Noe',
    initials: 'SM',
    avatarColor: 'pink',
    snippet: 'Please change my delivery address',
    time: 'Yesterday',
    unread: 1,
    channel: 'Telegram',
  },
]

export interface ChatMessage {
  id: string
  from: 'customer' | 'agent'
  text: string
  time: string
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    from: 'customer',
    text: 'Hi, my order still has not arrived yet. It says out for delivery since this morning.',
    time: '09:38',
  },
  {
    id: 'm2',
    from: 'agent',
    text: 'Hello! I am sorry about that — let me check the delivery status for you right away.',
    time: '09:39',
  },
  {
    id: 'm3',
    from: 'customer',
    text: 'Thank you. The order number is #8412.',
    time: '09:41',
  },
]
