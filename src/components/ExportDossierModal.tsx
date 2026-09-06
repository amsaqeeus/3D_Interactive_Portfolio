import React, { useState } from 'react';
import {
  X,
  FileDown,
  Printer,
  Copy,
  Check,
  Code,
  FileText,
  Shield,
  Download,
  Share2,
  Sparkles,
  Trophy,
  Table,
  FileSpreadsheet
} from 'lucide-react';
import {
  PORTFOLIO_INFO,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  SKILLS_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA
} from '../data/portfolioData';
import { PlayerStats } from '../types';
import { retroAudio } from '../audio/retroAudio';

interface ExportDossierModalProps {
  onClose: () => void;
  playerStats: PlayerStats;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  onClose,
  playerStats,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'json' | 'csv'>('preview');
  const [copied, setCopied] = useState(false);

  // Helper to escape CSV cells
  const escapeCsvCell = (str: string | number | undefined | null): string => {
    if (str === undefined || str === null) return '""';
    const text = String(str).replace(/"/g, '""');
    return `"${text}"`;
  };

  // Generate Projects CSV
  const generateProjectsCSV = (): string => {
    const headers = ['ID', 'Title', 'Category', 'Security Rating', 'Tagline', 'Description', 'Metrics', 'Tech Stack', 'Key Features', 'GitHub URL', 'Live URL'];
    const rows = PROJECTS_DATA.map((p) =>
      [
        escapeCsvCell(p.id),
        escapeCsvCell(p.title),
        escapeCsvCell(p.category),
        escapeCsvCell(p.securityRating),
        escapeCsvCell(p.tagline),
        escapeCsvCell(p.description),
        escapeCsvCell(p.metrics || ''),
        escapeCsvCell(p.techStack.join('; ')),
        escapeCsvCell(p.features.join('; ')),
        escapeCsvCell(p.githubUrl || ''),
        escapeCsvCell(p.demoUrl || '')
      ].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  // Generate Experience CSV
  const generateExperienceCSV = (): string => {
    const headers = ['ID', 'Role', 'Company', 'Period', 'Location', 'Type', 'Summary', 'Key Achievements', 'Technologies'];
    const rows = EXPERIENCE_DATA.map((e) =>
      [
        escapeCsvCell(e.id),
        escapeCsvCell(e.role),
        escapeCsvCell(e.company),
        escapeCsvCell(e.period),
        escapeCsvCell(e.location),
        escapeCsvCell(e.type),
        escapeCsvCell(e.summary),
        escapeCsvCell(e.keyAchievements.join('; ')),
        escapeCsvCell(e.technologies.join('; '))
      ].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  // Generate Skills CSV
  const generateSkillsCSV = (): string => {
    const headers = ['Category', 'Skill Name', 'Proficiency (%)', 'Years/Depth', 'Specialty Focus'];
    const rows: string[] = [];
    SKILLS_DATA.forEach((cat) => {
      cat.skills.forEach((s) => {
        rows.push(
          [
            escapeCsvCell(cat.categoryName),
            escapeCsvCell(s.name),
            escapeCsvCell(s.level),
            escapeCsvCell(s.yearsOrDepth),
            escapeCsvCell(s.specialty || '')
          ].join(',')
        );
      });
    });
    return [headers.join(','), ...rows].join('\n');
  };

  // Generate Complete Portfolio CSV
  const generatePortfolioCSV = (): string => {
    return [
      '# ASMAA BELKERROUCHE - PORTFOLIO DOSSIER EXPORT',
      `# Name: ${PORTFOLIO_INFO.name}`,
      `# Title: ${PORTFOLIO_INFO.title}`,
      `# Email: ${PORTFOLIO_INFO.email} | Phone: ${PORTFOLIO_INFO.phone} | Location: ${PORTFOLIO_INFO.location}`,
      '',
      '=== SECTION 1: SOFTWARE & CYBER PROJECTS ===',
      generateProjectsCSV(),
      '',
      '=== SECTION 2: EXPERIENCE & ENGINEERING MISSIONS ===',
      generateExperienceCSV(),
      '',
      '=== SECTION 3: SKILLS MATRIX ===',
      generateSkillsCSV(),
      '',
      '=== SECTION 4: CERTIFICATIONS ===',
      ['Title,Issuer,Year,Badge Code', ...CERTIFICATIONS_DATA.map((c) => [escapeCsvCell(c.title), escapeCsvCell(c.issuer), escapeCsvCell(c.year), escapeCsvCell(c.badgeCode)].join(','))].join('\n')
    ].join('\n');
  };

  // Generate Clean Printable HTML for PDF
  const generatePrintableHTML = (): string => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${PORTFOLIO_INFO.name} - Curriculum Vitae</title>
  <style>
    @page { margin: 12mm; size: A4; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #0f172a; line-height: 1.5; font-size: 11.5px; background: #ffffff; }
    h1 { font-size: 22px; margin: 0 0 3px 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
    .tagline { font-size: 12px; font-weight: 700; color: #0284c7; margin-bottom: 2px; }
    .title { font-size: 11px; color: #64748b; margin-bottom: 6px; }
    .contact { font-size: 10.5px; color: #334155; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 12px; }
    h2 { font-size: 13px; text-transform: uppercase; color: #0369a1; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin: 14px 0 6px 0; letter-spacing: 0.5px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 11.5px; color: #0f172a; }
    .item-sub { color: #0284c7; font-size: 10.5px; margin-bottom: 3px; }
    .highlight { color: #059669; font-size: 10px; font-weight: 600; }
    ul { margin: 3px 0 6px 16px; padding: 0; }
    li { margin-bottom: 2px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .project-card { border-left: 2px solid #0284c7; padding-left: 8px; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div>
    <h1>${PORTFOLIO_INFO.name}</h1>
    <div class="tagline">${PORTFOLIO_INFO.tagline}</div>
    <div class="title">${PORTFOLIO_INFO.title}</div>
    <div class="contact">
      Email: ${PORTFOLIO_INFO.email} &nbsp;|&nbsp; Phone: ${PORTFOLIO_INFO.phone} &nbsp;|&nbsp; Location: ${PORTFOLIO_INFO.location} &nbsp;|&nbsp; LinkedIn: ${PORTFOLIO_INFO.linkedin}
    </div>
  </div>

  <h2>Profile & Executive Summary</h2>
  <p style="margin: 0 0 10px 0;">${PORTFOLIO_INFO.bio}</p>

  <h2>Education</h2>
  ${EDUCATION_DATA.map((e) => `
    <div style="margin-bottom: 6px;">
      <div class="item-header"><span>${e.degree}</span><span>${e.period}</span></div>
      <div class="item-sub">${e.institution} - ${e.location}</div>
      <div class="highlight">${e.highlight}</div>
    </div>
  `).join('')}

  <h2>Experience & Engineering Missions</h2>
  ${EXPERIENCE_DATA.map((exp) => `
    <div style="margin-bottom: 8px;">
      <div class="item-header"><span>${exp.role} — ${exp.company}</span><span>${exp.period}</span></div>
      <div style="color: #475569; font-size: 10.5px;">${exp.summary}</div>
      <ul>
        ${exp.keyAchievements.map((ach) => `<li>${ach}</li>`).join('')}
      </ul>
      <div style="font-size: 9.5px; color: #0284c7;"><strong>Technologies:</strong> ${exp.technologies.join(', ')}</div>
    </div>
  `).join('')}

  <h2>Featured Software & Cybersecurity Projects</h2>
  ${PROJECTS_DATA.map((p) => `
    <div class="project-card">
      <div class="item-header"><span>${p.title} (${p.category})</span><span style="color: #d97706;">[${p.securityRating}]</span></div>
      <div style="font-size: 10.5px; color: #475569;">${p.tagline}</div>
      ${p.metrics ? `<div style="font-size: 10px; color: #059669;"><strong>Metrics:</strong> ${p.metrics}</div>` : ''}
      <div style="font-size: 9.5px; color: #64748b;">Tech: ${p.techStack.join(', ')}</div>
    </div>
  `).join('')}

  <h2>Verified Industry Certifications</h2>
  <div style="font-size: 10px; line-height: 1.6;">
    ${CERTIFICATIONS_DATA.map((c) => `• <strong>${c.title}</strong> — ${c.issuer} (${c.year}) [${c.badgeCode}]`).join('<br>')}
  </div>
</body>
</html>`;
  };

  // Generate Markdown Dossier
  const generateMarkdown = () => {
    return `# ASMAA BELKERROUCHE
**${PORTFOLIO_INFO.tagline}**
Email: ${PORTFOLIO_INFO.email} | Phone: ${PORTFOLIO_INFO.phone} | Location: ${PORTFOLIO_INFO.location}
LinkedIn: ${PORTFOLIO_INFO.linkedin} | GitHub: ${PORTFOLIO_INFO.github}

---

## 1. PROFILE & BIO
${PORTFOLIO_INFO.bio}

---

## 2. EDUCATION
${EDUCATION_DATA.map(
  (e) => `### ${e.degree}
**${e.institution}** (${e.period}) - ${e.location}
*Highlight:* ${e.highlight}
${e.details.map((d) => `- ${d}`).join('\n')}
`
).join('\n')}

---

## 3. PROFESSIONAL EXPERIENCE & MISSIONS
${EXPERIENCE_DATA.map(
  (exp) => `### ${exp.role} - ${exp.company}
*${exp.period} | ${exp.location}*
${exp.summary}
**Key Achievements:**
${exp.keyAchievements.map((k) => `- ${k}`).join('\n')}
**Technologies:** ${exp.technologies.join(', ')}
`
).join('\n')}

---

## 4. FEATURED CYBERSECURITY PROJECTS
${PROJECTS_DATA.map(
  (p) => `### ${p.title} (${p.category}) [Rating: ${p.securityRating}]
*${p.tagline}*
${p.description}
${p.metrics ? `**Metrics:** ${p.metrics}` : ''}
**Features:**
${p.features.map((f) => `- ${f}`).join('\n')}
**Tech Arsenal:** ${p.techStack.join(', ')}
`
).join('\n')}

---

## 5. SKILLS & DEFENSIVE COMPETENCIES
${SKILLS_DATA.map(
  (cat) => `### ${cat.categoryName}
${cat.skills.map((s) => `- **${s.name}**: ${s.level}% | ${s.yearsOrDepth} ${s.specialty ? `(${s.specialty})` : ''}`).join('\n')}
`
).join('\n')}

---

## 6. CERTIFICATIONS
${CERTIFICATIONS_DATA.map((c) => `- **${c.title}** - ${c.issuer} (${c.year}) [${c.badgeCode}]`).join('\n')}

---

## 7. LANGUAGES
${PORTFOLIO_INFO.languages.map((l) => `- **${l.name}**: ${l.proficiency}`).join('\n')}

---
*Game Dossier Exported from 3D Cyber Game Engine // Player Level: ${playerStats.level} | Bits: ${playerStats.collectedBits}/${playerStats.totalBits}*
`;
  };

  // Generate JSON Game Save
  const generateJSON = () => {
    return JSON.stringify(
      {
        gameExportVersion: '2.0-CYBER-SAV',
        exportTimestamp: new Date().toISOString(),
        playerSession: {
          level: playerStats.level,
          hp: playerStats.hp,
          exp: playerStats.exp,
          collectedBits: playerStats.collectedBits,
          totalBits: playerStats.totalBits,
          hacksCompleted: playerStats.hacksCompleted,
          status: 'TOP_TIER_SECURITY_RESEARCHER',
        },
        portfolioDossier: {
          profile: PORTFOLIO_INFO,
          education: EDUCATION_DATA,
          experience: EXPERIENCE_DATA,
          projects: PROJECTS_DATA,
          skills: SKILLS_DATA,
          certifications: CERTIFICATIONS_DATA,
        },
      },
      null,
      2
    );
  };

  const handleDownloadFile = (content: string, fileName: string, mimeType: string) => {
    retroAudio.playSuccess();
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    retroAudio.playSuccess();
    try {
      // 1. Create a dedicated print iframe to bypass iframe sandboxing restrictions
      const printFrame = document.createElement('iframe');
      printFrame.setAttribute('style', 'position: fixed; right: 0; bottom: 0; width: 0; height: 0; border: 0;');
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(generatePrintableHTML());
        frameDoc.close();
        setTimeout(() => {
          try {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
          } catch (err) {
            window.print();
          }
          setTimeout(() => {
            if (document.body.contains(printFrame)) {
              document.body.removeChild(printFrame);
            }
          }, 3000);
        }, 300);
        return;
      }
    } catch (e) {
      console.warn('Dedicated print iframe error, falling back to window.print', e);
    }
    window.print();
  };

  const handleCopy = (text: string) => {
    retroAudio.playInteract();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0a0f1d] border-2 border-amber-400 rounded-xl shadow-[0_0_50px_rgba(245,158,11,0.3)] overflow-hidden font-mono text-xs">
        {/* HEADER */}
        <div className="no-print flex items-center justify-between px-5 py-3.5 bg-amber-500/10 border-b border-amber-500/30 text-amber-300">
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-amber-400 animate-bounce" />
            <span className="font-bold text-sm tracking-wider">
              EXPORT PORTFOLIO DOSSIER & GAME SAVE
            </span>
          </div>
          <button
            onClick={() => {
              retroAudio.playInteract();
              onClose();
            }}
            className="p-1.5 rounded bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TAB NAVIGATION & ACTION TOOLBAR */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 bg-[#070b16] border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                retroAudio.playInteract();
                setActiveTab('preview');
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-[#0e172a] text-slate-300 hover:text-white'
              }`}
            >
              Printable CV View
            </button>
            <button
              onClick={() => {
                retroAudio.playInteract();
                setActiveTab('csv');
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'csv'
                  ? 'bg-cyan-400 text-black shadow-md'
                  : 'bg-[#0e172a] text-cyan-300 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>CSV Spreadsheets (.csv)</span>
            </button>
            <button
              onClick={() => {
                retroAudio.playInteract();
                setActiveTab('markdown');
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'markdown'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-[#0e172a] text-slate-300 hover:text-white'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => {
                retroAudio.playInteract();
                setActiveTab('json');
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-[#0e172a] text-slate-300 hover:text-white'
              }`}
            >
              Game Save (.json)
            </button>
          </div>

          {/* ACTION BUTTONS (PRINT, SAVE CSV, DOWNLOADS) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. PRINT / SAVE PDF */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-400 text-emerald-300 hover:bg-emerald-500/30 font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              title="Print directly or save as PDF via browser print dialogue"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>

            {/* 2. DIRECT SAVE CSV (.csv) */}
            <button
              onClick={() =>
                handleDownloadFile(
                  generatePortfolioCSV(),
                  'asmaa_belkerrouche_portfolio.csv',
                  'text/csv'
                )
              }
              className="px-3 py-1.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              title="Instantly download complete portfolio dataset as a CSV spreadsheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>SAVE CSV (.csv)</span>
            </button>

            {/* 3. HTML CV FILE (Guaranteed local offline backup) */}
            <button
              onClick={() =>
                handleDownloadFile(
                  generatePrintableHTML(),
                  'asmaa_belkerrouche_cv.html',
                  'text/html'
                )
              }
              className="px-2.5 py-1.5 rounded bg-blue-500/20 border border-blue-400 text-blue-300 hover:bg-blue-500/30 font-bold flex items-center gap-1 cursor-pointer"
              title="Download standalone HTML resume file (opens in any browser and prints cleanly)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>HTML CV</span>
            </button>

            {/* 4. MARKDOWN / JSON DOWNLOAD BUTTONS */}
            {activeTab === 'markdown' && (
              <button
                onClick={() =>
                  handleDownloadFile(
                    generateMarkdown(),
                    'asmaa_belkerrouche_cv.md',
                    'text/markdown'
                  )
                }
                className="px-3 py-1.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 hover:bg-amber-500/30 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD .MD</span>
              </button>
            )}

            {activeTab === 'json' && (
              <button
                onClick={() =>
                  handleDownloadFile(
                    generateJSON(),
                    'asmaa_cyber_game_save.json',
                    'application/json'
                  )
                }
                className="px-3 py-1.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 hover:bg-amber-500/30 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD .JSON</span>
              </button>
            )}

            <button
              onClick={() =>
                handleCopy(
                  activeTab === 'markdown'
                    ? generateMarkdown()
                    : activeTab === 'json'
                    ? generateJSON()
                    : activeTab === 'csv'
                    ? generatePortfolioCSV()
                    : generateMarkdown()
                )
              }
              className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED!' : 'COPY'}</span>
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-[#060a15]">
          {/* 1. PRINTABLE CV VIEW */}
          {activeTab === 'preview' && (
            <div className="bg-[#0b1222] border border-slate-700 p-6 md:p-8 rounded-lg shadow-xl text-slate-200 space-y-6 max-w-3xl mx-auto printable-area">
              {/* HEADER */}
              <div className="border-b border-amber-500/40 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    {PORTFOLIO_INFO.name}
                  </h1>
                  <p className="text-amber-400 font-semibold text-xs mt-0.5">
                    {PORTFOLIO_INFO.tagline}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {PORTFOLIO_INFO.title}
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-300 space-y-0.5">
                  <p>📧 {PORTFOLIO_INFO.email}</p>
                  <p>📱 {PORTFOLIO_INFO.phone}</p>
                  <p>📍 {PORTFOLIO_INFO.location}</p>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                  EXECUTIVE SUMMARY & ENGINEERING STANCE
                </h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {PORTFOLIO_INFO.bio}
                </p>
              </div>

              {/* EDUCATION */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                  EDUCATION
                </h3>
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.degree} className="space-y-1">
                    <div className="flex justify-between font-bold text-xs text-white">
                      <span>{edu.degree}</span>
                      <span className="text-slate-400">{edu.period}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-cyan-400">
                      <span>{edu.institution}</span>
                      <span>{edu.location}</span>
                    </div>
                    <p className="text-emerald-400 text-[10px] font-semibold">{edu.highlight}</p>
                  </div>
                ))}
              </div>

              {/* WORK MISSIONS / INTERNSHIPS */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                  PROFESSIONAL INTERNSHIPS & MISSIONS
                </h3>
                {EXPERIENCE_DATA.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between font-bold text-xs text-white">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-slate-400">{exp.period}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{exp.summary}</p>
                    <ul className="list-disc list-inside text-[10px] text-slate-400 space-y-0.5">
                      {exp.keyAchievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* KEY PROJECTS */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                  FEATURED SOFTWARE & CYBERSECURITY PROJECTS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PROJECTS_DATA.map((proj) => (
                    <div key={proj.id} className="p-3 bg-[#060a14] rounded border border-slate-800 space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-xs">{proj.title}</span>
                        <span className="text-[9px] text-amber-400">[{proj.securityRating}]</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug">{proj.tagline}</p>
                      <p className="text-[9px] text-cyan-400">Tech: {proj.techStack.slice(0, 4).join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SKILLS MATRIX & CERTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                    SECURITY TOOLS & PROGRAMMING
                  </h3>
                  <p className="text-[10px] text-slate-300">
                    <strong>Tools:</strong> Wireshark, Nmap, Snort, Burp Suite, Metasploit, Ghidra<br />
                    <strong>Languages:</strong> Python (Advanced), C/C++, Bash, SQL, TypeScript<br />
                    <strong>Frameworks:</strong> PyTorch, Scikit-learn, FastAPI, React, Docker
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-1">
                    CERTIFICATIONS & CREDENTIALS
                  </h3>
                  <ul className="text-[10px] text-slate-300 space-y-0.5">
                    {CERTIFICATIONS_DATA.map((c) => (
                      <li key={c.title}>• {c.title} ({c.issuer})</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 2. CSV SPREADSHEETS TAB */}
          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#0c162d] border border-cyan-500/40 rounded-lg">
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                    <span>STRUCTURED CSV DATASETS</span>
                  </div>
                  <p className="text-slate-400 text-[10px] mt-0.5">
                    Export projects, experience missions, skills, and certifications into universal CSV format for Excel, Google Sheets, or ATS.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleDownloadFile(
                        generateProjectsCSV(),
                        'asmaa_projects_dataset.csv',
                        'text/csv'
                      )
                    }
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-[10px] font-bold cursor-pointer"
                  >
                    Projects CSV
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadFile(
                        generatePortfolioCSV(),
                        'asmaa_belkerrouche_portfolio.csv',
                        'text/csv'
                      )
                    }
                    className="px-3 py-1.5 rounded bg-cyan-500/25 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/40 text-[11px] font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>SAVE FULL CSV</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#03060f] border border-slate-800 rounded-lg text-cyan-300 font-mono text-[10.5px] whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto">
                {generatePortfolioCSV()}
              </div>
            </div>
          )}

          {/* 3. MARKDOWN TAB */}
          {activeTab === 'markdown' && (
            <div className="p-4 bg-[#03060f] border border-slate-800 rounded-lg text-emerald-400 font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
              {generateMarkdown()}
            </div>
          )}

          {/* 4. JSON TAB */}
          {activeTab === 'json' && (
            <div className="p-4 bg-[#03060f] border border-slate-800 rounded-lg text-cyan-400 font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
              {generateJSON()}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="no-print px-5 py-3 bg-[#070b16] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
          <span>PORTFOLIO DATA SECURED & READY FOR EXPORT</span>
          <span className="text-amber-400 font-semibold">CLICK &quot;PRINT / SAVE PDF&quot; OR &quot;SAVE CSV&quot; FOR HARDCOPY & SPREADSHEETS</span>
        </div>
      </div>
    </div>
  );
};

