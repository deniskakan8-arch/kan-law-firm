export type Locale = 'ru' | 'en' | 'kk'

export const locales: { code: Locale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'kk', label: 'KZ' },
]

type Item = { title: string; text: string }

export type Dictionary = {
  nav: { practices: string; cases: string; principles: string; about: string; call: string; menu: string; close: string }
  hero: { eyebrow: string; title: string; subtitle: string; cta: string; scroll: string }
  manifesto: { label: string; statement: string; items: Item[] }
  stats: { label: string; items: { value: number; prefix?: string; suffix?: string; caption: string }[] }
  practices: { label: string; title: string; items: Item[]; more: string }
  process: { label: string; title: string; hint: string; steps: Item[] }
  cases: { label: string; title: string; note: string; items: { tag: string; amount: string; title: string; text: string; outcome: string }[] }
  about: { label: string; name: string; role: string; bio: string; facts: string[]; quote: string }
  contact: {
    label: string
    title: string
    subtitle: string
    name: string
    phone: string
    message: string
    consent: string
    submit: string
    sending: string
    success: string
    error: string
    channels: string
    direct: string
  }
  footer: { address: string; rights: string; privacy: string; license: string }
}

const ru: Dictionary = {
  nav: { practices: 'Практики', cases: 'Кейсы', principles: 'Принципы', about: 'Адвокат', call: 'Связаться', menu: 'Меню', close: 'Закрыть' },
  hero: {
    eyebrow: 'Адвокатское бюро · Алматы · с 2008 года',
    title: 'Безупречная правовая защита вашего бизнеса',
    subtitle: 'Корпоративные споры, защита активов и уголовные дела экономической направленности. Тихо, точно и с результатом.',
    cta: 'Запросить конфиденциальную консультацию',
    scroll: 'Листайте',
  },
  manifesto: {
    label: 'Манифест',
    statement: 'Мы не обещаем лёгких побед. Мы находим выход там, где другие видят тупик — и делаем это без лишнего шума.',
    items: [
      { title: 'Абсолютная конфиденциальность', text: 'Адвокатская тайна, NDA с первого контакта, закрытые каналы связи и минимальный круг допуска.' },
      { title: 'Нестандартная стратегия', text: 'Каждое дело — отдельная архитектура защиты. Шаблонные решения здесь не работают.' },
      { title: 'Нацеленность на результат', text: 'Мы измеряем работу сохранёнными активами, свободой и репутацией клиента.' },
    ],
  },
  stats: {
    label: 'Экспертиза в цифрах',
    items: [
      { value: 18, suffix: '', caption: 'лет адвокатской практики' },
      { value: 340, prefix: '$', suffix: ' млн', caption: 'активов клиентов сохранено' },
      { value: 412, suffix: '', caption: 'завершённых дел' },
      { value: 96, suffix: '%', caption: 'дел решены без публичной огласки' },
    ],
  },
  practices: {
    label: 'Практики',
    title: 'Специализация, отточенная годами',
    more: 'Подробнее',
    items: [
      { title: 'Корпоративные споры', text: 'Конфликты акционеров, оспаривание сделок, deadlock-ситуации и выход участников из бизнеса.' },
      { title: 'Арбитраж', text: 'Представительство в МФЦА, SIAC, ICC и государственных судах РК по сложным коммерческим спорам.' },
      { title: 'Налоговые споры', text: 'Обжалование результатов проверок, доначислений и защита от необоснованных претензий.' },
      { title: 'Уголовная защита бизнеса', text: 'Защита собственников и топ-менеджмента по экономическим составам на всех стадиях.' },
      { title: 'Банкротство', text: 'Субсидиарная ответственность, оспаривание требований кредиторов и защита активов.' },
      { title: 'Защита при проверках', text: 'Сопровождение обысков, выемок и допросов. Дежурный адвокат 24/7.' },
    ],
  },
  process: {
    label: 'Этапы ведения дела',
    title: 'От анализа — к результату',
    hint: 'Продолжайте листать',
    steps: [
      { title: 'Анализ', text: 'Глубокий аудит документов, рисков и позиций сторон. Находим уязвимости раньше оппонента.' },
      { title: 'Стратегия', text: 'Выстраиваем многоуровневый план: процессуальный, переговорный и репутационный.' },
      { title: 'Защита', text: 'Реализуем стратегию в суде, следствии и на переговорах — последовательно и жёстко.' },
      { title: 'Результат', text: 'Фиксируем итог: сохранённые активы, прекращённое преследование, закрытый конфликт.' },
    ],
  },
  cases: {
    label: 'Избранные кейсы',
    title: 'Результаты, о которых не пишут в новостях',
    note: 'Данные анонимизированы в соответствии с адвокатской тайной.',
    items: [
      { tag: 'Банкротство', amount: '₸ 4,2 млрд', title: 'Отмена субсидиарной ответственности', text: 'Бывший директор девелоперской компании привлечён к ответственности по долгам банкрота. Доказали отсутствие причинно-следственной связи и добросовестность решений.', outcome: 'Требования отклонены в полном объёме' },
      { tag: 'Корпоративный спор', amount: '$ 27 млн', title: 'Защита активов при рейдерском захвате', text: 'Попытка смены исполнительного органа через подложные решения участников. Обеспечительные меры получены в течение 48 часов.', outcome: 'Контроль над компанией сохранён' },
      { tag: 'Уголовная защита', amount: '₸ 1,8 млрд', title: 'Прекращение дела о хищении', text: 'Собственнику дистрибьюторской сети вменялось хищение путём растраты. Независимая экспертиза опровергла выводы обвинения.', outcome: 'Дело прекращено за отсутствием состава' },
      { tag: 'Налоговый спор', amount: '₸ 960 млн', title: 'Отмена доначислений по КПН', text: 'Оспорили результаты комплексной проверки производственной компании в апелляционной комиссии и суде.', outcome: 'Уведомление отменено полностью' },
    ],
  },
  about: {
    label: 'Об адвокате',
    name: 'Кан Виталий Львович',
    role: 'Управляющий партнёр',
    bio: 'Восемнадцать лет защищает собственников бизнеса в самых сложных корпоративных и уголовных делах Казахстана. Ведёт дела лично — от первой встречи до финального решения.',
    facts: ['Член Коллегии адвокатов г. Алматы', 'Арбитр и представитель в МФЦА', 'LL.M., University of London', 'Рекомендован ведущими юридическими рейтингами'],
    quote: '«Лучшая защита — та, о которой оппонент узнаёт слишком поздно».',
  },
  contact: {
    label: 'Конфиденциальная связь',
    title: 'Обсудим вашу ситуацию',
    subtitle: 'Ответим в течение часа. Всё, что вы сообщите, защищено адвокатской тайной.',
    name: 'Имя',
    phone: 'Телефон',
    message: 'Кратко опишите суть вопроса',
    consent: 'Я согласен на обработку данных. Информация не подлежит разглашению.',
    submit: 'Отправить запрос',
    sending: 'Отправка…',
    success: 'Запрос получен. Мы свяжемся с вами в течение часа.',
    error: 'Проверьте корректность заполнения полей.',
    channels: 'Защищённые каналы',
    direct: 'Прямая линия',
  },
  footer: {
    address: 'БЦ «Нурлы Тау», пр. Аль-Фараби, 19, блок 2Б, Алматы',
    rights: 'Все права защищены.',
    privacy: 'Политика конфиденциальности',
    license: 'Лицензия на занятие адвокатской деятельностью',
  },
}

const en: Dictionary = {
  nav: { practices: 'Practices', cases: 'Cases', principles: 'Principles', about: 'Advocate', call: 'Contact', menu: 'Menu', close: 'Close' },
  hero: {
    eyebrow: 'Law office · Almaty · since 2008',
    title: 'Impeccable legal protection for your business',
    subtitle: 'Corporate disputes, asset protection and white-collar criminal defence. Quiet, precise and decisive.',
    cta: 'Request a confidential consultation',
    scroll: 'Scroll',
  },
  manifesto: {
    label: 'Manifesto',
    statement: 'We do not promise easy wins. We find a way out where others see a dead end — and we do it without noise.',
    items: [
      { title: 'Absolute confidentiality', text: 'Attorney–client privilege, NDA from first contact, closed channels and a minimal circle of access.' },
      { title: 'Unconventional strategy', text: 'Every case is its own architecture of defence. Templates do not work here.' },
      { title: 'Focused on outcome', text: 'We measure our work in preserved assets, freedom and the reputation of our clients.' },
    ],
  },
  stats: {
    label: 'Expertise in numbers',
    items: [
      { value: 18, suffix: '', caption: 'years of practice' },
      { value: 340, prefix: '$', suffix: 'M', caption: 'in client assets preserved' },
      { value: 412, suffix: '', caption: 'cases concluded' },
      { value: 96, suffix: '%', caption: 'resolved without publicity' },
    ],
  },
  practices: {
    label: 'Practices',
    title: 'Specialisation honed over years',
    more: 'Learn more',
    items: [
      { title: 'Corporate disputes', text: 'Shareholder conflicts, challenging transactions, deadlocks and partner exits.' },
      { title: 'Arbitration', text: 'Representation before AIFC, SIAC, ICC and state courts in complex commercial disputes.' },
      { title: 'Tax disputes', text: 'Appealing audit results and additional assessments, defence against unfounded claims.' },
      { title: 'White-collar defence', text: 'Defence of owners and executives in economic crime cases at every stage.' },
      { title: 'Insolvency', text: 'Subsidiary liability, challenging creditor claims and protecting assets.' },
      { title: 'Dawn raid defence', text: 'Support during searches, seizures and interrogations. On-call advocate 24/7.' },
    ],
  },
  process: {
    label: 'How we work',
    title: 'From analysis to outcome',
    hint: 'Keep scrolling',
    steps: [
      { title: 'Analysis', text: 'A deep audit of documents, risks and positions. We find weaknesses before the opponent does.' },
      { title: 'Strategy', text: 'A multi-layered plan: procedural, negotiation and reputational.' },
      { title: 'Defence', text: 'We execute in court, investigation and negotiation — consistently and firmly.' },
      { title: 'Outcome', text: 'We secure the result: preserved assets, terminated prosecution, closed conflict.' },
    ],
  },
  cases: {
    label: 'Selected cases',
    title: 'Results that never make the news',
    note: 'Details are anonymised in line with attorney–client privilege.',
    items: [
      { tag: 'Insolvency', amount: '₸ 4.2B', title: 'Subsidiary liability overturned', text: 'A former director of a developer was held liable for the bankrupt’s debts. We proved the absence of causation and the good faith of his decisions.', outcome: 'Claims dismissed in full' },
      { tag: 'Corporate dispute', amount: '$ 27M', title: 'Assets protected from a hostile takeover', text: 'An attempt to replace management via forged shareholder resolutions. Interim measures obtained within 48 hours.', outcome: 'Control over the company retained' },
      { tag: 'Criminal defence', amount: '₸ 1.8B', title: 'Embezzlement case terminated', text: 'The owner of a distribution network was accused of embezzlement. An independent expert review refuted the prosecution.', outcome: 'Case closed for lack of offence' },
      { tag: 'Tax dispute', amount: '₸ 960M', title: 'Corporate tax assessment cancelled', text: 'We challenged a comprehensive audit of a manufacturer before the appeals commission and the court.', outcome: 'Assessment cancelled entirely' },
    ],
  },
  about: {
    label: 'The advocate',
    name: 'Kan Vitaly Lvovich',
    role: 'Managing partner',
    bio: 'For eighteen years he has defended business owners in Kazakhstan’s most complex corporate and criminal cases. He handles every matter personally — from the first meeting to the final ruling.',
    facts: ['Member of the Almaty City Bar', 'Arbitrator and counsel at the AIFC', 'LL.M., University of London', 'Recommended by leading legal directories'],
    quote: '“The best defence is the one your opponent learns about too late.”',
  },
  contact: {
    label: 'Confidential contact',
    title: 'Let’s discuss your situation',
    subtitle: 'We respond within an hour. Everything you share is protected by privilege.',
    name: 'Name',
    phone: 'Phone',
    message: 'Briefly describe the matter',
    consent: 'I consent to data processing. The information will not be disclosed.',
    submit: 'Send request',
    sending: 'Sending…',
    success: 'Request received. We will contact you within an hour.',
    error: 'Please check the fields and try again.',
    channels: 'Secure channels',
    direct: 'Direct line',
  },
  footer: {
    address: 'Nurly Tau BC, 19 Al-Farabi Ave, block 2B, Almaty',
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
    license: 'Licensed advocate',
  },
}

const kk: Dictionary = {
  nav: { practices: 'Тәжірибе', cases: 'Істер', principles: 'Қағидаттар', about: 'Адвокат', call: 'Байланыс', menu: 'Мәзір', close: 'Жабу' },
  hero: {
    eyebrow: 'Адвокаттық бюро · Алматы · 2008 жылдан',
    title: 'Бизнесіңізді мінсіз құқықтық қорғау',
    subtitle: 'Корпоративтік даулар, активтерді қорғау және экономикалық қылмыстық істер. Үнсіз, дәл және нәтижелі.',
    cta: 'Құпия кеңес сұрау',
    scroll: 'Төмен',
  },
  manifesto: {
    label: 'Манифест',
    statement: 'Біз оңай жеңіс уәде етпейміз. Басқалар тұйық көрген жерден шығар жол табамыз — артық шусыз.',
    items: [
      { title: 'Толық құпиялылық', text: 'Адвокаттық құпия, алғашқы байланыстан NDA, жабық арналар және шектеулі қол жеткізу.' },
      { title: 'Стандартты емес стратегия', text: 'Әр іс — қорғаудың жеке архитектурасы. Үлгі шешімдер мұнда жұмыс істемейді.' },
      { title: 'Нәтижеге бағыт', text: 'Жұмысымызды сақталған активтермен, бостандықпен және клиент беделімен өлшейміз.' },
    ],
  },
  stats: {
    label: 'Сарапшылық сандарда',
    items: [
      { value: 18, suffix: '', caption: 'жыл адвокаттық тәжірибе' },
      { value: 340, prefix: '$', suffix: ' млн', caption: 'клиент активтері сақталды' },
      { value: 412, suffix: '', caption: 'аяқталған іс' },
      { value: 96, suffix: '%', caption: 'іс жариялылықсыз шешілді' },
    ],
  },
  practices: {
    label: 'Тәжірибе',
    title: 'Жылдар бойы шыңдалған мамандану',
    more: 'Толығырақ',
    items: [
      { title: 'Корпоративтік даулар', text: 'Акционерлер қақтығысы, мәмілелерге дау айту, тұйық жағдайлар және қатысушылардың шығуы.' },
      { title: 'Арбитраж', text: 'АХҚО, SIAC, ICC және ҚР мемлекеттік соттарында күрделі коммерциялық дауларда өкілдік.' },
      { title: 'Салық даулары', text: 'Тексеру нәтижелері мен қосымша есептеулерге шағым жасау, негізсіз талаптардан қорғау.' },
      { title: 'Бизнесті қылмыстық қорғау', text: 'Меншік иелері мен басшыларды экономикалық істер бойынша барлық сатыда қорғау.' },
      { title: 'Банкроттық', text: 'Субсидиарлық жауапкершілік, кредиторлар талаптарына дау айту және активтерді қорғау.' },
      { title: 'Тексерулер кезінде қорғау', text: 'Тінту, алу және жауап алу кезінде сүйемелдеу. Кезекші адвокат 24/7.' },
    ],
  },
  process: {
    label: 'Істі жүргізу кезеңдері',
    title: 'Талдаудан — нәтижеге',
    hint: 'Әрі қарай айналдырыңыз',
    steps: [
      { title: 'Талдау', text: 'Құжаттарды, тәуекелдерді және тараптардың ұстанымын терең аудит. Әлсіз тұстарды қарсыласпен бұрын табамыз.' },
      { title: 'Стратегия', text: 'Көп деңгейлі жоспар: процестік, келіссөздік және беделдік.' },
      { title: 'Қорғау', text: 'Стратегияны сотта, тергеуде және келіссөзде жүйелі әрі қатаң іске асырамыз.' },
      { title: 'Нәтиже', text: 'Қорытындыны бекітеміз: сақталған активтер, тоқтатылған қудалау, жабылған дау.' },
    ],
  },
  cases: {
    label: 'Таңдаулы істер',
    title: 'Жаңалықтарда жазылмайтын нәтижелер',
    note: 'Деректер адвокаттық құпияға сәйкес анонимделген.',
    items: [
      { tag: 'Банкроттық', amount: '₸ 4,2 млрд', title: 'Субсидиарлық жауапкершіліктің күшін жою', text: 'Құрылыс компаниясының бұрынғы директоры банкрот борыштары бойынша жауапкершілікке тартылды. Себеп-салдарлық байланыстың жоқтығын дәлелдедік.', outcome: 'Талаптар толық қабылданбады' },
      { tag: 'Корпоративтік дау', amount: '$ 27 млн', title: 'Рейдерлік басып алудан активтерді қорғау', text: 'Жалған шешімдер арқылы атқарушы органды ауыстыру әрекеті. Қамтамасыз ету шаралары 48 сағатта алынды.', outcome: 'Компания бақылауы сақталды' },
      { tag: 'Қылмыстық қорғау', amount: '₸ 1,8 млрд', title: 'Иемденіп алу ісін тоқтату', text: 'Дистрибьюторлық желі иесіне иемденіп алу айыбы тағылды. Тәуелсіз сараптама айыптау тұжырымын жоққа шығарды.', outcome: 'Іс құрам болмағандықтан тоқтатылды' },
      { tag: 'Салық дауы', amount: '₸ 960 млн', title: 'КТС бойынша қосымша есептеудің күшін жою', text: 'Өндірістік компанияның кешенді тексеруін апелляциялық комиссия мен сотта даулады.', outcome: 'Хабарлама толық жойылды' },
    ],
  },
  about: {
    label: 'Адвокат туралы',
    name: 'Кан Виталий Львович',
    role: 'Басқарушы серіктес',
    bio: 'Он сегіз жыл бойы Қазақстандағы ең күрделі корпоративтік және қылмыстық істерде бизнес иелерін қорғап келеді. Әр істі алғашқы кездесуден соңғы шешімге дейін өзі жүргізеді.',
    facts: ['Алматы қалалық адвокаттар алқасының мүшесі', 'АХҚО төрешісі және өкілі', 'LL.M., University of London', 'Жетекші заң рейтингтерінде ұсынылған'],
    quote: '«Ең жақсы қорғаныс — қарсылас тым кеш білетін қорғаныс».',
  },
  contact: {
    label: 'Құпия байланыс',
    title: 'Жағдайыңызды талқылайық',
    subtitle: 'Бір сағат ішінде жауап береміз. Айтқаныңыздың бәрі адвокаттық құпиямен қорғалады.',
    name: 'Аты',
    phone: 'Телефон',
    message: 'Мәселенің мәнін қысқаша сипаттаңыз',
    consent: 'Деректерді өңдеуге келісемін. Ақпарат жария етілмейді.',
    submit: 'Сұрау жіберу',
    sending: 'Жіберілуде…',
    success: 'Сұрау қабылданды. Бір сағат ішінде хабарласамыз.',
    error: 'Өрістердің дұрыс толтырылғанын тексеріңіз.',
    channels: 'Қорғалған арналар',
    direct: 'Тікелей желі',
  },
  footer: {
    address: '«Нұрлы Тау» БО, Әл-Фараби даңғ., 19, 2Б блок, Алматы',
    rights: 'Барлық құқықтар қорғалған.',
    privacy: 'Құпиялылық саясаты',
    license: 'Адвокаттық қызметке лицензия',
  },
}

export const dictionaries: Record<Locale, Dictionary> = { ru, en, kk }
