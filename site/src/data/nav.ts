import type { IconName } from './icons';

export interface NavItem {
  label: string;   // shown as a tooltip on hover (desktop) and read by screen readers
  href: string;
  icon: IconName;
}

// The order here is the order in the navigation. URLs and labels match the
// original site.
export const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Case Study', href: '/case-study', icon: 'works' },
  { label: 'Works', href: '/design-projects', icon: 'sideProjects' },
  { label: 'CV', href: '/resume', icon: 'resume' },
  { label: 'Notes', href: '/notes', icon: 'notes' },
  { label: 'Photos', href: '/photos', icon: 'photos' },
];
