import SVG_MENU_CLASS from '../../globalVars/svg_menu_class'

const SearchBtnActive = () => (
  <div className="lg:hidden">
    <div className={SVG_MENU_CLASS.container}>
      <div className={SVG_MENU_CLASS.svg}>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="#fff"
        >
          <g>
            <path d="M22.06 19.94l-3.73-3.73C19.38 14.737 20 12.942 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c1.943 0 3.738-.622 5.21-1.67l3.73 3.73c.292.294.676.44 1.06.44s.768-.146 1.06-.44c.586-.585.586-1.535 0-2.12zM11 17c-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6-2.692 6-6 6z" />
          </g>
        </svg>
      </div>
    </div>
  </div>
)

export default SearchBtnActive
