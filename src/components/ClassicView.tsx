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
  MessageSquare,
  Sun,
  Moon
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
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const ClassicView: React.FC<ClassicViewProps> = ({
  onSwitchTo3D,
  onOpenExportModal,
  onOpenChat,
  theme = 'dark',
  onToggleTheme,
}) => {
  const isLight = theme === 'light';

  const scrollTo = (id: string) => {
    retroAudio.playInteract();
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const chassisClass = isLight
    ? 'bg-[#e2e8f0] p-3 md:p-4 rounded-xl shadow-xl border-4 border-[#94a3b8]'
    : 'bg-[#b0bdce] p-3 md:p-4 rounded-xl shadow-2xl border-4 border-[#768798]';

  const screenClass = isLight
    ? 'bg-[#ffffff] border-2 border-[#cbd5e1] p-6 md:p-10 rounded-lg relative overflow-hidden text-center space-y-4 text-slate-800'
    : 'bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-10 rounded-lg relative overflow-hidden text-center space-y-4 text-slate-200';

  const screenClassSection = isLight
    ? 'bg-[#ffffff] border-2 border-[#cbd5e1] p-6 md:p-8 rounded-lg space-y-6 text-slate-800'
    : 'bg-[#0b1220] border-2 border-[#20304a] p-6 md:p-8 rounded-lg space-y-6 text-slate-200';

  return (
    <div
      className={`min-h-screen font-mono relative overflow-x-hidden p-4 md:p-8 transition-colors duration-300 ${
        isLight ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#070a14] text-slate-200'
      }`}
    >
      {/* Background Ambience */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,#e2e8f0_0%,#f8fafc_70%)]'
            : 'bg-[radial-gradient(ellipse_at_top,#131e3a_0%,#070a14_70%)]'
        }`}
      />

      {/* FLOATING CONTROLS DOCK */}
      <div className="fixed top-4 right-4 z-40 flex flex-wrap items-center gap-2">
        <CyberMusicPlayer />

        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`px-3 py-2 rounded-md border-2 text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isLight
                ? 'bg-amber-100 border-amber-500 text-amber-950 hover:bg-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-indigo-950/70 border-indigo-400 text-indigo-200 hover:bg-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
            }`}
            title="Toggle Light / Dark Mode (Key: T)"
          >
            {isLight ? (
              <>
                <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span>LIGHT MODE</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>DARK MODE</span>
              </>
            )}
            <span className="text-[10px] px-1 py-0.2 rounded bg-black/20 border border-slate-600/50 hidden md:inline">T</span>
          </button>
        )}

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
            className={`w-3 h-3 rounded-full border transition-all cursor-pointer ${
              isLight
                ? 'bg-slate-300 border-sky-600 hover:bg-sky-500 hover:scale-125'
                : 'bg-slate-800 border-cyan-400 hover:bg-cyan-400 hover:scale-125'
            }`}
            title={`Scroll to ${sec}`}
          />
        ))}
      </div>

      {/* CRT WRAPPER */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-12 pt-12 pb-24">
        {/* 1. HERO CRT MONITOR */}
        <div id="hero" className={chassisClass}>
          <div className={screenClass}>
            {/* Scanlines */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]" />

            <p className={`text-[10px] tracking-widest font-bold ${isLight ? 'text-sky-700' : 'text-cyan-400'}`}>
              // MISSION BRIEFING: OPERATIVE ONBOARDING //
            </p>

            {/* HP BAR */}
            <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
              <span className="text-red-500 font-bold text-xs">HP</span>
              <div className={`flex-1 h-3.5 border rounded-xs overflow-hidden ${isLight ? 'bg-slate-200 border-slate-400' : 'bg-slate-900 border-white'}`}>
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[95%]" />
              </div>
              <span className={`font-bold text-xs ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>LV.99</span>
            </div>

            <h1 className={`text-xl md:text-3xl font-extrabold tracking-wider ${isLight ? 'text-emerald-700' : 'text-[#00ff96] drop-shadow-[0_0_12px_rgba(0,255,150,0.4)]'}`}>
              {PORTFOLIO_INFO.name}
            </h1>

            <p className={`font-bold text-xs md:text-sm ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
              {PORTFOLIO_INFO.tagline}
            </p>

            <p className={`text-xs max-w-xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {PORTFOLIO_INFO.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className={`px-3 py-1 rounded border text-[10px] font-bold ${isLight ? 'border-purple-300 text-purple-800 bg-purple-50' : 'border-purple-400 text-purple-300 bg-purple-950/40'}`}>
                ESTIN BEJAIA (ALGERIA)
              </span>
              <span className={`px-3 py-1 rounded border text-[10px] font-bold ${isLight ? 'border-emerald-300 text-emerald-800 bg-emerald-50' : 'border-emerald-400 text-emerald-300 bg-emerald-950/40'}`}>
                AI & CYBERSECURITY STUDENT
              </span>
              <span className={`px-3 py-1 rounded border text-[10px] font-bold ${isLight ? 'border-amber-300 text-amber-800 bg-amber-50' : 'border-amber-400 text-amber-300 bg-amber-950/40'}`}>
                OPEN FOR PROJECTS & MISSIONS
              </span>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onSwitchTo3D}
                className="px-5 py-2.5 bg-emerald-500 text-black font-bold text-xs rounded hover:bg-emerald-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>ENTER 3D GAME WORLD</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. STATS & EDUCATION */}
        <div id="stats" className={chassisClass}>
          <div className={screenClassSection}>
            <h2 className={`text-sm md:text-base font-bold border-b pb-2 flex items-center gap-2 ${isLight ? 'text-amber-700 border-amber-200' : 'text-amber-400 border-amber-500/30'}`}>
              <Shield className="w-4 h-4" /> PLAYER STATUS & METRICS
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className={`p-4 rounded text-center border ${isLight ? 'bg-sky-50/70 border-sky-200' : 'bg-[#070d1a] border-cyan-500/40'}`}>
                <p className={`text-2xl font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{PORTFOLIO_INFO.stats.projectsCount}</p>
                <p className={`text-[10px] font-semibold ${isLight ? 'text-sky-800' : 'text-cyan-300'}`}>PROJECTS BUILT</p>
              </div>
              <div className={`p-4 rounded text-center border ${isLight ? 'bg-rose-50/70 border-rose-200' : 'bg-[#070d1a] border-rose-500/40'}`}>
                <p className={`text-2xl font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{PORTFOLIO_INFO.stats.internshipsCount}</p>
                <p className={`text-[10px] font-semibold ${isLight ? 'text-rose-800' : 'text-rose-300'}`}>MISSIONS & ROLES</p>
              </div>
              <div className={`p-4 rounded text-center border ${isLight ? 'bg-emerald-50/70 border-emerald-200' : 'bg-[#070d1a] border-emerald-500/40'}`}>
                <p className={`text-2xl font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{PORTFOLIO_INFO.stats.certsCount}</p>
                <p className={`text-[10px] font-semibold ${isLight ? 'text-emerald-800' : 'text-emerald-300'}`}>CERTIFICATIONS</p>
              </div>
              <div className={`p-4 rounded text-center border ${isLight ? 'bg-purple-50/70 border-purple-200' : 'bg-[#070d1a] border-purple-500/40'}`}>
                <p className={`text-2xl font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{PORTFOLIO_INFO.stats.hackathonsWon}+</p>
                <p className={`text-[10px] font-semibold ${isLight ? 'text-purple-800' : 'text-purple-300'}`}>COMPETITIONS</p>
              </div>
            </div>

            <h3 className={`text-xs font-bold uppercase tracking-wider pt-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              EDUCATION TIMELINE
            </h3>
            <div className="space-y-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.degree} className={`p-3.5 rounded space-y-1 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070d1a] border-slate-800'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{edu.degree}</span>
                    <span className={`text-[10px] font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{edu.period}</span>
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-sky-700' : 'text-cyan-400'}`}>{edu.institution} — {edu.location}</p>
                  <p className={`text-[10px] font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{edu.highlight}</p>
                </div>
              ))}
            </div>

            <h3 className={`text-xs font-bold uppercase tracking-wider pt-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              LANGUAGE CAPACITIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_INFO.languages.map((l) => (
                <span key={l.name} className={`px-3 py-1 border rounded text-xs ${isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-700 text-slate-200'}`}>
                  {l.name}: <strong className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>{l.proficiency}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SKILLS TREE */}
        <div id="skills" className={chassisClass}>
          <div className={screenClassSection}>
            <h2 className={`text-sm md:text-base font-bold border-b pb-2 ${isLight ? 'text-amber-700 border-amber-200' : 'text-amber-400 border-amber-500/30'}`}>
              SKILL TREE & DEFENSIVE PROFICIENCIES
            </h2>

            {SKILLS_DATA.map((cat) => (
              <div key={cat.categoryName} className="space-y-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-sky-800' : 'text-cyan-300'}`}>
                  {cat.categoryName}
                </h3>
                <div className="space-y-2">
                  {cat.skills.map((sk) => (
                    <div key={sk.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{sk.name}</span>
                        <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{sk.level}%</span>
                      </div>
                      <div className={`h-2.5 rounded-sm overflow-hidden border ${isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-900 border-slate-800'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                          style={{ width: `${sk.level}%` }}
                        />
                      </div>
                      <div className={`flex justify-between text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>{sk.yearsOrDepth}</span>
                        {sk.specialty && <span className={isLight ? 'text-amber-800 font-semibold' : 'text-amber-300/80'}>{sk.specialty}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MISSIONS / EXPERIENCE */}
        <div id="experience" className={chassisClass}>
          <div className={screenClassSection}>
            <h2 className={`text-sm md:text-base font-bold border-b pb-2 ${isLight ? 'text-amber-700 border-amber-200' : 'text-amber-400 border-amber-500/30'}`}>
              FIELD MISSIONS & ENTERPRISE EXPERIENCE
            </h2>

            <div className="space-y-4">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className={`p-4 rounded-lg space-y-2 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070d1a] border-slate-800'}`}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <h3 className={`font-bold text-xs md:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{exp.company}</h3>
                    <span className={`text-[10px] font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{exp.period}</span>
                  </div>
                  <p className={`font-semibold text-xs ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>{exp.role} — {exp.location}</p>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{exp.summary}</p>
                  <ul className={`list-disc list-inside text-[11px] space-y-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {exp.keyAchievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span key={t} className={`px-2 py-0.5 rounded text-[10px] ${isLight ? 'bg-slate-200 text-slate-800' : 'bg-slate-900 text-slate-300'}`}>
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
        <div id="projects" className={chassisClass}>
          <div className={screenClassSection}>
            <h2 className={`text-sm md:text-base font-bold border-b pb-2 ${isLight ? 'text-amber-700 border-amber-200' : 'text-amber-400 border-amber-500/30'}`}>
              FEATURED SOFTWARE & CYBERSECURITY PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className={`p-4 rounded-lg space-y-2 flex flex-col justify-between border shadow-sm ${isLight ? 'bg-white border-slate-200' : 'bg-[#070d1a] border-cyan-500/30'}`}>
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{proj.title}</h3>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${isLight ? 'bg-sky-100 text-sky-800 border-sky-300' : 'bg-cyan-950 text-cyan-300 border-cyan-800'}`}>
                        {proj.securityRating}
                      </span>
                    </div>
                    <p className={`text-[11px] font-semibold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{proj.tagline}</p>
                    <p className={`text-[11px] leading-snug ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{proj.description}</p>
                    {proj.metrics && (
                      <p className={`text-[10px] font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>★ {proj.metrics}</p>
                    )}
                  </div>

                  <div className={`pt-2 border-t space-y-2 ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className={`px-1.5 py-0.5 rounded text-[9px] ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-900 text-slate-300'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${isLight ? 'text-sky-700 hover:text-sky-900' : 'text-cyan-400 hover:text-cyan-300'}`}
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
        <div id="certs" className={chassisClass}>
          <div className={screenClassSection}>
            <h2 className={`text-sm md:text-base font-bold border-b pb-2 ${isLight ? 'text-amber-700 border-amber-200' : 'text-amber-400 border-amber-500/30'}`}>
              VERIFIED PROFESSIONAL CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CERTIFICATIONS_DATA.map((c) => (
                <div key={c.title} className={`p-3 rounded space-y-1 border ${isLight ? 'bg-purple-50/50 border-purple-200' : 'bg-[#070d1a] border-purple-500/30'}`}>
                  <Award className={`w-5 h-5 ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
                  <h4 className={`font-bold text-xs leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{c.title}</h4>
                  <p className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{c.issuer} — {c.year}</p>
                  {c.credentialId && (
                    <p className={`text-[9px] font-mono truncate ${isLight ? 'text-amber-800 font-semibold' : 'text-amber-300'}`}>ID: {c.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. CONTACT */}
        <div id="contact" className={chassisClass}>
          <div className={screenClass}>
            <h2 className={`text-sm md:text-base font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              TRANSMIT TO ASMAA BELKERROUCHE
            </h2>
            <p className={`text-xs max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Ready to collaborate on AI security, machine learning pipelines, desktop applications, web development, or security audits.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold pt-2">
              <a
                href={PORTFOLIO_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 ${isLight ? 'text-blue-700 hover:text-blue-900' : 'text-blue-400 hover:text-blue-300'}`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PORTFOLIO_INFO.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 ${isLight ? 'text-purple-700 hover:text-purple-900' : 'text-purple-400 hover:text-purple-300'}`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub (@amsaqeeus)</span>
              </a>
              <a href={`mailto:${PORTFOLIO_INFO.email}`} className={`hover:underline inline-flex items-center gap-1.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                <Mail className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_INFO.email}</span>
              </a>
              <a href={`tel:${PORTFOLIO_INFO.phone}`} className={`hover:underline inline-flex items-center gap-1.5 ${isLight ? 'text-sky-700' : 'text-cyan-400'}`}>
                <Phone className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_INFO.phone}</span>
              </a>
              <span className={`inline-flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
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
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs rounded hover:from-cyan-400 hover:to-blue-500 cursor-pointer shadow-[0_0_20px_rgba(0,255,255,0.3)] inline-flex items-center gap-2"
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
