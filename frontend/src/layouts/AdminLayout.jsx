import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dd-app">

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      <main className="dd-main">

        <Header openSidebar={openSidebar} />

        <section className="dd-page-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default AdminLayout;