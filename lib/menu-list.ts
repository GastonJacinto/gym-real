import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  DollarSign,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'General',
      menus: [
        {
          href: '/dashboard/users',
          label: 'Usuarios',
          icon: Users,
        },
        {
          href: '/dashboard/pricing',
          label: 'Precios y Planes',
          icon: DollarSign,
        },
        {
          href: '',
          label: 'Posts',
          icon: SquarePen,
          submenus: [
            {
              href: '/posts',
              label: 'All Posts',
            },
            {
              href: '/posts/new',
              label: 'New Post',
            },
          ],
        },

        {
          href: '/tags',
          label: 'Tags',
          icon: Tag,
        },
      ],
    },
    {
      groupLabel: 'Configuración',
      menus: [
        {
          href: '/account',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ];
}
