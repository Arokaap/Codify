import {
  Typography,
  Button,
  Card,
  Input,
  Textarea
} from '@material-tailwind/react'
import { BeatLoader } from 'react-spinners'
import { Footer } from '@/widgets/layout'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export function CreateLesson () {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null) // Nuevo estado para el archivo de video
  const [errors, setErrors] = useState({})
  const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const formErrors = {}

    if (!title.trim()) formErrors.title = 'El título es obligatorio'
    if (!description.trim()) formErrors.description = 'La descripción es obligatoria'
    if (!file) formErrors.file = 'La lección no puede publicarse sin imagen'

    setErrors(formErrors)

    // If no errors, return true, else return false
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Create new FormData instance
      const formData = new FormData()

      // Append the file to the formData instance
      formData.append('file', file)

      try {
        // Create the lesson
        const lesson = {
          title,
          description,
          url: '',
          image: ''
        }
        const createLessonResponse = await axios.post(`https://codifyapi.herokuapp.com/api/lessons/${id}`, lesson, {
          headers: {
            Authorization: `Bearer ${userLogged.token}`
          }
        })

        if (createLessonResponse.status === 200) {
          const response = await axios.post(`https://codifyapi.herokuapp.com/upload/uploadImageLesson/${createLessonResponse.data.id}`, formData)

          if (response.status === 200) {
            console.log('Create Lesson')
          }
        }

        if (videoFile) {
          const formData = new FormData()
          formData.append('file', videoFile) // Aquí selectedFile es el archivo que el usuario seleccionó
          formData.append('description', 'sampleVideoAaron')

          await axios.post(`https://codifyapi.herokuapp.com/upload/uploadVideo/${createLessonResponse.data.id}`, formData)
        }
        navigate(`/curso/${id}`)
      } catch (error) {
        console.error('Error creating lesson:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

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
              <div className='mt-32 flex justify-center items-center mb-32'>
                <Card color='transparent' shadow={false}>
                  <Typography variant='h4' color='blue-gray'>
                    Crear Lección {/* Change here */}
                  </Typography>
                  <Typography color='gray' className='mt-1 font-normal'>
                    Introduce la información de tu lección. {/* Change here */}
                  </Typography>
                  <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
                    <div className='mb-4 flex flex-col gap-6'>
                      <Input size='lg' label='Título' value={title} onChange={e => setTitle(e.target.value)} error={errors.title} />
                      <Textarea label='Descripción' value={description} onChange={e => setDescription(e.target.value)} error={errors.description} />
                      <fieldset>
                        <legend>Imagen de la Lección:</legend>
                        <input type='file' className='mt-2' onChange={e => setFile(e.target.files[0])} />
                      </fieldset>
                      {errors.file && <p className='text-red-500'>{errors.file}</p>}
                      <fieldset>
                        <legend>Vídeo de la Lección:</legend>
                        <input type='file' className='mt-2' onChange={e => setVideoFile(e.target.files[0])} />
                      </fieldset>
                    </div>
                    <Button className='mt-6' fullWidth type='submit' disabled={isLoading}>
                      {isLoading ? <BeatLoader size={10} color='#123abc' loading={isLoading} /> : 'Crear Lección'}
                    </Button>

                  </form>
                </Card>
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

export default CreateLesson
