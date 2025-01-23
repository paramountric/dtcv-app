import { NavigationLayout } from '@/components/navigation-layout';
import { SidebarInset } from '@/components/ui/sidebar';
import { useAppContext } from '@/context/app-context';

const RightSidebar = () => {
  return <div>RightSidebar</div>;
};

const LeftSidebar = () => {
  return <div>LeftSidebar</div>;
};

export default function Viewport() {
  const { showLeftSidebar, setShowLeftSidebar, showRightSidebar, setShowRightSidebar } =
    useAppContext();
  return (
    <NavigationLayout
      showLeftSidebar={showLeftSidebar}
      setShowLeftSidebar={setShowLeftSidebar}
      showRightSidebar={showRightSidebar}
      setShowRightSidebar={setShowRightSidebar}
      leftSidebar={<LeftSidebar />}
      mainContent={
        <SidebarInset className="flex-1 min-w-0 bg-primary border-primary"></SidebarInset>
      }
      rightSidebar={<RightSidebar />}
    />
  );
}
