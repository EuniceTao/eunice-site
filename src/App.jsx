/**
 * @file App.jsx
 * @description 应用主入口：站点路由与布局。
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DesignSystemPage } from './pages/design-system/DesignSystemPage';
import { SiteLayout } from './app/SiteLayout';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { ExperiencePage } from './pages/experience/ExperiencePage';
import { WorkIndexPage } from './pages/work/WorkIndexPage';
import { WorkDetailPage } from './pages/work/WorkDetailPage';
import { BlogIndexPage } from './pages/blog/BlogIndexPage';
import { BlogPostPage } from './pages/blog/BlogPostPage';
import { NowPage } from './pages/now/NowPage';
import { MorePage } from './pages/more/MorePage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminNowPage } from './pages/admin/AdminNowPage';
import { AdminNotesPage } from './pages/admin/AdminNotesPage';
import { AdminHomeEditorPage } from './pages/admin/AdminHomeEditorPage';
import { AdminExperienceEditorPage } from './pages/admin/AdminExperienceEditorPage';
import { AdminFooterEditorPage } from './pages/admin/AdminFooterEditorPage';
import { AdminBlocksEditorPage } from './pages/admin/AdminBlocksEditorPage';
import { ContactPage } from './pages/contact/ContactPage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/work" element={<WorkIndexPage />} />
          <Route path="/work/:id" element={<WorkDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/home" element={<AdminHomeEditorPage />} />
          <Route path="/admin/experience" element={<AdminExperienceEditorPage />} />
          <Route path="/admin/now" element={<AdminNowPage />} />
          <Route path="/admin/notes" element={<AdminNotesPage />} />
          <Route path="/admin/footer" element={<AdminFooterEditorPage />} />
          <Route path="/admin/blocks" element={<AdminBlocksEditorPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/design-system" element={<DesignSystemPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
