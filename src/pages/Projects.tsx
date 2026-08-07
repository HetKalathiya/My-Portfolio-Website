import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Modal } from '../components/ui/Modal';
import { PROJECTS_DATA } from '../data/projects';
import type { Project } from '../data/projects';
import { Search, Layers } from 'lucide-react';

const CATEGORIES = ['All', 'Full-Stack', 'Web Apps', 'UI/UX', 'Open Source'];

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <SectionHeader
            badge="Portfolio Archive"
            title="FEATURED PROJECTS & CASE STUDIES"
            description="Comprehensive collection of Web apps, open-source libraries, design systems, and enterprise full-stack solutions."
          />

          {/* Filter & Search Bar */}
          <div
            className="glass-panel"
            style={{
              padding: '20px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              marginBottom: '48px'
            }}
          >
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                      color: isActive ? '#050505' : '#a1a1aa',
                      transition: 'all 0.2s ease'
                    }}
                    className="interactive"
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div
              style={{
                position: 'relative',
                minWidth: '240px',
                flex: 1,
                maxWidth: '350px'
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#71717a'
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '20px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)'
                }}
              />
            </div>
          </div>

          {/* Results Count Badge */}
          <div
            style={{
              marginBottom: '24px',
              fontSize: '0.88rem',
              color: '#71717a',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Layers size={16} />
            <span>Showing {filteredProjects.length} of {PROJECTS_DATA.length} projects</span>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '32px'
              }}
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div
              className="glass-panel"
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: '#a1a1aa'
              }}
            >
              <Layers size={32} style={{ marginBottom: '16px', color: '#71717a' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>
                {PROJECTS_DATA.length === 0 ? 'No projects added yet' : 'No matching projects found'}
              </h3>
              <p style={{ fontSize: '0.95rem' }}>
                {PROJECTS_DATA.length === 0 ? 'New projects will be added here soon.' : 'Try adjusting your search query or category filter criteria.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
