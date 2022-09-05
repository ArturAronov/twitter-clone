import SidebarSearch from './SidebarSearch'
import SidebarContent from './SidebarContent'

const Sidebar = () => (
  <div className="relative flex justify-center overflow-hidden">
    <div className="hidden lg:inline flex flex-col fixed min-h-screen w-content">
      <div className="sticky top-0">
        <SidebarSearch />
      </div>
      <div className="">
        <SidebarContent />
      </div>
    </div>
  </div>
)

export default Sidebar
