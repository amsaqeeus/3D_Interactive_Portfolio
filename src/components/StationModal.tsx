import React, { useState } from 'react';
import {
  X,
  Shield,
  Briefcase,
  Cpu,
  GraduationCap,
  FolderGit2,
  Radio,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Award,
  Terminal,
  Send,
  Sparkles,
  Lock,
  Search
} from 'lucide-react';
import { StationLocation } from '../types';
import {
  PORTFOLIO_INFO,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  SKILLS_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA
} from '../data/portfolioData';
import { retroAudio } from '../audio/retroAudio';

interface StationModalProps {
  station: StationLocation;
  onClose: () => void;
  onSuccessHack?: () => void;
}

export const StationModal: React.FC<StationModalProps> = ({ station, onClose, onSuccessHack }) => {
  const [projectCategory, setProjectCategory] = useState<string>('All');
  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<string>(PROJECTS_DATA[0].id);
  const [callsign, setCallsign] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    retroAudio.playSuccess();
    setMessageSent(true);

    const emailSubject = encodeURIComponent(`[Asma Room Transmission] From ${callsign || 'Website Visitor'}`);
    const emailBody = encodeURIComponent(`Sender / Contact: ${callsign || 'Not specified'}\n\nMessage Payload:\n${messageText}\n\n---\nDispatched from Asma's Room Interactive 3D Portfolio`);
    window.location.href = `mailto:${PORTFOLIO_INFO.email}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
      setCallsign('');
    }, 5000);
  };

  const filteredProjects =
    projectCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === projectCategory);

  const currentProjectObj = PROJECTS_DATA.find((p) => p.id === selectedProject) || PROJECTS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
      {/* CRT SCREEN CONTAINER */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0b1324] border-2 rounded-xl shadow-[0_0_40px_rgba(0,255,200,0.25)] overflow-hidden font-mono"
        style={{ borderColor: station.color }}
      >
        {/* CRT Scanline Effect */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] z-30 opacity-70" />

        {/* TOP BAR / TERMINAL HEADER */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b text-xs font-bold tracking-wider"
          style={{
            borderColor: `${station.color}40`,
            backgroundColor: `${station.color}15`,
            color: station.color,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: station.color }} />
            <span>TERMINAL ACCESS // {station.name}</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
              [{station.label}]
            </span>
          </div>

          <button
            onClick={() => {
              retroAudio.playInteract();
              onClose();
            }}
            className="p-1.5 rounded bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white cursor-pointer border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 text-slate-200 text-xs custom-scrollbar">
          {/* ==================== 1. ABOUT STATION ==================== */}
          {station.type === 'about' && (
            <div className="space-y-6">
              {/* HEADER STATUS */}
              <div className="flex flex-col md:flex-row gap-5 items-start bg-[#060b17] p-5 rounded-lg border border-slate-800">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-emerald-500/30 via-cyan-500/20 to-purple-600/30 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] flex-shrink-0">
                  <Shield className="w-10 h-10 text-emerald-300 animate-pulse" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
                      {PORTFOLIO_INFO.name}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      LEVEL {PORTFOLIO_INFO.level} OPERATIVE
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {PORTFOLIO_INFO.status}
                    </span>
                  </div>
                  <p className="text-cyan-400 font-semibold text-xs">{PORTFOLIO_INFO.tagline}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                    {PORTFOLIO_INFO.bio}
                  </p>
                </div>
              </div>

              {/* MISSION STATS CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#070e1c] p-3 rounded-lg border border-cyan-500/30 text-center">
                  <p className="text-xl font-bold text-cyan-400">{PORTFOLIO_INFO.stats.projectsCount}+</p>
                  <p className="text-[10px] text-slate-400">PROJECTS BUILT</p>
                </div>
                <div className="bg-[#070e1c] p-3 rounded-lg border border-rose-500/30 text-center">
                  <p className="text-xl font-bold text-rose-400">{PORTFOLIO_INFO.stats.internshipsCount}</p>
                  <p className="text-[10px] text-slate-400">CLIENT & INDUSTRY</p>
                </div>
                <div className="bg-[#070e1c] p-3 rounded-lg border border-amber-500/30 text-center">
                  <p className="text-xl font-bold text-amber-400">{PORTFOLIO_INFO.stats.certsCount}</p>
                  <p className="text-[10px] text-slate-400">CERTIFICATIONS</p>
                </div>
                <div className="bg-[#070e1c] p-3 rounded-lg border border-purple-500/30 text-center">
                  <p className="text-xl font-bold text-purple-400">{PORTFOLIO_INFO.stats.hackathonsWon}+</p>
                  <p className="text-[10px] text-slate-400">HACKATHONS & CTFS</p>
                </div>
              </div>

              {/* LINGUISTIC / SPOKEN PROTOCOLS */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  COMMUNICATION PROTOCOLS (LANGUAGES)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PORTFOLIO_INFO.languages.map((l) => (
                    <div
                      key={l.name}
                      className="bg-[#070d1a] p-2.5 rounded border border-slate-800 flex flex-col justify-between"
                    >
                      <span className="font-bold text-white text-xs">{l.name}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={PORTFOLIO_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-blue-600/20 border border-blue-500/50 text-blue-300 hover:bg-blue-600/30 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={PORTFOLIO_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-purple-600/20 border border-purple-500/50 text-purple-300 hover:bg-purple-600/30 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@amsaqeeus)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`mailto:${PORTFOLIO_INFO.email}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{PORTFOLIO_INFO.email}</span>
                </a>
                <a
                  href={`tel:${PORTFOLIO_INFO.phone}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{PORTFOLIO_INFO.phone}</span>
                </a>
                <span className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{PORTFOLIO_INFO.location}</span>
                </span>
              </div>
            </div>
          )}

          {/* ==================== 2. PROJECTS STATION ==================== */}
          {station.type === 'projects' && (
            <div className="space-y-5">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
                {['All', ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category)))].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      retroAudio.playInteract();
                      setProjectCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                      projectCategory === cat
                        ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,255,255,0.4)]'
                        : 'bg-[#0a1122] text-slate-300 border border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid & Detail Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Project List Column */}
                <div className="space-y-2 lg:col-span-1 max-h-[460px] overflow-y-auto pr-1">
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        retroAudio.playInteract();
                        setSelectedProject(proj.id);
                      }}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedProject === proj.id
                          ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.25)]'
                          : 'bg-[#080e1c] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-white text-xs">{proj.title}</h4>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold">
                          {proj.securityRating}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{proj.tagline}</p>
                    </div>
                  ))}
                </div>

                {/* Project Selected Deep Detail */}
                <div className="lg:col-span-2 bg-[#070d1a] border border-slate-800 rounded-lg p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
                        {currentProjectObj.category}
                      </span>
                      <h3 className="text-base font-bold text-white">{currentProjectObj.title}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold">
                      SECURITY RATING: {currentProjectObj.securityRating}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {currentProjectObj.description}
                  </p>

                  {/* Highlights / Features */}
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                      KEY ARCHITECTURE & SECURITY CAPABILITIES:
                    </h5>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {currentProjectObj.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  {currentProjectObj.metrics && (
                    <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Benchmark Metrics: <strong>{currentProjectObj.metrics}</strong></span>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="space-y-1.5 pt-2">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      TECHNOLOGY ARSENAL:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProjectObj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Source Code Action Button */}
                  {currentProjectObj.githubUrl && (
                    <div className="pt-2">
                      <a
                        href={currentProjectObj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 transition-all font-bold text-xs"
                      >
                        <Github className="w-4 h-4" />
                        <span>INSPECT REPOSITORY</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. EXPERIENCE VAULT ==================== */}
          {station.type === 'experience' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-2">
                <p className="text-slate-400 text-xs">
                  Software engineering roles, enterprise missions, and client application development projects.
                </p>
              </div>

              <div className="space-y-4">
                {EXPERIENCE_DATA.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 md:p-5 rounded-lg bg-[#070e1c] border transition-all hover:border-rose-500/60"
                    style={{ borderColor: `${exp.badgeColor}40` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: exp.badgeColor }}
                          />
                          <h3 className="font-bold text-white text-sm">{exp.company}</h3>
                        </div>
                        <p className="text-rose-400 text-xs font-semibold">{exp.role}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {exp.period}
                        </span>
                        <p className="text-[10px] text-slate-500">{exp.location}</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                      {exp.summary}
                    </p>

                    <div className="mt-3 space-y-1.5">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        MISSION HIGHLIGHTS:
                      </h5>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {exp.keyAchievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-400 font-bold">›</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/60">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 4. SKILLS POWER MATRIX ==================== */}
          {station.type === 'skills' && (
            <div className="space-y-5">
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
                {SKILLS_DATA.map((cat, idx) => (
                  <button
                    key={cat.categoryName}
                    onClick={() => {
                      retroAudio.playInteract();
                      setActiveSkillCategory(idx);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSkillCategory === idx
                        ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : 'bg-[#080e1c] text-slate-300 border border-slate-800 hover:border-amber-400/40'
                    }`}
                  >
                    {cat.categoryName}
                  </button>
                ))}
              </div>

              {/* Active Category Skill Bars */}
              <div className="space-y-3">
                {SKILLS_DATA[activeSkillCategory].skills.map((sk) => (
                  <div key={sk.name} className="p-3 bg-[#060b17] rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{sk.name}</span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">({sk.category})</span>
                      </div>
                      <span className="font-bold text-amber-400">{sk.level}% MASTERY</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2.5 w-full bg-slate-900 rounded-sm overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-700"
                        style={{ width: `${sk.level}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>{sk.yearsOrDepth}</span>
                      {sk.specialty && <span className="text-amber-300/80">Specialty: {sk.specialty}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 5. ACADEMY & CERTS ARCHIVE ==================== */}
          {station.type === 'certs' && (
            <div className="space-y-6">
              {/* EDUCATION BLOCK */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> FORMAL ACADEMIC CREDENTIALS
                </h3>

                <div className="space-y-3">
                  {EDUCATION_DATA.map((edu) => (
                    <div key={edu.degree} className="p-4 bg-[#070e1c] rounded-lg border border-purple-500/30 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-bold text-white text-xs">{edu.degree}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/30">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-cyan-400 text-[11px] font-semibold">{edu.institution} — {edu.location}</p>
                      <div className="p-2 rounded bg-purple-950/30 border border-purple-800/40 text-amber-300 text-[11px] font-semibold">
                        ★ {edu.highlight}
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-300 pt-1">
                        {edu.details.map((det, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-purple-400">›</span>
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS GRID */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" /> VERIFIED PROFESSIONAL CERTIFICATIONS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <div
                      key={cert.title}
                      className="p-3.5 bg-[#060c18] rounded-lg border border-slate-800 hover:border-purple-500/50 transition-all flex items-start gap-3"
                    >
                      <div className="w-9 h-9 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-purple-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h5 className="font-bold text-white text-xs leading-tight">{cert.title}</h5>
                        <p className="text-[10px] text-slate-400">{cert.issuer}</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-purple-300 font-mono">
                            {cert.badgeCode}
                          </span>
                          <span className="text-[10px] text-slate-500">{cert.year}</span>
                        </div>
                        {cert.credentialId && (
                          <p className="text-[9px] text-slate-400 font-mono pt-0.5 truncate">
                            ID: <span className="text-amber-300">{cert.credentialId}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 6. COMMS ARRAY STATION ==================== */}
          {station.type === 'contact' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Comms Coordinate Cards */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-4 h-4" /> SECURE COMMS CHANNELS
                  </h3>

                  <div className="space-y-2">
                    <a
                      href={PORTFOLIO_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-lg bg-[#060b17] border border-blue-500/40 hover:border-blue-400 transition-all flex items-center justify-between group block"
                    >
                      <div className="flex items-center gap-3">
                        <Linkedin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400">LINKEDIN PROFILE</p>
                          <p className="text-xs font-bold text-white group-hover:text-blue-300">Asma Belkerrouche</p>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                    </a>

                    <a
                      href={PORTFOLIO_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-lg bg-[#060b17] border border-purple-500/40 hover:border-purple-400 transition-all flex items-center justify-between group block"
                    >
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400">GITHUB REPOSITORY</p>
                          <p className="text-xs font-bold text-white group-hover:text-purple-300">@amsaqeeus</p>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
                    </a>

                    <a
                      href={`mailto:${PORTFOLIO_INFO.email}`}
                      className="p-3 rounded-lg bg-[#060b17] border border-slate-800 hover:border-emerald-400 transition-all flex items-center gap-3 block"
                    >
                      <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400">OFFICIAL ACADEMIC EMAIL</p>
                        <p className="text-xs font-bold text-white">{PORTFOLIO_INFO.email}</p>
                      </div>
                    </a>

                    <a
                      href={`tel:${PORTFOLIO_INFO.phone}`}
                      className="p-3 rounded-lg bg-[#060b17] border border-slate-800 hover:border-cyan-400 transition-all flex items-center gap-3 block"
                    >
                      <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400">TELEPHONE / WHATSAPP</p>
                        <p className="text-xs font-bold text-white">{PORTFOLIO_INFO.phone}</p>
                      </div>
                    </a>

                    <div className="p-3 rounded-lg bg-[#060b17] border border-slate-800 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400">BASE LOCATION</p>
                        <p className="text-xs font-bold text-white">{PORTFOLIO_INFO.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-[11px] text-emerald-300">
                    <p className="font-bold">STATUS: READY FOR DEPLOYMENT</p>
                    <p className="text-slate-400 mt-1">
                      Seeking full-time roles, cybersecurity research contracts, and penetration testing projects worldwide.
                    </p>
                  </div>
                </div>

                {/* Direct Transmission Form */}
                <div className="bg-[#060c18] p-4 md:p-5 rounded-lg border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> DISPATCH INSTANT TRANSMISSION
                  </h4>

                  {messageSent ? (
                    <div className="p-4 bg-emerald-500/20 border border-emerald-400 rounded-lg text-center space-y-1 animate-pulse">
                      <p className="text-emerald-300 font-bold text-xs">TRANSMISSION BROADCASTED!</p>
                      <p className="text-slate-300 text-[10px]">Your message has been encrypted and queued in Asmaa&apos;s terminal inbox.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendTransmission} className="space-y-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">YOUR CALLSIGN / NAME & CONTACT</label>
                        <input
                          type="text"
                          required
                          value={callsign}
                          onChange={(e) => setCallsign(e.target.value)}
                          placeholder="e.g. Recruit Commander // recruiter@cybersec.com"
                          className="w-full bg-[#03060f] border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">TRANSMISSION MESSAGE</label>
                        <textarea
                          required
                          rows={4}
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Send a project opportunity, CTF invitation, or greeting..."
                          className="w-full bg-[#03060f] border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-500/20 border border-emerald-400 text-emerald-300 hover:bg-emerald-500/30 rounded font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>TRANSMIT ENCRYPTED PAYLOAD</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-4 py-2.5 bg-[#070b16] border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>OPERATIVE IDENTITY: ASMAA BELKERROUCHE // ESTIN</span>
          <span className="text-emerald-400 font-semibold">[ESC] OR [X] TO DISENGAGE</span>
        </div>
      </div>
    </div>
  );
};
