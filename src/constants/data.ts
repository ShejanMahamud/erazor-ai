import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Background Remover',
    url: '/dashboard/background-remover',
    icon: 'media',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Image History',
    url: '/dashboard/image-history',
    icon: 'history',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'User Management',
    url: '/dashboard/user-management',
    icon: 'user',
    shortcut: ['u', 'm'],
    isActive: false,
    items: []
  }
];

export const avatars = [
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/16860528',
    profileUrl: 'https://github.com/dillionverma'
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/20110627',
    profileUrl: 'https://github.com/tomonarifeehan'
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/106103625',
    profileUrl: 'https://github.com/BankkRoll'
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/59228569',
    profileUrl: 'https://github.com/safethecode'
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/59442788',
    profileUrl: 'https://github.com/sanjay-mali'
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/89768406',
    profileUrl: 'https://github.com/itsarghyadas'
  }
];
