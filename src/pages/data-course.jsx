import {
  Typography, Button,
  Card,
  CardHeader,
  CardBody,
  Dialog,
  Avatar,
  Tooltip
} from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Footer } from '@/widgets/layout'

export function DataCourse () {
  const [data, setData] = useState({ students: [] })
  const [lessons, setLessons] = useState([])
  const [openLessonIndex, setOpenLessonIndex] = useState(null)
  const [deletingLessonId, setDeletingLessonId] = useState(null) // Nuevo estado para controlar la lección en proceso de eliminación
  const { id } = useParams()

  const handleOpen = (lessonIndex) => setOpenLessonIndex(lessonIndex)
  const handleClose = () => setOpenLessonIndex(null)

  const fetchLesson = async ({ id }) => {
    const result = await axios.get(`https://codifyapi.herokuapp.com/api/lessons/${id}`)
    setLessons(oldLessons => [...oldLessons, result.data])
  }

  const handleDeleteLesson = async (lessonId) => {
    try {
      setDeletingLessonId(lessonId) // Establecer el ID de la lección en proceso de eliminación

      await axios.delete(`https://codifyapi.herokuapp.com/api/lessons/${id}/delete/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${userLogged.token}`
        }
      })

      setLessons(oldLessons => oldLessons.filter(lesson => lesson.id !== lessonId))
    } catch (err) {
      console.error(err)
    } finally {
      setDeletingLessonId(null) // Restablecer el ID de la lección en proceso de eliminación
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://codifyapi.herokuapp.com/api/courses/${id}`)
      setData(result.data)
      if (Array.isArray(result.data.lessons)) {
        result.data.lessons.forEach(fetchLesson)
      }
    }

    fetchData()
  }, [])

  const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
  const loggedInUserId = userLogged ? userLogged.userId : null

  if (!userLogged) {
    return (
      <>
        <section className='relative block h-[50vh]'>
          <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
          <div className='absolute top-0 h-full w-full bg-black/75 bg-cover bg-center' />
        </section>
        <section className='relative bg-blue-gray-50/50 py-16 px-4'>
          <div className='container mx-auto'>
            <div className='relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5'>

              <div className='container mx-auto'>
                <div className='mt-32 flex justify-center items-center mb-32'>
                  Registrate y intentalo de nuevo
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

  return (
    <>
      <section className='relative block h-[50vh]'>
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className='absolute top-0 h-full w-full bg-black/75 bg-cover bg-center' />
      </section>
      <section className='relative bg-blue-gray-50/50 py-16 px-4'>
        <div className='container mx-auto'>
          <div className='relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5'>

            <div className='container mx-auto'>
              <div className='mt-32 grid md:grid-cols-2 grid-cols-1 gap-4 items-start'>

                {/* INFORMACION DEL CURSO */}
                <div className='ml-100 mx-auto -mt-8 w-90 px-4 mb-10 md:sticky top-8'>
                  <figure className='relative h-full w-full'>
                    <img
                      src={`${data.image}`}
                      alt='course image'
                      style={{
                        objectFit: 'cover',
                        height: '100%',
                        width: '100%'
                      }}
                    />
                  </figure>
                  <Typography variant='h4' color='blue-gray'>
                    <br />
                    {`${data.title}`}
                  </Typography>
                  <Typography variant='lead' color='gray' className='mt-3 font-normal'>
                    <br />
                    {`${data.description}`}
                  </Typography>

                  <Typography variant='lead' color='gray' className='mt-3 font-bold'>
                    <br />
                    Estudiantes:
                  </Typography>
                  <div className='flex items-center -space-x-3 ml-10'>
                    {data.students?.length > 0 && data.students.map((student, index) => (
                      <Tooltip content={student.userName} key={index}>
                        <Avatar
                          size='sm'
                          variant='circular'
                          alt={student.userName}
                          src={student.avatar ? student.avatar : '/img/userDefault.png'}
                          className='border-2 border-white hover:z-10'
                        />
                      </Tooltip>
                    ))}
                  </div>
                </div>

                {/* LECCIONES DEL CURSO */}
                <div className='mx-auto px-4 overflow-auto mb-5' style={{ minWidth: '400px' }}>
                  <Typography variant='h4' color='blue-gray' className='mb-5'>
                    Lecciones:
                  </Typography>
                  {lessons.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
                    .map((lesson, index) => (
                      <div key={index} className='mb-8'>
                        <Card className='flex-row w-full max-w-[35rem] relative'>
                          {loggedInUserId === data.creator.id && (
                            <div className='absolute top-0 right-0 mt-2 mr-2'>
                              <Link to={`/editar-leccion/${id}/${lesson.id}`}>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 cursor-pointer'>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                                </svg>
                              </Link>
                            </div>
                          )}
                          <CardHeader shadow={false} floated={false} className='w-2/5 shrink-0 m-0 rounded-r-none'>
                            <img
                              src={`${lesson.image}`}
                              alt='image'
                              className='w-auto h-full object-cover'
                            />
                          </CardHeader>
                          <CardBody>
                            {lesson.title && (
                              <Typography variant='h6' color='blue-gray' className='mb-2'>
                                {lesson.title}
                              </Typography>
                            )}
                            <Button onClick={() => handleOpen(index)} variant='gradient'>
                              Ver lección
                            </Button>
                            {loggedInUserId === data.creator.id && (
                              <div className='absolute bottom-0 right-0 mb-2 mr-2'>
                                {deletingLessonId === lesson.id
                                  ? (
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 animate-spin'>
                                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                    )
                                  : (
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 cursor-pointer' onClick={() => handleDeleteLesson(lesson.id)}>
                                      <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                                    </svg>
                                    )}
                              </div>
                            )}
                            <Dialog open={openLessonIndex === index} handler={handleClose}>
                              <video className='h-full w-full rounded-lg' controls>
                                <source src={`${lesson.url}`} type='video/mp4' />
                                Your browser does not support the video tag.
                              </video>
                            </Dialog>
                          </CardBody>
                        </Card>
                      </div>
                    ))}
                  <div className='w-full flex justify-end mt-10'>
                    {data && data.creator && loggedInUserId === data.creator.id && (
                      <Link to={`/crear-leccion/${id}`} className='inline-block'>
                        <Button variant='gradient'>Añadir Lección</Button>
                      </Link>
                    )}
                  </div>
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

export default DataCourse
