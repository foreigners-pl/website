// Language Service Content

export const languageContent = {
  hero: {
    title: 'Language',
    subtitle: 'Be understood - in offices, shops and life',
    description: 'Need help with sworn translations, remote assistance, or court interpretation? Fill out the form and our specialists will be in touch with you as soon as possible.',
    ctaButton: 'Our Services',
    formTitle: 'Language Consultation',
    formSource: 'language-service',
  },
  trust: {
    heading: 'Your case is unique? Let us know.',
    subheading: 'We will tailor the service for you.',
    description: "Language barriers can turn even simple tasks into major challenges - especially when dealing with official documents or legal situations. Whether you need a sworn translation, interpreter for court, or help during remote appointments, we make sure nothing gets lost in translation. No generic services - we match you with the right support based on your exact needs, language, and situation. Clear, accurate, and fully trusted wherever it matters most.",
    stats: {
      period: '6 months',
      count: '500+',
      text: 'foreigners trusted us by reaching out with their immigration needs',
    },
  },
  qa: {
    title: 'Language Services',
    searchPlaceholder: 'Looking for something?',
    items: [
      {
        question: 'What do our language services include?',
        answer: `Our language services cover a wide range of needs for foreigners in Poland. This includes, but is not limited to:

• Polish Language Courses
• Sworn Translation
• Remote Assistance
• Court Interpretation

We focus on providing practical help where accurate communication is essential.`,
      },
      {
        question: 'Polish Language Course',
        answer: `Polish language is essential for everyday life in Poland. Knowing Polish helps with communication at work, understanding official documents, handling matters in offices, and integrating into daily and social life. It is also useful for long-term stay, professional development, and meeting requirements related to residence, employment, or citizenship applications.

We assist by helping you choose the right course based on your current level and goals, whether you need basic everyday communication, workplace Polish, or more advanced language skills. We handle the organization and enrollment process, connect you with suitable instructors or schools, and guide you throughout the course selection to ensure everything is clear, practical, and tailored to your needs.`,
      },
      // ...existing code...
      {
        question: 'Sworn Translation',
        answer: 'Sworn translations (tłumaczenia przysięgłe) are legally certified translations required for official documents in Poland - such as birth certificates, diplomas, court documents, contracts, or immigration paperwork. They can only be done by translators registered with the Ministry of Justice.\n\nWe work with certified sworn translators in multiple languages and handle the entire process for you. Just send us your document (scan or original), and we\'ll return a legally valid translation accepted by courts, offices, and institutions across Poland.',
      },
      {
        question: 'Remote Assistance',
        answer: 'Sometimes you just need help understanding a form, letter, or office conversation - especially when it\'s in Polish and full of official jargon. Remote language assistance is perfect for online meetings, phone calls, or translating informal documents quickly.\n\nWe provide live help via phone, chat, or video. Whether it\'s reading a document with you, translating an email, or guiding you through a Polish website, we\'re there to assist in real time - so you never feel lost or stuck because of the language.',
      },
      {
        question: 'Court Interpretation',
        answer: 'In legal settings like court hearings, police interviews, or notary appointments, having a qualified interpreter is not just helpful - it\'s often legally required. The stakes are high, and every word matters.\n\nWe arrange professional court-certified interpreters who understand legal terminology and know how to navigate formal procedures. We handle scheduling and coordination, so you can focus on your case, knowing the communication is fully covered.',
      },
    ],
  },
  otherServices: {
    heading: 'Need help with any of these services?',
    ctaButton: 'Get Started',
    alternativeText: "Didn't find what you need? Check out our other services!",
    categories: ['Immigration', 'Business', 'Language', 'Driving'],
  },
} as const;
