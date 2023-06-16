import {
  Typography,
  Button,
  Card,
  Input,
  Textarea,
  Select,
  Option
} from '@material-tailwind/react'

import { Footer } from '@/widgets/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export function EditCourse () {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [categories, setCategories] = useState([])
  const [courseData, setCourseData] = useState([])
  const navigate = useNavigate()
  const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
  const loggedInUserId = userLogged ? userLogged.userId : null

  const validateForm = () => {
    const formErrors = {}

    if (!(title.trim() || description.trim() || category || file)) {
      // No fields are filled, set error for file field
      formErrors.file = 'Al menos un campo debe estar relleno para realizar la actualización'
    }

    setErrors(formErrors)

    // If no errors, return true, else return false
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (validateForm()) {
      // Create new FormData instance
      const formData = new FormData()

      // Append the file to the formData instance
      if (file) {
        formData.append('file', file)
      }

      try {
        // Update the course
        const course = {
          title: title.trim() ? title : courseData.title,
          description: description.trim() ? description : courseData.description,
          categoryId: category || courseData.category,
          creatorId: loggedInUserId
        }
        const updateCourseResponse = await axios.patch(`http://localhost:3000/api/courses/${id}`, course, {
          headers: {
            Authorization: `Bearer ${userLogged.token}`
          }
        })

        if (updateCourseResponse.status === 200) {
          if (file) {
            await axios.post(`http://localhost:3000/upload/uploadImageCourse/${updateCourseResponse.data.id}`, formData)
          }

          navigate(`/curso/${id}`)
        }
      } catch (error) {
        console.error('Error updating course:', error)
      }
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get('http://localhost:3000/api/categories')
        const course = await axios.get('http://localhost:3000/api/categories')

        setCategories(result.data)
        setCourseData(course.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

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
                    Editar Curso
                  </Typography>
                  <Typography color='gray' className='mt-1 font-normal'>
                    Actualiza la información de tu curso.
                  </Typography>
                  <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
                    <div className='mb-4 flex flex-col gap-6'>
                      <Input size='lg' label='Título' value={title} onChange={e => setTitle(e.target.value)} error={errors.title} />
                      <Textarea label='Descripción' value={description} onChange={e => setDescription(e.target.value)} error={errors.description} />
                      <Select variant='outlined' label='Categoria' value={category} onChange={(value) => setCategory(value)} error={errors.category}>
                        {categories.map(category => (
                          <Option value={category.id} key={category.id}>
                            {category.title}
                          </Option>
                        ))}
                      </Select>
                      <input type='file' className='mt-2' onChange={e => setFile(e.target.files[0])} />
                      {errors.file && <p className='text-red-500'>{errors.file}</p>}
                    </div>
                    <Button className='mt-6' fullWidth type='submit' color='blue'>
                      Editar Curso
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

export default EditCourse
