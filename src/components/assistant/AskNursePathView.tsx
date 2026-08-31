import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  ShieldAlert, 
  RefreshCw, 
  HelpCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { 
  UserProfile, 
  Journey, 
  RoadmapTask, 
  DocumentItem, 
  CostItem 
} from '../../types';

interface Props {
  userProfile: UserProfile;
  activeJourney: Journey;
  tasks: RoadmapTask[];
  documents: DocumentItem[];
  costs: CostItem[];
  onOpenDisclaimerModal: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "What is my immediate next priority step?",
  "Explain my personalized pathway step-by-step",
  "Can I get an English proficiency waiver?",
  "Which documents usually take the longest to obtain?",
  "Explain my estimated costs and potential hidden fees",
  "What is the difference between NCLEX in USA vs Canada?"
];

export const AskNursePathView: React.FC<Props> = ({
  userProfile,
  activeJourney,
  tasks,
  documents,
  costs,
  onOpenDisclaimerModal
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: `Hello **${userProfile.firstName}**! I am **Ask NursePath**, your international nurse career navigator and roadmap assistant.

I have full visibility into your active pathway:
* **Initial Training:** ${userProfile.educationCountry} (${userProfile.qualification})
* **Current Practice:** ${userProfile.currentPracticeCountry} (${userProfile.experience} experience)
* **Target Destination:** **${activeJourney.destinationCountry}${activeJourney.destinationStateOrProvince ? ` (${activeJourney.destinationStateOrProvince})` : ''}**

How can I help you navigate your regulatory steps, exam preparations, or credential documents today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Assemble context
      const context = {
        userProfile: {
          firstName: userProfile.firstName,
          educationCountry: userProfile.educationCountry,
          qualification: userProfile.qualification,
          yearQualified: userProfile.yearQualified,
          registrations: userProfile.registrations,
          currentPracticeCountry: userProfile.currentPracticeCountry,
          experience: userProfile.experience,
          currentlyPractisingClinically: userProfile.currentlyPractisingClinically
        },
        activeJourney: {
          title: activeJourney.title,
          destinationCountry: activeJourney.destinationCountry,
          destinationStateOrProvince: activeJourney.destinationStateOrProvince,
          pathwayVariant: activeJourney.pathwayVariant,
          targetTimeline: activeJourney.targetTimeline
        },
        tasksSummary: tasks.map(t => ({
          title: t.title,
          stage: t.stage,
          status: t.status,
          regulatorName: t.regulatorName,
          isRequired: t.isRequired
        })),
        documentsSummary: documents.map(d => ({
          name: d.name,
          category: d.category,
          status: d.status
        })),
        costsSummary: costs.map(c => ({
          item: c.item,
          category: c.category,
          cost: `${c.currency} ${c.estimatedCost}`,
          status: c.paymentStatus
        }))
      };

      // Format history
      const history = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history,
          context
        })
      });

      const data = await res.json();
      const reply = data.reply || "I'm sorry, I couldn't retrieve a response at this time. Please verify directly with your regulator.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `Unable to connect to AI server. Please make sure your server is running and check your connection. Error: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ask-nursepath-view" className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Ask NursePath AI
              </h1>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                Gemini 3.7 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized roadmap explanations grounded in verified official regulatory data
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDisclaimerModal}
          className="text-xs font-semibold text-slate-400 hover:text-amber-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 transition self-start sm:self-auto cursor-pointer"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Regulatory Safety Rules</span>
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          Suggestions:
        </span>
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 text-slate-300 text-xs font-medium whitespace-nowrap transition disabled:opacity-50 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="glass-panel flex flex-col h-[560px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs sm:text-sm ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 space-y-2 ${
                    isBot
                      ? 'bg-white/[0.03] border border-white/10 text-slate-200'
                      : 'bg-cyan-500/20 border border-cyan-500/40 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400 font-mono font-semibold pb-1 border-b border-white/10">
                    <span className={isBot ? 'text-cyan-400' : 'text-slate-300'}>{isBot ? 'NursePath Navigator' : userProfile.firstName}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="leading-relaxed space-y-2 text-xs sm:text-sm text-slate-200">
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-[0_0_10px_rgba(0,242,255,0.4)]">
                    {userProfile.firstName.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 text-xs sm:text-sm justify-start">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-center gap-2 text-slate-300">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span className="text-xs font-medium">Analyzing regulatory guidelines and journey data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about your destination rules, exams, credentials, or timeline..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.4)]"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center font-mono">
            Ask NursePath provides informational roadmap explanations. Always verify requirements directly with official regulators before making payments.
          </p>
        </div>
      </div>
    </div>
  );
};

