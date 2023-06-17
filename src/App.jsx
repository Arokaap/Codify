import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '@/widgets/layout'
import routes from '@/routes'
import { Profile, SignIn, SignUp } from './pages'
import { useEffect, useState } from 'react'
import MyCourses from './pages/my-courses'
import DataCourse from './pages/data-course'
import CreateCourse from './pages/create-course'
import EditCourse from './pages/edit-course'
import CreateLesson from './pages/create-lesson'
import EditLesson from './pages/edit-lesson'

function App () {
  const [user, setUser] = useState(null)

  const handleUser = (dataUser) => setUser(dataUser)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      setUser(userLogged)
    }
  }, [])

  return (
    <>
      <div className='container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4'>
        <Navbar routes={routes} user={user} handleUser={handleUser} />
      </div>
      <Routes>

        <Route path='/registrarme' element={<SignUp handleUser={handleUser} />} />
        <Route path='/iniciar-sesion' element={<SignIn handleUser={handleUser} />} />
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path='/mis-cursos' element={<MyCourses />} />
        <Route path='/curso/:id' element={<DataCourse />} />
        <Route path='/crear-curso' element={<CreateCourse />} />
        <Route path='/editar-curso/:id' element={<EditCourse />} />
        <Route path='/crear-leccion/:id' element={<CreateLesson />} />
        <Route path='/editar-leccion/:idCourse/:idLesson' element={<EditLesson />} />

        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}

        <Route path='*' element={<Navigate to='/home' replace />} />

      </Routes>
    </>
  )
}

export default App
