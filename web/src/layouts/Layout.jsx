import React from 'react';
import '../styles/layout.scss';

const Layout = ({ children, leftSidebar, rightSidebar, headerTitle }) => {
    return (
        <div className="layout">
            {/* Left Sidebar (Rooms/Nav) */}
            <aside className="layout__sidebar">
                <div className="layout__brand">BriefChat</div>
                <nav className="layout__nav">
                    {leftSidebar}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="layout__main">
                <header className="layout__header">
                    {headerTitle || "Home"}
                </header>
                <div className="layout__content">
                    {children}
                </div>
            </main>

            {/* Right Sidebar (User List) */}
            {rightSidebar && (
                <aside className="layout__sidebar-right">
                    {rightSidebar}
                </aside>
            )}
        </div>
    );
};

export default Layout;
