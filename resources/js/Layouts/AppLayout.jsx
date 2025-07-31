import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { SupportModalProvider, useSupportModal } from "../context/SupportModalContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import SupportModal from "../Components/SupportModal";

const LayoutContent = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { isSupportModalOpen, closeSupportModal } = useSupportModal();
  console.log("Rendering AppLayout");

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-full md:p-6 bg-white dark:bg-gray-900">
          {children}
        </div>
      </div>
      
      {/* Support Modal - rendered at body level */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={closeSupportModal} 
      />
    </div>
  );
};

const AppLayout = ({ children }) => {
  return (
    <SupportModalProvider>
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </SupportModalProvider>
  );
};

export default AppLayout;
