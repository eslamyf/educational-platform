import type { Course, Lesson, Module, Review, CartItem, ProgressCourse } from '@/types';
export type { Course, Lesson, Module, Review, CartItem, ProgressCourse };

const image = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const courses: Course[] = [
  {
    id: 'creative-strategy',
    title: 'استراتيجية المحتوى: من الفكرة إلى أثر يُقاس',
    shortTitle: 'استراتيجية المحتوى',
    description: 'ابنِ نظام محتوى واضحًا يعبّر عن علامتك، يصل إلى جمهورك، ويحوّل الاهتمام إلى أثر حقيقي.',
    category: 'تسويق وصناعة محتوى',
    level: 'متوسط',
    price: 790,
    oldPrice: 1290,
    rating: 4.9,
    students: 2380,
    lessons: 32,
    duration: '٦ ساعات و٤٠ دقيقة',
    accent: 'coral',
    image: '/manus-storage/nawa-course-hero_886d0515.jpg',
    instructor: 'صاحب نَوَى',
    instructorRole: 'المدرس ومؤسس نَوَى',
    instructorAvatar: '/manus-storage/nawa-founder-hero_283408a2.png',
    tags: ['تسويق', 'إبداع', 'استراتيجية'],
    outcomes: ['تكتب استراتيجية محتوى قابلة للتنفيذ خلال 30 يومًا', 'تحدد صوت العلامة وتبني أعمدة محتوى متماسكة', 'تقيس ما يستحق التكرار وما يحتاج إلى تغيير', 'تحوّل الأفكار المبعثرة إلى نظام عمل أسبوعي'],
    requirements: ['لا تحتاج إلى خبرة سابقة في التسويق', 'دفتر ملاحظات أو مساحة عمل رقمية', 'الرغبة في التجربة والكتابة خلال التمارين'],
    audience: ['صنّاع المحتوى وأصحاب المشاريع', 'فرق التسويق الصغيرة', 'المستقلون الذين يريدون حضورًا أوضح'],
    modules: [
      { title: 'البوصلة: ما الذي نريد أن نغيّره؟', count: 6, duration: '١ ساعة و١٠ دقائق', lessons: [{ title: 'كيف نرى المشكلة قبل أن نصنع المحتوى؟', duration: '12:40', free: true }, { title: 'خارطة الجمهور: من التخمين إلى الفهم', duration: '18:20', free: true }, { title: 'تحديد الوعد التحريري للعلامة', duration: '22:10' }, { title: 'تمرين: جملة واحدة تكفي', duration: '10:00' }] },
      { title: 'نظام الأفكار: من الإلهام إلى خط إنتاج', count: 8, duration: '١ ساعة و٤٥ دقيقة', lessons: [{ title: 'ثلاث طبقات للفكرة القوية', duration: '15:20' }, { title: 'مصفوفة الزوايا التحريرية', duration: '19:10' }, { title: 'كيف نكتب Hook لا يُنسى؟', duration: '21:40' }, { title: 'جلسة تطبيق كاملة', duration: '34:00' }] },
      { title: 'الصياغة والنشر: إيقاع يمكن الحفاظ عليه', count: 9, duration: 'ساعتان و٥ دقائق', lessons: [{ title: 'قالب المنشور الذي لا يبدو كقالب', duration: '18:30' }, { title: 'اختيار المنصة والوقت', duration: '16:20' }, { title: 'المراجعة بدون قتل الفكرة', duration: '20:00' }] },
      { title: 'القياس: تعلّم من الأرقام بهدوء', count: 9, duration: 'ساعة و٤٠ دقيقة', lessons: [{ title: 'ما الذي نقيسه فعلًا؟', duration: '14:00' }, { title: 'قراءة التفاعل كإشارة لا كحكم', duration: '20:10' }, { title: 'خطة التحسين الشهرية', duration: '24:30' }] },
    ],
    reviews: [
      { name: 'نورهان مصطفى', role: 'مؤسسة مشروع صغير', rating: 5, text: 'أخيرًا كورس لا يعطيني عشرات القوالب وينتهي. خرجت بنظام أقدر أرجع له كل أسبوع، وهذا بالضبط ما كنت أحتاجه.', avatar: image('photo-1531123897727-8f129e1688ce', 100) },
      { name: 'عبد الرحمن عادل', role: 'كاتب محتوى', rating: 5, text: 'الشرح هادئ وعملي. أحببت أن كل فكرة لها تمرين يجعلها تخصني أنا، وليس نسخة من مثال جاهز.', avatar: image('photo-1507003211169-0a1dd7228f2d', 100) },
    ],
  },
  {
    id: 'product-design',
    title: 'أساسيات تصميم المنتجات الرقمية',
    shortTitle: 'تصميم المنتجات',
    description: 'تعلّم كيف تحوّل احتياجًا إنسانيًا إلى تجربة رقمية واضحة، من البحث إلى أول نموذج تفاعلي.',
    category: 'تصميم وتجربة مستخدم',
    level: 'مبتدئ',
    price: 640,
    oldPrice: 960,
    rating: 4.8,
    students: 1740,
    lessons: 26,
    duration: '٥ ساعات و٢٠ دقيقة',
    accent: 'olive',
    image: image('photo-1558655146-d09347e92766'),
    instructor: 'صاحب نَوَى',
    instructorRole: 'المدرس ومؤسس نَوَى',
    instructorAvatar: '/manus-storage/nawa-founder-hero_283408a2.png',
    tags: ['UX', 'Figma', 'منتجات'],
    outcomes: ['تكتشف المشكلة قبل أن ترسم الشاشة', 'ترسم تدفقات واضحة وتختبرها بسرعة', 'تستخدم Figma لبناء نموذج قابل للمشاركة'],
    requirements: ['Figma مثبت أو حساب مجاني', 'فضول تجاه سلوك الناس مع المنتجات'],
    audience: ['المصممون في بداية الطريق', 'المطورون الذين يريدون التفكير كـ Product Designer', 'أصحاب الأفكار الرقمية'],
    modules: [{ title: 'فهم المستخدم', count: 6, duration: 'ساعة و٢٠ دقيقة', lessons: [{ title: 'التصميم ليس تزيينًا', duration: '14:20', free: true }, { title: 'أسئلة البحث الجيدة', duration: '18:00' }] }, { title: 'من الفكرة إلى التدفق', count: 8, duration: 'ساعة و٤٥ دقيقة', lessons: [{ title: 'رسم المسار الأساسي', duration: '20:40' }, { title: 'حالات الحافة', duration: '16:10' }] }, { title: 'النموذج والاختبار', count: 12, duration: 'ساعتان و١٥ دقيقة', lessons: [{ title: 'أول Prototype في Figma', duration: '22:00' }, { title: 'جلسة اختبار حقيقية', duration: '31:00' }] }],
    reviews: [{ name: 'سلمى يحيى', role: 'مطور واجهات', rating: 5, text: 'غيّر طريقة قراءتي لأي شاشة. صرت أسأل لماذا قبل أن أسأل كيف.', avatar: image('photo-1544005313-94ddf0286df2', 100) }],
  },
  {
    id: 'freelance-system',
    title: 'نظام العمل الحر الهادئ',
    shortTitle: 'العمل الحر',
    description: 'ابنِ طريقة عمل تحمي وقتك، ترفع قيمة شغلك، وتساعدك على اختيار المشاريع المناسبة.',
    category: 'عمل ومهارات',
    level: 'متوسط',
    price: 520,
    oldPrice: 780,
    rating: 4.7,
    students: 920,
    lessons: 19,
    duration: '٣ ساعات و٤٥ دقيقة',
    accent: 'sand',
    image: image('photo-1497366754035-f200968a6e72'),
    instructor: 'صاحب نَوَى',
    instructorRole: 'المدرس ومؤسس نَوَى',
    instructorAvatar: '/manus-storage/nawa-founder-hero_283408a2.png',
    tags: ['فريلانس', 'إنتاجية', 'تسعير'],
    outcomes: ['تسعّر خدماتك على أساس القيمة', 'تصمم نظام استقبال وتسليم واضح', 'تقول لا للمشروع الخطأ دون توتر'],
    requirements: ['خدمة أو مهارة تريد بيعها', 'مشروع واحد على الأقل للتطبيق'],
    audience: ['المستقلون الجدد', 'المبدعون الذين يعملون بشكل متقطع', 'من يريد العودة للعمل الحر بطريقة أنضج'],
    modules: [{ title: 'اختيار العمل المناسب', count: 5, duration: 'ساعة', lessons: [{ title: 'المشروع المناسب لك', duration: '13:30', free: true }] }, { title: 'التسعير والتفاوض', count: 7, duration: 'ساعة و٢٥ دقيقة', lessons: [{ title: 'السعر ليس رقمًا فقط', duration: '19:00' }] }, { title: 'نظام التسليم', count: 7, duration: 'ساعة و٢٠ دقيقة', lessons: [{ title: 'من الرسالة الأولى إلى آخر Feedback', duration: '22:30' }] }],
    reviews: [{ name: 'مريم عاطف', role: 'مصممة مستقلة', rating: 5, text: 'أعطاني لغة أشرح بها شغلي، وحدودًا أستطيع احترامها. عملي صار أهدأ فعلًا.', avatar: image('photo-1488426862026-3ee34a7d66df', 100) }],
  },

  {
    id: 'prep3-arabic', title: 'اللغة العربية — الصف الثالث الإعدادي', shortTitle: 'عربي تالتة إعدادي', description: 'مراجعة مركزة للنحو والقراءة والنصوص والتعبير مع نماذج امتحانات على طريقة الوزارة.', category: 'مواد إعدادية', level: 'مبتدئ', price: 260, oldPrice: 360, rating: 4.9, students: 3240, lessons: 28, duration: '٤ ساعات و١٠ دقائق', accent: 'coral', image: image('photo-1455390582262-044cdead277a'), instructor: 'صاحب نَوَى', instructorRole: 'المدرس ومؤسس نَوَى', instructorAvatar: '/manus-storage/nawa-founder-hero_283408a2.png', tags: ['الصف الثالث الإعدادي', 'لغة عربية', 'إعدادي'], outcomes: ['تراجع أهم قواعد النحو في أسئلة قصيرة', 'تقرأ النصوص وتستخرج الفكرة والصور الجمالية', 'تتدرب على نماذج امتحان كاملة'], requirements: ['كتاب المدرسة', 'دفتر ملاحظات'], audience: ['طلاب الصف الثالث الإعدادي', 'من يريد مراجعة عربية منظمة'], modules: [{ title: 'النحو من الأساس إلى السؤال', count: 8, duration: 'ساعة و١٥ دقيقة', lessons: [{ title: 'المعرب والمبني', duration: '18:00', free: true }, { title: 'أسلوب الشرط', duration: '22:00' }] }, { title: 'القراءة والنصوص', count: 10, duration: 'ساعة و٣٥ دقيقة', lessons: [{ title: 'الفكرة الرئيسية والتفاصيل', duration: '19:30' }, { title: 'الجماليات في النص', duration: '17:00' }] }, { title: 'نماذج امتحانات', count: 10, duration: 'ساعة و٢٠ دقيقة', lessons: [{ title: 'نموذج شامل ١', duration: '35:00' }] }], reviews: [{ name: 'ملك محمود', role: 'طالبة تالتة إعدادي', rating: 5, text: 'المراجعة قسمت العربي لأجزاء صغيرة وخلتني أعرف أبدأ منين.', avatar: image('photo-1494790108377-be9c29b29330', 100) }]
  },
  {
    id: 'secondary-biology', title: 'الأحياء — الصف الثالث الثانوي علمي علوم', shortTitle: 'أحياء تالتة ثانوي', description: 'شرح ومراجعة أجهزة الجسم والوراثة والتطور مع أسئلة تطبيقية وتدريب على نمط الامتحان.', category: 'ثانوية عامة', level: 'متقدم', price: 490, oldPrice: 690, rating: 4.9, students: 2680, lessons: 36, duration: '٧ ساعات و٣٠ دقيقة', accent: 'olive', image: image('photo-1530026405186-ed1f139313f8'), instructor: 'صاحب نَوَى', instructorRole: 'المدرس ومؤسس نَوَى', instructorAvatar: '/manus-storage/nawa-founder-hero_283408a2.png', tags: ['الصف الثالث الثانوي', 'علمي علوم', 'أحياء'], outcomes: ['تفهم تركيب ووظيفة أجهزة الجسم', 'تربط بين الوراثة والتطبيقات الحيوية', 'تحل أسئلة اختيار من متعدد بذكاء'], requirements: ['مراجعة أساسيات الخلية', 'كتاب الوزارة أو مجلد المفاهيم'], audience: ['طلاب علمي علوم', 'المقبلون على كليات الطب وعلوم الحياة'], modules: [{ title: 'الدعامة والحركة', count: 9, duration: 'ساعة و٤٥ دقيقة', lessons: [{ title: 'الحركة في الكائنات الحية', duration: '20:00', free: true }, { title: 'الجهاز الهيكلي', duration: '24:00' }] }, { title: 'التنسيق الهرموني والعصبي', count: 12, duration: 'ساعتان و٢٠ دقيقة', lessons: [{ title: 'الغدد والهرمونات', duration: '27:00' }] }, { title: 'الوراثة والتطور', count: 15, duration: '٣ ساعات', lessons: [{ title: 'قوانين مندل', duration: '25:00' }] }], reviews: [{ name: 'يوسف أحمد', role: 'طالب علمي علوم', rating: 5, text: 'الرسومات والأسئلة خلت الأحياء مترابطة بدل ما تكون حفظ بس.', avatar: image('photo-1500648767791-00dcc994a43e', 100) }]
  },
  {
    id: 'secondary-math', title: 'الرياضيات — الصف الثاني الثانوي علمي رياضة', shortTitle: 'رياضة تانية ثانوي', description: 'تفاضل وحساب مثلثات ودوال بطريقة خطوة بخطوة، مع تدريب متدرج من الفكرة إلى المسألة.', category: 'ثانوية عامة', level: 'متوسط', price: 430, oldPrice: 620, rating: 4.8, students: 1910, lessons: 30, duration: '٦ ساعات و٢٠ دقيقة', accent: 'sand', image: image('photo-1509228468518-180dd4864904'), instructor: 'صاحب نَوَى', instructorRole: 'المدرس ومؤسس نَوَى', instructorAvatar: '/manus-storage/nawa-founder-hero_283408a2.png', tags: ['الصف الثاني الثانوي', 'علمي رياضة', 'رياضيات'], outcomes: ['تفهم الدوال وتقرأ تمثيلها البياني', 'تستخدم قواعد التفاضل في مسائل متنوعة', 'تراجع بنظام يحاكي ورقة الامتحان'], requirements: ['أساسيات الجبر', 'آلة حاسبة علمية اختيارية'], audience: ['طلاب علمي رياضة', 'من يريد تثبيت أساسيات الرياضيات'], modules: [{ title: 'الدوال والتمثيل البياني', count: 10, duration: 'ساعتان', lessons: [{ title: 'الدالة وتركيبها', duration: '21:00', free: true }, { title: 'التحويلات البيانية', duration: '24:00' }] }, { title: 'التفاضل وتطبيقاته', count: 12, duration: 'ساعتان و٣٠ دقيقة', lessons: [{ title: 'مفهوم المشتقة', duration: '28:00' }] }, { title: 'تدريب امتحاني', count: 8, duration: 'ساعة و٥٠ دقيقة', lessons: [{ title: 'نموذج متدرج ١', duration: '32:00' }] }], reviews: [{ name: 'عمر خالد', role: 'طالب تانية ثانوي', rating: 5, text: 'كل مسألة لها مدخل واضح، وده فرق معايا جدًا في المراجعة.', avatar: image('photo-1507003211169-0a1dd7228f2d', 100) }]
  },
  {
    id: 'secondary-arabic', title: 'اللغة العربية — الصف الأول الثانوي', shortTitle: 'عربي أولى ثانوي', description: 'فهم النصوص والنحو والبلاغة والتعبير في مسار واحد يساعدك على بناء إجابة قوية.', category: 'ثانوية عامة', level: 'مبتدئ', price: 320, oldPrice: 460, rating: 4.8, students: 2150, lessons: 24, duration: '٤ ساعات و٤٥ دقيقة', accent: 'coral', image: image('photo-1516979187457-637abb4f9353'), instructor: 'صاحب نَوَى', instructorRole: 'المدرس ومؤسس نَوَى', instructorAvatar: '/manus-storage/nawa-founder-hero_283408a2.png', tags: ['الصف الأول الثانوي', 'لغة عربية', 'ثانوي عام'], outcomes: ['تبني إجابة منظمة في التعبير', 'تفهم البلاغة داخل النص', 'تطبق النحو على أسئلة الامتحان'], requirements: ['كتاب اللغة العربية', 'وقت ثابت للمراجعة'], audience: ['طلاب أولى ثانوي', 'من يريد بداية قوية في الثانوي'], modules: [{ title: 'النصوص والقراءة', count: 8, duration: 'ساعة و٣٠ دقيقة', lessons: [{ title: 'كيف تقرأ النص؟', duration: '18:00', free: true }] }, { title: 'النحو والبلاغة', count: 10, duration: 'ساعتان', lessons: [{ title: 'الجملة الاسمية والفعلية', duration: '22:00' }] }, { title: 'التعبير والتدريب', count: 6, duration: 'ساعة و١٥ دقيقة', lessons: [{ title: 'اكتب إجابة مقنعة', duration: '20:00' }] }], reviews: [{ name: 'جنى مصطفى', role: 'طالبة أولى ثانوي', rating: 5, text: 'بقيت أعرف أرتب الإجابة وأفهم المطلوب من السؤال.', avatar: image('photo-1544005313-94ddf0286df2', 100) }]
  },
];

export const categories = ['كل المسارات', 'تصميم وتجربة مستخدم', 'تسويق وصناعة محتوى', 'عمل ومهارات', 'برمجة وبيانات', 'مواد إعدادية', 'ثانوية عامة'];
export const gradeChips = ['كل الصفوف', 'الصف الثالث الإعدادي', 'الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي'];
export const subjectChips = ['كل المواد', 'لغة عربية', 'رياضيات', 'أحياء', 'تصميم', 'تسويق', 'عمل حر'];

export const egyptEducationOptions = {
  stages: ['المرحلة الإعدادية', 'الثانوي العام', 'الثانوي الأزهري', 'التعليم الفني'],
  grades: ['الصف الأول الإعدادي', 'الصف الثاني الإعدادي', 'الصف الثالث الإعدادي', 'الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي'],
  years: ['2025 / 2026', '2026 / 2027', '2027 / 2028'],
  tracks: ['إعدادي عام', 'ثانوي عام — علمي علوم', 'ثانوي عام — علمي رياضة', 'ثانوي عام — أدبي', 'بكالوريا مصرية — الطب وعلوم الحياة', 'بكالوريا مصرية — الهندسة وعلوم الحاسب', 'بكالوريا مصرية — الأعمال', 'بكالوريا مصرية — الآداب والفنون'],
  governorates: ['القاهرة', 'الجيزة', 'الإسكندرية', 'القليوبية', 'الدقهلية', 'البحر الأحمر', 'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'الوادي الجديد', 'أسوان', 'أسيوط', 'الأقصر', 'بورسعيد', 'دمياط', 'سوهاج', 'شمال سيناء', 'جنوب سيناء', 'السويس', 'الشرقية', 'كفر الشيخ', 'مطروح', 'قنا', 'بني سويف'],
};

export const formatPrice = (price: number) => `${price.toLocaleString('ar-EG')} ج.م`;

export const featuredCourse = courses[0];
export const founderHeroImage = '/manus-storage/nawa-founder-hero_283408a2.png';

export const navItems = [
  { label: 'الرئيسية', href: '/' },
  { label: 'كل الكورسات', href: '/courses' },
  { label: 'كيف تعمل نَوَى؟', href: '/how-it-works' },
];

export const inspirationLinks = [
  { name: 'Awwwards', url: 'https://www.awwwards.com/' },
  { name: 'Dribbble', url: 'https://dribbble.com/' },
  { name: 'Behance', url: 'https://www.behance.net/' },
  { name: 'Codrops', url: 'https://tympanus.net/codrops/' },
];

export const referenceNotes = [
  'استفدنا من وضوح التسلسل، إبراز قيمة المدرّس، ووضوح السعر من تجارب منصات التعليم العربية دون نسخ هويتها.',
  'صممنا المنهج كرحلة قصيرة قابلة للاستكشاف، لا كقائمة طويلة منسدلة فقط.',
  'استخدمنا لغة عربية قريبة، ومساحات تنفّس، ومؤشرات ثقة قبل قرار الشراء.',
];

export const initialCart: CartItem[] = [
  { ...featuredCourse, quantity: 1 },
];

export const getCourse = (id: string) => courses.find((course) => course.id === id) ?? featuredCourse;

export const discount = (course: Course) => Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100);

export const totalCart = (items: CartItem[]) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const totalOldCart = (items: CartItem[]) => items.reduce((sum, item) => sum + item.oldPrice * item.quantity, 0);

export const imageCredits = 'الصور في النسخة الأولية من Unsplash، ويمكن استبدالها بصور المنتج النهائية عبر مسار تخزين WebDev.';

export const generatedAssetPlaceholder = '/manus-storage/nawa-course-hero_886d0515.jpg';

export const copy = {
  brand: 'نَوَى',
  tagline: 'تعلّمٌ يشبهك.',
  description: 'مسارات مركّزة، مدرّسون يعرفون الطريق، وتجربة تجعل التعلّم جزءًا من يومك لا مهمة إضافية.',
};

export const testimonials = [
  { quote: 'كل شيء في نَوَى يقول: خذ وقتك، لكن لا تتوقف.', name: 'رانيا سامح', detail: 'تعلّمت تصميم المنتجات' },
  { quote: 'لأول مرة أشعر أن الكورس مصمم حول الرحلة، وليس حول عدد الفيديوهات.', name: 'مازن علي', detail: 'تعلّم استراتيجية المحتوى' },
];

export const stats = [
  { value: '١٢.٤ ألف', label: 'متعلّم بدأ مساره' },
  { value: '٩٨٪', label: 'أكملوا أول وحدة' },
  { value: '٤.٨/٥', label: 'متوسط التقييم' },
];

export const badges = ['إيقاع تعلّم مرن', 'مشاهدة مدى الحياة', 'تمارين قابلة للتطبيق'];

export const footerColumns = [
  { title: 'استكشف', links: ['كل الكورسات', 'المسارات الجديدة', 'الأكثر مشاهدة'] },
  { title: 'نَوَى', links: ['عن المنصة', 'للشركات', 'تواصل معنا'] },
  { title: 'مساعدة', links: ['الأسئلة الشائعة', 'سياسة الاسترجاع', 'الدعم'] },
];

export const faq = [
  { q: 'هل أستطيع مشاهدة الكورس على الهاتف؟', a: 'نعم، صُممت تجربة نَوَى لتعمل بسلاسة على الهاتف والكمبيوتر، ويمكنك العودة للدروس في أي وقت.' },
  { q: 'هل الوصول للكورس مدى الحياة؟', a: 'نعم، بمجرد إتمام الشراء يصبح الكورس متاحًا لك مدى الحياة مع التحديثات القادمة.' },
  { q: 'هل أحصل على شهادة؟', a: 'تحصل على شهادة إتمام رقمية عند إنهاء جميع وحدات المسار.' },
];

export const formatMinutes = (duration: string) => duration;

export const courseImageFallback = image('photo-1516321318423-f06f85e504b3');

export const curriculumTotal = (course: Course) => course.modules.reduce((sum, module) => sum + module.count, 0);

export const reviewCount = (course: Course) => Math.round(course.students * 0.22);

export const defaultSearch = '';

export const socialProof = ['متعلّمون من القاهرة', 'الإسكندرية', 'عمّان', 'الرياض', 'دبي'];

export const deliveryNote = 'اشترِ مرة، وارجع للتعلّم وقت ما يناسبك.';

export const supportLine = 'محتاج تسأل؟ فريقنا يرد عليك خلال يوم عمل.';

export const checkoutSteps = ['السلة', 'بياناتك', 'التأكيد'];

export const paymentMethods = ['بطاقة بنكية', 'محفظة إلكترونية', 'فوري'];


export const searchPlaceholder = 'ابحث عن مهارة أو موضوع...';

export const heroEyebrow = 'مختارات نَوَى · ربيع ٢٠٢٥';

export const footerTagline = 'نفتح لك بابًا، ثم نمشي معك قليلًا.';

export const footerCopyright = '© ٢٠٢٥ نَوَى. صُممت بعناية للمتعلّمين العرب.';

export const courseCountLabel = 'مسارات مركّزة، لا مكتبة لا تنتهي.';

export const courseDetailNote = 'صمّمنا كل تفصيلة لتعرف إن كان هذا المسار مناسبًا لك، قبل أن تضغط شراء.';

export const promoCode = 'NAWA10';

export const promoDiscount = 10;

export const paidAccess = 'وصول مدى الحياة';

export const secureCheckout = 'دفع آمن ومشفّر';

export const studentCountLabel = (students: number) => `${students.toLocaleString('ar-EG')} متعلّم`;

export const lessonCountLabel = (lessons: number) => `${lessons.toLocaleString('ar-EG')} درس`;

export const categoryLabel = (category: string) => category;

export const isFreeLesson = (lesson: Lesson) => Boolean(lesson.free);

export const getDiscountLabel = (course: Course) => `خصم ${discount(course)}٪`;

export const getPriceLabel = (course: Course) => formatPrice(course.price);

export const getOldPriceLabel = (course: Course) => formatPrice(course.oldPrice);

export const getRatingLabel = (course: Course) => course.rating.toLocaleString('ar-EG');

export const getReviewLabel = (course: Course) => `${reviewCount(course).toLocaleString('ar-EG')} تقييم`;

export const getModuleLabel = (module: Module) => `${module.count.toLocaleString('ar-EG')} دروس`;

export const getLessonLabel = (lesson: Lesson) => lesson.duration;

export const getInstructorLabel = (course: Course) => `${course.instructor} · ${course.instructorRole}`;

export const getCategoryColor = (accent: Course['accent']) => ({ coral: '#c8694a', olive: '#687458', sand: '#9b785d' }[accent] ?? '#c8694a');

export const getAccentClass = (accent: Course['accent']) => `accent-${accent}`;

export const getCourseRoute = (id: string) => `/course/${id}`;

export const buildCartItem = (course: Course): CartItem => ({ ...course, quantity: 1 });

export const emptyCartMessage = 'لم تضف أي مسار بعد. ابدأ بما يناسب فضولك اليوم.';

export const checkoutNote = 'هذه تجربة واجهة فقط — لا يتم تحصيل مدفوعات حقيقية.';

export const statusLabels = { free: 'مفتوح', locked: 'مقفول' };

export const pageTitles = { home: 'الرئيسية', courses: 'كل الكورسات', cart: 'السلة', checkout: 'الدفع' };

export const firstLesson = (course: Course) => course.modules[0].lessons[0];

export const nextCourse = (course: Course) => courses.find((item) => item.id !== course.id) ?? featuredCourse;

export const relatedCourses = (course: Course) => courses.filter((item) => item.id !== course.id).slice(0, 2);

export const isCurrentRoute = (path: string, href: string) => path === href || (href !== '/' && path.startsWith(href));

export const getCurrentYear = () => '٢٠٢٥';

export const faqIntro = 'إجابات قصيرة لأسئلة قبل البداية.';

export const accessBadge = 'مفتوح مدى الحياة';

export const featuredLabel = 'المسار المميز';

export const viewAllLabel = 'شوف كل المسارات';

export const cartLabel = 'السلة';

export const addToCartLabel = 'أضف للسلة';

export const buyNowLabel = 'ابدأ المسار';

export const courseCta = 'شاهد التفاصيل';

export const continueLabel = 'متابعة الدفع';

export const emptySearch = 'جرّب كلمة أخرى أو تصفح المسارات المقترحة.';

export const footerNote = 'واجهة تجريبية قابلة للتوسّع ببيانات حقيقية وعمليات دفع مستقبلًا.';


export const menuAria = 'فتح القائمة';

export const cartAria = 'فتح السلة';

export const searchAria = 'فتح البحث';

export const closeAria = 'إغلاق';

export const nextAria = 'التالي';

export const previousAria = 'السابق';

export const playAria = 'تشغيل المعاينة';

export const expandAria = 'فتح الوحدة';

export const collapseAria = 'إغلاق الوحدة';

export const heroImageAlt = 'مساحة عمل دافئة للتعلم وصناعة الأفكار';

export const avatarAlt = 'صورة المدرب';

export const courseThumbnailAlt = 'صورة توضيحية للكورس';

export const logoMark = 'ن';

export const logoWord = 'نَوَى';

export const logoSub = 'تعلمٌ يشبهك';

export const numericLocale = 'ar-EG';

export const currency = 'ج.م';

export const refNote = 'ملاحظة بحثية: استُخدمت المنصات العربية المذكورة كمراجع لفهم الأنماط لا كمصادر لنسخ التصميم.';

export const scrollRevealClass = 'reveal';

export const reducedMotionNote = 'تحترم الواجهة إعداد تقليل الحركة في النظام.';

export const designTone = 'Warm editorial learning';

export const colorPalette = { ink: '#252622', paper: '#f7f3ed', mist: '#ebe6dd', coral: '#d86e4d', olive: '#6c775d', clay: '#bd9474', line: '#ded7cc' };

export const typography = { display: 'Noto Kufi Arabic', body: 'IBM Plex Sans Arabic', latin: 'DM Sans' };

export const iconSet = 'Lucide React';

export const inspirationSummary = 'Awwwards للاتزان البصري، Dribbble للتفاصيل الصغيرة، Behance للأنظمة البصرية، Codrops للحركة الهادئة.';

export const assetSummary = 'Unsplash في النسخة الأولية، مع أصلين بصريين مولدين مخصصين لمساحات البطل والبطاقة الرئيسية.';

export const appDescription = 'واجهة منصة تعليمية عربية حديثة RTL، تتمحور حول تفاصيل الكورس ورحلة التعلّم.';

export const courseDetailSections = ['عن المسار', 'المنهج', 'التقييمات', 'أسئلة شائعة'];

export const stickyPurchaseTitle = 'جاهز تبدأ؟';

export const stickyPurchaseSubtitle = 'وقت مناسب تضيف فيه مهارة جديدة ليومك.';

export const trustPoints = ['وصول مدى الحياة', 'مشاهدة على كل أجهزتك', 'تمارين وملفات عمل'];

export const routeFallback = '/';

export const appName = 'نَوَى';

export const appVersion = '0.1.0';

export const noResultsLabel = 'لا توجد نتائج الآن';

export const loadingLabel = 'لحظة ونجهز لك المسارات';

export const successMessage = 'تمت الإضافة للسلة';

export const checkoutSuccessMessage = 'تم حفظ طلبك التجريبي — نراك داخل المسار قريبًا.';

export const navCta = 'ابدأ التعلّم';

export const sectionKicker = 'اختيارات نَوَى';

export const sectionTitle = 'مسارات تصنع فرقًا';

export const sectionSubtitle = 'تعلّم واضح، قصير، وقابل للتطبيق — بدون ضوضاء.';

export const homeHowTitle = 'فكرة بسيطة: نبدأ من فضولك';

export const homeHowBody = 'اختَر مسارًا واضحًا، خذ درسًا واحدًا اليوم، ثم دع الأثر يتراكم. نَوَى لا تطلب منك أن تغيّر حياتك في عطلة نهاية الأسبوع.';

export const howSteps = [{ number: '٠١', title: 'اختَر سؤالك', text: 'ابدأ من شيء تريد فهمه أو إنجازه، لا من قائمة طويلة.' }, { number: '٠٢', title: 'تعلّم على إيقاعك', text: 'دروس قصيرة، وحدات مرتبة، وحرية العودة في أي وقت.' }, { number: '٠٣', title: 'طبّق وشارك', text: 'التمارين تحول المشاهدة إلى مهارة تترك أثرًا.' }];

export const homeQuote = 'التعلّم لا يحتاج مساحة أكبر في يومك؛ يحتاج مساحة أوضح.';

export const homeQuoteBy = 'فلسفة نَوَى';

export const homePromise = 'أقل ضوضاء. أكثر وضوحًا. أثر يبقى.';

export const homeCta = 'استكشف المسارات';

export const homeSecondaryCta = 'كيف تعمل نَوَى؟';

export const homeFooterCta = 'جاهز تفتح بابًا جديدًا؟';

export const cartEmptyTitle = 'سلتك خفيفة الآن';

export const cartEmptyBody = 'أضف مسارًا، وخليه بجانبك لوقت تكون فيه مستعدًا.';

export const checkoutTitle = 'خطوة صغيرة نحو بداية جديدة';

export const checkoutBody = 'بيانات بسيطة، ثم تعود مباشرة إلى المسار الذي اخترته.';

export const checkoutDemo = 'تجربة دفع توضيحية';

export const cartSummaryTitle = 'ملخص السلة';

export const subtotalLabel = 'الإجمالي قبل الخصم';

export const savingsLabel = 'وفّرت';

export const totalLabel = 'الإجمالي';

export const noFeesLabel = 'لا توجد رسوم إضافية';

export const couponLabel = 'لديك كوبون؟';

export const couponPlaceholder = 'اكتب الكود هنا';

export const applyLabel = 'تطبيق';

export const secureLabel = 'بياناتك في أمان';

export const secureBody = 'تجربة واجهة آمنة مصممة لتتصل بمزود الدفع لاحقًا.';

export const defaultForm = { name: '', email: '', phone: '' };

export const fieldLabels = { name: 'الاسم بالكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف' };

export const fieldPlaceholders = { name: 'مثال: سارة أحمد', email: 'you@example.com', phone: '01X XXX XXXX' };

export const formRequired = 'مطلوب';

export const submitOrderLabel = 'تأكيد الطلب التجريبي';

export const backToCartLabel = 'العودة للسلة';

export const orderSuccessTitle = 'أهلًا بك في نَوَى';

export const orderSuccessBody = 'تم حفظ الخطوة التجريبية. في النسخة الكاملة ستنتقل مباشرة إلى مساحة التعلّم الخاصة بك.';

export const startLearningLabel = 'ابدأ التعلّم الآن';

export const continueBrowsingLabel = 'العودة للتصفح';

export const mobileNavLabel = 'التنقل';

export const desktopNavLabel = 'التنقل الرئيسي';

export const closeMenuLabel = 'إغلاق القائمة';

export const focusLabel = 'تعلّم';

export const keyboardHint = 'اضغط Enter للتفاصيل';

export const pageFade = 'page-fade';

export const cardHover = 'card-hover';

export const primaryButton = 'btn-primary';

export const secondaryButton = 'btn-secondary';

export const mutedButton = 'btn-muted';

export const bodyClass = 'site-body';

export const highlightClass = 'highlight-word';

export const rtl = 'rtl';

export const versionLabel = 'نسخة العرض';

export const demoLabel = 'بيانات تجريبية';

export const researchDisclaimer = 'هذا النموذج يستلهم أنماطًا شائعة في تجارب التعليم العربية، لكنه يقدّم هوية بصرية وتدفقًا خاصًا به.';

export const primaryImageAlt = 'صورة افتتاحية لمسار استراتيجية المحتوى';

export const fallbackAvatar = image('photo-1494790108377-be9c29b29330', 180);

export const defaultCourse = featuredCourse;

export const currentRoute = '/';

export const productName = 'نَوَى';

export const productTagline = 'تعلّمٌ يشبهك.';

export const seoTitle = 'نَوَى — منصة تعلّم عربية حديثة';

export const seoDescription = appDescription;

export const designReferenceNote = 'المرجع البصري: تحريرية عربية مع حركة subtle، لا Udemy ولا SaaS.';

export const footerLinks = ['الشروط', 'الخصوصية', 'الاسترجاع'];

export const breadcrumbHome = 'الرئيسية';

export const breadcrumbCourses = 'الكورسات';

export const breadcrumbCourse = 'تفاصيل الكورس';

export const preheader = 'خصم الربيع مستمر على المسارات المختارة';

export const preheaderCta = 'اكتشف العرض';

export const empty = '';

export const noop = () => undefined;

export const direction = 'rtl';

export const contentWidth = '1200px';

export const sectionGap = 'clamp(4rem, 8vw, 8rem)';

export const buttonRadius = '14px';

export const cardRadius = '26px';

export const lineHeight = 1.8;

export const descriptionLines = 2;

export const maxCourseCount = 12;

export const readTimeLabel = 'قراءة ٤ دقائق';

export const dateLabel = 'آخر تحديث · أبريل ٢٠٢٥';

export const completionLabel = 'نسبة الإكمال';

export const completionValue = '٧٢٪';

export const courseMeta = ['مستوى متوسط', 'شهادة إتمام', 'ملفات عمل'];

export const previewLabel = 'شاهد مقدمة قصيرة';

export const previewDuration = '٠٢:١٨';

export const teacherLabel = 'مع المدرّبة';

export const ratingText = 'ممتاز';

export const studentPlural = 'طالب';

export const modulePlural = 'وحدات';

export const lessonPlural = 'محاضرات';

export const minutePlural = 'دقيقة';

export const freeLabel = 'مجاني';

export const lockedLabel = 'مغلق';

export const curriculumLabel = 'مسار التعلّم';

export const curriculumDescription = 'كل وحدة لها إيقاعها، وكل درس يقرّبك خطوة.';

export const showMoreLabel = 'عرض المزيد';

export const showLessLabel = 'عرض أقل';

export const reviewsLabel = 'ماذا قال المتعلّمون؟';

export const reviewsDescription = 'آراء من خاضوا المسار قبلك.';

export const relatedLabel = 'قد يناسب فضولك أيضًا';

export const relatedDescription = 'مسارات قريبة، لكن كل واحد منها يفتح بابًا مختلفًا.';

export const instructorBio = 'يبني صاحب نَوَى مسارات عملية تساعد المتعلّمين على فهم البرمجة وصناعة المنتجات والعمل بوضوح، مع محتوى يمكن الرجوع إليه في كل مرحلة.';

export const instructorStats = [{ label: 'خبرة', value: '٩ سنوات' }, { label: 'متعلّم', value: '١٢.٤ ألف' }, { label: 'مسار', value: '٦' }];

export const instructorLinkLabel = 'شاهد كل مساراتها';

export const purchaseTip = 'أكثر من ٢,٣٨٠ شخصًا بدأوا هذا المسار';

export const purchaseCountdown = 'العرض ينتهي بعد ٠٣ أيام';

export const purchaseIncludes = ['٣٢ درسًا عمليًا', 'ملفات العمل والقوالب', 'شهادة إتمام رقمية'];

export const purchaseGuarantee = 'جرّب أول درس مجانًا قبل القرار.';

export const purchaseGuaranteeAction = 'ابدأ بالمعاينة';

export const discountNote = 'وفّر ٥٠٠ ج.م';

export const shareLabel = 'شارك المسار';

export const favoriteLabel = 'حفظ';

export const favoriteSavedLabel = 'تم الحفظ';

export const copyLinkLabel = 'نسخ الرابط';

export const copiedLabel = 'تم النسخ';

export const toastDuration = 2400;

export const navShadow = '0 12px 40px rgba(37,38,34,.05)';

export const cardShadow = '0 18px 60px rgba(37,38,34,.08)';

export const cardShadowHover = '0 22px 70px rgba(37,38,34,.14)';

export const textMuted = '#7d8077';

export const borderColor = '#ded7cc';

export const paperColor = '#f7f3ed';

export const inkColor = '#252622';

export const accentCoral = '#d86e4d';

export const accentOlive = '#6c775d';

export const accentSand = '#b99170';

export const accentYellow = '#efc75e';

export const selectedTab = 'overview';

export const defaultModule = 0;

export const defaultFaq = 0;

export const transitionFast = '180ms';

export const transitionSmooth = '260ms';

export const easings = { out: 'cubic-bezier(.23,1,.32,1)', inOut: 'cubic-bezier(.77,0,.175,1)' };

export const responsiveBreakpoints = { mobile: 640, tablet: 900, desktop: 1180 };

export const semver = '0.1.0';

export const schemaVersion = 1;

export const dataSource = 'mock';

export const isDemo = true;

export const end = true;

export default courses;
