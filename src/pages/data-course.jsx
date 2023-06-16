import {
  Typography, Button,
  Card,
  CardHeader,
  CardBody,
  Dialog,
  Avatar,
  Tooltip
} from '@material-tailwind/react'

import { Footer } from '@/widgets/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export function DataCourse () {
  // const myImage = new CloudinaryImage('sample', { cloudName: 'dpew4mitl' }).resize(fill().width(100).height(150))
  const [data, setData] = useState([])
  const [lessons, setLessons] = useState([])
  const { id } = useParams()

  // Esta línea original:
  // const [open, setOpen] = useState(false)
  // se convierte en:
  const [openLessonIndex, setOpenLessonIndex] = useState(null)

  // En lugar de un manejador que simplemente abre o cierra un Dialog,
  // tienes un manejador que recibe el índice de la lección a abrir en un Dialog.
  const handleOpen = (lessonIndex) => setOpenLessonIndex(lessonIndex)

  // Cuando quieras cerrar el Dialog, puedes pasar null a handleOpen.
  const handleClose = () => handleOpen(null)

  const fetchLesson = async (lessonId) => {
    const result = await axios.get(`http://localhost:3000/api/lessons/${lessonId}`)
    setLessons(oldLessons => [...oldLessons, result.data])
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/courses/${id}`)
      setData(result.data)
      // Asegúrate de que lessons sea un array antes de llamar a forEach
      if (Array.isArray(result.data.lessons)) {
        result.data.lessons.forEach(fetchLesson)
      }
    }

    fetchData()
  }, [])

  console.log(data)

  const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
  const loggedInUserId = userLogged ? userLogged.userId : null

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
              <div className='mt-32 grid grid-cols-2 gap-4 items-start'>

                {/* INFORMACION DEL CURSO */}
                <div className='ml-5 mx-auto -mt-8 w-full px-4 mb-10 sticky top-8'>
                  <figure className='relative h-full w-full'>
                    <img
                      className='h-full w-full rounded-xl'
                      src={`${data.image}`}
                      alt='course image'
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

                  <Typography variant='lead' color='gray' className='mt-3 font-normal'>
                    <br />
                    Students:
                  </Typography>
                  <div className='flex items-center -space-x-3'>
                    <Tooltip content='Natali Craig'>
                      <Avatar
                        size='sm'
                        variant='circular'
                        alt='natali craig'
                        src='https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80'
                        className='border-2 border-white hover:z-10'
                      />
                    </Tooltip>
                    <Tooltip content='Candice Wu'>
                      <Avatar
                        size='sm'
                        variant='circular'
                        alt='candice wu'
                        src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                        className='border-2 border-white hover:z-10'
                      />
                    </Tooltip>
                  </div>
                </div>

                {/* LECCIONES DEL CURSO */}
                <div className='mx-auto px-4 overflow-auto mb-5'>
                  {lessons.map((lesson, index) => (
                    <div key={index} className='mb-4'>
                      <Card className='flex-row w-full max-w-[35rem]'>
                        <CardHeader shadow={false} floated={false} className='w-2/5 shrink-0 m-0 rounded-r-none'>
                          <img
                            src={`/img/${lesson.image}`}
                            alt='image'
                            className='w-full h-full object-cover'
                          />
                        </CardHeader>
                        <CardBody>
                          {lesson.title &&
                            <Typography variant='h4' color='blue-gray' className='mb-2'>
                              {lesson.title}
                            </Typography>}
                          <Button onClick={() => handleOpen(index)} variant='gradient'>
                            Ver lección
                          </Button>
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
                    {loggedInUserId === data.creator && (
                      <Button variant='gradient'>Añadir Lección</Button>
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
