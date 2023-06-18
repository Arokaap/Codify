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
  CheckCircleIcon,
  RocketLaunchIcon,
  ArrowLongRightIcon
} from '@heroicons/react/24/solid'
import { Footer } from '@/widgets/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function MyCourses () {
  // const myImage = new CloudinaryImage('sample', { cloudName: 'dpew4mitl' }).resize(fill().width(100).height(150))

  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)

  const handleDelete = async (itemId) => {
    try {
      const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
      const token = userLogged.token

      await axios.delete(`https://codifyapi.herokuapp.com/api/courses/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      const result = await axios.get('https://codifyapi.herokuapp.com/api/courses')
      setData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (itemId) => {
  // Lógica para editar el curso
    try {
    // Realiza las acciones necesarias para editar el curso con el ID proporcionado
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://codifyapi.herokuapp.com/api/courses')
      setData(result.data)
    }

    fetchData()
  }, [])

  const alertClass = alertOpen ? '' : 'hidden'

  const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
  const loggedInUserId = userLogged ? userLogged.userId : null

  // Verifica si el usuario tiene algún curso inscrito o es propietario de alguno.
  const userCourses = data.filter(item => {
    const isEnrolled = item.students.some(student => student.id === loggedInUserId)
    const isCreator = item.creator.id === loggedInUserId
    return isEnrolled || isCreator
  })

  return (
    <>
      <section className='relative block h-[50vh]'>
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('img/background-1.jpg')] bg-cover bg-center" />
        <div className='absolute top-0 h-full w-full bg-black/75 bg-cover bg-center' />
      </section>
      <section className='relative bg-blue-gray-50/50 py-16 px-4'>
        <div className='container mx-auto'>
          <div className='relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5'>
            <div className='px-20'>
              <div className='my-15 text-center'>
                <div className='w-full flex justify-end mt-10'>
                  {loggedInUserId && (
                    <Link to='/crear-curso'>
                      <Button variant='gradient'>Crear Curso</Button>
                    </Link>
                  )}
                </div>
                <div className='my-8 text-center flex justify-center gap-7 flex-wrap'>
                  <Alert
                    color='green'
                    icon={<CheckCircleIcon className='mt-px h-6 w-6' />}
                    onClose={() => setAlertOpen(false)}
                    className={`${alertClass}`}
                  >
                    <Typography variant='h5' color='white'>
                      Cursos Adquiridos
                    </Typography>
                  </Alert>

                  {userCourses.length > 0
                    ? (
                        data.map(item => {
                          const isEnrolled = item.students.some(student => student.id === loggedInUserId)
                          const isCreator = item.creator.id === loggedInUserId

                          return isEnrolled || isCreator
                            ? (
                              <Card className='w-full max-w-[22rem] h-[40rem] flex flex-col overflow-auto shadow-lg' key={item.id}>
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
                                    <Link to={`/curso/${item.id}`} className='inline-block'>
                                      <Button
                                        size='lg'
                                        fullWidth
                                        color={isCreator ? 'blue' : (isEnrolled ? 'blue' : 'red')}
                                      >
                                        {!isCreator ? (isEnrolled ? 'Entrar al curso' : 'ILEGAL') : 'Entrar al curso'}
                                      </Button>
                                    </Link>
                                    {isCreator && (
                                      <>
                                        <div className={`${isCreator ? 'flex mt-5' : ''} gap-2`}>
                                          <Link to={`/editar-curso/${item.id}`} className='inline-block'>
                                            <Button
                                              size='lg'
                                              fullWidth
                                              onClick={() => handleEdit(item.id)}
                                              color='yellow'
                                            >
                                              Editar
                                            </Button>
                                          </Link>
                                          <Button
                                            size='lg'
                                            fullWidth
                                            onClick={() => handleDelete(item.id)}
                                            color='red'
                                          >
                                            Borrar
                                          </Button>
                                        </div>
                                      </>
                                    )}
                                  </CardFooter>

                                </Card>
                              </Card>
                              )
                            : null
                        })
                      )
                    : (
                      <Card className='mt-6 w-96'>
                        <CardBody>
                          <RocketLaunchIcon className='text-blue-500 w-12 h-12 mb-4' />
                          <Typography variant='h5' color='blue-gray' className='mb-2'>
                            No hay cursos adquiridos!
                          </Typography>
                          <Typography>
                            Descubre un mundo de posibilidades, expande tus horizontes y adquiere nuevas habilidades. ¡Invierte en ti mismo, compra un curso hoy!
                          </Typography>
                        </CardBody>
                        <CardFooter className='pt-0'>
                          <Link to='/cursos' className='inline-block'>
                            <Button size='sm' variant='text' className='flex items-center gap-2'>
                              Explorar cursos
                              <ArrowLongRightIcon strokeWidth={2} className='w-4 h-4' />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                      )}

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

export default MyCourses
