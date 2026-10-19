// COMPANION's on-device brain. Answers questions about Ozan from the site's own data and
// pilots the browser to pages, with no API key and no network calls. When a remote model
// endpoint is configured (see companion-worker/README.md) it is tried first and this is the fallback.

import { CERTIFICATIONS, ERASMUS, FIVE_E_STAGES, INSTITUTION, MANIFESTO, METHODOLOGIES, PROFILE, PROJECTS, SOCIETIES, TIMELINE } from '../../data/profile';

export type Route = '/' | '/about' | '/cv' | '/education' | '/experience' | '/projects' | '/certifications';

export interface Reply {
  text: string;
  navigate?: { path: Route; hash?: string };
}

const EMAIL_MD = `[${PROFILE.email}](mailto:${PROFILE.email})`;
const LINKEDIN_MD = `[LinkedIn Profile](${PROFILE.linkedin})`;

const norm = (s: string) =>
  s
    .toLocaleLowerCase('tr')
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const fold = (s: string) =>
  norm(s)
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');

const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Phrases match as substrings; words of 4+ letters match as stems ("certif" → "certifications"); short words must match whole.
const has = (q: string, words: string[]) =>
  words.some((w) => {
    if (w.includes(' ')) return q.includes(w);
    const tail = w.length <= 3 ? '(?![a-z0-9])' : '';
    return new RegExp(`(^|[^a-z0-9])${esc(w)}${tail}`).test(q);
  });

function isTurkish(raw: string) {
  if (/[çğıöşü]/i.test(raw.replace(/özen/gi, ''))) return true;
  const q = fold(raw);
  return has(q, ['merhaba', 'selam', 'nedir', 'nerede', 'hakkinda', 'misin', 'musun', 'beni', 'bana', 'goster', 'gotur', 'nasil', 'kimdir', 'iletisim', 'sertifika', 'egitim', 'deneyim', 'projeler', 'ogretmen', 'tesekkur', 'neler']);
}

const NAV_VERBS = [
  'go to', 'take me', 'bring me', 'show me', 'navigate', 'open', 'see the', 'view', 'look at', 'jump to', 'head to', 'visit', 'let me see', 'i want to see', 'redirect',
  'git', 'gotur', 'goster', 'ac', 'sayfasina', 'sayfaya', 'bakmak', 'gormek',
];

const PAGE_KEYS: { path: Route; keys: string[]; label: [string, string] }[] = [
  { path: '/cv', keys: ['cv', 'resume', 'résumé', 'vitae', 'master matrix', 'ozgecmis'], label: ['CV (Master Matrix)', 'CV (Master Matrix)'] },
  { path: '/certifications', keys: ['certif', 'credential', 'badge', 'sertifika', 'belge'], label: ['Certifications', 'Sertifikalar'] },
  { path: '/experience', keys: ['experience', 'work', 'job', 'career', 'chronology', 'outlier', 'alignerr', 'invisible', 'meridial', 'gemini', 'technopat', 'british side', 'deneyim', 'kariyer'], label: ['Experience', 'Deneyim'] },
  { path: '/projects', keys: ['project', 'portfolio', 'works', 'race engine', 'backpack', 'whose is it', 'archive', 'proje'], label: ['Projects', 'Projeler'] },
  { path: '/education', keys: ['education', 'university', 'school', 'academ', 'ted', 'erasmus', 'egitim', 'universite', 'okul'], label: ['Education', 'Eğitim'] },
  { path: '/about', keys: ['about', 'philosophy', 'bio', 'story', 'mission', 'hakkinda', 'felsefe'], label: ['About', 'Hakkında'] },
  { path: '/', keys: ['home', 'main page', 'start', 'canvas', 'ana sayfa', 'anasayfa'], label: ['Home', 'Ana sayfa'] },
];

function pageFor(q: string) {
  return PAGE_KEYS.find((p) => has(q, p.keys));
}

function certList() {
  return CERTIFICATIONS.map((c, i) => `${i + 1}. **${c.title}** (${c.issuer})`).join('\n');
}

export function localReply(raw: string): Reply {
  const tr = isTurkish(raw);
  const q = fold(raw);
  const t = (en: string, trText: string) => (tr ? trText : en);

  if (!q) return { text: t('Ask me anything about Ozan.', 'Ozan hakkında istediğini sor.') };

  // Prompt-injection / persona attacks
  if (has(q, ['ignore previous', 'ignore all', 'system prompt', 'your prompt', 'your instructions', 'jailbreak', 'pretend you', 'act as', 'developer mode'])) {
    return { text: t("I'm COMPANION, and I stay on one topic: Ozan Özen and his work. What would you like to know about him?", "Ben COMPANION'ım ve tek bir konuda kalırım: Ozan Özen ve çalışmaları. Onun hakkında ne bilmek istersin?") };
  }

  // Navigation requests
  const target = pageFor(q);
  if (target && has(q, NAV_VERBS)) {
    let hash: string | undefined;
    const exp = TIMELINE.find((e) => q.includes(fold(e.company)));
    const proj = PROJECTS.find((p) => q.includes(fold(p.title).split(' ')[0].replace(/[“”"]/g, '')) && fold(p.title).length > 3);
    if (target.path === '/experience' && exp) hash = exp.id;
    if (target.path === '/projects' && proj) hash = proj.id;
    return { text: t(`Taking you to ${target.label[0]}…`, `Seni ${target.label[1]} sayfasına götürüyorum…`), navigate: { path: target.path, hash } };
  }

  // Greetings & identity
  if (/^(hi|hello|hey|yo|selam|merhaba|sa|hello there|good (morning|evening|afternoon))\b/.test(q) && q.length < 40) {
    return {
      text: t(
        `Hello! I'm COMPANION, the guide to ${PROFILE.name}'s portfolio. Ask about his work at Outlier, his teaching at TED University, his projects, or say "take me to the CV".`,
        `Merhaba! Ben COMPANION, ${PROFILE.name}'in portfolyo rehberiyim. Outlier'daki işini, TED Üniversitesi'ndeki eğitimini, projelerini sorabilir ya da "beni CV'ye götür" diyebilirsin.`
      ),
    };
  }
  if (has(q, ['thank', 'thanks', 'tesekkur', 'sagol', 'eyvallah'])) {
    return { text: t('Anytime. Anything else you want to know about Ozan?', 'Rica ederim. Ozan hakkında başka merak ettiğin bir şey var mı?') };
  }
  if (has(q, ['who are you', 'what are you', 'sen kimsin', 'nesin'])) {
    return { text: t("I'm COMPANION, a guide built into this site. I know Ozan's background, projects and credentials, and I can move you to any page.", 'Ben COMPANION, bu siteye gömülü bir rehberim. Ozan\'ın geçmişini, projelerini ve sertifikalarını bilirim ve seni istediğin sayfaya götürebilirim.') };
  }

  // Contact
  if (has(q, ['contact', 'email', 'e-mail', 'mail', 'reach', 'hire', 'linkedin', 'get in touch', 'iletisim', 'ulas', 'eposta', 'e-posta'])) {
    return {
      text: t(
        `You can reach Ozan by email at ${EMAIL_MD} or connect on ${LINKEDIN_MD}. He's open to new ideas, projects and collaborations.`,
        `Ozan'a ${EMAIL_MD} adresinden e-posta ile ulaşabilir ya da ${LINKEDIN_MD} üzerinden bağlantı kurabilirsin. Yeni fikirlere, projelere ve iş birliklerine açık.`
      ),
    };
  }

  // Certifications
  if (has(q, ['certif', 'credential', 'badge', 'course', 'sertifika', 'kurs'])) {
    return {
      text: t(
        `Ozan holds ${CERTIFICATIONS.length} certifications:\n\n${certList()}\n\nWant to see them? Say "take me to certifications".`,
        `Ozan'ın ${CERTIFICATIONS.length} sertifikası var:\n\n${certList()}\n\nGörmek istersen "sertifikalar sayfasına götür" de.`
      ),
    };
  }

  // Specific employers
  for (const e of TIMELINE) {
    if (q.includes(fold(e.company))) {
      return {
        text: t(
          `**${e.company}** · ${e.role} (${e.period}, ${e.status === 'ACTIVE' ? 'active' : 'completed'})\n\n${e.content}\n\nHighlights: ${e.metrics.join(', ')}.`,
          `**${e.company}** · ${e.role} (${e.period}, ${e.status === 'ACTIVE' ? 'devam ediyor' : 'tamamlandı'})\n\n${e.content}\n\nÖne çıkanlar: ${e.metrics.join(', ')}.`
        ),
      };
    }
  }

  // Specific projects
  const projectHit = PROJECTS.find((p) =>
    has(q, p.id === 'race-engine' ? ['race', 'racing', 'three.js', 'threejs', 'game', 'oyun', 'yaris'] : p.id === 'backpack-mysteries' ? ['backpack', 'mystery', 'mysteries', 'storytelling', 'gamma', 'hikaye'] : ['whose', 'possessive', 'web 2.0', 'pronoun', 'google site', 'wordwall'])
  );
  if (projectHit) {
    const stages = projectHit.stages ? `\n\nThe 5E arc: ${projectHit.stages.map((s) => s.name).join(' → ')}.` : '';
    const link = projectHit.link ? `\n\n[Open it here](${projectHit.link})` : '';
    return { text: `**${projectHit.title}** · ${projectHit.kicker}\n\n${projectHit.content}${stages}${link}` };
  }

  // Projects in general
  if (has(q, ['project', 'tech project', 'built', 'build', 'module', 'proje', 'yaptigi'])) {
    return {
      text: t(
        `Three flagship modules:\n\n${PROJECTS.map((p, i) => `${i + 1}. **${p.title}**: ${p.kicker}`).join('\n')}\n\nAsk about any of them for details.`,
        `Üç ana modül:\n\n${PROJECTS.map((p, i) => `${i + 1}. **${p.title}**: ${p.kicker}`).join('\n')}\n\nDetay için herhangi birini sorabilirsin.`
      ),
    };
  }

  // Methodologies
  if (has(q, ['5e', 'five e', 'engage explore'])) {
    return { text: `The **5E Instructional Model** structures a lesson as:\n\n${FIVE_E_STAGES.map((s) => `- **${s.name}**: ${s.desc}`).join('\n')}` };
  }
  const method = METHODOLOGIES.find((m) => has(q, [m.code.toLowerCase()]) || q.includes(fold(m.name).slice(0, 18)));
  if (method) return { text: `**${method.code}: ${method.name}**\n\n${method.desc}` };

  // Teaching philosophy / about
  if (has(q, ['philosophy', 'approach', 'mission', 'believe', 'teaching style', 'pedagog', 'methodolog', 'felsefe', 'yaklasim', 'misyon'])) {
    return {
      text: t(
        `${MANIFESTO[0].content}\n\nIn practice he relies on ${METHODOLOGIES.map((m) => m.code).join(', ')} and the 5E Model: clear instructions, logical sequencing, and no ambiguity, whether the "learner" is a student or an LLM.`,
        `Ozan, insan dili ile bilişsel hesaplamanın kesişiminde çalışıyor. Temel ilkesi: karmaşıklığı çöz, netliği kodla ve anlamı sıfır sinyal kaybıyla ilet.\n\nUygulamada ${METHODOLOGIES.map((m) => m.code).join(', ')} ve 5E Modeli'ne dayanıyor: ister öğrenci ister bir dil modeli olsun, net yönergeler, mantıklı sıralama ve belirsizliğin ortadan kaldırılması.`
      ),
    };
  }

  // Education
  if (has(q, ['education', 'study', 'studies', 'university', 'ted', 'student', 'degree', 'school', 'erasmus', 'egitim', 'universite', 'okul', 'ogrenci'])) {
    const facts = INSTITUTION.facts.map(([k, v]) => `- ${k}: ${v}`).join('\n');
    return {
      text: t(
        `**${INSTITUTION.name}**\n${facts}\n\n${ERASMUS.content}\n\nOn campus: ${SOCIETIES[0].desc}`,
        `**TED Üniversitesi**, Ankara. İngiliz Dili Eğitimi (ELT) 3. sınıf öğrencisi; Öğretmen Eğitimi ve Uygulamalı Dilbilim alanında.\n\n2025–2026 akademik yılı için Erasmus+ öğrenci hareketliliğine kabul edildi. Kampüste Sosyal ve Kültürel İşler Direktörlüğü ile aktif olarak çalışıyor.`
      ),
    };
  }

  // Experience in general
  if (has(q, ['experience', 'work', 'job', 'career', 'role', 'employ', 'ai train', 'llm', 'journalis', 'deneyim', 'kariyer', 'calis'])) {
    return {
      text: t(
        `${TIMELINE.map((e) => `- **${e.company}**: ${e.role} (${e.period})`).join('\n')}\n\nPlus freelance digital architecture & UI/UX design and pedagogical materials development. Ask about any role for the full story.`,
        `${TIMELINE.map((e) => `- **${e.company}**: ${e.role} (${e.period})`).join('\n')}\n\nAyrıca serbest dijital mimari ve UI/UX tasarımı ile pedagojik materyal geliştirme. Herhangi bir rol hakkında detay sorabilirsin.`
      ),
    };
  }

  // Skills
  if (has(q, ['skill', 'stack', 'technical', 'linux', 'fedora', '3d print', 'next.js', 'typescript', 'competenc', 'yetenek', 'beceri'])) {
    return {
      text: t(
        '**Technical competencies**\n- AI/ML: LLM training, dataset curation, prompt engineering, accuracy benchmarking\n- Journalism: technical writing, hardware analysis, GPU benchmarking\n- Fabrication: 3D printing, rapid prototyping, CAD modeling\n- Software: web architecture, Next.js, TypeScript\n- Systems: Fedora Linux, kernel optimization, CLI workflows',
        '**Teknik yetkinlikler**\n- Yapay zekâ: LLM eğitimi, veri seti kürasyonu, prompt mühendisliği, doğruluk ölçümü\n- Gazetecilik: teknik yazım, donanım analizi, GPU testleri\n- Üretim: 3D baskı, hızlı prototipleme, CAD\n- Yazılım: web mimarisi, Next.js, TypeScript\n- Sistemler: Fedora Linux, çekirdek optimizasyonu, CLI'
      ),
    };
  }

  // Location / background
  if (has(q, ['where', 'location', 'based', 'live', 'city', 'tokyo', 'beijing', 'japan', 'china', 'nerede', 'yasiyor', 'sehir'])) {
    return {
      text: t(
        `Ozan is based in ${PROFILE.locationFull}. Daily life in Tokyo and Beijing gave him firsthand insight into cross-cultural communication, which shapes his teaching frameworks and AI evaluation rubrics.`,
        `Ozan ${PROFILE.locationFull}'de yaşıyor. Tokyo ve Pekin'deki günlük yaşam ona kültürlerarası iletişim konusunda doğrudan deneyim kazandırdı; bu da öğretim çerçevelerini ve yapay zekâ değerlendirme ölçütlerini şekillendiriyor.`
      ),
    };
  }

  // CV
  if (has(q, ['cv', 'resume', 'vitae', 'master matrix', 'ozgecmis'])) {
    return {
      text: t(
        'His CV lives on the site as the **Master Matrix**: education, experience, projects, technical competencies and methodological stack in one view, with a one-click PDF download. Say "take me to the CV" to open it.',
        'CV\'si sitede **Master Matrix** olarak yer alıyor: eğitim, deneyim, projeler, teknik yetkinlikler ve metodoloji tek ekranda, tek tıkla PDF olarak indirilebilir. Açmak için "beni CV\'ye götür" de.'
      ),
    };
  }

  // Who is Ozan
  if (has(q, ['who is', 'about ozan', 'tell me about', 'kimdir', 'kim', 'hakkinda', 'introduce', 'summary', 'ozet'])) {
    return {
      text: t(
        `**${PROFILE.name}** is an English Language Educator, AI Model Trainer and Tech Journalist based in Ankara. He studies ELT at TED University (4th year, Erasmus+ cleared), trains and evaluates large language models at Outlier, develops and trains Google Gemini models at Invisible Technologies, transcribes audio for AI speech comprehension at Alignerr, and wrote hardware and Linux deep-dives for Technopat.\n\n${MANIFESTO[0].content}`,
        `**${PROFILE.name}**, Ankara'da yaşayan bir İngilizce öğretmeni adayı, yapay zekâ model eğitmeni ve teknoloji gazetecisi. TED Üniversitesi'nde İngiliz Dili Eğitimi okuyor (4. sınıf, Erasmus+ kabulü var), Outlier'da büyük dil modellerini eğitip değerlendiriyor, Invisible Technologies'te Google Gemini modellerini geliştirip eğitiyor, Alignerr'da yapay zekânın konuşmayı anlaması için ses transkripsiyonu yapıyor ve Technopat için donanım ve Linux yazıları yazdı.`
      ),
    };
  }

  // Page mentioned without a verb: describe and offer
  if (target) {
    return {
      text: t(`That's covered on the ${target.label[0]} page. Want me to take you there? Just say "go to ${target.label[0].toLowerCase()}".`, `Bu konu ${target.label[1]} sayfasında. Gitmek istersen "${target.label[1].toLowerCase()} sayfasına götür" demen yeterli.`),
    };
  }

  return {
    text: t(
      "I only cover Ozan Özen and his portfolio, so I can't help with that one. Try asking about his teaching philosophy, his work at Outlier, his projects, his certifications, or how to contact him.",
      'Yalnızca Ozan Özen ve portfolyosu hakkında konuşabiliyorum. Öğretim felsefesini, Outlier\'daki işini, projelerini, sertifikalarını ya da ona nasıl ulaşacağını sorabilirsin.'
    ),
  };
}

const ENDPOINT = process.env.NEXT_PUBLIC_COMPANION_ENDPOINT;

/** Asks the remote model when one is configured, otherwise (or on any failure) answers locally. */
export async function ask(history: { role: 'user' | 'assistant'; content: string }[]): Promise<Reply> {
  const last = history[history.length - 1]?.content ?? '';
  if (ENDPOINT) {
    try {
      const ctrl = new AbortController();
      const timer = window.setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-12) }),
        signal: ctrl.signal,
      });
      window.clearTimeout(timer);
      if (res.ok) {
        const data = (await res.json()) as Reply;
        if (data?.text || data?.navigate) return data;
      }
    } catch {
      /* fall through to the local brain */
    }
  }
  return localReply(last);
}
