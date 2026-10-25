// Data for the METTA FLOW — Quick Reply screen (transcribed from the
// user's Figma export, see ~/workspace/metta-flow-ref/SPEC-quick-reply.md).

// Images are imported (not served from public/) so Vite inlines them as
// data URIs in the bundle — the deployed site stays a few text files, and
// the GitHub snapshot push (UTF-8 only) can carry everything.
import angelina from './assets/angelina.webp';
import agent from './assets/agent.webp';
import sophia from './assets/sophia.webp';
import emma from './assets/emma.webp';
import mila from './assets/mila.webp';
import natalie from './assets/natalie.webp';
import tom from './assets/tom.webp';
import chris from './assets/chris.webp';
import stackA from './assets/stack-a.webp';
import stackB from './assets/stack-b.webp';
import stackC from './assets/stack-c.webp';
import stackD from './assets/stack-d.webp';
import checkup from './assets/checkup.jpg';
import wave from './assets/wave.png';

const ASSETS: Record<string, string> = {
  'angelina.webp': angelina,
  'agent.webp': agent,
  'sophia.webp': sophia,
  'emma.webp': emma,
  'mila.webp': mila,
  'natalie.webp': natalie,
  'tom.webp': tom,
  'chris.webp': chris,
  'stack-a.webp': stackA,
  'stack-b.webp': stackB,
  'stack-c.webp': stackC,
  'stack-d.webp': stackD,
  'checkup.jpg': checkup,
  'wave.png': wave,
};

export const asset = (name: string) => ASSETS[name];

/** Background circle color behind each transparent portrait cutout. */
export const AVATAR_BG: Record<string, string> = {
  angelina: '#F39C4B',
  agent: '#C9BFF2',
  sophia: '#F5A8C9',
  emma: '#63B77C',
  mila: '#F5A8C9',
  natalie: '#F2707A',
  tom: '#EFC65C',
  chris: '#F2707A',
  'stack-a': '#F5A8C9',
  'stack-b': '#4FB0A0',
  'stack-c': '#7C9FD8',
  'stack-d': '#EFC65C',
};

export type Platform = 'messenger' | 'instagram' | 'whatsapp';

export interface Conversation {
  id: string;
  name: string;
  img: string;
  platform: Platform;
  time: string;
  preview: string;
  agents: string[];
  unread?: number;
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'angelina',
    name: 'Angelina Jolie',
    img: 'angelina',
    platform: 'messenger',
    time: '2h',
    preview: "Yes, that's correct.",
    agents: ['agent', 'stack-a', 'stack-b'],
    unread: 1,
  },
  {
    id: 'sophia',
    name: 'Sophia Turner',
    img: 'sophia',
    platform: 'messenger',
    time: '1h 30m',
    preview: 'Could you send an instruction for booking appointment ?',
    agents: ['sophia', 'stack-b'],
  },
  {
    id: 'emma',
    name: 'Emma Watson',
    img: 'emma',
    platform: 'instagram',
    time: '2h 15m',
    preview: 'Please send me the invoice for the healthcare packages we ta…',
    agents: ['chris', 'sophia', 'stack-d'],
  },
  {
    id: 'mila',
    name: 'Mila Kunis',
    img: 'mila',
    platform: 'messenger',
    time: '45m',
    preview: 'I would like to know about the Medical Check up packages',
    agents: ['stack-c'],
  },
  {
    id: 'natalie',
    name: 'Natalie Portman',
    img: 'natalie',
    platform: 'whatsapp',
    time: '30m',
    preview: 'I would like book an appointment with Dr. Loris on Sunday',
    agents: ['agent', 'stack-b'],
  },
  {
    id: 'tom',
    name: 'Tom Hiddleston',
    img: 'tom',
    platform: 'messenger',
    time: '25m',
    preview: 'I would like to know about the Medical Check up packages',
    agents: ['natalie', 'stack-d', 'stack-b'],
  },
  {
    id: 'chris',
    name: 'Chris Hemsworth',
    img: 'chris',
    platform: 'instagram',
    time: '45m',
    preview: 'I would like to know about the',
    agents: [],
  },
];

export interface ChatMessage {
  from: 'customer' | 'agent';
  text: string;
  fresh?: boolean;
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  { from: 'customer', text: "Hi, I'd like to book an appointment at your hospital, please." },
  {
    from: 'agent',
    text: "Hello, welcome to Metta Flow Hospital's online support. How can I help you today?",
  },
  { from: 'customer', text: 'I want to book a check-up appointment.' },
];

export const TIMESTAMP = '01 Jun, 12:00 AM • Seen';

export type ReplyCategory = 'Greetings' | 'Appointment' | 'Package';

export interface TextReply {
  kind: 'text';
  id: string;
  cat: ReplyCategory;
  /** Display text (👋 is rendered as the wave image in the panel). */
  text: string;
  /** Text inserted into the composer on click. */
  insert: string;
}

export interface PackageReply {
  kind: 'package';
  id: string;
  cat: ReplyCategory;
  title: string;
  sub: string;
  insert: string;
}

export type Reply = TextReply | PackageReply;

export const CHIP_ORDER: ReplyCategory[] = ['Appointment', 'Greetings', 'Package'];

export const REPLIES: Reply[] = [
  {
    kind: 'text',
    id: 'greeting',
    cat: 'Greetings',
    text: 'Hello! 👋 Welcome to the International Patient Centre. How can I help you today?',
    insert: 'Hello! 👋 Welcome to the International Patient Centre. How can I help you today?',
  },
  {
    kind: 'text',
    id: 'schedule',
    cat: 'Appointment',
    text: 'Would you like to schedule a consultation with our specialist?',
    insert: 'Would you like to schedule a consultation with our specialist?',
  },
  {
    kind: 'package',
    id: 'checkup',
    cat: 'Package',
    title: 'Medical Checkup Information',
    sub: 'RM 8,000–15,000',
    insert: 'Medical Checkup Information (RM 8,000–15,000)',
  },
  {
    kind: 'text',
    id: 'cancer',
    cat: 'Package',
    text: "We have several cancer care packages tailored to each stage. Most patients start with diagnostic scans and consultations before proceeding to therapy. I can share estimated costs if you'd like.",
    insert:
      "We have several cancer care packages tailored to each stage. Most patients start with diagnostic scans and consultations before proceeding to therapy. I can share estimated costs if you'd like.",
  },
];
