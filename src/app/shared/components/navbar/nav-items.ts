interface NavItem {
  path: string;
  title: string;
  icon?: string;
  roleAccepted: string[];
}

const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
    roleAccepted: ['Administrador', 'Cliente']
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'people_outline',
    roleAccepted: ['Administrador', 'Cliente']
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'shopping_cart',
    roleAccepted: ['Administrador', 'Cliente']
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'supervised_user_circle',
    roleAccepted: ['Administrador']
  },
]

export default links;
