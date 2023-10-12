import {
  BadgeInfo,
  Bell,
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
    label: 'Discussion & Forums',
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
  {
    label: 'Notifications',
    path: '/notifications',
    icon: Bell,
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: MessageSquare,
  },
  {
    label: 'Discussion & Forums',
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
