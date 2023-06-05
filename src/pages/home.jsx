import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea
} from '@material-tailwind/react'
import { UsersIcon } from '@heroicons/react/24/solid'
import { PageTitle, Footer } from '@/widgets/layout'
import { FeatureCard, TeamCard } from '@/widgets/cards'
import { featuresData, teamData } from '@/data'
import { Link } from 'react-router-dom'

export function Home () {
  return (
    <>
      <div className='relative flex h-screen content-center items-center justify-center pt-16 pb-32'>
        <div className="absolute top-0 h-full w-full bg-[url('/img/edificio-background.png')] bg-cover bg-center" />
        <div className='absolute top-0 h-full w-full bg-black/75 bg-cover bg-center' />
        <div className='max-w-8xl container relative mx-auto'>
          <div className='flex flex-wrap items-center'>
            <div className='ml-auto mr-auto w-full px-4 text-center lg:w-8/12'>
              <Typography
                variant='h1'
                color='white'
                className='mb-6 font-black'
              >
                Tu historia empieza con nosotros
              </Typography>
              <Typography variant='lead' color='white' className='opacity-80'>
                descubre tus pasiones, desafía tus límites y transforma tu futuro. Juntos, crearemos una historia de crecimiento y logros que marcará el comienzo de una nueva etapa en tu vida. ¡El camino hacia la excelencia comienza aquí!
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className='-mt-32 bg-gray-50 px-4 pb-20 pt-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: 'w-5 h-5 text-white'
                })}
                description={description}
              />
            ))}
          </div>
          <div className='mt-32 flex flex-wrap items-center'>
            <div className='mx-auto -mt-8 w-full px-4 md:w-5/12'>
              <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg'>
                <UsersIcon className='h-6 w-6 text-blue-gray-900' />
              </div>
              <Typography
                variant='h3'
                className='mb-3 font-bold'
                color='blue-gray'
              >
                Conoce a nuestros profesores
              </Typography>
              <Typography className='mb-8 font-normal text-blue-gray-500'>
                Nuestros profesores expertos están a tu disposición para ofrecerte la mejor educación en línea.
                <br />
                <br />
                Comprometidos con la excelencia, nuestros educadores brindan un enfoque personalizado y adaptado a tus necesidades, asegurando que desarrolles habilidades y conocimientos esenciales en tu camino hacia el éxito académico y profesional.
              </Typography>
              <Link to='/cursos'>
                <Button variant='outlined'>
                  Explorar cursos
                </Button>
              </Link>
            </div>
            <div className='mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0'>
              <Card className='shadow-lg shadow-gray-500/10'>
                <CardHeader className='relative h-56'>
                  <img
                    alt='Card Image'
                    src='/img/team.png'
                    className='h-full w-full'
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant='h5'
                    color='blue-gray'
                    className='mb-3 font-bold'
                  >
                    Comunidad sólida y positiva
                  </Typography>
                  <Typography className='font-normal text-blue-gray-500'>
                    Orgullosos de unir a estudiantes y profesionales en un entorno colaborativo y de apoyo. Conéctate, comparte ideas y crece con nosotros. Experimenta el poder de aprender juntos en un ambiente motivador. ¡Únete hoy!
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className='px-4 pt-20 pb-20'>
        <div className='container mx-auto'>
          <PageTitle heading='Conoce a nuestros profesores'>
            Son los héroes detrás de las escenas, transformando el aprendizaje online en una experiencia personal, inspiradora y enriquecedora. Con ellos, cada curso es una aventura llena de descubrimiento y potencial ilimitado.
          </PageTitle>
          <div className='mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-2'>
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className='flex items-center gap-2'>
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant='text'>
                        <i className={`fa-brands text-lg fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className='relative bg-blue-gray-50/50 py-24 px-4'>
        <div className='container mx-auto'>
          <PageTitle heading='¿Tienes alguna duda?'>
            ¡Rellena el formulario y te responderemos en breve!
          </PageTitle>
          <form className='mx-auto mt-12 max-w-3xl text-center'>
            <div className='mb-8 flex gap-8'>
              <Input variant='standard' size='lg' label='Nombre Completo' />
              <Input variant='standard' size='lg' label='Correo Electrónico' />
            </div>
            <Textarea variant='standard' size='lg' label='Mensaje' rows={8} />
            <Button variant='gradient' size='lg' className='mt-8'>
              Contactar
            </Button>
          </form>
        </div>
      </section>
      <div className='bg-blue-gray-50/50'>
        <Footer />
      </div>
    </>
  )
}

export default Home
