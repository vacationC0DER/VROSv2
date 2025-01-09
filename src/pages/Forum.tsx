import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ForumHome } from '../components/forum/ForumHome';
import { ForumCategory } from '../components/forum/ForumCategory';
import { ForumPost } from '../components/forum/ForumPost';

export function Forum() {
  return (
    <Routes>
      <Route index element={<ForumHome />} />
      <Route path="category/:categorySlug" element={<ForumCategory />} />
      <Route path="post/:postId" element={<ForumPost />} />
    </Routes>
  );
}