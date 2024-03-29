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
import registerService from '@/services/registerService'
import { BeatLoader } from 'react-spinners'

export function SignUp ({ handleUser }) {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!userName) {
      newErrors.userName = 'El nombre de usuario es obligatorio'
    }
    if (!firstName) {
      newErrors.firstName = 'El primer nombre es obligatorio'
    }
    if (!lastName) {
      newErrors.lastName = 'El apellido es obligatorio'
    }
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio'
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria'
    }
    if (!confirmPassword || (password !== confirmPassword)) {
      newErrors.confirmPassword = 'Las contraseñas deben coincidir'
    }
    if (!termsAccepted) {
      newErrors.terms = 'Debes aceptar los términos y condiciones'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true)

        const userRegister = await registerService.register({
          userName,
          firstName,
          lastName,
          email,
          password
        })

        window.localStorage.setItem(
          'loggedUser', JSON.stringify(userRegister)
        )

        setUser(userRegister)

        if (!user) {
          newErrors.userName = 'El nombre de usuario es obligatorio'
          newErrors.password = 'La contraseña es obligatoria'

          setErrors(newErrors)
        }
      } catch (err) {
        if (err.response.data.error.includes(userName)) {
          setErrors(prevErrors => ({ ...prevErrors, userName: 'El nombre de usuario ya está en uso' }))
        }

        if (err.response.data.error.includes(email)) {
          setErrors(prevErrors => ({ ...prevErrors, email: 'El email ya está en uso' }))
        }
      } finally {
        setIsLoading(false)
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
        src='img/gugen-background.png'
        className='absolute inset-0 z-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 z-0 h-full w-full bg-black/50' />
      <div className='container mx-auto p-4'>
        <Card className='absolute top-2/4 left-2/4 w-full max-w-[34rem] -translate-y-2/4 -translate-x-2/4'>
          <CardHeader
            variant='gradient'
            color='blue'
            className='mb-4 grid h-28 place-items-center'
          >
            <Typography variant='h3' color='white'>
              Registrarme
            </Typography>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardBody className='flex gap-4'>
              <div className='flex flex-col gap-4 w-1/2'>
                <Input
                  variant='standard'
                  label='Nombre'
                  size='lg'
                  onChange={({ target }) => setFirstName(target.value)}
                  error={!!errors.firstName}
                />
                <Input
                  variant='standard'
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
              </div>
              <div className='flex flex-col gap-4 w-1/2'>
                <Input
                  variant='standard'
                  label='Apellidos'
                  size='lg'
                  onChange={({ target }) => setLastName(target.value)}
                  error={!!errors.lastName}
                />
                <Input
                  variant='standard'
                  type='email'
                  label='Email'
                  size='lg'
                  onChange={({ target }) => setEmail(target.value)}
                  error={!!errors.email}
                />
                <Input
                  variant='standard'
                  type='password'
                  label='Confirmar contraseña'
                  size='lg'
                  onChange={({ target }) => setConfirmPassword(target.value)}
                  error={!!errors.confirmPassword}
                />
              </div>
            </CardBody>
            <div className='ml-3'>
              <Checkbox
                label='Aceptar términos y condiciones'
                onChange={({ target }) => setTermsAccepted(target.checked)}
              />
              {errors.terms && <Typography color='red'>{errors.terms}</Typography>}
            </div>
            <CardFooter className='pt-0'>
              <Button type='submit' variant='gradient' fullWidth>
                {isLoading ? <BeatLoader size={10} color='#123abc' loading={isLoading} /> : 'Registrarme'}
              </Button>
              <Typography variant='small' className='mt-6 flex justify-center'>
                ¿Ya tienes cuenta?
                <Link to='/iniciar-sesion'>
                  <Typography
                    as='span'
                    variant='small'
                    color='blue'
                    className='ml-1 font-bold'
                  >
                    Inicia Sesión
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

export default SignUp
