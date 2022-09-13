import SVG_MENU_CLASS from '../../globalVars/svg_menu_class'
const MoreIcon = () => {
  return(
    <div className={SVG_MENU_CLASS.icon}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className='fill-zinc-500 hover:fill-sky-500 h-full'
      >
        <g>
          <circle cx="5" cy="12" r="2"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="19" cy="12" r="2"></circle>
        </g>
      </svg>
    </div>
  )
}

export default MoreIcon
