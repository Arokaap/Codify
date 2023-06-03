import {
  Typography, Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton
} from '@material-tailwind/react'
import {
  StarIcon,
  HeartIcon
} from '@heroicons/react/24/solid'
import { Footer } from '@/widgets/layout'

export function Courses () {
  // const myImage = new CloudinaryImage('sample', { cloudName: 'dpew4mitl' }).resize(fill().width(100).height(150))

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
                  <Card className='w-full max-w-[22rem] max-h-[35rem] overflow-auto shadow-lg'>
                    <CardHeader floated={false} color='blue-gray'>
                      <img
                        src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='ui/ux review check'
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
                    <CardBody>
                      <div className='mb-3 flex items-center justify-between'>
                        <Typography variant='h5' color='blue-gray' className='font-medium'>
                          Wooden House, Florida
                        </Typography>
                        <Typography
                          color='blue-gray'
                          className='flex items-center gap-1.5 font-normal'
                        >
                          <StarIcon className='-mt-0.5 h-5 w-5 text-yellow-700' />
                          5.0
                        </Typography>
                      </div>
                      <Typography color='gray'>
                        Enter a freshly updated and thoughtfully furnished peaceful home
                        surrounded by ancient trees, stone walls, and open meadows.
                      </Typography>

                    </CardBody>
                    <CardFooter className='pt-3'>
                      <Button size='lg' fullWidth>
                        Reserve
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className='w-full max-w-[22rem] max-h-[35rem] overflow-auto shadow-lg'>
                    <CardHeader floated={false} color='blue-gray'>
                      <img
                        src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='ui/ux review check'
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
                    <CardBody>
                      <div className='mb-3 flex items-center justify-between'>
                        <Typography variant='h5' color='blue-gray' className='font-medium'>
                          Wooden House, Florida
                        </Typography>
                        <Typography
                          color='blue-gray'
                          className='flex items-center gap-1.5 font-normal'
                        >
                          <StarIcon className='-mt-0.5 h-5 w-5 text-yellow-700' />
                          5.0
                        </Typography>
                      </div>
                      <Typography color='gray'>
                        Enter a freshly updated and thoughtfully furnished peaceful home
                        surrounded by ancient trees, stone walls, and open meadows.
                      </Typography>

                    </CardBody>
                    <CardFooter className='pt-3'>
                      <Button size='lg' fullWidth>
                        Reserve
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className='w-full max-w-[22rem] max-h-[35rem] overflow-auto shadow-lg'>
                    <CardHeader floated={false} color='blue-gray'>
                      <img
                        src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='ui/ux review check'
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
                    <CardBody>
                      <div className='mb-3 flex items-center justify-between'>
                        <Typography variant='h5' color='blue-gray' className='font-medium'>
                          Wooden House, Florida
                        </Typography>
                        <Typography
                          color='blue-gray'
                          className='flex items-center gap-1.5 font-normal'
                        >
                          <StarIcon className='-mt-0.5 h-5 w-5 text-yellow-700' />
                          5.0
                        </Typography>
                      </div>
                      <Typography color='gray'>
                        Enter a freshly updated and thoughtfully furnished peaceful home
                        surrounded by ancient trees, stone walls, and open meadows.
                      </Typography>

                    </CardBody>
                    <CardFooter className='pt-3'>
                      <Button size='lg' fullWidth>
                        Reserve
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className='my-8 text-center flex justify-center gap-7 flex-wrap'>
                  <Card className='w-full max-w-[22rem] max-h-[35rem] overflow-auto shadow-lg'>
                    <CardHeader floated={false} color='blue-gray'>
                      <img
                        src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='ui/ux review check'
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
                    <CardBody>
                      <div className='mb-3 flex items-center justify-between'>
                        <Typography variant='h5' color='blue-gray' className='font-medium'>
                          Wooden House, Florida
                        </Typography>
                        <Typography
                          color='blue-gray'
                          className='flex items-center gap-1.5 font-normal'
                        >
                          <StarIcon className='-mt-0.5 h-5 w-5 text-yellow-700' />
                          5.0
                        </Typography>
                      </div>
                      <Typography color='gray'>
                        Enter a freshly updated and thoughtfully furnished peaceful home
                        surrounded by ancient trees, stone walls, and open meadows.
                      </Typography>

                    </CardBody>
                    <CardFooter className='pt-3'>
                      <Button size='lg' fullWidth>
                        Reserve
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className='w-full max-w-[22rem] max-h-[35rem] overflow-auto shadow-lg'>
                    <CardHeader floated={false} color='blue-gray'>
                      <img
                        src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='ui/ux review check'
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
                    <CardBody>
                      <div className='mb-3 flex items-center justify-between'>
                        <Typography variant='h5' color='blue-gray' className='font-medium'>
                          Wooden House, Florida
                        </Typography>
                        <Typography
                          color='blue-gray'
                          className='flex items-center gap-1.5 font-normal'
                        >
                          <StarIcon className='-mt-0.5 h-5 w-5 text-yellow-700' />
                          5.0
                        </Typography>
                      </div>
                      <Typography color='gray'>
                        Enter a freshly updated and thoughtfully furnished peaceful home
                        surrounded by ancient trees, stone walls, and open meadows.
                      </Typography>

                    </CardBody>
                    <CardFooter className='pt-3'>
                      <Button size='lg' fullWidth>
                        Reserve
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className='w-full max-w-[22rem] max-h-[35rem] overflow-auto shadow-lg'>
                    <CardHeader floated={false} color='blue-gray'>
                      <img
                        src='https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='ui/ux review check'
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
                    <CardBody>
                      <div className='mb-3 flex items-center justify-between'>
                        <Typography variant='h5' color='blue-gray' className='font-medium'>
                          Wooden House, Florida
                        </Typography>
                        <Typography
                          color='blue-gray'
                          className='flex items-center gap-1.5 font-normal'
                        >
                          <StarIcon className='-mt-0.5 h-5 w-5 text-yellow-700' />
                          5.0
                        </Typography>
                      </div>
                      <Typography color='gray'>
                        Enter a freshly updated and thoughtfully furnished peaceful home
                        surrounded by ancient trees, stone walls, and open meadows.
                      </Typography>

                    </CardBody>
                    <CardFooter className='pt-3'>
                      <Button size='lg' fullWidth>
                        Reserve
                      </Button>
                    </CardFooter>
                  </Card>
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
