import heroAsset from '@/img/nawa-hero.jpg';

const image = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const courses = [
    {
        id: 'creative-strategy',
        title: 'استراتيجية المحتوى: من الفكرة إلى أثر يُقاس',
        shortTitle: 'استراتيجية المحتوى',
        description: 'ابنِ نظام محتوى واضحًا يعبّر عن علامتك، يصل إلى جمهورك، ويحوّل الاهتمام إلى أثر حقيقي.',
        category: 'تسويق ومحتوى',
        track: 'مهارات رقمية',
        level: 'متوسط',
        price: 790,
        oldPrice: 1290,
        rating: 4.9,
        students: 2380,
        lessons: 32,
        duration: '٦ ساعات و٤٠ دقيقة',
        accent: 'coral',
        image: image('photo-1499750310107-5fef28a66643'),
        instructor: 'أ. إيمان الشريف',
        instructorRole: 'استشارية استراتيجية المحتوى والتسويق الرقمي',
        instructorAvatar: image('photo-1573496359142-b8d87734a5a2', 200),
        tags: ['تسويق', 'صناعة محتوى', 'استراتيجية'],
        outcomes: [
            'تكتب استراتيجية محتوى قابلة للتنفيذ خلال 30 يومًا',
            'تحدد صوت العلامة وتبني أعمدة محتوى متماسكة',
            'تقيس ما يستحق التكرار وما يحتاج إلى تغيير',
            'تحوّل الأفكار المبعثرة إلى نظام عمل أسبوعي',
        ],
        requirements: [
            'لا تحتاج إلى خبرة سابقة في التسويق',
            'دفتر ملاحظات أو مساحة عمل رقمية',
            'الرغبة في التجربة والكتابة خلال التمارين',
        ],
        audience: [
            'صنّاع المحتوى وأصحاب المشاريع',
            'فرق التسويق ورواد الأعمال',
            'المستقلون الذين يريدون حضورًا أوضح',
        ],
        modules: [
            {
                title: 'البوصلة: ما الذي نريد أن نغيّره؟',
                count: 4,
                duration: '١ ساعة و١٠ دقائق',
                lessons: [
                    { title: 'كيف نرى المشكلة قبل أن نصنع المحتوى؟', duration: '12:40', free: true, video: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
                    { title: 'خارطة الجمهور: من التخمين إلى الفهم', duration: '18:20', free: true, video: 'https://www.youtube.com/watch?v=kGgA4j6v9hU' },
                    { title: 'تحديد الوعد التحريري للعلامة', duration: '22:10', video: 'https://www.youtube.com/watch?v=nU-IIXBWlS4' },
                    { title: 'تمرين: جملة واحدة تكفي', duration: '10:00', video: 'https://www.youtube.com/watch?v=j_bJcRzE4zY' },
                ],
            },
            {
                title: 'نظام الأفكار: من الإلهام إلى خط إنتاج',
                count: 4,
                duration: '١ ساعة و٤٥ دقيقة',
                lessons: [
                    { title: 'ثلاث طبقات للفكرة القوية', duration: '15:20', video: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
                    { title: 'مصفوفة الزوايا التحريرية', duration: '19:10', video: 'https://www.youtube.com/watch?v=kGgA4j6v9hU' },
                    { title: 'كيف نكتب Hook لا يُنسى؟', duration: '21:40', video: 'https://www.youtube.com/watch?v=nU-IIXBWlS4' },
                    { title: 'جلسة تطبيق كاملة', duration: '34:00', video: 'https://www.youtube.com/watch?v=j_bJcRzE4zY' },
                ],
            },
            {
                title: 'الصياغة والنشر: إيقاع يمكن الحفاظ عليه',
                count: 3,
                duration: 'ساعتان و٥ دقائق',
                lessons: [
                    { title: 'قالب المنشور الذي لا يبدو كقالب', duration: '18:30', video: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
                    { title: 'اختيار المنصة والوقت', duration: '16:20', video: 'https://www.youtube.com/watch?v=kGgA4j6v9hU' },
                    { title: 'المراجعة بدون قتل الفكرة', duration: '20:00', video: 'https://www.youtube.com/watch?v=nU-IIXBWlS4' },
                ],
            },
            {
                title: 'القياس: تعلّم من الأرقام بهدوء',
                count: 3,
                duration: 'ساعة و٤٠ دقيقة',
                lessons: [
                    { title: 'ما الذي نقيسه فعلًا؟', duration: '14:00', video: 'https://www.youtube.com/watch?v=j_bJcRzE4zY' },
                    { title: 'قراءة التفاعل كإشارة لا كحكم', duration: '20:10', video: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
                    { title: 'خطة التحسين الشهرية', duration: '24:30', video: 'https://www.youtube.com/watch?v=kGgA4j6v9hU' },
                ],
            },
        ],
        reviews: [
            { name: 'نورهان مصطفى', role: 'مؤسسة مشروع صغير', rating: 5, text: 'أخيرًا كورس لا يعطيني عشرات القوالب وينتهي. خرجت بنظام أقدر أرجع له كل أسبوع، وهذا بالضبط ما كنت أحتاجه.', avatar: image('photo-1534528741775-53994a69daeb', 100) },
            { name: 'عبد الرحمن عادل', role: 'كاتب محتوى', rating: 5, text: 'الشرح هادئ وعملي. أحببت أن كل فكرة لها تمرين يجعلها تخصني أنا، وليس نسخة من مثال جاهز.', avatar: image('photo-1507003211169-0a1dd7228f2d', 100) },
        ],
    },
    {
        id: 'product-design',
        title: 'أساسيات تصميم المنتجات الرقمية وواجهات المستخدم',
        shortTitle: 'تصميم المنتجات وUI/UX',
        description: 'تعلّم كيف تحوّل احتياجًا إنسانيًا إلى تجربة رقمية واضحة، من البحث إلى أول نموذج تفاعلي في Figma.',
        category: 'تصميم وواجهات',
        track: 'مهارات رقمية',
        level: 'مبتدئ',
        price: 640,
        oldPrice: 960,
        rating: 4.8,
        students: 1740,
        lessons: 26,
        duration: '٥ ساعات و٢٠ دقيقة',
        accent: 'olive',
        image: image('photo-1581291518857-4e27b48ff24e'),
        instructor: 'م. طارق العربي',
        instructorRole: 'كبير مصممي المنتجات الرقمية ومدرب UI/UX',
        instructorAvatar: image('photo-1506794778202-cad84cf45f1d', 200),
        tags: ['UX', 'UI', 'Figma', 'تصميم'],
        outcomes: [
            'تكتشف المشكلة قبل أن ترسم الشاشة',
            'ترسم تدفقات واضحة وتختبرها بسرعة',
            'تستخدم Figma لبناء نموذج تفاعلي متكامل',
        ],
        requirements: ['Figma مثبت أو حساب مجاني', 'فضول تجاه تجربة المستخدم وسلوك الناس'],
        audience: ['المصممون في بداية الطريق', 'المطورون الذين يريدون فهم UX', 'أصحاب الأفكار الرقمية'],
        modules: [
            {
                title: 'فهم المستخدم وبناء الأساس',
                count: 3,
                duration: 'ساعة و٢٠ دقيقة',
                lessons: [
                    { title: 'التصميم ليس تزيينًا: مبادئ UX الحديثة', duration: '14:20', free: true, video: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU' },
                    { title: 'أسئلة البحث الجيدة ومقابلات المستخدمين', duration: '18:00', video: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8' },
                    { title: 'تحليل المنافسين وبناء شخصيات المستخدمين', duration: '22:00', video: 'https://www.youtube.com/watch?v=jwCmIBJ8Jtc' },
                ],
            },
            {
                title: 'من الفكرة إلى التدفق والـ Wireframes',
                count: 3,
                duration: 'ساعة و٤٥ دقيقة',
                lessons: [
                    { title: 'رسم المسار الأساسي لتدفق المستخدم', duration: '20:40', video: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU' },
                    { title: 'حالات الحافة والتعامل مع الأخطاء', duration: '16:10', video: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8' },
                    { title: 'تصميم Wireframes منخفضة الدقة', duration: '25:00', video: 'https://www.youtube.com/watch?v=jwCmIBJ8Jtc' },
                ],
            },
            {
                title: 'النموذج التفاعلي والاختبار في Figma',
                count: 3,
                duration: 'ساعتان و١٥ دقيقة',
                lessons: [
                    { title: 'أنظمة التصميم وAuto Layout في Figma', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU' },
                    { title: 'بناء أول Prototype تفاعلي كامل', duration: '31:00', video: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8' },
                    { title: 'جلسة اختبار مستخدم حقيقية وتحليل الملاحظات', duration: '28:00', video: 'https://www.youtube.com/watch?v=jwCmIBJ8Jtc' },
                ],
            },
        ],
        reviews: [
            { name: 'سلمى يحيى', role: 'مطور واجهات', rating: 5, text: 'غيّر طريقة قراءتي لأي شاشة. صرت أسأل لماذا قبل أن أسأل كيف.', avatar: image('photo-1544005313-94ddf0286df2', 100) },
        ],
    },
    {
        id: 'web-development',
        title: 'تطوير واجهات الويب الحديثة بـ React & Tailwind',
        shortTitle: 'تطوير واجهات الويب',
        description: 'تعلم بناء تطبيقات ويب تفاعلية وسريعة من الصفر باستخدام أحدث إصدارات React وتقنيات الويب المعاصرة.',
        category: 'برمجة وتقنية',
        track: 'مهارات رقمية',
        level: 'متوسط',
        price: 850,
        oldPrice: 1350,
        rating: 4.9,
        students: 2150,
        lessons: 34,
        duration: '٨ ساعات و١٥ دقيقة',
        accent: 'coral',
        image: image('photo-1555066931-4365d14bab8c'),
        instructor: 'م. يوسف النجار',
        instructorRole: 'مهندس برمجيات أول ومطور Full-Stack',
        instructorAvatar: image('photo-1500648767791-00dcc994a43e', 200),
        tags: ['برمجة', 'React', 'JavaScript', 'Frontend'],
        outcomes: [
            'فهم عميق لـ Components وState وHooks في React',
            'بناء واجهات مستخدم متجاوبة وسريعة باستخدام Tailwind CSS',
            'ربط الواجهة بـ REST APIs وإدارة البيانات بسلاسة',
        ],
        requirements: ['معرفة أساسية بـ HTML وCSS وJavaScript'],
        audience: ['المبتدئون في React', 'مطوروا الويب الذين يريدون تحديث مهاراتهم'],
        modules: [
            {
                title: 'أساسيات React وتجهيز بيئة العمل',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    { title: 'مقدمة إلى React وبناء أول Component', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
                    { title: 'إدارة الحالة بـ useState و useEffect', duration: '25:00', video: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
                    { title: 'تمرير البيانات والـ Props بكفاءة', duration: '18:00', video: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM' },
                ],
            },
            {
                title: 'بناء مشروع تطبيقي كامل',
                count: 3,
                duration: '٣ ساعات',
                lessons: [
                    { title: 'هيكلة المشروع وتقسيم المكونات', duration: '30:00', video: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
                    { title: 'ربط البيانات وإدارة الـ Loading States', duration: '28:00', video: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM' },
                    { title: 'تحسين الأداء والنشر على السحابة', duration: '35:00', video: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
                ],
            },
        ],
        reviews: [
            { name: 'حازم شريف', role: 'مطور واجهات مبتدئ', rating: 5, text: 'الشرح العملي المبني على مشاريع حقيقية وفّر عليّ شهورًا من التجربة العشوائية.', avatar: image('photo-1522075469751-3a6694fb2f61', 100) },
        ],
    },
    {
        id: 'freelance-system',
        title: 'نظام العمل الحر الهادئ والمستدام',
        shortTitle: 'نظام العمل الحر',
        description: 'ابنِ طريقة عمل تحمي وقتك، ترفع قيمة شغلك، وتساعدك على اختيار العملاء والمشاريع المناسبة.',
        category: 'العمل الحر والمهارات',
        track: 'مهارات رقمية',
        level: 'متوسط',
        price: 520,
        oldPrice: 780,
        rating: 4.7,
        students: 920,
        lessons: 19,
        duration: '٣ ساعات و٤٥ دقيقة',
        accent: 'sand',
        image: image('photo-1522071820081-009f0129c71c'),
        instructor: 'أ. كريم يسري',
        instructorRole: 'مستشار العمل الحر والنمو المهني',
        instructorAvatar: image('photo-1507003211169-0a1dd7228f2d', 200),
        tags: ['عمل حر', 'إنتاجية', 'تسعير', 'مهارات'],
        outcomes: [
            'تسعّر خدماتك على أساس القيمة لا الوقت فقط',
            'تصمم نظام استقبال وتسليم واضح يحميك من التعديلات اللانهائية',
            'تقول لا للمشروع الخطأ بدون توتر أو تردد',
        ],
        requirements: ['مهارة أو خدمة جاهزة للتقديم للعملاء'],
        audience: ['المستقلون الجدد', 'المبدعون وأصحاب الخدمات', 'من يريد العمل باستقلالية دون احتراق'],
        modules: [
            {
                title: 'اختيار العملاء والمشاريع المناسبة',
                count: 3,
                duration: 'ساعة',
                lessons: [
                    { title: 'المشروع المناسب لك والعميل المثالي', duration: '13:30', free: true, video: 'https://www.youtube.com/watch?v=2r_1pQG5N0I' },
                    { title: 'بناء بورتفوليو يقنع العميل في ٣٠ ثانية', duration: '20:00', video: 'https://www.youtube.com/watch?v=mE7IDf2SmJg' },
                ],
            },
            {
                title: 'التسعير والتفاوض وإدارة العقود',
                count: 3,
                duration: 'ساعة و٢٥ دقيقة',
                lessons: [
                    { title: 'السعر ليس مجرد رقم: استراتيجيات التسعير', duration: '19:00', free: true, video: 'https://www.youtube.com/watch?v=2r_1pQG5N0I' },
                    { title: 'كتابة العروض المقنعة (Proposals)', duration: '22:00', video: 'https://www.youtube.com/watch?v=mE7IDf2SmJg' },
                ],
            },
        ],
        reviews: [
            { name: 'مريم عاطف', role: 'مصممة مستقلة', rating: 5, text: 'أعطاني لغة أشرح بها شغلي وحدودًا أستطيع احترامها. عملي صار أهدأ فعلًا.', avatar: image('photo-1488426862026-3ee34a7d66df', 100) },
        ],
    },
    {
        id: 'prep3-arabic',
        title: 'اللغة العربية — الصف الثالث الإعدادي',
        shortTitle: 'عربي تالتة إعدادي',
        description: 'مراجعة مركزة للنحو والقراءة والنصوص والتعبير مع نماذج امتحانات شاملة على طريقة الوزارة الحديثة.',
        category: 'مناهج دراسية',
        track: 'مناهج دراسية',
        level: 'مبتدئ',
        price: 260,
        oldPrice: 360,
        rating: 4.9,
        students: 3240,
        lessons: 28,
        duration: '٤ ساعات و١٠ دقائق',
        accent: 'coral',
        image: image('photo-1455390582262-044cdead277a'),
        instructor: 'أ. محمود مجدي',
        instructorRole: 'كبير معلّمي اللغة العربية ومؤلف مذكرات التأسيس',
        instructorAvatar: image('photo-1472099645785-5658abf4ff4e', 200),
        tags: ['الصف الثالث الإعدادي', 'لغة عربية', 'إعدادي'],
        outcomes: [
            'تراجع أهم قواعد النحو في أسئلة قصيرة ومباشرة',
            'تقرأ النصوص وتستخرج الفكرة ومواطن الجمال بسهولة',
            'تتدرب على نماذج امتحانات كاملة بنمط ورقة الامتحان',
        ],
        requirements: ['كتاب اللغة العربية', 'دفتر لتدوين القواعد'],
        audience: ['طلاب الصف الثالث الإعدادي', 'من يريد تثبيت درجات العربي'],
        modules: [
            {
                title: 'النحو من الأساس إلى أسئلة الامتحان',
                count: 3,
                duration: 'ساعة و١٥ دقيقة',
                lessons: [
                    { title: 'المنادى وأنواعه وأسرار إعرابه', duration: '18:00', free: true, video: 'https://www.youtube.com/watch?v=Z1BCujX3pw8' },
                    { title: 'البدل وعلامات ضبطه وإعرابه', duration: '22:00', video: 'https://www.youtube.com/watch?v=6tNSq6Zt4oM' },
                    { title: 'الممنوع من الصرف وأسلوب المدح والذم', duration: '25:00', video: 'https://www.youtube.com/watch?v=5rT8yvQ3eR4' },
                ],
            },
            {
                title: 'القراءة والنصوص والتعبير',
                count: 2,
                duration: 'ساعة و٣٥ دقيقة',
                lessons: [
                    { title: 'الفكرة الرئيسية واستخراج الجماليات في النصوص', duration: '19:30', free: true, video: 'https://www.youtube.com/watch?v=Z1BCujX3pw8' },
                    { title: 'فن كتابة موضوع التعبير النموذجي', duration: '17:00', video: 'https://www.youtube.com/watch?v=6tNSq6Zt4oM' },
                ],
            },
        ],
        reviews: [
            { name: 'ملك محمود', role: 'طالبة تالتة إعدادي', rating: 5, text: 'المراجعة قسمت العربي لأجزاء صغيرة وخلتني أعرف أبدأ منين في النحو.', avatar: image('photo-1494790108377-be9c29b29330', 100) },
        ],
    },
    {
        id: 'secondary-biology',
        title: 'الأحياء — الصف الثالث الثانوي علمي علوم',
        shortTitle: 'أحياء تالتة ثانوي',
        description: 'شرح ومراجعة أجهزة الجسم والمناعة والـ DNA والوراثة مع تدريب مكثف على أسئلة الفهم والربط.',
        category: 'مناهج دراسية',
        track: 'مناهج دراسية',
        level: 'متقدم',
        price: 490,
        oldPrice: 690,
        rating: 4.9,
        students: 2680,
        lessons: 36,
        duration: '٧ ساعات و٣٠ دقيقة',
        accent: 'olive',
        image: image('photo-1530026405186-ed1f139313f8'),
        instructor: 'د. أحمد الجوهري',
        instructorRole: 'أستاذ الأحياء والجيولوجيا للثانوية العامة',
        instructorAvatar: image('photo-1537368910025-700350fe46c7', 200),
        tags: ['الصف الثالث الثانوي', 'علمي علوم', 'أحياء', 'ثانوية عامة'],
        outcomes: [
            'تفهم تركيب ووظيفة أجهزة الدعامة والحركة والمناعة',
            'تربط بين الـ DNA وتخليق البروتين والتطبيقات الحيوية',
            'تحل أسئلة الاختيار من متعدد بنظام الاستبعاد والتحليل العلمي',
        ],
        requirements: ['مجلد المفاهيم أو كتاب الوزارة', 'دفتر لرسومات ومخططات الأحياء'],
        audience: ['طلاب علمي علوم في الثانوية العامة', 'المقبلون على كليات الطب والعلوم والتمريض'],
        modules: [
            {
                title: 'الدعامة والحركة والتنسيق الهرموني',
                count: 3,
                duration: 'ساعة و٤٥ دقيقة',
                lessons: [
                    { title: 'الدعامة في النبات والإنسان', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=2a_eG8wP51A' },
                    { title: 'الانقباض العضلي وآلية العمل', duration: '24:00', video: 'https://www.youtube.com/watch?v=bAysXmB7d_Q' },
                    { title: 'الغدد الصماء والتوازن الهرموني', duration: '27:00', video: 'https://www.youtube.com/watch?v=8VwQ9fT2f7Q' },
                ],
            },
            {
                title: 'المناعة والبيولوجيا الجزيئية (DNA)',
                count: 3,
                duration: '٣ ساعات',
                lessons: [
                    { title: 'خطوط الدفاع والمناعة الخلوية والخلطية', duration: '25:00', free: true, video: 'https://www.youtube.com/watch?v=2a_eG8wP51A' },
                    { title: 'تركيب الـ DNA وتضاعفه وإصلاح عيوبه', duration: '30:00', video: 'https://www.youtube.com/watch?v=bAysXmB7d_Q' },
                    { title: 'تخليق البروتين والهندسة الوراثية', duration: '35:00', video: 'https://www.youtube.com/watch?v=8VwQ9fT2f7Q' },
                ],
            },
        ],
        reviews: [
            { name: 'يوسف أحمد', role: 'طالب علمي علوم', rating: 5, text: 'الرسومات والربط بين الفصول خلت الأحياء ممتعة ومفهومة بدون حفظ أعمى.', avatar: image('photo-1500648767791-00dcc994a43e', 100) },
        ],
    },
    {
        id: 'secondary-math',
        title: 'الرياضيات — الصف الثاني الثانوي علمي رياضة',
        shortTitle: 'رياضة تانية ثانوي',
        description: 'تفاضل وتكامل وحساب مثلثات وجبر بطريقة خطوة بخطوة مع تدريب متدرج من الفكرة إلى المسألة المعقدة.',
        category: 'مناهج دراسية',
        track: 'مناهج دراسية',
        level: 'متوسط',
        price: 430,
        oldPrice: 620,
        rating: 4.8,
        students: 1910,
        lessons: 30,
        duration: '٦ ساعات و٢٠ دقيقة',
        accent: 'sand',
        image: image('photo-1509228468518-180dd4864904'),
        instructor: 'م. عصام الشناوي',
        instructorRole: 'معلم أول الرياضيات البحتة والتطبيقية',
        instructorAvatar: image('photo-1519085360753-af0119f7cbe7', 200),
        tags: ['الصف الثاني الثانوي', 'علمي رياضة', 'رياضيات', 'ثانوية عامة'],
        outcomes: [
            'تفهم سلوك الدوال وتمثيلها البياني وقراءتها الرياضية',
            'تتقن قواعد التفاضل وتطبيقات النهايات ومعدل التغير',
            'تتدرج في حل المسائل المقالية واختيار من متعدد بدقة',
        ],
        requirements: ['أساسيات الجبر وحساب المثلثات', 'آلة حاسبة علمية'],
        audience: ['طلاب علمي رياضة تانية ثانوي', 'المقبلون على تالتة ثانوي علمي رياضة والهندسة'],
        modules: [
            {
                title: 'الدوال والنهايات والتمثيل البياني',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    { title: 'المجال والمدى والاطراد للدوال', duration: '21:00', free: true, video: 'https://www.youtube.com/watch?v=WsQQvvZmpHc' },
                    { title: 'نهايات الدوال جبريًا وبيانيًا', duration: '24:00', video: 'https://www.youtube.com/watch?v=WUvTyaaNkzM' },
                    { title: 'التحويلات الهندسية للدوال', duration: '26:00', video: 'https://www.youtube.com/watch?v=9_Z9q3t8Klo' },
                ],
            },
            {
                title: 'قواعد التفاضل وتطبيقاته',
                count: 2,
                duration: 'ساعتان و٣٠ دقيقة',
                lessons: [
                    { title: 'مفهوم المشتقة الأولى وقواعد الاشتقاق', duration: '28:00', free: true, video: 'https://www.youtube.com/watch?v=WsQQvvZmpHc' },
                    { title: 'تطبيقات هندسية وفيزيائية على التفاضل', duration: '32:00', video: 'https://www.youtube.com/watch?v=WUvTyaaNkzM' },
                ],
            },
        ],
        reviews: [
            { name: 'عمر خالد', role: 'طالب تانية ثانوي', rating: 5, text: 'كل مسألة لها مدخل منظم وواضح، وده فرق جدًا معايا في سرعة الحل.', avatar: image('photo-1507003211169-0a1dd7228f2d', 100) },
        ],
    },
    {
        id: 'secondary-arabic',
        title: 'اللغة العربية والبلاغة — الصف الأول الثانوي',
        shortTitle: 'عربي أولى ثانوي',
        description: 'فهم النصوص والنحو والبلاغة والتعبير في مسار واحد يضمن بداية قوية في المرحلة الثانوية.',
        category: 'مناهج دراسية',
        track: 'مناهج دراسية',
        level: 'مبتدئ',
        price: 320,
        oldPrice: 460,
        rating: 4.8,
        students: 2150,
        lessons: 24,
        duration: '٤ ساعات و٤٥ دقيقة',
        accent: 'coral',
        image: image('photo-1516979187457-637abb4f9353'),
        instructor: 'أ. حسام خليل',
        instructorRole: 'معلّم خبير في البلاغة والأدب والنصوص',
        instructorAvatar: image('photo-1506794778202-cad84cf45f1d', 200),
        tags: ['الصف الأول الثانوي', 'لغة عربية', 'ثانوي عام', 'بلاغة'],
        outcomes: [
            'تتقن التشبيه والاستعارة والكناية في البلاغة',
            'تفهم الأفعال الناقصة والتامة والمشتقات في النحو',
            'تبني إجابة منظمة في التعبير والقراءة المتحررة',
        ],
        requirements: ['كتاب اللغة العربية', 'رغبة في التدريب المستمر'],
        audience: ['طلاب أولى ثانوي', 'من يريد بداية نموذجية في المرحلة الثانوية'],
        modules: [
            {
                title: 'البلاغة والنصوص المتحررة',
                count: 3,
                duration: 'ساعة و٣٠ دقيقة',
                lessons: [
                    { title: 'الفرق بين الحقيقة والمجاز وأنواع التشبيه', duration: '18:00', free: true, video: 'https://www.youtube.com/watch?v=uD5o3Hj0X34' },
                    { title: 'الاستعارة المكنية والتصريحية وسر الجمال', duration: '20:00', video: 'https://www.youtube.com/watch?v=7XG3v1r6v9Q' },
                    { title: 'كيف تحل سؤال القراءة والنصوص المتحررة؟', duration: '22:00', video: 'https://www.youtube.com/watch?v=uD5o3Hj0X34' },
                ],
            },
            {
                title: 'النحو وقواعد اللغة',
                count: 2,
                duration: 'ساعتان',
                lessons: [
                    { title: 'كان وأخواتها التامة والناقصة وكاد وأخواتها', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=uD5o3Hj0X34' },
                    { title: 'إعمال اسم الفاعل واسم المفعول وصيغ المبالغة', duration: '25:00', video: 'https://www.youtube.com/watch?v=7XG3v1r6v9Q' },
                ],
            },
        ],
        reviews: [
            { name: 'جنى مصطفى', role: 'طالبة أولى ثانوي', rating: 5, text: 'البلاغة كانت معقدة جدًا بالنسبة لي، لكن الشرح بالأمثلة الحية خلاها أسهل مادة.', avatar: image('photo-1544005313-94ddf0286df2', 100) },
        ],
    },
];

export const categories = [
    'كل المسارات',
    'مناهج دراسية',
    'برمجة وتقنية',
    'تصميم وواجهات',
    'تسويق ومحتوى',
    'العمل الحر والمهارات',
];

export const gradeChips = [
    'كل الصفوف',
    'الصف الثالث الإعدادي',
    'الصف الأول الثانوي',
    'الصف الثاني الثانوي',
    'الصف الثالث الثانوي',
];

export const subjectChips = [
    'كل المواد',
    'لغة عربية',
    'رياضيات',
    'أحياء',
    'برمجة',
    'تصميم',
    'تسويق',
    'عمل حر',
];

export const egyptEducationOptions = {
    stages: ['المرحلة الإعدادية', 'الثانوية العامة', 'البكالوريا المصرية'],
    stageMap: {
        'المرحلة الإعدادية': {
            label: 'المرحلة الإعدادية',
            shortLabel: 'إعدادي',
            description: 'أولى · تانية · تالتة إعدادي',
            grades: [
                'الصف الأول الإعدادي',
                'الصف الثاني الإعدادي',
                'الصف الثالث الإعدادي',
            ],
            tracks: ['إعدادي عام'],
        },
        'الثانوية العامة': {
            label: 'الثانوية العامة',
            shortLabel: 'ثانوي عام',
            description: 'مسار عام · علمي · أدبي',
            grades: [
                'الصف الأول الثانوي',
                'الصف الثاني الثانوي',
                'الصف الثالث الثانوي',
            ],
            tracks: [
                'ثانوي عام — عام (الصف الأول)',
                'علمي علوم',
                'علمي رياضة',
                'أدبي',
            ],
        },
        'البكالوريا المصرية': {
            label: 'البكالوريا المصرية',
            shortLabel: 'بكالوريا مصرية',
            description: 'نظام البكالوريا الحديث ومساراته الأربعة',
            grades: [
                'الصف الأول بالبكالوريا (تمهيدي)',
                'الصف الثاني بالبكالوريا',
                'الصف الثالث بالبكالوريا (تخرج)',
            ],
            tracks: [
                'مسار الطب وعلوم الحياة',
                'مسار الهندسة وتكنولوجيا المعلومات',
                'مسار إدارة الأعمال والاقتصاد',
                'مسار الآداب والعلوم الإنسانية والفنون',
            ],
        },
    },
    governorates: [
        'القاهرة', 'الجيزة', 'الإسكندرية', 'القليوبية', 'الدقهلية', 'البحر الأحمر', 'البحيرة',
        'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'الوادي الجديد', 'أسوان',
        'أسيوط', 'الأقصر', 'بورسعيد', 'دمياط', 'سوهاج', 'شمال سيناء', 'جنوب سيناء', 'السويس',
        'الشرقية', 'كفر الشيخ', 'مطروح', 'قنا', 'بني سويف',
    ],
};

export const formatPrice = (price) => `${price.toLocaleString('ar-EG')} ج.م`;
export const featuredCourse = courses[0];
export const founderHeroImage = heroAsset;

export const navItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'كل الكورسات', href: '/courses' },
    { label: 'كيف تعمل نَوَى؟', href: '/#how' },
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

export const initialCart = [
    { ...featuredCourse, quantity: 1 },
];

export const getCourse = (id) => courses.find((course) => course.id === id) ?? featuredCourse;
export const discount = (course) => Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100);
export const totalCart = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const totalOldCart = (items) => items.reduce((sum, item) => sum + item.oldPrice * item.quantity, 0);
export const imageCredits = 'الصور في المنصة مستضافة بجودة عالية وتراعي الهوية البصرية الأنيقة لمنصة نَوَى.';
export const generatedAssetPlaceholder = image('photo-1499750310107-5fef28a66643');

export const copy = {
    brand: 'نَوَى',
    tagline: 'تعلّمٌ يشبهك.',
    description: 'مسارات تعليمية وتطبيقية يقودها نخبة من أفضل المعلمين والخبراء، في تجربة هادئة تجعل التعلّم جزءًا ممتعًا من يومك.',
};

export const testimonials = [
    { quote: 'المسارات في نَوَى مقسمة بطريقة ذكية، كل درس له هدف مباشر وتطبيق عملي يثبّت المعلومة.', name: 'رانيا سامح', detail: 'تعلّمت تصميم المنتجات وUI/UX' },
    { quote: 'مراجعات الثانوية والإعدادية منظمة جداً، والفيديوهات واضحة ومباشرة بدون حشو أو إطالة.', name: 'مازن علي', detail: 'طالب الثانوية العامة' },
    { quote: 'استفدت جداً من مسار العمل الحر واستراتيجية المحتوى، نقلت شغلي لمستوى احترافي حقيقي.', name: 'سلمى يحيى', detail: 'صانعة محتوى ومستقلة' },
];

export const stats = [
    { value: '١٤.٨ ألف', label: 'متعلّم بدأ مساره' },
    { value: '٩٨٪', label: 'نسبة الرضا والإكمال' },
    { value: '٤.٩/٥', label: 'متوسط تقييم المعلمين' },
];

export const badges = ['نخبة من كبار المعلمين', 'مشاهدة ومتابعة مدى الحياة', 'تمارين وفيديوهات عالية الدقة'];

export const footerColumns = [
    { title: 'استكشف', links: ['كل الكورسات', 'المناهج الدراسية', 'المهارات الرقمية'] },
    { title: 'نَوَى', links: ['عن المنصة', 'المعلمون والخبراء', 'تواصل معنا'] },
    { title: 'مساعدة', links: ['الأسئلة الشائعة', 'سياسة الاسترجاع', 'الدعم الفني'] },
];

export const faq = [
    { q: 'هل أستطيع مشاهدة الكورس على الهاتف أو التابلت؟', a: 'نعم، صُممت تجربة نَوَى لتعمل بسلاسة فائقة على الهاتف والتابلت والكمبيوتر، مع مشغل فيديو ذكي يحفظ تقدمك بدقة.' },
    { q: 'هل الفيديوهات والمحتوى متاح مدى الحياة؟', a: 'نعم، بمجرد الاشتراك في أي مسار يصبح المحتوى متاحاً لك بالكامل مدى الحياة مع جميع التحديثات القادمة.' },
    { q: 'هل أحصل على شهادة إتمام؟', a: 'تحصل على شهادة إتمام رقمية معتمدة من نَوَى فور إنهاء جميع محاضرات واختبارات المسار.' },
];

export const formatMinutes = (duration) => duration;
export const courseImageFallback = image('photo-1516321318423-f06f85e504b3');
export const curriculumTotal = (course) => course.modules.reduce((sum, module) => sum + module.count, 0);
export const reviewCount = (course) => Math.round(course.students * 0.24);
export const defaultSearch = '';
export const socialProof = ['متعلّمون من القاهرة', 'الإسكندرية', 'المنصورة', 'طنطا', 'أسيوط', 'بورسعيد'];
export const deliveryNote = 'اشترِ مرة، وارجع للتعلّم وقت ما يناسبك.';
export const supportLine = 'محتاج تسأل؟ فريقنا ومعلمونا معك دائماً.';
export const checkoutSteps = ['السلة', 'بياناتك', 'التأكيد'];
export const paymentMethods = ['بطاقة بنكية', 'فودافون كاش ومحافظ إلكترونية', 'فوري'];
export const searchPlaceholder = 'ابحث عن مادة أو مهارة أو مدرس...';
export const heroEyebrow = 'منصة نَوَى التعليمية · ربيع ٢٠٢٥';
export const footerTagline = 'نفتح لك باب المعرفة، ونمشي معك خطوة بخطوة نحو التفوق.';
export const footerCopyright = '© ٢٠٢٥ منصة نَوَى. جميع الحقوق محفوظة.';
export const courseCountLabel = 'مسارات تعليمية ومهارية متميزة مع نخبة من الخبراء.';
export const courseDetailNote = 'صمّمنا كل تفصيلة لتعرف محتوى المسار ونواتجه قبل اتخاذ القرار.';
export const promoCode = 'NAWA20';
export const promoDiscount = 20;
export const paidAccess = 'وصول كامل مدى الحياة';
export const secureCheckout = 'دفع آمن ومشفّر';
export const studentCountLabel = (students) => `${students.toLocaleString('ar-EG')} متعلّم`;
export const lessonCountLabel = (lessons) => `${lessons.toLocaleString('ar-EG')} درس`;
export const categoryLabel = (category) => category;
export const isFreeLesson = (lesson) => Boolean(lesson.free);
export const getDiscountLabel = (course) => `خصم ${discount(course)}٪`;
export const getPriceLabel = (course) => formatPrice(course.price);
export const getOldPriceLabel = (course) => formatPrice(course.oldPrice);
export const getRatingLabel = (course) => course.rating.toLocaleString('ar-EG');
export const getReviewLabel = (course) => `${reviewCount(course).toLocaleString('ar-EG')} تقييم`;
export const getModuleLabel = (module) => `${module.count.toLocaleString('ar-EG')} دروس`;
export const getLessonLabel = (lesson) => lesson.duration;
export const getInstructorLabel = (course) => `${course.instructor} · ${course.instructorRole}`;
export const getCategoryColor = (accent) => ({ coral: '#c8694a', olive: '#687458', sand: '#9b785d' }[accent] ?? '#c8694a');
export const getAccentClass = (accent) => `accent-${accent}`;
export const getCourseRoute = (id) => `/course/${id}`;
export const buildCartItem = (course) => ({ ...course, quantity: 1 });
export const emptyCartMessage = 'لم تضف أي مسار بعد. ابدأ باختيار المسار المناسب لك اليوم.';
export const checkoutNote = 'هذه تجربة واجهة توضيحية تحاكي الدفع الإلكتروني الحقيقي.';
export const statusLabels = { free: 'مفتوح مجاناً', locked: 'مقفول' };
export const pageTitles = { home: 'الرئيسية', courses: 'كل الكورسات', cart: 'السلة', checkout: 'الدفع' };
export const firstLesson = (course) => course.modules[0].lessons[0];
export const nextCourse = (course) => courses.find((item) => item.id !== course.id) ?? featuredCourse;
export const relatedCourses = (course) => courses.filter((item) => item.id !== course.id).slice(0, 2);
export const isCurrentRoute = (path, href) => path === href || (href !== '/' && path.startsWith(href));
export const getCurrentYear = () => '٢٠٢٥';
export const faqIntro = 'إجابات واضحة لأهم الأسئلة الشائعة.';
export const accessBadge = 'مفتوح مدى الحياة';
export const featuredLabel = 'المسار المميز';
export const viewAllLabel = 'استكشف كل المسارات';
export const cartLabel = 'السلة';
export const addToCartLabel = 'أضف للسلة';
export const buyNowLabel = 'ابدأ الآن';
export const courseCta = 'تفاصيل المسار';
export const continueLabel = 'متابعة الشراء';
export const emptySearch = 'جرّب كتابة كلمة بحث أخرى أو اختيار تصنيف مختلف.';
export const footerNote = 'منصة تعليمية عربية تجمع المناهج الدراسية والمهارات الرقمية الحديثة.';
export const menuAria = 'فتح القائمة';
export const cartAria = 'فتح السلة';
export const searchAria = 'فتح البحث';
export const closeAria = 'إغلاق';
export const nextAria = 'التالي';
export const previousAria = 'السابق';
export const playAria = 'تشغيل المعاينة';
export const expandAria = 'فتح الوحدة';
export const collapseAria = 'إغلاق الوحدة';
export const heroImageAlt = 'مساحة دراسة وعمل تعليمية دافئة وحديثة';
export const avatarAlt = 'صورة المعلم';
export const courseThumbnailAlt = 'غلاف الكورس';
export const logoMark = 'ن';
export const logoWord = 'نَوَى';
export const logoSub = 'تعلّمٌ يشبهك';
export const numericLocale = 'ar-EG';
export const currency = 'ج.م';
export const refNote = 'منصة نَوَى التعليمية — بيئة متكاملة للتعلم المدرسي والمهارات المعاصرة.';
export const scrollRevealClass = 'reveal';
export const reducedMotionNote = 'تحترم الواجهة إعداد تقليل الحركة في النظام.';
export const designTone = 'Warm editorial learning';
export const colorPalette = { ink: '#252622', paper: '#f7f3ed', mist: '#ebe6dd', coral: '#d86e4d', olive: '#6c775d', clay: '#bd9474', line: '#ded7cc' };
export const typography = { display: 'Noto Kufi Arabic', body: 'IBM Plex Sans Arabic', latin: 'DM Sans' };
export const iconSet = 'Lucide React';
export const inspirationSummary = 'تجربة تعليمية متكاملة تجمع المناهج الدراسية والمهارات الرقمية.';
export const assetSummary = 'صور عالية الدقة مستضافة بجودة فائقة تناسب بيئة نَوَى.';
export const appDescription = 'منصة تعليمية عربية حديثة تجمع بين المناهج الدراسية الإعدادية والثانوية والمهارات الرقمية والعملية.';
export const courseDetailSections = ['عن المسار', 'المنهج والمحاضرات', 'آراء المتعلّمين', 'أسئلة شائعة'];
export const stickyPurchaseTitle = 'جاهز تبدأ رحلتك؟';
export const stickyPurchaseSubtitle = 'انضم لآلاف المتعلّمين وابدأ أول درس اليوم.';
export const trustPoints = ['وصول كامل مدى الحياة', 'مشاهدة سلسة على كل أجهزتك', 'ملفات وتطبيقات وفيديوهات عالية الوضوح'];
export const routeFallback = '/';
export const appName = 'نَوَى';
export const appVersion = '1.0.0';
export const noResultsLabel = 'لا توجد نتائج مطابقة';
export const loadingLabel = 'لحظة ونجهز لك المسارات...';
export const successMessage = 'تمت الإضافة للسلة بنجاح';
export const checkoutSuccessMessage = 'تم تأكيد طلبك بنجاح — مرحباً بك في مسار التعلّم!';
export const navCta = 'ابدأ التعلّم';
export const sectionKicker = 'مسارات مختارة';
export const sectionTitle = 'تعلّم يصنع فارقاً حقيقياً';
export const sectionSubtitle = 'شروحات مبسطة ومباشرة مع أفضل المعلمين والخبراء — بدون تشتيت.';
export const homeHowTitle = 'رحلة تعلّم واضحة ومنظمة';
export const homeHowBody = 'اختر مجالك أو مرحلتك الدراسية، شاهد الدروس بتركيز، وطبّق ما تعلمته خطوة بخطوة.';
export const howSteps = [
    { number: '٠١', title: 'اختر مجالك', text: 'حدد مرحلتك الدراسية أو المهارة الرقمية التي تريد إتقانها.' },
    { number: '٠٢', title: 'تعلّم مع الخبراء', text: 'محاضرات عالية الجودة مقسمة لوحدات ذكية تناسب وقتك.' },
    { number: '٠٣', title: 'طبّق وتفوق', text: 'اختبارات قصيرة وتدريبات عملية تضمن استيعابك الكامل.' },
];
export const homeQuote = 'التعلّم الحقيقي ليس بكثرة الساعات، بل بوضوح الفكرة وجودة التطبيق.';
export const homeQuoteBy = 'رؤية نَوَى';
export const homePromise = 'وضوح في الشرح. نخبة في التعليم. نتائج تفخر بها.';
export const homeCta = 'استكشف كل المسارات';
export const homeSecondaryCta = 'كيف تعمل نَوَى؟';
export const homeFooterCta = 'مستعد لبدء مسارك القادم؟';
export const cartEmptyTitle = 'سلتك فارغة حالياً';
export const cartEmptyBody = 'تصفح المسارات وأضف ما يناسب أهدافك التعليمية للبدء فوراً.';
export const checkoutTitle = 'خطوة واحدة تفصلك عن البداية';
export const checkoutBody = 'بيانات بسيطة وتأكيد فوري للوصول إلى مساحة التعلّم.';
export const checkoutDemo = 'بوابة اشتراك إلكترونية';
export const cartSummaryTitle = 'ملخص الطلب';
export const subtotalLabel = 'المجموع قبل الخصم';
export const savingsLabel = 'قيمة التوفير';
export const totalLabel = 'الإجمالي النهائي';
export const noFeesLabel = 'شامل جميع المحاضرات والملفات';
export const couponLabel = 'كود الخصم';
export const couponPlaceholder = 'اكتب الكود (مثال: NAWA20)';
export const applyLabel = 'تفعيل';
export const secureLabel = 'معاملات آمنة ومحمية';
export const secureBody = 'بياناتك مشفرة ومحمية بأعلى معايير الأمان الرقمي.';
export const defaultForm = { name: '', email: '', phone: '' };
export const fieldLabels = { name: 'الاسم بالكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف / الواتساب' };
export const fieldPlaceholders = { name: 'مثال: أحمد محمد', email: 'name@example.com', phone: '01X XXX XXXX' };
export const formRequired = 'مطلوب';
export const submitOrderLabel = 'تأكيد الاشتراك والدخول للمسار';
export const backToCartLabel = 'العودة للسلة';
export const orderSuccessTitle = 'أهلاً بك في نَوَى!';
export const orderSuccessBody = 'تم تفعيل اشتراكك بنجاح. يمكنك الآن الانتقال مباشرة لمشاهدة المحاضرات وحل التدريبات.';
export const startLearningLabel = 'ادخل لمساحة التعلّم الآن';
export const continueBrowsingLabel = 'تصفح مسارات أخرى';
export const mobileNavLabel = 'القائمة';
export const desktopNavLabel = 'القائمة الرئيسية';
export const closeMenuLabel = 'إغلاق';
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
export const versionLabel = 'النسخة الرسمية';
export const demoLabel = 'بيانات جاهزة للتشغيل';
export const researchDisclaimer = 'منصة تعليمية متطورة مصممة للمتعلمين العرب.';
export const primaryImageAlt = 'غلاف المسار التعليمي';
export const fallbackAvatar = image('photo-1494790108377-be9c29b29330', 180);
export const defaultCourse = featuredCourse;
export const currentRoute = '/';
export const productName = 'نَوَى';
export const productTagline = 'تعلّمٌ يشبهك.';
export const seoTitle = 'نَوَى — منصة تعلّم عربية حديثة للمناهج والمهارات';
export const seoDescription = appDescription;
export const designReferenceNote = 'تصميم تحريري عربي هادئ وراقٍ.';
export const footerLinks = ['الشروط والأحكام', 'سياسة الخصوصية', 'حقوق الملكية'];
export const breadcrumbHome = 'الرئيسية';
export const breadcrumbCourses = 'الكورسات';
export const breadcrumbCourse = 'تفاصيل المسار';
export const preheader = 'خصومات خاصة بمناسبة الفصل الدراسي الجديد';
export const preheaderCta = 'اكتشف العروض';
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
export const dateLabel = 'محدث لعام ٢٠٢٥ / ٢٠٢٦';
export const completionLabel = 'نسبة الإكمال';
export const completionValue = '٧٨٪';
export const courseMeta = ['مستوى تدريجي', 'شهادة إتمام', 'ملفات وملاحظات'];
export const previewLabel = 'شاهد مقدمة توضيحية';
export const previewDuration = '٠٣:١٥';
export const teacherLabel = 'تقديم المعلم / الخبير';
export const ratingText = 'ممتاز';
export const studentPlural = 'طالب';
export const modulePlural = 'وحدات';
export const lessonPlural = 'محاضرات';
export const minutePlural = 'دقيقة';
export const freeLabel = 'متاح مجاناً';
export const lockedLabel = 'مشترك';
export const curriculumLabel = 'المنهج والمحاضرات';
export const curriculumDescription = 'منهج متكامل ومقسم إلى وحدات تفاعلية تسهل عملية الفهم والمراجعة.';
export const showMoreLabel = 'عرض المزيد';
export const showLessLabel = 'عرض أقل';
export const reviewsLabel = 'تجارب الطلاب والمتعلّمين';
export const reviewsDescription = 'آراء حقيقية من الطلاب الذين أتموا هذا المسار.';
export const relatedLabel = 'مسارات قد تهمك أيضاً';
export const relatedDescription = 'مسارات أخرى من نفس التخصص أو لمرحلتك الدراسية.';
export const instructorBio = 'نخبة من كبار الأساتذة والمعلمين المعتمدين، ذوي الخبرة الواسعة في تدريس المناهج وتأهيل الطلاب للمستقبل.';
export const instructorStats = [{ label: 'خبرة تدريسية', value: '+١٠ سنوات' }, { label: 'طالب متفوق', value: '+١٥ ألف' }, { label: 'مسار معتمد', value: '٨' }];
export const instructorLinkLabel = 'تصفح كل مسارات المعلم';
export const purchaseTip = 'أكثر من ٢,٠٠٠ طالب يدرسون هذا المسار حالياً';
export const purchaseCountdown = 'خصم لفترة محدودة';
export const purchaseIncludes = ['محاضرات فيديو عالية الجودة', 'ملفات تلخيص وأوراق عمل PDF', 'شهادة إتمام عند إنهاء المسار'];
export const purchaseGuarantee = 'شاهد أول محاضرة مجاناً قبل الاشتراك.';
export const purchaseGuaranteeAction = 'مشاهدة المعاينة المجانية';
export const discountNote = 'وفّر حتى ٤٠٪ اليوم';
export const shareLabel = 'مشاركة المسار';
export const favoriteLabel = 'حفظ في المفضلة';
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
export const semver = '1.0.0';
export const schemaVersion = 1;
export const dataSource = 'mock';
export const isDemo = true;
export const end = true;

export default courses;
