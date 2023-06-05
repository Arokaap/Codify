import {
  Typography, Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Alert
} from '@material-tailwind/react'
import {
  StarIcon,
  HeartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid'
import { Footer } from '@/widgets/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function Courses () {
  // const myImage = new CloudinaryImage('sample', { cloudName: 'dpew4mitl' }).resize(fill().width(100).height(150))

  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleBuy = async (itemId) => {
    try {
    // Usa el token del usuario almacenado en el localStorage
      const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
      const token = userLogged.token

      const response = await axios.put(`http://localhost:3000/api/users/${userLogged.userId}/enroll/${itemId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.message) {
        setAlertMessage('¡Inscripción exitosa!')
        // Recarga los datos del curso después de una inscripción exitosa
        const result = await axios.get('http://localhost:3000/api/courses')
        setData(result.data)
      } else {
        setAlertMessage('Ha ocurrido un error al inscribirte al curso.')
      }
    } catch (error) {
      setAlertMessage('Ha ocurrido un error durante la inscripción.')
    }
    // Muestra la alerta y la oculta después de 5 segundos
    setAlertOpen(true)
    setTimeout(() => {
      setAlertOpen(false)
    }, 5000)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/api/courses')
      setData(result.data)
    }

    fetchData()
  }, [])

  const alertClass = alertOpen ? '' : 'hidden'
  return (
    <>
      <section className='relative block h-[50vh]'>
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className='absolute top-0 h-full w-full bg-black/75 bg-cover bg-center' />
      </section>
      <section className='relative bg-blue-gray-50/50 py-16 px-4'>
        <div className='container mx-auto'>
          <div className='relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5'>
            <div className='px-20'>
              <div className='my-15 text-center'>
                <div className='my-8 text-center flex justify-center gap-7 flex-wrap'>
                  <Alert
                    color='green'
                    icon={<CheckCircleIcon className='mt-px h-6 w-6' />}
                    onClose={() => setAlertOpen(false)}
                    className={`${alertClass}`}
                  >
                    <Typography variant='h5' color='white'>
                      {alertMessage}
                    </Typography>
                  </Alert>
                  {data.map(item => {
                    const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
                    const loggedInUserId = userLogged ? userLogged.userId : null
                    const isEnrolled = item.students.some(student => student.id === loggedInUserId)
                    const isCreator = item.creator.id === loggedInUserId

                    return (
                      <Card className='w-full max-w-[22rem] h-[40rem] flex flex-col overflow-auto shadow-lg' key={item.id}>
                        <CardHeader floated={false} color='blue-gray'>
                          <img
                            src={item.image}
                            alt={item.alt}
                          />
                          <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
                          <IconButton
                            size='sm'
                            color='red'
                            variant='text'
                            className='!absolute top-4 right-4 rounded-full'
                          >
                            <HeartIcon className='h-6 w-6' />
                          </IconButton>
                        </CardHeader>
                        <CardBody className='flex-grow'>
                          <div className='mb-3 flex items-center justify-between'>
                            <Typography variant='h5' color='blue-gray' className='font-medium text-center'>
                              {item.title}
                            </Typography>
                            <Typography
                              color='blue-gray'
                              className='flex items-center gap-1.5 font-normal'
                            >
                              <StarIcon className='-mt-0.5 h-5 w-5 text-yellow-700' />
                              5
                            </Typography>
                          </div>
                          <Typography color='gray'>
                            {item.description}
                          </Typography>
                        </CardBody>
                        <CardFooter className='pt-3 mt-auto'>
                          <Button
                            size='lg'
                            fullWidth
                            onClick={() => handleBuy(item.id)}
                            disabled={isCreator || isEnrolled || !loggedInUserId}
                            color={isEnrolled ? 'green' : 'blue'}
                          >
                            {!isCreator ? (isEnrolled ? 'Inscrito' : 'Comprar') : 'En Propiedad'}
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='bg-blue-gray-50/50'>
        <Footer />
      </div>
    </>
  )
}

export default Courses
