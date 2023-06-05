import {
  Avatar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react'
import {
  UserCircleIcon,
  ChevronDownIcon,
  LifebuoyIcon,
  PowerIcon
} from '@heroicons/react/24/outline'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AvatarSkin = ({ handleUser, hidden, user }) => {
  const loggout = () => {
    window.localStorage.removeItem('loggedUser')
    handleUser(null)
  }

  const closeMenu = () => setIsMenuOpen(false)
  const navigate = useNavigate()

  const profileMenuItems = [
    {
      label: 'Mi Perfil',
      icon: UserCircleIcon,
      onClick: () => {
        navigate('/profile')
        closeMenu()
      }
    },
    {
      label: 'Mis cursos',
      icon: LifebuoyIcon,
      onClick: closeMenu

    },
    {
      label: 'Cerrar Sesión',
      icon: PowerIcon,
      onClick: loggout
    }
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div
      className={`flex w-full justify-center px-lg:order-2 lg:w-3/12 ${
        hidden && 'hidden gap-2 lg:flex'
      }`}
    >
      <div className='relative'>
        <div className='w-10'>
          <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
            <MenuHandler>
              <Button
                variant='text'
                color='white'
                className='flex items-center gap-1 rounded-full py-0.5 pr-0 pl-0.5 lg:ml-auto'
              >
                <Avatar
                  src='/img/teacher-1.jpeg'
                  alt='Profile picture'
                  variant='circular'
                  className='h-full w-full shadow-xl'
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className='p-1'>
              {profileMenuItems.map(({ label, icon, onClick }, key) => {
                const isLastItem = key === profileMenuItems.length - 1
                return (
                  <MenuItem
                    key={label}
                    onClick={onClick}
                    className={`flex items-center gap-2 rounded ${
                      isLastItem
                        ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                        : ''
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                      strokeWidth: 2
                    })}
                    <Typography
                      as='span'
                      variant='small'
                      className='font-normal'
                      color={isLastItem ? 'red' : 'inherit'}
                    >
                      {label}
                    </Typography>
                  </MenuItem>

                )
              })}
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default AvatarSkin
