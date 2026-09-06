import React from 'react';
import {
  Gamepad2,
  FileDown,
  Shield,
  Award,
  Terminal,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import {
  PORTFOLIO_INFO,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  SKILLS_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA
} from '../data/portfolioData';
import { retroAudio } from '../audio/retroAudio';
import { CyberMusicPlayer } from './CyberMusicPlayer';

interface ClassicViewProps {
  onSwitchTo3D: () => void;
  onOpenExportModal: () => void;
  onOpenChat?: () => void;
}

export const ClassicView: React.FC<ClassicViewProps> = ({ onSwitchTo3D, onOpenExportModal, onOpenChat }) => {
  const scrollTo = (id: string) => {
    retroAudio.playInteract();
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070a14] text-slate-200 font-mono relative overflow-x-hidden p-4 md:p-8">
      {/* Background Starfield */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,#131e3a_0%,#070a14_70%)] z-0" />

      {/* FLOATING CONTROLS DOCK */}
      <div className="fixed top-4 right-4 z-40 flex flex-wrap items-center gap-2">
        <CyberMusicPlayer />

        {onOpenChat && (
          <button
            onClick={() => {
              retroAudio.playInteract();
              onOpenChat();
            }}
            className="px-3.5 py-2 rounded bg-cyan-500/25 border-2 border-cyan-400 text-cyan-200 hover:bg-cyan-500/40 text-xs font-extrabold flex items-center gap-1.5 shadow-[0_0_18px_rgba(0,255,255,0.3)] cursor-pointer"
            title="Directly send an email to Asma"
          >
            <MessageSquare className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>CHAT WITH ASMA</span>
          </button>
        )}

        <button
          onClick={onSwitchTo3D}
          className="px-3.5 py-2 rounded bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,255,0.3)] cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>PLAY 3D GAME MODE</span>
        </button>

        <button
          onClick={onOpenExportModal}
          className="px-3.5 py-2 rounded bg-amber-500/20 border-2 border-amber-400 text-amber-300 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
        >
          <FileDown className="w-4 h-4" />
          <span>EXPORT DOSSIER</span>
        </button>
      </div>

      {/* RETRO NAV DOTS */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
        {['hero', 'stats', 'skills', 'experience', 'projects', 'certs', 'contact'].map((sec) => (
          <button
            key={sec}
            onClick={() => scrollTo(sec)}
            className="w-3 h-3 rounded-full bg-slate-800 border border-cyan-400 hover:bg-cyan-400 hover:scale-125 transition-all cursor-pointer"
            title={`Scroll to ${sec}`}
          />
        ))}
      </div>

      {/* CRT WRAPPER */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-12 pt-12 pb-24">
        {/* 1. HERO CRT MONITOR */}
        <div id="hero" className="bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]">
          <div className="bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-10 rounded-lg relative overflow-hidden text-center space-y-4">
            {/* Scanlines */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)]" />

            <p className="text-[10px] text-cyan-400 tracking-widest font-bold">
              // MISSION BRIEFING: OPERATIVE ONBOARDING //
            </p>

            {/* HP BAR */}
            <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
              <span className="text-red-400 font-bold text-xs">HP</span>
              <div className="flex-1 h-3.5 bg-slate-900 border border-white rounded-xs overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 w-[95%]" />
              </div>
              <span className="text-emerald-400 font-bold text-xs">LV.99</span>
            </div>

            <h1 className="text-xl md:text-3xl font-extrabold text-[#00ff96] tracking-wider drop-shadow-[0_0_12px_rgba(0,255,150,0.4)]">
              {PORTFOLIO_INFO.name}
            </h1>

            <p className="text-amber-400 font-bold text-xs md:text-sm">
              {PORTFOLIO_INFO.tagline}
            </p>

            <p className="text-slate-300 text-xs max-w-xl mx-auto leading-relaxed">
              {PORTFOLIO_INFO.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="px-3 py-1 rounded border border-purple-400 text-purple-300 bg-purple-950/40 text-[10px] font-bold">
                ESTIN BEJAIA (ALGERIA)
              </span>
              <span className="px-3 py-1 rounded border border-emerald-400 text-emerald-300 bg-emerald-950/40 text-[10px] font-bold">
                AI & CYBERSECURITY STUDENT
              </span>
              <span className="px-3 py-1 rounded border border-amber-400 text-amber-300 bg-amber-950/40 text-[10px] font-bold">
                OPEN FOR PROJECTS & MISSIONS
              </span>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onSwitchTo3D}
                className="px-5 py-2.5 bg-emerald-500 text-black font-bold text-xs rounded hover:bg-emerald-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>ENTER 3D GAME WORLD</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. STATS & EDUCATION */}
        <div id="stats" className="bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]">
          <div className="bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-8 rounded-lg space-y-6">
            <h2 className="text-sm md:text-base font-bold text-amber-400 border-b border-amber-500/30 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" /> PLAYER STATUS & METRICS
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 bg-[#070d1a] border border-cyan-500/40 rounded text-center">
                <p className="text-2xl font-bold text-amber-400">{PORTFOLIO_INFO.stats.projectsCount}</p>
                <p className="text-[10px] text-cyan-300">PROJECTS BUILT</p>
              </div>
              <div className="p-4 bg-[#070d1a] border border-rose-500/40 rounded text-center">
                <p className="text-2xl font-bold text-amber-400">{PORTFOLIO_INFO.stats.internshipsCount}</p>
                <p className="text-[10px] text-rose-300">MISSIONS & ROLES</p>
              </div>
              <div className="p-4 bg-[#070d1a] border border-emerald-500/40 rounded text-center">
                <p className="text-2xl font-bold text-amber-400">{PORTFOLIO_INFO.stats.certsCount}</p>
                <p className="text-[10px] text-emerald-300">CERTIFICATIONS</p>
              </div>
              <div className="p-4 bg-[#070d1a] border border-purple-500/40 rounded text-center">
                <p className="text-2xl font-bold text-amber-400">{PORTFOLIO_INFO.stats.hackathonsWon}+</p>
                <p className="text-[10px] text-purple-300">COMPETITIONS</p>
              </div>
            </div>

            <h3 className="text-xs font-bold text-white uppercase tracking-wider pt-2">
              EDUCATION TIMELINE
            </h3>
            <div className="space-y-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.degree} className="p-3.5 bg-[#070d1a] border border-slate-800 rounded space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-white">{edu.degree}</span>
                    <span className="text-amber-400 text-[10px]">{edu.period}</span>
                  </div>
                  <p className="text-cyan-400 text-[11px]">{edu.institution} — {edu.location}</p>
                  <p className="text-emerald-400 text-[10px] font-semibold">{edu.highlight}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-bold text-white uppercase tracking-wider pt-2">
              LANGUAGE CAPACITIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_INFO.languages.map((l) => (
                <span key={l.name} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-slate-200 text-xs">
                  {l.name}: <strong className="text-emerald-400">{l.proficiency}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SKILLS TREE */}
        <div id="skills" className="bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]">
          <div className="bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-8 rounded-lg space-y-6">
            <h2 className="text-sm md:text-base font-bold text-amber-400 border-b border-amber-500/30 pb-2">
              SKILL TREE & DEFENSIVE PROFICIENCIES
            </h2>

            {SKILLS_DATA.map((cat) => (
              <div key={cat.categoryName} className="space-y-2">
                <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  {cat.categoryName}
                </h3>
                <div className="space-y-2">
                  {cat.skills.map((sk) => (
                    <div key={sk.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">{sk.name}</span>
                        <span className="text-emerald-400 font-bold">{sk.level}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                          style={{ width: `${sk.level}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{sk.yearsOrDepth}</span>
                        {sk.specialty && <span className="text-amber-300/80">{sk.specialty}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MISSIONS / EXPERIENCE */}
        <div id="experience" className="bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]">
          <div className="bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-8 rounded-lg space-y-6">
            <h2 className="text-sm md:text-base font-bold text-amber-400 border-b border-amber-500/30 pb-2">
              FIELD MISSIONS & ENTERPRISE EXPERIENCE
            </h2>

            <div className="space-y-4">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="p-4 bg-[#070d1a] border border-slate-800 rounded-lg space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <h3 className="font-bold text-white text-xs md:text-sm">{exp.company}</h3>
                    <span className="text-[10px] text-amber-400">{exp.period}</span>
                  </div>
                  <p className="text-rose-400 font-semibold text-xs">{exp.role} — {exp.location}</p>
                  <p className="text-slate-300 text-xs leading-relaxed">{exp.summary}</p>
                  <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
                    {exp.keyAchievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. PROJECTS GRID */}
        <div id="projects" className="bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]">
          <div className="bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-8 rounded-lg space-y-6">
            <h2 className="text-sm md:text-base font-bold text-amber-400 border-b border-amber-500/30 pb-2">
              FEATURED CYBERSECURITY WEAPONS & PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className="p-4 bg-[#070d1a] border border-cyan-500/30 rounded-lg space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white text-xs">{proj.title}</h3>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                        {proj.securityRating}
                      </span>
                    </div>
                    <p className="text-amber-400 text-[11px] font-semibold">{proj.tagline}</p>
                    <p className="text-slate-300 text-[11px] leading-snug">{proj.description}</p>
                    {proj.metrics && (
                      <p className="text-emerald-400 text-[10px] font-bold">★ {proj.metrics}</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 rounded bg-slate-900 text-[9px] text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-[10px] font-bold"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Inspect Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. CERTS */}
        <div id="certs" className="bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]">
          <div className="bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-8 rounded-lg space-y-4">
            <h2 className="text-sm md:text-base font-bold text-amber-400 border-b border-amber-500/30 pb-2">
              VERIFIED PROFESSIONAL CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CERTIFICATIONS_DATA.map((c) => (
                <div key={c.title} className="p-3 bg-[#070d1a] border border-purple-500/30 rounded space-y-1">
                  <Award className="w-5 h-5 text-purple-400" />
                  <h4 className="font-bold text-white text-xs leading-tight">{c.title}</h4>
                  <p className="text-[10px] text-slate-400">{c.issuer} — {c.year}</p>
                  {c.credentialId && (
                    <p className="text-[9px] text-amber-300 font-mono truncate">ID: {c.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. CONTACT */}
        <div id="contact" className="bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]">
          <div className="bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-8 rounded-lg text-center space-y-4">
            <h2 className="text-sm md:text-base font-bold text-emerald-400">
              TRANSMIT TO ASMAA BELKERROUCHE
            </h2>
            <p className="text-slate-300 text-xs max-w-md mx-auto">
              Ready to collaborate on AI security, machine learning pipelines, desktop applications, web development, or security audits.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold pt-2">
              <a
                href={PORTFOLIO_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PORTFOLIO_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub (@amsaqeeus)</span>
              </a>
              <a href={`mailto:${PORTFOLIO_INFO.email}`} className="text-emerald-400 hover:underline inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_INFO.email}</span>
              </a>
              <a href={`tel:${PORTFOLIO_INFO.phone}`} className="text-cyan-400 hover:underline inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_INFO.phone}</span>
              </a>
              <span className="text-slate-400 inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{PORTFOLIO_INFO.location}</span>
              </span>
            </div>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              {onOpenChat && (
                <button
                  onClick={() => {
                    retroAudio.playInteract();
                    onOpenChat();
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs rounded hover:from-cyan-300 hover:to-blue-400 cursor-pointer shadow-[0_0_20px_rgba(0,255,255,0.4)] inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT WITH ASMA (SEND EMAIL)</span>
                </button>
              )}

              <button
                onClick={onOpenExportModal}
                className="px-5 py-2.5 bg-amber-500 text-black font-bold text-xs rounded hover:bg-amber-400 cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                <span>EXPORT RESUME / DOSSIER</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
