import { Home } from '@/pages'
import {
  HomeIcon,
  DocumentTextIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid'
import Courses from './pages/courses'

export const routes = [
  {
    icon: HomeIcon,
    name: 'Inicio',
    path: '/home',
    element: <Home />
  },
  {
    icon: AcademicCapIcon,
    name: 'Cursos',
    path: '/cursos',
    element: <Courses />
  },
  {
    icon: DocumentTextIcon,
    name: 'Docs',
    href: '',
    target: '_blank',
    element: ''
  }
]

export default routes
