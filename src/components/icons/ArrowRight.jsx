import SVG_MENU_CLASS from '../../globalVars/svg_menu_class'

const ArrowRight = () => (
    <div className={SVG_MENU_CLASS.container}>
      <div className={SVG_MENU_CLASS.svg}>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="#71717a"
        >
          <g>
            <path d="M17.207 11.293l-7.5-7.5c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L15.086 12l-6.793 6.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
          </g>
        </svg>
      </div>
    </div>
  );

export default ArrowRight
