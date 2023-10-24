import {
  BadgeInfo,
  // Bell,
  Calendar,
  CheckSquare,
  File,
  FileText,
  Home,
  LayoutGrid,
  MessageSquare,
  ScrollText,
  Star,
  User,
  Video,
} from 'lucide-react';

export const NAVITEMS = [
  {
    label: 'Dashboard',
    path: '/',
    icon: Home,
  },
  {
    label: 'Barazas',
    path: '/discussions',
    icon: LayoutGrid,
  },
  {
    label: 'Events',
    path: '/events',
    icon: Calendar,
  },
  {
    label: 'Polls & Surverys',
    path: '/discussions',
    icon: CheckSquare,
  },
  {
    label: 'Petitions',
    path: '/petitions',
    icon: FileText,
  },
  {
    label: 'News & Updates',
    path: '/news-updates',
    icon: Video,
  },
  {
    label: 'Resources',
    path: '/resources',
    icon: File,
  },
  {
    label: 'Tickets',
    path: '/tickets',
    icon: ScrollText,
  },
  {
    label: 'Reviews',
    path: '/reviews',
    icon: Star,
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: MessageSquare,
  },
];

export const CITIZEN_NAVITEMS = [
  {
    label: 'Home',
    path: '/',
    icon: Home,
  },
  // {
  //   label: 'Notifications',
  //   path: '/notifications',
  //   icon: Bell,
  // },
  {
    label: 'Messages',
    path: '/messages',
    icon: MessageSquare,
  },
  {
    label: 'Barazas',
    path: '/discussions',
    icon: LayoutGrid,
  },
  {
    label: 'Events',
    path: '/events',
    icon: Calendar,
  },
  {
    label: 'Petitions & Surveys',
    path: '/petitions',
    icon: FileText,
  },
  {
    label: 'Resources',
    path: '/resources',
    icon: File,
  },
];

export const MENU_ITEMS = [
  {
    label: 'Profile',
    path: '/my-profile',
    icon: User,
  },
  {
    label: 'Tickets',
    path: '/tickets',
    icon: ScrollText,
  },
  {
    label: 'Complains',
    path: '/complains',
    icon: BadgeInfo,
  },
];

export const INFLUENTIAL_VOICES = [
  {
    username: 'jsmith',
    fullName: 'Joe Smith',
    points: 12000,
    avatar: 'https://i.pravatar.cc/48?u=118836',
  },
  {
    username: 'mgoldbridge',
    fullName: 'Mark Goldbridge',
    points: 123455,
    avatar: 'https://i.pravatar.cc/48?u=12344',
  },
  {
    username: 'aliceabrahams',
    fullName: 'Alice Abrahams',
    points: 15453,
    avatar: 'https://i.pravatar.cc/48?u=134567',
  },
  {
    username: 'jaymotty',
    fullName: 'Jay Motty',
    points: 78676,
    avatar: 'https://i.pravatar.cc/48?u=324234',
  },
];

export const LEADERS = [
  {
    username: 'kangethe',
    fullName: 'Willy Kangethe',
    averageRating: 3,
    position: 'Member of parliament',
    avatar: 'https://i.pravatar.cc/48?u=02345690',
  },
  {
    username: 'wambui',
    fullName: 'Jedidah Wairimu',
    averageRating: 3,
    position: 'Women Rep',
    avatar: 'https://i.pravatar.cc/48?u=123123',
  },
  {
    username: 'johnmca',
    fullName: 'John Maina',
    averageRating: 4,
    position: 'MCA',
    avatar: 'https://i.pravatar.cc/48?u=123908',
  },
  {
    username: 'samspeople',
    fullName: 'Sams People',
    averageRating: 2,
    position: 'Senator',
    avatar: 'https://i.pravatar.cc/48?u=1342423',
  },
  {
    username: 'hermangovernor',
    fullName: 'Herman Muroki',
    averageRating: 3,
    position: 'Governor',
    avatar: 'https://i.pravatar.cc/48?u=24323sf',
  },
];
