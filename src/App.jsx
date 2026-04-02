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
import { WorkIndexPage } from './pages/work/WorkIndexPage';
import { WorkDetailPage } from './pages/work/WorkDetailPage';
import { BlogIndexPage } from './pages/blog/BlogIndexPage';
import { BlogPostPage } from './pages/blog/BlogPostPage';
import { NowPage } from './pages/now/NowPage';
import { ContactPage } from './pages/contact/ContactPage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkIndexPage />} />
          <Route path="/work/:id" element={<WorkDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/design-system" element={<DesignSystemPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
