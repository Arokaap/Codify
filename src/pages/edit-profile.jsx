import {
  Typography,
  Button,
  Card,
  Input
} from '@material-tailwind/react'
import { BeatLoader } from 'react-spinners'
import { Footer } from '@/widgets/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export function EditProfile () {
  const { id } = useParams()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const userLogged = JSON.parse(window.localStorage.getItem('loggedUser'))
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [description, setDescription] = useState('')
  const [jobPosition, setJobPosition] = useState('')
  const [centerStudy, setCenterStudy] = useState('')
  const [ubication, setUbication] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const formErrors = {}

    if (!(username.trim() || email.trim() || firstName.trim() || lastName.trim() || description.trim() || jobPosition.trim() || centerStudy.trim() || ubication.trim())) {
      formErrors.general = 'Al menos un campo debe estar rellenado o modificado para realizar la actualización'
    }

    setErrors(formErrors)

    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (validateForm()) {
      setIsLoading(true)
      const formData = new FormData()

      if (avatar) {
        formData.append('file', avatar)
      }

      try {
        const user = {
          userName: username.trim() ? username : userData.userName,
          email: email.trim() ? email : userData.email,
          firstName: firstName.trim() ? firstName : userData.firstName,
          lastName: lastName.trim() ? lastName : userData.lastName,
          description: description.trim() ? description : userData.description,
          jobPosition: jobPosition.trim() ? jobPosition : userData.jobPosition,
          centerStudy: centerStudy.trim() ? centerStudy : userData.centerStudy,
          ubication: ubication.trim() ? ubication : userData.ubication
        }

        const updateUserResponse = await axios.patch(`http://localhost:3000/api/users/${id}`, user, {
          headers: {
            Authorization: `Bearer ${userLogged.token}`
          }
        })

        console.log(updateUserResponse)

        if (updateUserResponse.status === 200) {
          if (avatar) {
            await axios.post(`http://localhost:3000/upload/uploadImageUser/${updateUserResponse.data.id}`, formData)
          }
        }
        navigate('/profile')
      } catch (error) {
        console.error('Error updating profile:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await axios.get(`http://localhost:3000/api/users/${id}`)

        setUserData(user.data)
        setUsername(user.data.userName)
        setEmail(user.data.email)
        setFirstName(user.data.firstName)
        setLastName(user.data.lastName)
        setDescription(user.data.description)
        setJobPosition(user.data.jobPosition)
        setCenterStudy(user.data.centerStudy)
        setUbication(user.data.ubication)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
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
                    Editar Perfil
                  </Typography>
                  <Typography color='gray' className='mt-1 font-normal'>
                    Actualiza la información de tu perfil.
                  </Typography>
                  <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
                    <div className='mb-4 flex flex-col gap-6'>
                      <Input size='lg' label='Nombre de Usuario' value={username !== null ? username : userData.userName} onChange={e => setUsername(e.target.value)} error={errors.username} />
                      <Input size='lg' label='Email' value={email !== null ? email : userData.email} onChange={e => setEmail(e.target.value)} error={errors.email} />
                      <Input size='lg' label='First Name' value={firstName !== null ? firstName : userData.firstName} onChange={e => setFirstName(e.target.value)} error={errors.firstName} />
                      <Input size='lg' label='Last Name' value={lastName !== null ? lastName : userData.lastName} onChange={e => setLastName(e.target.value)} error={errors.lastName} />
                      <fieldset>
                        <legend>Avatar:</legend>
                        <input type='file' onChange={(e) => setAvatar(e.target.files[0])} />
                      </fieldset>
                      <Input size='lg' label='Descripción' value={description !== null ? description : userData.description} onChange={e => setDescription(e.target.value)} error={errors.description} />
                      <Input size='lg' label='Puesto de Trabajo' value={jobPosition !== null ? jobPosition : userData.jobPosition} onChange={e => setJobPosition(e.target.value)} error={errors.jobPosition} />
                      <Input size='lg' label='Centro de Estudios' value={centerStudy !== null ? centerStudy : userData.centerStudy} onChange={e => setCenterStudy(e.target.value)} error={errors.centerStudy} />
                      <Input size='lg' label='Ubicación' value={ubication !== null ? ubication : userData.ubication} onChange={e => setUbication(e.target.value)} error={errors.ubication} />
                      {errors.general && <p className='text-red-500'>{errors.general}</p>}
                    </div>
                    <Button className='mt-6' fullWidth type='submit' disabled={isLoading}>
                      {isLoading ? <BeatLoader size={10} color='#123abc' loading={isLoading} /> : 'Editar Perfil'}
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

export default EditProfile
