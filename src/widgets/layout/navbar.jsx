import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from '@material-tailwind/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import AvatarSkin from '../profile/AvatarSkin'

export function Navbar ({ brandName, routes, action, user, handleUser }) {
  const [openNav, setOpenNav] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as='li'
          variant='small'
          color='inherit'
          className='capitalize'
        >
          {href
            ? (
              <a
                href={href}
                target={target}
                className='flex items-center gap-1 p-1 font-normal'
              >
                {icon &&
                React.createElement(icon, {
                  className: 'w-[18px] h-[18px] opacity-75 mr-1'
                })}
                {name}
              </a>
              )
            : (
              <Link
                to={path}
                target={target}
                className='flex items-center gap-1 p-1 font-normal'
              >
                {icon &&
                React.createElement(icon, {
                  className: 'w-[18px] h-[18px] opacity-75 mr-1'
                })}
                {name}
              </Link>
              )}
        </Typography>
      ))}
    </ul>
  )

  return (
    <MTNavbar color='transparent' className='p-3'>
      <div className='container mx-auto flex items-center justify-between text-white'>
        {/* LOGO CON RUTA AL INICIO */}
        <Link to='/'>
          <Typography className='mr-20 ml-10 cursor-pointer py-1.5 font-bold'>
            {brandName}
          </Typography>
        </Link>
        {/* Diferentes elecciones centrales en el menu de navegación */}
        <div className='hidden lg:block'>{navList}</div>
        {!user
          ? (
            <div className='hidden gap-2 lg:flex'>
              <Link to='/registrarme'>
                <Button variant='text' size='sm' color='white' fullWidth>
                  <UserPlusIcon className='inline-block mr-2 w-5' /> {/* Agregamos el icono con margen a la derecha */}
                  Registrarme
                </Button>
              </Link>
              {React.cloneElement(action, {
                className: 'hidden lg:inline-block'
              })}
            </div>
            )
          : (<AvatarSkin handleUser={handleUser} hidden />)}
        <IconButton
          variant='text'
          size='sm'
          color='white'
          className='ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav
            ? (
              <XMarkIcon strokeWidth={2} className='h-6 w-6' />
              )
            : (
              <Bars3Icon strokeWidth={2} className='h-6 w-6' />
              )}
        </IconButton>
      </div>
      <MobileNav
        className='rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900'
        open={openNav}
      >
        <div className='container mx-auto'>
          {navList}
          {!user
            ? (
              <>
                <Link to='/registrarme'>
                  <Button variant='text' size='sm' fullWidth>
                    Registrarme
                  </Button>
                </Link>
                {React.cloneElement(action, {
                  className: 'w-full block'
                })}
              </>
              )
            : (
              <AvatarSkin />
              )}
        </div>
      </MobileNav>
    </MTNavbar>
  )
}

Navbar.defaultProps = {
  brandName: 'Material Tailwind React',
  action: (
    <Link to='/iniciar-sesion'> {/* Ruta de inicio de sesión */}
      <Button variant='gradient' size='sm' fullWidth>
        Iniciar Sesión
      </Button>
    </Link>
  )
}

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node
}

Navbar.displayName = '/src/widgets/layout/navbar.jsx'

export default Navbar
