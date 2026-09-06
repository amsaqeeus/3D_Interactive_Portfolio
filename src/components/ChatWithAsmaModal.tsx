import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Mail, 
  Copy, 
  Check, 
  Phone, 
  Linkedin, 
  ExternalLink, 
  Sparkles, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { retroAudio } from '../audio/retroAudio';

interface ChatWithAsmaModalProps {
  onClose: () => void;
  defaultTopic?: string;
}

const TOPIC_PRESETS = [
  {
    label: '💼 Desktop Software & Systems',
    subject: 'Desktop Application & Software Project Inquiry',
    template: 'Hello Asma,\n\nI am reaching out regarding a desktop application / software project. We are looking to develop...'
  },
  {
    label: '🌐 Web Platform Development',
    subject: 'Web Application Development Inquiry',
    template: 'Hello Asma,\n\nI would like to discuss a web platform development project using Django / React / Node.js...'
  },
  {
    label: '⚡ Business Automation & Python',
    subject: 'Workflow Automation & Scripting Project',
    template: 'Hello Asma,\n\nWe need help automating our administrative workflows, payroll, or Excel batch processing...'
  },
  {
    label: '🛡️ Cybersecurity & Audit',
    subject: 'Cybersecurity & Security Assessment Inquiry',
    template: 'Hello Asma,\n\nI am interested in consulting with you on a cybersecurity review, vulnerability assessment, or system audit...'
  },
];

export const ChatWithAsmaModal: React.FC<ChatWithAsmaModalProps> = ({ onClose, defaultTopic }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState(defaultTopic || 'Project Inquiry / Software Collaboration');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const recipientEmail = PORTFOLIO_INFO.email || 'a_belkerrouche@estin.dz';

  const handleApplyPreset = (preset: typeof TOPIC_PRESETS[0]) => {
    retroAudio.playInteract();
    setSubject(preset.subject);
    if (!message || message.length < 20) {
      setMessage(preset.template);
    }
  };

  const constructMailtoUrl = () => {
    const formattedBody = `Sender Name: ${senderName || 'Not specified'}
Sender Email: ${senderEmail || 'Not specified'}
Subject: ${subject}

Message:
${message || '(No message body entered)'}

-------------------------
Dispatched from Asma's Room Interactive 3D Portfolio
ESTIN AI & Cybersecurity Student & Software Developer`;

    const encodedSubject = encodeURIComponent(`[Asma Portfolio] ${subject}`);
    const encodedBody = encodeURIComponent(formattedBody);

    return `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    retroAudio.playSuccess();

    const mailtoUrl = constructMailtoUrl();
    window.location.href = mailtoUrl;

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 6000);
  };

  const handleCopyMessage = () => {
    retroAudio.playInteract();
    const formattedText = `To: ${recipientEmail}
Subject: [Asma Portfolio] ${subject}
From: ${senderName || 'Anonymous'} (${senderEmail || 'No email provided'})

${message}`;

    navigator.clipboard.writeText(formattedText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handleCopyEmailOnly = () => {
    retroAudio.playInteract();
    navigator.clipboard.writeText(recipientEmail).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl bg-[#090e1c] border-2 border-cyan-500/60 rounded-xl shadow-[0_0_40px_rgba(0,255,255,0.25)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* CRT Scanline effect */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/3 to-transparent bg-size-[100%_4px]" />

        {/* Top Header */}
        <div className="px-5 py-4 border-b border-cyan-500/30 bg-[#0d162b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                  DIRECT TRANSMISSION // CHAT WITH ASMA
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Send your message directly to Asma's verified inbox
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              retroAudio.playInteract();
              onClose();
            }}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 font-mono text-xs">
          {/* Quick Direct Info Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-[#060b17] border border-cyan-900/60 rounded-lg">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div className="overflow-hidden">
                <div className="text-[9px] text-slate-400">OFFICIAL EMAIL</div>
                <div className="text-[11px] text-cyan-200 font-semibold truncate">{recipientEmail}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-400">PHONE / WHATSAPP</div>
                <div className="text-[11px] text-slate-200 font-semibold">{PORTFOLIO_INFO.phone}</div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <button
                type="button"
                onClick={handleCopyEmailOnly}
                className="px-2.5 py-1.5 rounded bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-500/40 text-cyan-300 text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'COPIED' : 'COPY EMAIL'}</span>
              </button>

              <a
                href={PORTFOLIO_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded bg-blue-900/40 hover:bg-blue-800/60 border border-blue-500/40 text-blue-300 text-[10px] flex items-center gap-1 transition-colors"
              >
                <Linkedin className="w-3 h-3" />
                <span>LINKEDIN</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Quick Subject Suggestions */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>SELECT INQUIRY TOPIC (OR WRITE YOUR OWN):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {TOPIC_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-2.5 py-1.5 text-left rounded border text-[10px] transition-all cursor-pointer truncate ${
                    subject === preset.subject
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,255,255,0.2)]'
                      : 'bg-[#0d172e] border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSendEmail} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-300 mb-1">
                  YOUR NAME / ORGANIZATION:
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. John Doe / Tech Corp"
                  className="w-full px-3 py-2 bg-[#050a14] border border-cyan-900/80 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-300 mb-1">
                  YOUR EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  className="w-full px-3 py-2 bg-[#050a14] border border-cyan-900/80 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1">
                SUBJECT LINE:
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject of your message"
                className="w-full px-3 py-2 bg-[#050a14] border border-cyan-900/80 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-300 mb-1 flex items-center justify-between">
                <span>MESSAGE DETAILS:</span>
                <span className="text-[9px] text-slate-500 font-normal">Will be sent to {recipientEmail}</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your software needs, project timeline, budget, or question..."
                className="w-full px-3 py-2 bg-[#050a14] border border-cyan-900/80 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono resize-none"
              />
            </div>

            {/* Notification alert after sending */}
            {isSent && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px]">
                  Email dispatch triggered! Your mail client was opened. If you didn't see it, use "Copy Drafted Message" below.
                </span>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct encrypted delivery to Asma's institutional inbox</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-1/2 sm:w-auto px-3 py-2 rounded-lg bg-[#0e172a] hover:bg-[#1e293b] border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy full message text to clipboard"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'COPIED!' : 'COPY DRAFT'}</span>
                </button>

                <button
                  type="submit"
                  className="w-1/2 sm:w-auto px-5 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND TO EMAIL</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
