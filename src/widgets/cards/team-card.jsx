import PropTypes from 'prop-types'
import { Card, Avatar, Typography } from '@material-tailwind/react'

export function TeamCard ({ img, name, position, socials }) {
  return (
    <Card color='transparent' shadow={false} className='text-center max-w-sm mx-auto'>
      <Avatar
        src={img}
        alt={name}
        size='lg'
        className='h-full w-full shadow-lg shadow-gray-500/25'
      />
      <Typography variant='h5' color='blue-gray' className='mt-6 mb-1 text-sm'>
        {name}
      </Typography>
      {position && (
        <Typography className='font-normal text-blue-gray-500 text-xs'>
          {position}
        </Typography>
      )}
      {socials && <div className='mx-auto mt-5'>{socials}</div>}
    </Card>
  )
}

TeamCard.defaultProps = {
  position: '',
  socials: null
}

TeamCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  socials: PropTypes.node
}

TeamCard.displayName = '/src/widgets/layout/team-card.jsx'

export default TeamCard
