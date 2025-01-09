import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { KnowledgeHome } from '../components/knowledge/KnowledgeHome';
import { KnowledgeCategory } from '../components/knowledge/KnowledgeCategory';
import { KnowledgePost } from '../components/knowledge/KnowledgePost';

export function Knowledge() {
  return (
    <Routes>
      <Route index element={<KnowledgeHome />} />
      <Route path="category/:categorySlug" element={<KnowledgeCategory />} />
      <Route path="post/:postId" element={<KnowledgePost />} />
    </Routes>
  );
}