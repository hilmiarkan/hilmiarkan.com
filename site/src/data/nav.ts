import type { IconName } from './icons';

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

// The order here is the order in the navigation. URLs match the old site.
export const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Works', href: '/case-study', icon: 'works' },
  { label: 'Side Projects', href: '/design-projects', icon: 'sideProjects' },
  { label: 'Resume', href: '/resume', icon: 'resume' },
  { label: 'Notes', href: '/notes', icon: 'notes' },
  { label: 'Photos', href: '/photos', icon: 'photos' },
];
