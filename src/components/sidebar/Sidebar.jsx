import SidebarSearch from './SidebarSearch'
import SidebarContent from './SidebarContent'

const Sidebar = () => (
  <div className="relative flex justify-center">
    <div className="hidden lg:inline flex flex-col fixed min-h-screen overflow-y-scroll w-content">
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
