'use client'

import { useTranslations } from '../hooks/useTranslations'

const skillsData = [
    { icon: '⚛️', title: 'React & Next.js', description: 'Desenvolvimento de aplicações modernas e performáticas.' },
    { icon: '🎨', title: 'UI/UX Design', description: 'Foco em experiência do utilizador e interfaces intuitivas.' },
    { icon: '🚀', title: 'Performance', description: 'Otimização e melhores práticas de desenvolvimento.' },
    { icon: '🔧', title: 'DevOps', description: 'Deploy, CI/CD e infraestrutura cloud.' },
];

export default function SkillsSection() {
    const { t, isLoading } = useTranslations();

    return (
        <section className="skills" id="skills">
            <div className="container">
                <h2 className="section-title animate-on-scroll">
                    {isLoading ? 'Carregando...' : t('skills.title')}
                </h2>
                <div className="skills-grid">
                    {skillsData.map((skill, index) => (
                        <div key={index} className="skill-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="skill-icon">{skill.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                            <p style={{color: 'var(--texto-secundario)'}}>{skill.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}