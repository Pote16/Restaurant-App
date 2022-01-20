import { INavData } from '@coreui/angular';


export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-user' }
  },  
  {
    name: 'Categories',
    url: '/categories',
    iconComponent: { name: 'cil-aperture' }
  },  
  {
    name: 'Menu Items',
    url: '/menuitems',
    iconComponent: { name: 'cil-fastfood' }
  },  
  {
    name: 'Tables',
    url: '/tables',
    iconComponent: { name: 'cil-square' }
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];
