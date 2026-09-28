import heroAsset from '@/img/nawa-hero.jpg';

const image = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const courses = [
    {
        id: 'secondary-biology',
        title: 'الأحياء والبيولوجيا الجزيئية — الصف الثالث الثانوي',
        shortTitle: 'أحياء تالتة ثانوي',
        description: 'شرح ومراجعة شاملة لأجهزة الجسم والمناعة والـ DNA والوراثة مع تدريب مكثف على أحدث أسئلة امتحانات الثانوية العامة ونظام بنك المعرفة.',
        category: 'الثانوية العامة (علمي علوم)',
        track: 'علمي علوم',
        level: 'الصف الثالث الثانوي',
        price: 490,
        oldPrice: 690,
        rating: 4.9,
        students: 3480,
        lessons: 36,
        duration: '٧ ساعات و٣٠ دقيقة',
        accent: 'olive',
        image: image('photo-1530026405186-ed1f139313f8'),
        instructor: 'د. أحمد الجوهري',
        instructorRole: 'أستاذ الأحياء والجيولوجيا للثانوية العامة',
        instructorAvatar: image('photo-1537368910025-700350fe46c7', 200),
        tags: ['الصف الثالث الثانوي', 'علمي علوم', 'أحياء', 'ثانوية عامة'],
        outcomes: [
            'تفهم تركيب ووظيفة أجهزة الدعامة والحركة والتنسيق الهرموني',
            'تربط بين الـ DNA وتخليق البروتين والهندسة الوراثية بدقة',
            'تتقن حل أسئلة الاختيار من متعدد بنظام الاستبعاد والتحليل العلمي',
            'نماذج امتحانات شاملة بنمط ورقة امتحان الثانوية العامة',
        ],
        requirements: ['مجلد المفاهيم أو كتاب الوزارة', 'دفتر لتدوين المخططات والرسومات'],
        audience: ['طلاب شعبة علمي علوم في الثانوية العامة', 'المقبلون على كليات الطب والعلوم والتمريض'],
        modules: [
            {
                title: 'الدعامة والحركة والتنسيق الهرموني',
                count: 4,
                duration: 'ساعة و٤٥ دقيقة',
                lessons: [
                    { title: 'الدعامة في النبات والتركيب الخلوي', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=_wmwmMeF3pE' },
                    { title: 'الدعامة في الإنسان والجهاز الهيكلي', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=0pA7qydUFbc' },
                    { title: 'الانقباض العضلي وآلية العمل العصبي', duration: '26:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                    { title: 'الغدد الصماء والتوازن الهرموني', duration: '28:00', video: 'https://www.youtube.com/watch?v=_wmwmMeF3pE' },
                ],
            },
            {
                title: 'المناعة والبيولوجيا الجزيئية (DNA)',
                count: 3,
                duration: '٣ ساعات',
                lessons: [
                    { title: 'خطوط الدفاع والمناعة الخلوية والخلطية', duration: '25:00', free: true, video: 'https://www.youtube.com/watch?v=0pA7qydUFbc' },
                    { title: 'تركيب الـ DNA وتضاعفه وإصلاح عيوبه', duration: '30:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                    { title: 'تخليق البروتين والهندسة الوراثية الحديثة', duration: '35:00', video: 'https://www.youtube.com/watch?v=_wmwmMeF3pE' },
                ],
            },
        ],
        reviews: [
            { name: 'يوسف أحمد', role: 'طالب علمي علوم — القاهرة', rating: 5, text: 'الرسومات والربط بين الفصول خلت الأحياء ممتعة ومفهومة بدون حفظ أعمى. حل الامتحانات ممتاز!', avatar: image('photo-1500648767791-00dcc994a43e', 100) },
            { name: 'مريم عادل', role: 'طالبة ثانوية عامة — الإسكندرية', rating: 5, text: 'شرح الـ DNA والمناعة كان العقبة الكبرى عندي، هنا اتفهمت في دقائق مع حل كل التركات.', avatar: image('photo-1494790108377-be9c29b29330', 100) },
        ],
    },
    {
        id: 'secondary-physics',
        title: 'الفيزياء والفيزياء الحديثة — الصف الثالث الثانوي',
        shortTitle: 'فيزياء تالتة ثانوي',
        description: 'الكهربية والتيار المتردد وقوانين كيرشوف والفيزياء الحديثة خطوة بخطوة مع تدريب مكثف على مسائل بنك المعرفة وأفكار الامتحانات.',
        category: 'الثانوية العامة (علمي علوم)',
        track: 'علمي رياضة',
        level: 'الصف الثالث الثانوي',
        price: 520,
        oldPrice: 750,
        rating: 4.9,
        students: 2950,
        lessons: 38,
        duration: '٨ ساعات و٢٠ دقيقة',
        accent: 'coral',
        image: image('photo-1636466497217-26a8cbeaf0aa'),
        instructor: 'أ. محمد عبد المعبود',
        instructorRole: 'كبير معلّمي الفيزياء للمرحلة الثانوية',
        instructorAvatar: image('photo-1506794778202-cad84cf45f1d', 200),
        tags: ['الصف الثالث الثانوي', 'علمي علوم', 'علمي رياضة', 'فيزياء', 'ثانوية عامة'],
        outcomes: [
            'إتقان قوانين كيرشوف وتوزيع التيار وفرق الجهد',
            'فهم الحث الكهرومغناطيسي والدينامو والمحولات الكهربية',
            'استيعاب ظاهرة كومتون وازدواجية الموجة والجسيم في الفيزياء الحديثة',
        ],
        requirements: ['كتاب الفيزياء المدرسي', 'آلة حاسبة علمية'],
        audience: ['طلاب علمي علوم وعلمي رياضة في الثانوية العامة', 'المقبلون على كليات الهندسة والعلوم والحاسبات'],
        modules: [
            {
                title: 'التيار الكهربي وقانون أوم وقوانين كيرشوف',
                count: 3,
                duration: 'ساعتان و١٥ دقيقة',
                lessons: [
                    { title: 'المقاومة الكهربية وقانون أوم للدوائر المغلقة', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                    { title: 'قوانين كيرشوف واستراتيجيات الحل السريع', duration: '28:00', free: true, video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE' },
                    { title: 'التأثير المغناطيسي للتيار الكهربي', duration: '30:00', video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                ],
            },
            {
                title: 'الحث الكهرومغناطيسي والفيزياء الحديثة',
                count: 3,
                duration: 'ساعتان و٤٠ دقيقة',
                lessons: [
                    { title: 'قانون فاراداي وقاعدة لنز والحث المتبادل', duration: '26:00', video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                    { title: 'المولد الكهربي (الدينامو) والمحول', duration: '32:00', video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE' },
                    { title: 'ازدواجية الموجة والجسيم وظاهرة كومتون', duration: '35:00', video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                ],
            },
        ],
        reviews: [
            { name: 'حازم شريف', role: 'طالب علمي رياضة — الجيزة', rating: 5, text: 'مسائل كيرشوف والدينامو كانت بتلخبطني، الطريقة التوضيحية حلت كل المسائل بسهولة.', avatar: image('photo-1522075469751-3a6694fb2f61', 100) },
        ],
    },
    {
        id: 'secondary-math',
        title: 'الرياضيات البحتة والتفاضل والتكامل — الصف الثالث الثانوي',
        shortTitle: 'رياضة تالتة ثانوي',
        description: 'تفاضل وتكامل وجبر وهندسة فراغية بطريقة خطوة بخطوة مع تدريب متدرج من الفكرة الأساسية إلى أصعب مسائل الامتحانات.',
        category: 'الثانوية العامة (علمي رياضة)',
        track: 'علمي رياضة',
        level: 'الصف الثالث الثانوي',
        price: 460,
        oldPrice: 650,
        rating: 4.8,
        students: 2310,
        lessons: 32,
        duration: '٧ ساعات و١٥ دقيقة',
        accent: 'sand',
        image: image('photo-1509228468518-180dd4864904'),
        instructor: 'م. عصام الشناوي',
        instructorRole: 'معلم أول الرياضيات البحتة والتطبيقية',
        instructorAvatar: image('photo-1519085360753-af0119f7cbe7', 200),
        tags: ['الصف الثالث الثانوي', 'علمي رياضة', 'رياضيات', 'ثانوية عامة'],
        outcomes: [
            'اشتقاق الدوال المثلثية والدوال الأسية واللوغاريتمية',
            'تطبيقات القيم العظمى والصغرى ومعدلات التغير الزمنية',
            'إتقان الهندسة الفراغية ومعادلة الخط والمستوى في الفراغ',
        ],
        requirements: ['أساسيات الجبر وحساب المثلثات', 'آلة حاسبة علمية'],
        audience: ['طلاب علمي رياضة في الثانوية العامة', 'المقبلون على كليات الهندسة والحاسبات والذكاء الاصطناعي'],
        modules: [
            {
                title: 'قواعد الاشتقاق وتطبيقات التفاضل',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    { title: 'مشتقات الدوال المثلثية والبارامترية', duration: '21:00', free: true, video: 'https://www.youtube.com/watch?v=wk-YlhE5c7Q' },
                    { title: 'المعادلات الزمنية المرتبطة ومعدل التغير', duration: '25:00', video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE' },
                    { title: 'رسم المنحنيات والقيم العظمى والصغرى', duration: '28:00', video: 'https://www.youtube.com/watch?v=wk-YlhE5c7Q' },
                ],
            },
            {
                title: 'التكامل المحدد والهندسة الفراغية',
                count: 2,
                duration: 'ساعتان و٣٠ دقيقة',
                lessons: [
                    { title: 'طرق التكامل بالتعويض وبالتجزئة', duration: '28:00', free: true, video: 'https://www.youtube.com/watch?v=wk-YlhE5c7Q' },
                    { title: 'حجوم ومساحات المجسمات الدورانية', duration: '32:00', video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE' },
                ],
            },
        ],
        reviews: [
            { name: 'عمر خالد', role: 'طالب علمي رياضة — طنطا', rating: 5, text: 'كل مسألة لها مدخل منظم وواضح، وده فرق جدًا معايا في سرعة الحل والدقة.', avatar: image('photo-1507003211169-0a1dd7228f2d', 100) },
        ],
    },
    {
        id: 'secondary-chemistry',
        title: 'الكيمياء العامة والعضوية — الصف الثالث الثانوي',
        shortTitle: 'كيمياء تالتة ثانوي',
        description: 'تأسيس متين وشرح تفصيلي للعناصر الانتقالية والاتزان الكيميائي والكيمياء الكهربية والعضوية مع نماذج وزارية حديثة.',
        category: 'الثانوية العامة (علمي علوم)',
        track: 'علمي علوم',
        level: 'الصف الثالث الثانوي',
        price: 480,
        oldPrice: 680,
        rating: 4.9,
        students: 2780,
        lessons: 34,
        duration: '٧ ساعات و٤٥ دقيقة',
        accent: 'olive',
        image: image('photo-1532094349884-543bc11b234d'),
        instructor: 'د. طارق عبد الجليل',
        instructorRole: 'خبير تدريس الكيمياء للثانوية العامة',
        instructorAvatar: image('photo-1472099645785-5658abf4ff4e', 200),
        tags: ['الصف الثالث الثانوي', 'علمي علوم', 'علمي رياضة', 'كيمياء', 'ثانوية عامة'],
        outcomes: [
            'فهم خواص وتفاعلات السلسلة الانتقالية الأولى وخامات الحديد',
            'حساب ثابت الاتزان وقاعدة لوشاتيليه ومسائل الـ pH',
            'إتقان تفاعلات الهيدروكربونات والكيمياء العضوية بالكامل',
        ],
        requirements: ['جدول العناصر الدورية', 'دفتر لمعادلات الكيمياء'],
        audience: ['طلاب الثانوية العامة شعبة علمي علوم وعلمي رياضة', 'المقبلون على كليات الصيدلة والهندسة الكيميائية'],
        modules: [
            {
                title: 'العناصر الانتقالية والتحليل الكيميائي',
                count: 3,
                duration: 'ساعتان و١٠ دقائق',
                lessons: [
                    { title: 'الخواص العامة لعناصر السلسلة الانتقالية الأولى', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=thXilnp5UNQ' },
                    { title: 'خامات الحديد والسبائك والأكاسيد', duration: '24:00', video: 'https://www.youtube.com/watch?v=0pA7qydUFbc' },
                    { title: 'التحليل الوصفي والكمي ومسائل المعايرة والتطاير', duration: '28:00', video: 'https://www.youtube.com/watch?v=thXilnp5UNQ' },
                ],
            },
            {
                title: 'الكيمياء الكهربية والكيمياء العضوية',
                count: 2,
                duration: 'ساعتان و٤٥ دقيقة',
                lessons: [
                    { title: 'الخلايا الجلفانية والإلكتروليتية وقوانين فاراداي', duration: '29:00', free: true, video: 'https://www.youtube.com/watch?v=thXilnp5UNQ' },
                    { title: 'الألكانات والألكينات والألكاينات وتسمية IUPAC', duration: '35:00', video: 'https://www.youtube.com/watch?v=0pA7qydUFbc' },
                ],
            },
        ],
        reviews: [
            { name: 'نوران حسام', role: 'طالبة علمي علوم — المنصورة', rating: 5, text: 'معادلات العضوية والتحليل الكمي اتشرحت بطريقة الخرائط الذهنية وحفظتها بسهولة.', avatar: image('photo-1534528741775-53994a69daeb', 100) },
        ],
    },
    {
        id: 'secondary-arabic',
        title: 'اللغة العربية والبلاغة والنحو — الصف الأول الثانوي',
        shortTitle: 'عربي أولى ثانوي',
        description: 'فهم النصوص والنحو والبلاغة والأدب في مسار واحد يضمن تأسيسًا قويًا وانطلاقة نموذجية في المرحلة الثانوية.',
        category: 'الثانوية العامة (أدبي)',
        track: 'ثانوي عام — عام',
        level: 'الصف الأول الثانوي',
        price: 340,
        oldPrice: 480,
        rating: 4.8,
        students: 2450,
        lessons: 26,
        duration: '٥ ساعات و١٠ دقائق',
        accent: 'coral',
        image: image('photo-1516979187457-637abb4f9353'),
        instructor: 'أ. حسام خليل',
        instructorRole: 'معلّم خبير في البلاغة والأدب والنصوص',
        instructorAvatar: image('photo-1506794778202-cad84cf45f1d', 200),
        tags: ['الصف الأول الثانوي', 'لغة عربية', 'ثانوي عام', 'بلاغة'],
        outcomes: [
            'إتقان التشبيه والاستعارة والكناية والمجاز في البلاغة',
            'فهم الأفعال الناقصة والتامة وإعمال المشتقات في النحو',
            'مهارات القراءة المتحررة وكتابة المقال والتعبير النموذجي',
        ],
        requirements: ['كتاب اللغة العربية', 'رغبة في التدريب المستمر'],
        audience: ['طلاب أولى ثانوي', 'من يريد بداية نموذجية في المرحلة الثانوية'],
        modules: [
            {
                title: 'البلاغة والنصوص المتحررة',
                count: 3,
                duration: 'ساعة و٣٠ دقيقة',
                lessons: [
                    { title: 'الفرق بين الحقيقة والمجاز وأنواع التشبيه', duration: '18:00', free: true, video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                    { title: 'الاستعارة المكنية والتصريحية وسر الجمال', duration: '20:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                    { title: 'كيف تحل سؤال القراءة والنصوص المتحررة؟', duration: '22:00', video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                ],
            },
            {
                title: 'النحو وقواعد اللغة',
                count: 2,
                duration: 'ساعتان',
                lessons: [
                    { title: 'كان وأخواتها التامة والناقصة وكاد وأخواتها', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                    { title: 'إعمال اسم الفاعل واسم المفعول وصيغ المبالغة', duration: '25:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                ],
            },
        ],
        reviews: [
            { name: 'جنى مصطفى', role: 'طالبة أولى ثانوي — أسيوط', rating: 5, text: 'البلاغة كانت معقدة جدًا بالنسبة لي، لكن الشرح بالأمثلة الحية خلاها أسهل مادة.', avatar: image('photo-1544005313-94ddf0286df2', 100) },
        ],
    },
    {
        id: 'secondary-geology',
        title: 'الجيولوجيا وعلوم البيئة — الصف الثالث الثانوي',
        shortTitle: 'جيولوجيا تالتة ثانوي',
        description: 'شرح مبسط للصخور، التراكيب الجيولوجية، الحركات الأرضية، وعلوم البيئة مع حل أحدث بنوك الأسئلة وامتحانات الثانوية العامة.',
        category: 'الثانوية العامة (علمي علوم)',
        track: 'علمي علوم',
        level: 'الصف الثالث الثانوي',
        price: 420,
        oldPrice: 600,
        rating: 4.9,
        students: 3120,
        lessons: 30,
        duration: '٦ ساعات و٢٠ دقيقة',
        accent: 'sand',
        image: image('photo-1464822759023-fed622ff2c3b'),
        instructor: 'أ. ماجد إمام',
        instructorRole: 'خبير تدريس الجيولوجيا وعلوم البيئة للثانوية العامة',
        instructorAvatar: image('photo-1507003211169-0a1dd7228f2d', 200),
        tags: ['الصف الثالث الثانوي', 'علمي علوم', 'جيولوجيا', 'ثانوية عامة'],
        outcomes: [
            'استيعاب التراكيب الجيولوجية الأولية والثانوية والفوالق والطيات',
            'فهم دورة الصخور والأنشطة البركانية وحركات الألواح التكتونية',
            'إتقان حل أسئلة الربط البيئي واستنزاف الموارد الطبيعية',
        ],
        requirements: ['كتاب الجيولوجيا والبيئة للثانوية العامة'],
        audience: ['طلاب شعبة علمي علوم في الثانوية العامة'],
        modules: [
            {
                title: 'التراكيب الجيولوجية وحركات الأرض',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    { title: 'علم الجيولوجيا ومكونات كوكب الأرض', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                    { title: 'الطيات والفوالق والفواصل وأهميتها الاقتصادية', duration: '24:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                    { title: 'السلم الجيولوجي وتطور الحياة عبر العصور', duration: '28:00', video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                ],
            },
            {
                title: 'دورة الصخور وعلوم البيئة',
                count: 2,
                duration: 'ساعتان و١٥ دقيقة',
                lessons: [
                    { title: 'الصخور النارية والرسوبية والمتحولة', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                    { title: 'النظم البيئية وسلاسل الغذاء المائية والبرية', duration: '25:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                ],
            },
        ],
        reviews: [
            { name: 'ياسمين حسني', role: 'طالبة علمي علوم — الإسماعيلية', rating: 5, text: 'الجيولوجيا كانت مادة حفظ بحت، لكن هنا كل صخر وظاهرة مربوطة بصور واقعية ممتعة جداً.', avatar: image('photo-1494790108377-be9c29b29330', 100) },
        ],
    },
    {
        id: 'secondary-english',
        title: 'اللغة الإنجليزية وقواعد الـ Grammar — الصف الثاني الثانوي',
        shortTitle: 'إنجليزي تانية ثانوي',
        description: 'شرح القواعد وترجمة المقالات وحل أسئلة الفهم والقطع المتحررة ومهارات الكتابة بنمط الثانوية العامة الحديث.',
        category: 'الثانوية العامة (أدبي)',
        track: 'علمي وأدبي',
        level: 'الصف الثاني الثانوي',
        price: 360,
        oldPrice: 500,
        rating: 4.8,
        students: 2120,
        lessons: 28,
        duration: '٥ ساعات و٣٠ دقيقة',
        accent: 'sand',
        image: image('photo-1457369804613-52c61a468e7d'),
        instructor: 'مستر هشام توفيق',
        instructorRole: 'خبير تدريس اللغة الإنجليزية للمرحلة الثانوية',
        instructorAvatar: image('photo-1507003211169-0a1dd7228f2d', 200),
        tags: ['الصف الثاني الثانوي', 'لغة إنجليزية', 'ثانوية عامة'],
        outcomes: [
            'إتقان الأزمنة وقواعد المبني للمجهول وقواعد الكلام غير المباشر',
            'بناء حصيلة لغوية قوية في الترجمة والمصطلحات الشائعة',
            'حل قطع الفهم المتحررة والتدريب على نمط الاختيار من متعدد',
        ],
        requirements: ['دفتر المفردات والقواعد'],
        audience: ['طلاب الصف الثاني الثانوي علمي وأدبي'],
        modules: [
            {
                title: 'قواعد الأزمنة وبناء الجملة',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    { title: 'Tenses & Present/Past Structures', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                    { title: 'Passive Voice & Modal Verbs', duration: '25:00', video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE' },
                    { title: 'Reported Speech & Conditionals', duration: '28:00', video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                ],
            },
        ],
        reviews: [
            { name: 'كريم وائل', role: 'طالب تانية ثانوي — دمياط', rating: 5, text: 'طريقة مستر هشام في شرح القواعد وحل الترجمة مبسطة ومباشرة جداً.', avatar: image('photo-1500648767791-00dcc994a43e', 100) },
        ],
    },
    {
        id: 'baccalaureate-medical',
        title: 'مسار الطب وعلوم الحياة والبيولوجيا — البكالوريا المصرية',
        shortTitle: 'علوم الحياة — البكالوريا',
        description: 'المسار التخصصي الحديث للبكالوريا المصرية في الأحياء والعلوم الحيوية وتطبيقات التكنولوجيا الطبية المعاصرة.',
        category: 'البكالوريا المصرية',
        track: 'مسار الطب وعلوم الحياة',
        level: 'الصف الأول بالبكالوريا (تمهيدي)',
        price: 550,
        oldPrice: 790,
        rating: 4.9,
        students: 1820,
        lessons: 30,
        duration: '٦ ساعات و٤٥ دقيقة',
        accent: 'olive',
        image: image('photo-1579154204601-01588f351e67'),
        instructor: 'د. سارة عبد العزيز',
        instructorRole: 'استشارية المناهج بنظام البكالوريا المصرية',
        instructorAvatar: image('photo-1573496359142-b8d87734a5a2', 200),
        tags: ['البكالوريا المصرية', 'مسار الطب وعلوم الحياة', 'أحياء', 'علوم'],
        outcomes: [
            'التعرف على مسارات البكالوريا المصرية ومقررات الطب وعلوم الحياة',
            'التطبيق العملي على دراسات الحالة البيولوجية والطبية',
            'الإعداد للمشاريع التقييمية ونماذج التقييم التراكمي الحديثة',
        ],
        requirements: ['الالتحاق بنظام البكالوريا المصرية'],
        audience: ['طلاب المرحلة الثانوية بنظام البكالوريا المصرية الراغبون في التخصص الطبي والحيوي'],
        modules: [
            {
                title: 'مقدمة مسار العلوم الحيوية والطبية',
                count: 3,
                duration: 'ساعتان و١٥ دقيقة',
                lessons: [
                    { title: 'أهداف مسار الطب والعلوم الحيوية في البكالوريا المصرية', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=_wmwmMeF3pE' },
                    { title: 'الخلايا والجينات وتطبيقات الهندسة الحيوية', duration: '26:00', video: 'https://www.youtube.com/watch?v=0pA7qydUFbc' },
                    { title: 'منهجية البحث العلمي والمشروع التطبيقي', duration: '30:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                ],
            },
        ],
        reviews: [
            { name: 'فريدة محمد', role: 'طالبة بكالوريا مصرية — القاهرة', rating: 5, text: 'المسار منظم ومواكب للنظام الحديث، والشرح يربط بين المنهج النظري والتطبيق الطبي.', avatar: image('photo-1534528741775-53994a69daeb', 100) },
        ],
    },
    {
        id: 'baccalaureate-engineering',
        title: 'مسار الهندسة وتكنولوجيا المعلومات والبرمجة — البكالوريا المصرية',
        shortTitle: 'الهندسة والبرمجة — البكالوريا',
        description: 'المسار التخصصي الحديث للبكالوريا المصرية في الخوارزميات، التفكير الهندسي، والروبوتات وتطبيقات الذكاء الاصطناعي.',
        category: 'البكالوريا المصرية',
        track: 'مسار الهندسة وتكنولوجيا المعلومات',
        level: 'الصف الثاني بالبكالوريا',
        price: 540,
        oldPrice: 780,
        rating: 4.9,
        students: 1640,
        lessons: 28,
        duration: '٦ ساعات و١٥ دقيقة',
        accent: 'sand',
        image: image('photo-1518770660439-4636190af475'),
        instructor: 'م. أحمد الشربيني',
        instructorRole: 'خبير مناهج الهندسة والبرمجيات بنظام البكالوريا',
        instructorAvatar: image('photo-1507003211169-0a1dd7228f2d', 200),
        tags: ['البكالوريا المصرية', 'مسار الهندسة وتكنولوجيا المعلومات', 'رياضيات', 'برمجة', 'هندسة'],
        outcomes: [
            'استيعاب المبادئ الهندسية وأساسيات الحوسبة والخوارزميات',
            'بناء نماذج برمجية وتطبيقات ذكية مصغرة',
            'التدريب على المشاريع التراكمية المعتمدة بالبكالوريا',
        ],
        requirements: ['الالتحاق بنظام البكالوريا المصرية مسار الهندسة'],
        audience: ['طلاب البكالوريا المصرية المهتمون بالهندسة والذكاء الاصطناعي'],
        modules: [
            {
                title: 'مبادئ التفكير الهندسي والخوارزميات',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    { title: 'الخوارزميات وحل المشكلات الهندسية', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=wk-YlhE5c7Q' },
                    { title: 'مبادئ الأنظمة المدمجة والروبوتات', duration: '25:00', video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE' },
                    { title: 'مشروع المسار الهندسي الفصلي', duration: '30:00', video: 'https://www.youtube.com/watch?v=wk-YlhE5c7Q' },
                ],
            },
        ],
        reviews: [
            { name: 'يوسف شادي', role: 'طالب بكالوريا مسار الهندسة', rating: 5, text: 'المسار ربط بين الرياضة والتطبيق البرمجي العملي بطريقة احترافية جداً.', avatar: image('photo-1500648767791-00dcc994a43e', 100) },
        ],
    },
    {
        id: 'baccalaureate-business',
        title: 'مسار إدارة الأعمال والاقتصاد والريادة — البكالوريا المصرية',
        shortTitle: 'إدارة الأعمال — البكالوريا',
        description: 'المسار التخصصي الحديث للبكالوريا المصرية في الاقتصاد الجزئي والكلي، ريادة الأعمال، والتحليل المالي والمشروعات.',
        category: 'البكالوريا المصرية',
        track: 'مسار إدارة الأعمال والاقتصاد',
        level: 'الصف الثاني بالبكالوريا',
        price: 480,
        oldPrice: 700,
        rating: 4.8,
        students: 1350,
        lessons: 26,
        duration: '٥ ساعات و٤٥ دقيقة',
        accent: 'sand',
        image: image('photo-1460925895917-afdab827c52f'),
        instructor: 'د. تامر عبد الحميد',
        instructorRole: 'خبير تدريس الاقتصاد وإدارة الأعمال الدولية',
        instructorAvatar: image('photo-1472099645785-5658abf4ff4e', 200),
        tags: ['البكالوريا المصرية', 'مسار إدارة الأعمال والاقتصاد', 'اقتصاد', 'إدارة أعمال'],
        outcomes: [
            'فهم مبادئ دراسات الجدوى والتفكير الريادي والتحليل المالي',
            'استيعاب آليات العرض والطلب وتأثير التضخم والأسواق العالمية',
            'إعداد خطة نموذج عمل تجاري متكاملة للتقييم التراكمي',
        ],
        requirements: ['الالتحاق بمسار إدارة الأعمال والاقتصاد بالبكالوريا المصرية'],
        audience: ['طلاب البكالوريا المصرية الراغبون في تخصصات التجارة وإدارة الأعمال والاقتصاد الدولي'],
        modules: [
            {
                title: 'أساسيات الاقتصاد ونموذج العمل التجاري',
                count: 3,
                duration: 'ساعتان و١٠ دقائق',
                lessons: [
                    { title: 'مقدمة الاقتصاد الكلي ومؤشرات النمو', duration: '22:00', free: true, video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                    { title: 'بناء نموذج العمل التجاري ودراسة الجدوى', duration: '25:00', video: 'https://www.youtube.com/watch?v=2I-nwLZSwAY' },
                    { title: 'الإدارة المالية واستراتيجيات التسويق', duration: '28:00', video: 'https://www.youtube.com/watch?v=evbAyPgYkIk' },
                ],
            },
        ],
        reviews: [
            { name: 'زياد كريم', role: 'طالب بكالوريا مسار إدارة الأعمال', rating: 5, text: 'شرح ممتع يربط بين النظرية الاقتصادية والواقع العملي للشركات الناشئة.', avatar: image('photo-1519085360753-af0119f7cbe7', 100) },
        ],
    },
    {
        id: 'baccalaureate-arts',
        title: 'مسار الآداب والعلوم الإنسانية والفنون — البكالوريا المصرية',
        shortTitle: 'العلوم الإنسانية — البكالوريا',
        description: 'المسار التخصصي للبكالوريا المصرية في الفلسفة التطبيقية، التاريخ النقدي، الأدب المقارن، ومناهج البحث الاجتماعي.',
        category: 'البكالوريا المصرية',
        track: 'مسار الآداب والعلوم الإنسانية والفنون',
        level: 'الصف الثالث بالبكالوريا (تخرج)',
        price: 450,
        oldPrice: 650,
        rating: 4.9,
        students: 1220,
        lessons: 24,
        duration: '٥ ساعات و١٥ دقيقة',
        accent: 'olive',
        image: image('photo-1457369804613-52c61a468e7d'),
        instructor: 'د. نهى زهران',
        instructorRole: 'أستاذة العلوم الإنسانية ومناهج النقد الأدبي',
        instructorAvatar: image('photo-1544005313-94ddf0286df2', 200),
        tags: ['البكالوريا المصرية', 'مسار الآداب والعلوم الإنسانية والفنون', 'لغة عربية', 'علوم إنسانية', 'فلسفة'],
        outcomes: [
            'التحليل النقدي للنصوص الفلسفية والأدبية المقارنة',
            'إتقان مهارات الكتابة الأكاديمية والبحث الاجتماعي الميداني',
            'الإعداد للمشروع النهائي لمسار الآداب والعلوم الإنسانية',
        ],
        requirements: ['الالتحاق بمسار الآداب والعلوم الإنسانية بالبكالوريا المصرية'],
        audience: ['طلاب البكالوريا المصرية المتجهون لكليات الإعلام والألسن والآداب والعلوم السياسية والفنون'],
        modules: [
            {
                title: 'مناهج الفكر الإنساني والبحث المقارن',
                count: 3,
                duration: 'ساعتان',
                lessons: [
                    { title: 'التفكير النقدي ونظريات المعرفة', duration: '20:00', free: true, video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                    { title: 'الأدب المقارن والترجمة الثقافية', duration: '24:00', video: 'https://www.youtube.com/watch?v=M7lc1UVf-VE' },
                    { title: 'منهجية إعداد البحث والمقال التحليلي', duration: '26:00', video: 'https://www.youtube.com/watch?v=wHC245cVdHw' },
                ],
            },
        ],
        reviews: [
            { name: 'ندى شريف', role: 'طالبة بكالوريا مسار الآداب', rating: 5, text: 'طريقة طرح الأفكار والمناقشة تفتح آفاقًا جديدة في فهم العلوم الإنسانية.', avatar: image('photo-1534528741775-53994a69daeb', 100) },
        ],
    },
];

export const categories = [
    'كل المناهج والمسارات',
    'الثانوية العامة (علمي علوم)',
    'الثانوية العامة (علمي رياضة)',
    'الثانوية العامة (أدبي)',
    'البكالوريا المصرية',
];

export const gradeChips = [
    'كل الصفوف',
    'الصف الثالث الثانوي',
    'الصف الثاني الثانوي',
    'الصف الأول الثانوي',
    'الصف الأول بالبكالوريا (تمهيدي)',
    'الصف الثاني بالبكالوريا',
    'الصف الثالث بالبكالوريا (تخرج)',
];

export const subjectChips = [
    'كل المواد والمسارات',
    'أحياء وجيولوجيا',
    'فيزياء',
    'كيمياء',
    'رياضيات وتفاضل',
    'لغة عربية وبلاغة',
    'لغة إنجليزية',
    'مسار الطب وعلوم الحياة',
    'مسار الهندسة وتكنولوجيا المعلومات',
    'مسار إدارة الأعمال والاقتصاد',
    'مسار الآداب والعلوم الإنسانية',
];

export const egyptEducationOptions = {
    stages: ['الثانوية العامة', 'البكالوريا المصرية'],
    stageMap: {
        'الثانوية العامة': {
            label: 'الثانوية العامة',
            shortLabel: 'ثانوي عام',
            description: 'مسار عام · علمي علوم · علمي رياضة · أدبي',
            grades: [
                'الصف الأول الثانوي',
                'الصف الثاني الثانوي',
                'الصف الثالث الثانوي',
            ],
            tracks: [
                'علمي علوم',
                'علمي رياضة',
                'أدبي',
                'ثانوي عام — عام (الصف الأول)',
            ],
        },
        'البكالوريا المصرية': {
            label: 'البكالوريا المصرية',
            shortLabel: 'بكالوريا مصرية',
            description: 'نظام البكالوريا الحديث ومساراته المعتمدة',
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
    { label: 'كيفية الاشتراك في الكورس', href: '/#how' },
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
    { quote: 'مراجعات الثانوية العامة والبكالوريا منظمة جداً، والفيديوهات واضحة ومباشرة بدون حشو أو إطالة.', name: 'مازن علي', detail: 'طالب الثانوية العامة' },
    { quote: 'استفدت جداً من مسار العمل الحر واستراتيجية المحتوى، نقلت شغلي لمستوى احترافي حقيقي.', name: 'سلمى يحيى', detail: 'صانعة محتوى ومستقلة' },
];

export const stats = [
    { value: '١٤.٨ ألف', label: 'متعلّم بدأ مساره' },
    { value: '٩٨٪', label: 'نسبة الرضا والإكمال' },
    { value: '٤.٩/٥', label: 'متوسط تقييم المعلمين' },
];

export const badges = ['نخبة من كبار المعلمين', 'مشاهدة ومتابعة مدى الحياة', 'تمارين وفيديوهات عالية الدقة'];

export const footerColumns = [
    { title: 'استكشف', links: ['كل الكورسات', 'المناهج الدراسية'] },
    { title: 'نَوَى', links: ['عن المنصة', 'المعلمون والخبراء', 'كيفية الاشتراك في الكورس'] },
    { title: 'الدعم والمساعدة', links: ['تواصل معنا والدعم الفني', 'الشروط والأحكام', 'سياسة الخصوصية'] },
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
export const footerNote = 'منصة تعليمية عربية متخصصة في مناهج الثانوية العامة والبكالوريا المصرية الحديثة.';
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
export const refNote = 'منصة نَوَى التعليمية — بيئة متكاملة لمناهج الثانوية العامة والبكالوريا المصرية.';
export const scrollRevealClass = 'reveal';
export const reducedMotionNote = 'تحترم الواجهة إعداد تقليل الحركة في النظام.';
export const designTone = 'Warm editorial learning';
export const colorPalette = { ink: '#252622', paper: '#f7f3ed', mist: '#ebe6dd', coral: '#d86e4d', olive: '#6c775d', clay: '#bd9474', line: '#ded7cc' };
export const typography = { display: 'Noto Kufi Arabic', body: 'IBM Plex Sans Arabic', latin: 'DM Sans' };
export const iconSet = 'Lucide React';
export const inspirationSummary = 'تجربة تعليمية متكاملة لمناهج الثانوية العامة والبكالوريا المصرية.';
export const assetSummary = 'صور عالية الدقة مستضافة بجودة فائقة تناسب بيئة نَوَى.';
export const appDescription = 'منصة تعليمية عربية حديثة متخصصة في مناهج الثانوية العامة والبكالوريا المصرية بأحدث الطرق التفاعلية.';
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
    { number: '٠١', title: 'حدد مسارك', text: 'حدد مرحلتك الدراسية أو شعبتك التي تريد التفوق فيها.' },
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
export const researchDisclaimer = 'منصة تعليمية متطورة مصممة للمتعلمين في الثانوية العامة والبكالوريا المصرية.';
export const primaryImageAlt = 'غلاف المسار التعليمي';
export const fallbackAvatar = image('photo-1494790108377-be9c29b29330', 180);
export const defaultCourse = featuredCourse;
export const currentRoute = '/';
export const productName = 'نَوَى';
export const productTagline = 'تعلّمٌ يشبهك.';
export const seoTitle = 'نَوَى — منصة تعلّم عربية حديثة للثانوية العامة والبكالوريا';
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
