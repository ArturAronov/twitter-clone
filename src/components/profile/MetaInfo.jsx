import moment from 'moment'

import LocationIcon from '../icons/LocationIcon'
import WebsiteIcon from '../icons/WebsiteIcon'
import CalendarIcon from '../icons/CalendarIcon'

const MetaInfo = (props) => {
  const {
    location,
    website,
    joinDate
  } = props

  return (
    <div className="mt-2 flex flex-row flex-wrap px-3">
      {location && (
      <div className="text-zinc-500 pr-3 flex flex-row">
        <LocationIcon />
        <div className="pl-1">
          { location }
        </div>
      </div>
      ) }
      { website && (
      <div className="text-zinc-500 pr-3 flex flex-row">
        <WebsiteIcon />
        <a
          href={props.website}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-sky-500 pl-1"
        >
          { website }
          {/* { props.website.split('http://www.')[1] } */}
        </a>
      </div>
      ) }
      <div className="text-zinc-500 pr-3 flex flex-row">
        <CalendarIcon />
        <div className="px-1">
          Joined
        </div>
        <div>
          { moment(joinDate).format('MMMM YYYY') }
        </div>
      </div>
    </div>
  )
}

export default MetaInfo
