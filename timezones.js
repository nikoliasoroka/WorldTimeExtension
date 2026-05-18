// names[lang] = localized city label shown in the clock card
const TIMEZONES = [
  { label:"Baker Island",  zone:"Etc/GMT+12",                     city:"Baker Island",  search:[], names:{} },
  { label:"Samoa",         zone:"Pacific/Pago_Pago",              city:"Pago Pago",     search:[], names:{} },
  {
    label:"Hawaii", zone:"Pacific/Honolulu", city:"Honolulu",
    search:["ハワイ","하와이","夏威夷","Гаваї"],
    names:{uk:"Гаваї",ja:"ハワイ",ko:"하와이",zh:"夏威夷",hi:"हवाई",es:"Hawái",fr:"Hawaï",de:"Hawaii",it:"Hawaii",pt:"Havaí"}
  },
  {
    label:"Los Angeles", zone:"America/Los_Angeles", city:"Los Angeles",
    search:["ロサンゼルス","로스앤젤레스","洛杉矶","Лос-Анджелес","LA"],
    names:{uk:"Лос-Анджелес",ja:"ロサンゼルス",ko:"로스앤젤레스",zh:"洛杉矶",hi:"लॉस एंजेलेस",es:"Los Ángeles",fr:"Los Angeles",de:"Los Angeles",it:"Los Angeles",pt:"Los Angeles"}
  },
  {
    label:"New York", zone:"America/New_York", city:"New York",
    search:["ニューヨーク","뉴욕","纽约","Нью-Йорк","Nueva York","NYC"],
    names:{uk:"Нью-Йорк",ja:"ニューヨーク",ko:"뉴욕",zh:"纽约",hi:"न्यूयॉर्क",es:"Nueva York",fr:"New York",de:"New York",it:"New York",pt:"Nova York"}
  },
  {
    label:"Toronto", zone:"America/Toronto", city:"Toronto",
    search:["トロント","토론토","多伦多","Торонто"],
    names:{uk:"Торонто",ja:"トロント",ko:"토론토",zh:"多伦多",hi:"टोरंटो"}
  },
  {
    label:"Chicago", zone:"America/Chicago", city:"Chicago",
    search:["シカゴ","시카고","芝加哥","Чикаго"],
    names:{uk:"Чикаго",ja:"シカゴ",ko:"시카고",zh:"芝加哥",hi:"शिकागो"}
  },
  {
    label:"Denver", zone:"America/Denver", city:"Denver",
    search:["デンバー","덴버","丹佛","Денвер"],
    names:{uk:"Денвер",ja:"デンバー",ko:"덴버",zh:"丹佛",hi:"डेनवर"}
  },
  {
    label:"Buenos Aires", zone:"America/Argentina/Buenos_Aires", city:"Buenos Aires",
    search:["ブエノスアイレス","부에노스아이레스","布宜诺斯艾利斯","Буенос-Айрес"],
    names:{uk:"Буенос-Айрес",ja:"ブエノスアイレス",ko:"부에노스아이레스",zh:"布宜诺斯艾利斯",hi:"ब्यूनस आयर्स",es:"Buenos Aires",fr:"Buenos Aires",it:"Buenos Aires",pt:"Buenos Aires"}
  },
  {
    label:"São Paulo", zone:"America/Sao_Paulo", city:"São Paulo",
    search:["サンパウロ","상파울루","圣保罗","Сан-Паулу","Sao Paulo"],
    names:{uk:"Сан-Паулу",ja:"サンパウロ",ko:"상파울루",zh:"圣保罗",hi:"साओ पाउलो",es:"São Paulo",fr:"São Paulo",de:"São Paulo",it:"São Paulo"}
  },
  {
    label:"Santiago", zone:"America/Santiago", city:"Santiago",
    search:["サンティアゴ","산티아고","圣地亚哥","Сантьяго"],
    names:{uk:"Сантьяго",ja:"サンティアゴ",ko:"산티아고",zh:"圣地亚哥",hi:"सेंटियागो"}
  },
  {
    label:"London", zone:"Europe/London", city:"London",
    search:["ロンドン","런던","伦敦","Лондон","Londres"],
    names:{uk:"Лондон",ja:"ロンドン",ko:"런던",zh:"伦敦",hi:"लंदन",es:"Londres",fr:"Londres",de:"London",it:"Londra",pt:"Londres"}
  },
  {
    label:"Dublin", zone:"Europe/Dublin", city:"Dublin",
    search:["ダブリン","더블린","都柏林","Дублін"],
    names:{uk:"Дублін",ja:"ダブリン",ko:"더블린",zh:"都柏林",hi:"डबलिन",fr:"Dublin",de:"Dublin",it:"Dublino",pt:"Dublim"}
  },
  {
    label:"Lisbon", zone:"Europe/Lisbon", city:"Lisbon",
    search:["リスボン","리스본","里斯本","Лісабон","Lisboa"],
    names:{uk:"Лісабон",ja:"リスボン",ko:"리스본",zh:"里斯本",hi:"लिस्बन",es:"Lisboa",fr:"Lisbonne",de:"Lissabon",it:"Lisbona",pt:"Lisboa"}
  },
  {
    label:"Paris", zone:"Europe/Paris", city:"Paris",
    search:["パリ","파리","巴黎","Париж"],
    names:{uk:"Париж",ja:"パリ",ko:"파리",zh:"巴黎",hi:"पेरिस",es:"París",de:"Paris",it:"Parigi",pt:"Paris"}
  },
  {
    label:"Berlin", zone:"Europe/Berlin", city:"Berlin",
    search:["ベルリン","베를린","柏林","Берлін"],
    names:{uk:"Берлін",ja:"ベルリン",ko:"베를린",zh:"柏林",hi:"बर्लिन",es:"Berlín",fr:"Berlin",it:"Berlino",pt:"Berlim"}
  },
  {
    label:"Madrid", zone:"Europe/Madrid", city:"Madrid",
    search:["マドリード","마드리드","马德里","Мадрид"],
    names:{uk:"Мадрид",ja:"マドリード",ko:"마드리드",zh:"马德里",hi:"मैड्रिड",fr:"Madrid",de:"Madrid",it:"Madrid",pt:"Madrid"}
  },
  {
    label:"Rome", zone:"Europe/Rome", city:"Rome",
    search:["ローマ","로마","罗马","Рим","Roma"],
    names:{uk:"Рим",ja:"ローマ",ko:"로마",zh:"罗马",hi:"रोम",es:"Roma",fr:"Rome",de:"Rom",it:"Roma",pt:"Roma"}
  },
  {
    label:"Amsterdam", zone:"Europe/Amsterdam", city:"Amsterdam",
    search:["アムステルダム","암스테르담","阿姆斯特丹","Амстердам"],
    names:{uk:"Амстердам",ja:"アムステルダム",ko:"암스테르담",zh:"阿姆斯特丹",hi:"एम्स्टर्डम",es:"Ámsterdam",fr:"Amsterdam",de:"Amsterdam",it:"Amsterdam",pt:"Amsterdã"}
  },
  {
    label:"Brussels", zone:"Europe/Brussels", city:"Brussels",
    search:["ブリュッセル","브뤼셀","布鲁塞尔","Брюссель","Bruxelles"],
    names:{uk:"Брюссель",ja:"ブリュッセル",ko:"브뤼셀",zh:"布鲁塞尔",hi:"ब्रुसेल्स",es:"Bruselas",fr:"Bruxelles",de:"Brüssel",it:"Bruxelles",pt:"Bruxelas"}
  },
  {
    label:"Stockholm", zone:"Europe/Stockholm", city:"Stockholm",
    search:["ストックホルム","스톡홀름","斯德哥尔摩","Стокгольм"],
    names:{uk:"Стокгольм",ja:"ストックホルム",ko:"스톡홀름",zh:"斯德哥尔摩",hi:"स्टॉकहोम",es:"Estocolmo",fr:"Stockholm",de:"Stockholm",it:"Stoccolma",pt:"Estocolmo"}
  },
  {
    label:"Oslo", zone:"Europe/Oslo", city:"Oslo",
    search:["オスロ","오슬로","奥斯陆","Осло"],
    names:{uk:"Осло",ja:"オスロ",ko:"오슬로",zh:"奥斯陆",hi:"ओस्लो"}
  },
  {
    label:"Copenhagen", zone:"Europe/Copenhagen", city:"Copenhagen",
    search:["コペンハーゲン","코펜하겐","哥本哈根","Копенгаген","Copenhague"],
    names:{uk:"Копенгаген",ja:"コペンハーゲン",ko:"코펜하겐",zh:"哥本哈根",hi:"कोपेनहेगन",es:"Copenhague",fr:"Copenhague",de:"Kopenhagen",it:"Copenaghen",pt:"Copenhague"}
  },
  {
    label:"Warsaw", zone:"Europe/Warsaw", city:"Warsaw",
    search:["ワルシャワ","바르샤바","华沙","Варшава","Varsovia","Varsovie"],
    names:{uk:"Варшава",ja:"ワルシャワ",ko:"바르샤바",zh:"华沙",hi:"वारसॉ",es:"Varsovia",fr:"Varsovie",de:"Warschau",it:"Varsavia",pt:"Varsóvia"}
  },
  {
    label:"Prague", zone:"Europe/Prague", city:"Prague",
    search:["プラハ","프라하","布拉格","Прага","Praha"],
    names:{uk:"Прага",ja:"プラハ",ko:"프라하",zh:"布拉格",hi:"प्राग",es:"Praga",fr:"Prague",de:"Prag",it:"Praga",pt:"Praga"}
  },
  {
    label:"Vienna", zone:"Europe/Vienna", city:"Vienna",
    search:["ウィーン","빈","维也纳","Відень","Vienne","Wien"],
    names:{uk:"Відень",ja:"ウィーン",ko:"빈",zh:"维也纳",hi:"वियना",es:"Viena",fr:"Vienne",de:"Wien",it:"Vienna",pt:"Viena"}
  },
  {
    label:"Zurich", zone:"Europe/Zurich", city:"Zurich",
    search:["チューリッヒ","취리히","苏黎世","Цюрих","Zurigo","Zürich"],
    names:{uk:"Цюрих",ja:"チューリッヒ",ko:"취리히",zh:"苏黎世",hi:"ज्यूरिख",es:"Zúrich",fr:"Zurich",de:"Zürich",it:"Zurigo",pt:"Zurique"}
  },
  {
    label:"Helsinki", zone:"Europe/Helsinki", city:"Helsinki",
    search:["ヘルシンキ","헬싱키","赫尔辛基","Гельсінкі"],
    names:{uk:"Гельсінкі",ja:"ヘルシンキ",ko:"헬싱키",zh:"赫尔辛基",hi:"हेलसिंकी",es:"Helsinki",fr:"Helsinki",de:"Helsinki",it:"Helsinki",pt:"Helsínquia"}
  },
  {
    label:"Athens", zone:"Europe/Athens", city:"Athens",
    search:["アテネ","아테네","雅典","Афіни","Atenas","Athènes"],
    names:{uk:"Афіни",ja:"アテネ",ko:"아테네",zh:"雅典",hi:"एथेंस",es:"Atenas",fr:"Athènes",de:"Athen",it:"Atene",pt:"Atenas"}
  },
  {
    label:"Bucharest", zone:"Europe/Bucharest", city:"Bucharest",
    search:["ブカレスト","부쿠레슈티","布加勒斯特","Бухарест"],
    names:{uk:"Бухарест",ja:"ブカレスト",ko:"부쿠레슈티",zh:"布加勒斯特",hi:"बुखारेस्ट",es:"Bucarest",fr:"Bucarest",de:"Bukarest",it:"Bucarest",pt:"Bucareste"}
  },
  {
    label:"Kyiv", zone:"Europe/Kiev", city:"Kyiv",
    search:["キエフ","키이우","基辅","Київ","Kiev"],
    names:{uk:"Київ",ja:"キーウ",ko:"키이우",zh:"基辅",hi:"कीव",es:"Kiev",fr:"Kiev",de:"Kiew",it:"Kiev",pt:"Kiev"}
  },
  {
    label:"Istanbul", zone:"Europe/Istanbul", city:"Istanbul",
    search:["イスタンブール","이스탄불","伊斯坦布尔","Стамбул"],
    names:{uk:"Стамбул",ja:"イスタンブール",ko:"이스탄불",zh:"伊斯坦布尔",hi:"इस्तांबुल",es:"Estambul",fr:"Istanbul",de:"Istanbul",it:"Istanbul",pt:"Istambul"}
  },
  {
    label:"Moscow", zone:"Europe/Moscow", city:"Moscow",
    search:["モスクワ","모스크바","莫斯科","Москва","Moscou","Mosca"],
    names:{uk:"Москва",ja:"モスクワ",ko:"모스크바",zh:"莫斯科",hi:"मास्को",es:"Moscú",fr:"Moscou",de:"Moskau",it:"Mosca",pt:"Moscovo"}
  },
  {
    label:"Cairo", zone:"Africa/Cairo", city:"Cairo",
    search:["カイロ","카이로","开罗","Каїр","El Cairo"],
    names:{uk:"Каїр",ja:"カイロ",ko:"카이로",zh:"开罗",hi:"काहिरा",es:"El Cairo",fr:"Le Caire",de:"Kairo",it:"Il Cairo",pt:"Cairo"}
  },
  {
    label:"Nairobi", zone:"Africa/Nairobi", city:"Nairobi",
    search:["ナイロビ","나이로비","内罗毕","Найробі"],
    names:{uk:"Найробі",ja:"ナイロビ",ko:"나이로비",zh:"内罗毕",hi:"नैरोबी"}
  },
  {
    label:"Lagos", zone:"Africa/Lagos", city:"Lagos",
    search:["ラゴス","라고스","拉各斯","Лагос"],
    names:{uk:"Лагос",ja:"ラゴス",ko:"라고스",zh:"拉各斯",hi:"लागोस"}
  },
  {
    label:"Johannesburg", zone:"Africa/Johannesburg", city:"Johannesburg",
    search:["ヨハネスブルク","요하네스버그","约翰内斯堡","Йоганнесбург"],
    names:{uk:"Йоганнесбург",ja:"ヨハネスブルク",ko:"요하네스버그",zh:"约翰内斯堡",hi:"जोहान्सबर्ग",es:"Johannesburgo",fr:"Johannesburg",de:"Johannesburg",it:"Johannesburg",pt:"Joanesburgo"}
  },
  {
    label:"Casablanca", zone:"Africa/Casablanca", city:"Casablanca",
    search:["カサブランカ","카사블랑카","卡萨布兰卡","Касабланка"],
    names:{uk:"Касабланка",ja:"カサブランカ",ko:"카사블랑카",zh:"卡萨布兰卡",hi:"कासाब्लांका"}
  },
  {
    label:"Riyadh", zone:"Asia/Riyadh", city:"Riyadh",
    search:["リヤド","리야드","利雅得","Ер-Ріяд"],
    names:{uk:"Ер-Ріяд",ja:"リヤド",ko:"리야드",zh:"利雅得",hi:"रियाद",es:"Riad",fr:"Riyad",de:"Riad",it:"Riad",pt:"Riade"}
  },
  {
    label:"Dubai", zone:"Asia/Dubai", city:"Dubai",
    search:["ドバイ","두바이","迪拜","Дубай","Dubaï"],
    names:{uk:"Дубай",ja:"ドバイ",ko:"두바이",zh:"迪拜",hi:"दुबई",es:"Dubái",fr:"Dubaï",de:"Dubai",it:"Dubai",pt:"Dubai"}
  },
  {
    label:"Mumbai", zone:"Asia/Kolkata", city:"Mumbai",
    search:["ムンバイ","뭄바이","孟买","Мумбаї","Bombay","मुंबई"],
    names:{uk:"Мумбаї",ja:"ムンバイ",ko:"뭄바이",zh:"孟买",hi:"मुंबई",es:"Bombay",fr:"Bombay",de:"Mumbai",it:"Mumbai",pt:"Bombaim"}
  },
  {
    label:"Karachi", zone:"Asia/Karachi", city:"Karachi",
    search:["カラチ","카라치","卡拉奇","Карачі","कराची"],
    names:{uk:"Карачі",ja:"カラチ",ko:"카라치",zh:"卡拉奇",hi:"कराची"}
  },
  {
    label:"Dhaka", zone:"Asia/Dhaka", city:"Dhaka",
    search:["ダッカ","다카","达卡","Дакка","ঢাকা"],
    names:{uk:"Дакка",ja:"ダッカ",ko:"다카",zh:"达卡",hi:"ढाका"}
  },
  {
    label:"Bangkok", zone:"Asia/Bangkok", city:"Bangkok",
    search:["バンコク","방콕","曼谷","Бангкок","กรุงเทพ"],
    names:{uk:"Бангкок",ja:"バンコク",ko:"방콕",zh:"曼谷",hi:"बैंकॉक",es:"Bangkok",fr:"Bangkok",de:"Bangkok",it:"Bangkok",pt:"Banguecoque"}
  },
  {
    label:"Singapore", zone:"Asia/Singapore", city:"Singapore",
    search:["シンガポール","싱가포르","新加坡","Сінгапур"],
    names:{uk:"Сінгапур",ja:"シンガポール",ko:"싱가포르",zh:"新加坡",hi:"सिंगापुर",es:"Singapur",fr:"Singapour",de:"Singapur",it:"Singapore",pt:"Singapura"}
  },
  {
    label:"Hong Kong", zone:"Asia/Hong_Kong", city:"Hong Kong",
    search:["香港","ホンコン","홍콩","Гонконг"],
    names:{uk:"Гонконг",ja:"香港",ko:"홍콩",zh:"香港",hi:"हांगकांग",es:"Hong Kong",fr:"Hong Kong",de:"Hongkong",it:"Hong Kong",pt:"Hong Kong"}
  },
  {
    label:"Beijing", zone:"Asia/Shanghai", city:"Beijing",
    search:["北京","ペキン","베이징","Пекін","Pékin","Pechino"],
    names:{uk:"Пекін",ja:"北京",ko:"베이징",zh:"北京",hi:"बीजिंग",es:"Pekín",fr:"Pékin",de:"Peking",it:"Pechino",pt:"Pequim"}
  },
  {
    label:"Shanghai", zone:"Asia/Shanghai", city:"Shanghai",
    search:["上海","シャンハイ","상하이","Шанхай"],
    names:{uk:"Шанхай",ja:"上海",ko:"상하이",zh:"上海",hi:"शंघाई",es:"Shanghái",fr:"Shanghai",de:"Shanghai",it:"Shanghai",pt:"Xangai"}
  },
  {
    label:"Seoul", zone:"Asia/Seoul", city:"Seoul",
    search:["서울","ソウル","首尔","Сеул"],
    names:{uk:"Сеул",ja:"ソウル",ko:"서울",zh:"首尔",hi:"सियोल",es:"Seúl",fr:"Séoul",de:"Seoul",it:"Seul",pt:"Seul"}
  },
  {
    label:"Tokyo", zone:"Asia/Tokyo", city:"Tokyo",
    search:["東京","도쿄","Токіо","Tokio"],
    names:{uk:"Токіо",ja:"東京",ko:"도쿄",zh:"东京",hi:"टोक्यो",es:"Tokio",fr:"Tokyo",de:"Tokio",it:"Tokyo",pt:"Tóquio"}
  },
  {
    label:"Osaka", zone:"Asia/Tokyo", city:"Osaka",
    search:["大阪","오사카","Осака"],
    names:{uk:"Осака",ja:"大阪",ko:"오사카",zh:"大阪",hi:"ओसाका"}
  },
  {
    label:"Taipei", zone:"Asia/Taipei", city:"Taipei",
    search:["台北","タイペイ","타이베이","Тайбей"],
    names:{uk:"Тайбей",ja:"台北",ko:"타이베이",zh:"台北",hi:"ताइपे",es:"Taipéi",fr:"Taipei",de:"Taipeh",it:"Taipei",pt:"Taipé"}
  },
  {
    label:"Kuala Lumpur", zone:"Asia/Kuala_Lumpur", city:"Kuala Lumpur",
    search:["クアラルンプール","쿠알라룸푸르","吉隆坡","Куала-Лумпур","KL"],
    names:{uk:"Куала-Лумпур",ja:"クアラルンプール",ko:"쿠알라룸푸르",zh:"吉隆坡",hi:"कुआलालंपुर"}
  },
  {
    label:"Ho Chi Minh", zone:"Asia/Ho_Chi_Minh", city:"Ho Chi Minh",
    search:["ホーチミン","호치민","胡志明","Хошимін"],
    names:{uk:"Хошимін",ja:"ホーチミン",ko:"호치민",zh:"胡志明",hi:"हो ची मिन्ह"}
  },
  {
    label:"Jakarta", zone:"Asia/Jakarta", city:"Jakarta",
    search:["ジャカルタ","자카르타","雅加达","Джакарта"],
    names:{uk:"Джакарта",ja:"ジャカルタ",ko:"자카르타",zh:"雅加达",hi:"जकार्ता",es:"Yakarta",fr:"Djakarta",de:"Jakarta",it:"Giacarta",pt:"Jacarta"}
  },
  {
    label:"Perth", zone:"Australia/Perth", city:"Perth",
    search:["パース","퍼스","珀斯","Перт"],
    names:{uk:"Перт",ja:"パース",ko:"퍼스",zh:"珀斯",hi:"पर्थ"}
  },
  {
    label:"Sydney", zone:"Australia/Sydney", city:"Sydney",
    search:["シドニー","시드니","悉尼","Сідней"],
    names:{uk:"Сідней",ja:"シドニー",ko:"시드니",zh:"悉尼",hi:"सिडनी",es:"Sídney",fr:"Sydney",de:"Sydney",it:"Sydney",pt:"Sydney"}
  },
  {
    label:"Melbourne", zone:"Australia/Melbourne", city:"Melbourne",
    search:["メルボルン","멜버른","墨尔本","Мельбурн"],
    names:{uk:"Мельбурн",ja:"メルボルン",ko:"멜버른",zh:"墨尔本",hi:"मेलबर्न",es:"Melbourne",fr:"Melbourne",de:"Melbourne",it:"Melbourne",pt:"Melbourne"}
  },
  {
    label:"Brisbane", zone:"Australia/Brisbane", city:"Brisbane",
    search:["ブリスベン","브리즈번","布里斯班","Брісбен"],
    names:{uk:"Брісбен",ja:"ブリスベン",ko:"브리즈번",zh:"布里斯班",hi:"ब्रिस्बेन"}
  },
  {
    label:"Auckland", zone:"Pacific/Auckland", city:"Auckland",
    search:["オークランド","오클랜드","奥克兰","Окленд"],
    names:{uk:"Окленд",ja:"オークランド",ko:"오클랜드",zh:"奥克兰",hi:"ऑकलैंड",es:"Auckland",fr:"Auckland",de:"Auckland",it:"Auckland",pt:"Auckland"}
  },
  {
    label:"Vladivostok", zone:"Asia/Vladivostok", city:"Vladivostok",
    search:["ウラジオストク","블라디보스토크","符拉迪沃斯托克","Владивосток"],
    names:{uk:"Владивосток",ja:"ウラジオストク",ko:"블라디보스토크",zh:"符拉迪沃斯托克",hi:"व्लादिवोस्तोक",es:"Vladivostok",fr:"Vladivostok",de:"Wladiwostok",it:"Vladivostok",pt:"Vladivostoque"}
  },
  { label:"Fiji",   zone:"Pacific/Fiji",       city:"Suva",      search:["フィジー","피지","斐济","Фіджі"],   names:{uk:"Фіджі",ja:"フィジー",ko:"피지",zh:"斐济",hi:"फ़िजी"} },
  { label:"Tonga",  zone:"Pacific/Tongatapu",  city:"Nukualofa", search:["トンガ","통가","汤加","Тонга"],     names:{uk:"Тонга",ja:"トンガ",ko:"통가",zh:"汤加",hi:"टोंगा"} },
];
