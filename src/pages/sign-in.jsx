import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography
} from '@material-tailwind/react'
import { SimpleFooter } from '@/widgets/layout'
import { useEffect, useState } from 'react'
import loginService from '@/services/loginService'

export function SignIn ({ handleUser }) {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!userName) {
      newErrors.userName = 'El nombre de usuario es obligatorio'
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        const userLogin = await loginService.login({
          userName,
          password
        })

        setUser(userLogin)

        window.localStorage.setItem(
          'loggedUser', JSON.stringify(userLogin)
        )

        if (!user) {
          newErrors.userName = 'El nombre de usuario es obligatorio'
          newErrors.password = 'La contraseña es obligatoria'
          setErrors(newErrors)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    if (user) {
      handleUser(user)
      navigate('/home')
    }
  }, [user])

  return (
    <>
      <img
        src='/img/background-2.jpg'
        className='absolute inset-0 z-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 z-0 h-full w-full bg-black/50' />
      <div className='container mx-auto p-4'>
        <Card className='absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4'>
          <CardHeader
            variant='gradient'
            color='blue'
            className='mb-4 grid h-28 place-items-center'
          >
            <Typography variant='h3' color='white'>
              Iniciar Sesión
            </Typography>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardBody className='flex flex-col gap-4'>
              <Input
                variant='standard'
                type='text'
                label='Nombre de usuario'
                size='lg'
                onChange={({ target }) => setUserName(target.value)}
                error={!!errors.userName}
              />
              <Input
                variant='standard'
                type='password'
                label='Contraseña'
                size='lg'
                onChange={({ target }) => setPassword(target.value)}
                error={!!errors.password}
              />

              <div className='-ml-2.5'>
                <Checkbox label='Recordarme' />
              </div>
            </CardBody>
            <CardFooter className='pt-0'>
              <Button type='submit' variant='gradient' fullWidth>
                Iniciar Sesión
              </Button>
              <Typography variant='small' className='mt-6 flex justify-center'>
                ¿No tienes cuenta?
                <Link to='/sign-up'>
                  <Typography
                    as='span'
                    variant='small'
                    color='blue'
                    className='ml-1 font-bold'
                  >
                    Registrate
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className='container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white'>
        <SimpleFooter />
      </div>
    </>
  )
}

export default SignIn
