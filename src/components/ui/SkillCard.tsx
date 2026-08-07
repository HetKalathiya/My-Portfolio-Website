import React from 'react';
import { motion } from 'framer-motion';
import type { FloatingSkill } from '../../data/skills';
import { Code2 } from 'lucide-react';

interface SkillCardProps {
  skill: FloatingSkill;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-panel"
      style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <Code2 size={20} style={{ color: skill.glowColor }} />
      <span style={{ color: '#ffffff', fontWeight: 600 }}>{skill.name}</span>
    </motion.div>
  );
};
