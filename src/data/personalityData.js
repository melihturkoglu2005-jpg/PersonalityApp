// personalityData.js — v2: Güvenilir Wikimedia fotoğrafları + düzeltilmiş veri
export const MBTI_TYPE_COLORS = {
  INTJ: { primary: '#818CF8', dark: '#4338CA', bg: '#1E1B4B', glow: 'rgba(99,102,241,0.25)', label: 'Mimar',       group: 'NT' },
  INTP: { primary: '#A78BFA', dark: '#6D28D9', bg: '#1E1A2E', glow: 'rgba(139,92,246,0.25)', label: 'Düşünür',    group: 'NT' },
  ENTJ: { primary: '#F87171', dark: '#B91C1C', bg: '#2D1010', glow: 'rgba(239,68,68,0.25)',  label: 'Komutan',    group: 'NT' },
  ENTP: { primary: '#FB923C', dark: '#C2410C', bg: '#2D1A08', glow: 'rgba(249,115,22,0.25)', label: 'Mucit',      group: 'NT' },
  INFJ: { primary: '#22D3EE', dark: '#0E7490', bg: '#0C1E25', glow: 'rgba(6,182,212,0.25)',  label: 'Savunucu',   group: 'NF' },
  INFP: { primary: '#4ADE80', dark: '#15803D', bg: '#0C1F14', glow: 'rgba(34,197,94,0.25)',  label: 'Arabulucu',  group: 'NF' },
  ENFJ: { primary: '#F472B6', dark: '#BE185D', bg: '#2D0E1E', glow: 'rgba(236,72,153,0.25)', label: 'Protagonist',group: 'NF' },
  ENFP: { primary: '#FCD34D', dark: '#D97706', bg: '#2D2008', glow: 'rgba(251,191,36,0.25)', label: 'Kampanyacı', group: 'NF' },
  ISTJ: { primary: '#94A3B8', dark: '#475569', bg: '#151C26', glow: 'rgba(100,116,139,0.25)',label: 'Lojistikçi', group: 'SJ' },
  ISFJ: { primary: '#2DD4BF', dark: '#0F766E', bg: '#0C1F1E', glow: 'rgba(20,184,166,0.25)', label: 'Koruyucu',  group: 'SJ' },
  ESTJ: { primary: '#F87171', dark: '#991B1B', bg: '#2D1212', glow: 'rgba(220,38,38,0.25)',  label: 'Yönetici',  group: 'SJ' },
  ESFJ: { primary: '#F9A8D4', dark: '#BE185D', bg: '#2D1225', glow: 'rgba(244,114,182,0.25)',label: 'Başkonsolos',group: 'SJ' },
  ISTP: { primary: '#A8A29E', dark: '#57534E', bg: '#1C1917', glow: 'rgba(120,113,108,0.25)',label: 'Virtüöz',    group: 'SP' },
  ISFP: { primary: '#86EFAC', dark: '#15803D', bg: '#0D1F12', glow: 'rgba(132,204,22,0.25)', label: 'Maceracı',  group: 'SP' },
  ESTP: { primary: '#FCD34D', dark: '#B45309', bg: '#211A06', glow: 'rgba(245,158,11,0.25)', label: 'Girişimci', group: 'SP' },
  ESFP: { primary: '#C084FC', dark: '#7E22CE', bg: '#1E0D2D', glow: 'rgba(168,85,247,0.25)', label: 'Eğlendirici',group:'SP' },
};

export const personalityData = {
  INTJ: {
    type: 'INTJ', label: 'Mimar',
    description: 'Stratejik düşünürler. Bağımsız, kararlı, uzun vadeli vizyon sahibi.',
    characters: [
      { id: 'intj-1', name: 'Elon Musk', category: 'Girişimci', description: 'Tesla ve SpaceX kurucusu. Sistematik vizyon ve uç noktaya taşınan strateji.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Elon_Musk_Royal_Society_%28crop2%29.jpg' },
      { id: 'intj-2', name: 'Nikola Tesla', category: 'Mucit', description: 'Elektrik çağının mimarı. Zihinsel modeller ve devrimci sezgiler.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/N.Tesla.JPG' },
      { id: 'intj-3', name: 'Stephen Hawking', category: 'Bilim İnsanı', description: 'Evrenin sırlarını çözen teorik fizikçi. Engelsiz bir zihnin gücü.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Stephen_Hawking.StarChild.jpg' },
      { id: 'intj-4', name: 'Christopher Nolan', category: 'Yönetmen', description: 'Inception ve Interstellar yönetmeni. Karmaşık zihin haritaları.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Christopher_Nolan_Cannes_2018.jpg' },
      { id: 'intj-5', name: 'Michelle Obama', category: 'Lider', description: 'Eski First Lady. Stratejik liderlik ve ilkelere derin bağlılık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Michelle_Obama_2013_official_portrait.jpg' },
      { id: 'intj-6', name: 'Mark Zuckerberg', category: 'Teknoloji', description: 'Meta kurucusu. Sistemsel düşünce ve soğukkanlı uzun vadeli planlama.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg' },
    ],
  },
  INTP: {
    type: 'INTP', label: 'Düşünür',
    description: 'Analitik, meraklı ve teorik keşiflere tutkun zihinler.',
    characters: [
      { id: 'intp-1', name: 'Albert Einstein', category: 'Fizikçi', description: 'İzafiyet teorisinin babası. Zihinsel oyunlar ve sınırsız merak.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Albert_Einstein_Head.jpg' },
      { id: 'intp-2', name: 'Bill Gates', category: 'Teknoloji', description: 'Microsoft kurucusu. Teknik derinlik ve sistematik analiz.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Bill_Gates_2017_%28cropped%29.jpg' },
      { id: 'intp-3', name: 'Charles Darwin', category: 'Bilim İnsanı', description: 'Evrim teorisinin kurucusu. Derin gözlem ve cesur hipotezler.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Charles_Darwin_seated_crop.jpg' },
      { id: 'intp-4', name: 'Isaac Newton', category: 'Matematikçi', description: 'Yer çekimi ve kalkülüsün keşfedicisi. Evrensel yasaları zihinsel modellerle buldu.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/GodfreyKneller-IsaacNewton-1689.jpg' },
      { id: 'intp-5', name: 'Larry Page', category: 'Teknoloji', description: 'Google kurucusu. Soyut problem çözme ve yenilikçi algoritmalar.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Larry_Page_in_the_European_Parliament%2C_17.06.2009_%28cropped2%29.jpg' },
      { id: 'intp-6', name: 'Tina Fey', category: 'Komedyen-Yazar', description: '30 Rock yaratıcısı. Zekice analiz ve özgün bakış açısı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Tina_Fey_by_Gage_Skidmore.jpg' },
    ],
  },
  ENTJ: {
    type: 'ENTJ', label: 'Komutan',
    description: 'Doğal liderler. Hedef odaklı, kararlı, stratejik düşünceli.',
    characters: [
      { id: 'entj-1', name: 'Steve Jobs', category: 'Vizyon Sahibi', description: 'Apple kurucusu. Mükemmel vizyon ve kitlesel ilham verme gücü.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg' },
      { id: 'entj-2', name: 'Margaret Thatcher', category: 'Politikacı', description: 'İngiltere\'nin ilk kadın başbakanı. "Demir Lady" olarak tarihe geçti.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Margaret_Thatcher.png' },
      { id: 'entj-3', name: 'Gordon Ramsay', category: 'Şef', description: 'Yıldızlı şef ve TV ikonu. Yüksek standartlar ve dürüst liderlik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Gordon_Ramsay.jpg' },
      { id: 'entj-4', name: 'Indra Nooyi', category: 'CEO', description: 'PepsiCo eski CEO\'su. Güçlü stratejik liderlik ve dönüşüm vizyonu.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Indra_Nooyi_2008.jpg' },
      { id: 'entj-5', name: 'Angela Merkel', category: 'Siyasetçi', description: 'Almanya\'nın 16 yıllık başbakanı. Disiplin ve güvenilir liderlik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Angela_Merkel_2019_%28cropped%29.jpg' },
      { id: 'entj-6', name: 'Franklin Roosevelt', category: 'Devlet Adamı', description: 'Büyük Buhran\'ı aşan ABD Başkanı. Kararlı liderlik ve sistemik reform.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/FDR_1944_Color_Portrait.jpg' },
    ],
  },
  ENTP: {
    type: 'ENTP', label: 'Mucit',
    description: 'Yenilikçi, tartışmayı seven, alışılmışı kıran zihinler.',
    characters: [
      { id: 'entp-1', name: 'Leonardo da Vinci', category: 'Rönesans Dehası', description: 'Ressam, mucit, bilim insanı. Hiçbir sınır tanımayan çok yönlü dahilik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Leonardo_self_portrait_younger.jpg' },
      { id: 'entp-2', name: 'Thomas Edison', category: 'Mucit', description: '1000+ patent. Hızlı prototipleme ve fikirleri süratle test etme.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Thomas_Edison2.jpg' },
      { id: 'entp-3', name: 'Richard Feynman', category: 'Fizikçi', description: 'Nobel ödüllü fizikçi. Karmaşık kavramları yaratıcı şekilde anlatmak.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/RichardFeynman-PaineMansionWoods1984_copyrightTamikoThiel_bw.jpg' },
      { id: 'entp-4', name: 'Sacha Baron Cohen', category: 'Komedyen', description: 'Sınır tanımayan yaratıcılık ve keskin sosyal eleştiri ustası.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Sacha_Baron_Cohen_2016.jpg' },
      { id: 'entp-5', name: 'Benjamin Franklin', category: 'Devlet Adamı-Mucit', description: 'Hem politikacı hem mucit. Yenilikçi fikirler ve pragmatik zeka.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/BenFranklinDuplessis.jpg' },
      { id: 'entp-6', name: 'Elon Musk', category: 'Girişimci', description: 'Keskin tartışmacı ve yenilikçi. Fikirleri hızla test etme ve fikir üretme.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Elon_Musk_Royal_Society_%28crop2%29.jpg' },
    ],
  },
  INFJ: {
    type: 'INFJ', label: 'Savunucu',
    description: 'Derin sezgi, güçlü değerler ve insanlığa adanmış vizyon.',
    characters: [
      { id: 'infj-1', name: 'Nelson Mandela', category: 'Özgürlük Lideri', description: 'Güney Afrika\'nın özgürlük sembolü. 27 yıl sonra bile değerlerine sadık kaldı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Nelson_Mandela_1994.jpg' },
      { id: 'infj-2', name: 'Martin Luther King Jr.', category: 'Aktivist', description: 'İnsan hakları önderi. "I Have a Dream" vizyonuyla tarih yazdı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Martin_Luther_King%2C_Jr..jpg' },
      { id: 'infj-3', name: 'Malala Yousafzai', category: 'Aktivist', description: 'Nobel Barış Ödüllü eğitim savunucusu. İnançla mücadele ve vizyon.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Malala_Yousafzai.jpg' },
      { id: 'infj-4', name: 'Oprah Winfrey', category: 'Medya Lideri', description: 'Derin empati ve sezgisel anlayışla milyonlara ilham veren güç.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Oprah_in_2014.jpg' },
      { id: 'infj-5', name: 'Mother Teresa', category: 'İnsancıl', description: 'Nobel Barış Ödüllü rahibe. Başkalarına adanmış hayat ve sessiz güç.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Mother_Teresa_1.jpg' },
      { id: 'infj-6', name: 'Agatha Christie', category: 'Yazar', description: 'En çok satan gizem yazarı. İnsan psikolojisini derinlemesine kavrama.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Agatha_Christie.png' },
    ],
  },
  INFP: {
    type: 'INFP', label: 'Arabulucu',
    description: 'Derin değerler, yaratıcı ifade ve sonsuz empati.',
    characters: [
      { id: 'infp-1', name: 'J.R.R. Tolkien', category: 'Yazar', description: 'Orta Dünya yaratıcısı. Zengin hayal dünyası ve dil sevgisi.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/J._R._R._Tolkien%2C_1940s.jpg' },
      { id: 'infp-2', name: 'Princess Diana', category: 'Prenses', description: 'Halkın prensesi. Derin empati, spontane şefkat ve değerlere bağlılık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Princess_Diana_in_Pakistan.jpg' },
      { id: 'infp-3', name: 'John Lennon', category: 'Müzisyen', description: 'Beatles üyesi. "Imagine" ile insan ideallerini şarkıya döktü.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/John_Lennon_1969_%28cropped%29.jpg' },
      { id: 'infp-4', name: 'William Shakespeare', category: 'Oyun Yazarı', description: 'İnsan ruhunun en büyük ressamı. Duygu ve değerleri sanata taşıdı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Shakespeare.jpg' },
      { id: 'infp-5', name: 'Johnny Depp', category: 'Oyuncu', description: 'Özgün ve alışılmadık roller. Kendi kanalından gitmek.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Johnny_Depp_2011_TIFF_%28cropped%29.jpg' },
      { id: 'infp-6', name: 'Frédéric Chopin', category: 'Besteci', description: 'Romantizmin piyanisti. İçe dönük duygu ve estetik mükemmellik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Frederic_Chopin_photo.jpeg' },
    ],
  },
  ENFJ: {
    type: 'ENFJ', label: 'Protagonist',
    description: 'Karizmatik liderler. İnsanlara ilham veren, toplumu dönüştüren.',
    characters: [
      { id: 'enfj-1', name: 'Barack Obama', category: 'Devlet Adamı', description: 'ABD\'nin 44. Başkanı. Güçlü iletişim ve empatiyle insanları birleştirdi.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/President_Barack_Obama.jpg' },
      { id: 'enfj-2', name: 'John F. Kennedy', category: 'Devlet Adamı', description: '35. ABD Başkanı. İlham veren söylem ve insanlığa inanç.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg' },
      { id: 'enfj-3', name: 'Emma Watson', category: 'Aktivist-Oyuncu', description: 'HeForShe kampanyasının yüzü. Toplumsal değişim için güçlü duruş.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Emma_Watson_2013.jpg' },
      { id: 'enfj-4', name: 'Mother Teresa', category: 'Din Adamı', description: 'Nobel Barış Ödüllü rahibe. Başkalarına adanmış hayat ve ilham.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Mother_Teresa_1.jpg' },
      { id: 'enfj-5', name: 'Oprah Winfrey', category: 'TV Sunucusu', description: 'Karizmatik iletişimci. Milyonların potansiyelini açığa çıkardı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Oprah_in_2014.jpg' },
      { id: 'enfj-6', name: 'Malala Yousafzai', category: 'Lider', description: 'Cesaret ve ilham. İnsanlara güç veren söylem ve vizyon.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Malala_Yousafzai.jpg' },
    ],
  },
  ENFP: {
    type: 'ENFP', label: 'Kampanyacı',
    description: 'Enerjik, yaratıcı, insanlarla derin bağ kuran ruhlar.',
    characters: [
      { id: 'enfp-1', name: 'Robin Williams', category: 'Komedyen', description: 'Sınırsız yaratıcılık, derin empati ve çevresine neşe yayan enerji.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Robin_Williams_-_1_crop.jpg' },
      { id: 'enfp-2', name: 'Walt Disney', category: 'Yaratıcı', description: 'Hayal gücünün sınır tanımadığı büyük rüyalar ve ilham verici liderlik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Walt_Disney_1946.JPG' },
      { id: 'enfp-3', name: 'Will Smith', category: 'Oyuncu', description: 'Karizmatik enerji ve insanlarla derin bağ. Çoklu yetenek ve coşku.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Will_Smith_2011.jpg' },
      { id: 'enfp-4', name: 'Ellen DeGeneres', category: 'TV Sunucusu', description: 'Samimi empati ve neşeyi yayma gücü. İnsanları güldürürken değiştirir.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Ellen_DeGeneres-2009.jpg' },
      { id: 'enfp-5', name: 'Katy Perry', category: 'Sanatçı', description: 'Spontane yaratıcılık, rengarenk enerji ve sınır tanımayan ifade.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Katy_Perry_-_The_Prismatic_World_Tour-8_%28cropped%29.jpg' },
      { id: 'enfp-6', name: 'Che Guevara', category: 'Devrimci', description: 'İdeallerine tutkuyla bağlı, sınır tanımayan enerji ve vizyon.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/CheHigh.jpg' },
    ],
  },
  ISTJ: {
    type: 'ISTJ', label: 'Lojistikçi',
    description: 'Güvenilir, tutarlı ve sorumluluk bilinci yüksek.',
    characters: [
      { id: 'istj-1', name: 'Warren Buffett', category: 'Yatırımcı', description: 'Disiplinli ve tutarlı. Uzun vadeli değerlere dayalı yatırım felsefesi.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Warren_Buffett_KU_Visit.jpg' },
      { id: 'istj-2', name: 'Angela Merkel', category: 'Siyasetçi', description: 'Almanya\'nın 16 yıllık başbakanı. Disiplin, tutarlılık ve güvenilirlik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Angela_Merkel_2019_%28cropped%29.jpg' },
      { id: 'istj-3', name: 'George Washington', category: 'Devlet Adamı', description: 'ABD\'nin ilk başkanı. Görev bilinci, tutarlılık ve güvenilir liderlik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg' },
      { id: 'istj-4', name: 'Jeff Bezos', category: 'Girişimci', description: 'Amazon kurucusu. Sistematik büyüme planları ve tutarlı yürütme.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Jeff_Bezos_at_Amazon_Spheres_Wall_Art_%2831374119887%29_%28cropped%29.jpg' },
      { id: 'istj-5', name: 'Natalie Portman', category: 'Oyuncu', description: 'Harvard mezunu aktris. Disiplinli çalışma etiği ve titiz hazırlık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Natalie_Portman_Cannes_2015_%28cropped%29.jpg' },
      { id: 'istj-6', name: 'Morgan Freeman', category: 'Oyuncu', description: 'Derin tutarlılık ve güvenilir otorite. Sorumluluk bilinci.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Morgan_Freeman_-_2023_-_cropped.jpg' },
    ],
  },
  ISFJ: {
    type: 'ISFJ', label: 'Koruyucu',
    description: 'Özverili, sadık ve sevdiklerini korumaya adanmış.',
    characters: [
      { id: 'isfj-1', name: 'Mother Teresa', category: 'İnsancıl', description: 'Başkalarına adanmış hayat. Sessiz ama derin bir özveri.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Mother_Teresa_1.jpg' },
      { id: 'isfj-2', name: 'Beyoncé', category: 'Sanatçı', description: 'Titiz çalışma, aile değerleri ve topluluk bağı ile müziği birleştiren ikon.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Beyonce_at_The_Formation_World_Tour%2C_2016.jpg' },
      { id: 'isfj-3', name: 'Rosa Parks', category: 'Aktivist', description: 'Sessiz direniş ve büyük cesaret. Değerlerine adanmış kararlı duruş.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Rosa_Parks_1955.jpg' },
      { id: 'isfj-4', name: 'Kate Middleton', category: 'Prenses', description: 'Prenses of Wales. Görev bilinci, aile önceliği ve topluma hizmet.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Catherine%2C_Princess_of_Wales_in_2023.jpg' },
      { id: 'isfj-5', name: 'Vin Diesel', category: 'Oyuncu', description: 'Aile odaklılık ve sadakat. Aynı değerlere tutarlı bağlılık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Vin_Diesel_2019.jpg' },
      { id: 'isfj-6', name: 'Halle Berry', category: 'Oyuncu', description: 'Titiz hazırlık ve sıcak kalp. Zorluklara rağmen iyiliği koruma.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Halle_Berry_2010.jpg' },
    ],
  },
  ESTJ: {
    type: 'ESTJ', label: 'Yönetici',
    description: 'Düzeni ve kuralları ciddiye alan, güvenilir organizatörler.',
    characters: [
      { id: 'estj-1', name: 'Hillary Clinton', category: 'Siyasetçi', description: 'Eski ABD Dışişleri Bakanı. Yapısal düşünce ve kararlı organizasyon.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Hillary_Clinton_official_Secretary_of_State_portrait_crop.jpg' },
      { id: 'estj-2', name: 'Henry Ford', category: 'Sanayici', description: 'Ford kurucusu. Sistematik üretim, verimlilik ve disiplinli süreçler.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Henry_ford_1919.jpg' },
      { id: 'estj-3', name: 'Sonia Sotomayor', category: 'Yargıç', description: 'ABD Yüksek Mahkemesi Yargıcı. Hukuk, düzen ve adalet için güçlü duruş.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Sonia_Sotomayor_in_SCOTUS_robe_edit.jpg' },
      { id: 'estj-4', name: 'Arnold Schwarzenegger', category: 'Politikacı-Sporcu', description: 'Disiplin ve hedef odaklılık. Vücut geliştirmeden Hollywood\'a, California\'ya.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Govschwarzeneger.jpg' },
      { id: 'estj-5', name: 'Kris Jenner', category: 'Medya Girişimci', description: 'Kardashian imparatorluğunun mimarı. Sistematik yönetim ve fırsatçı zeka.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Kris_Jenner_2011.jpg' },
      { id: 'estj-6', name: 'Michelle Obama', category: 'Lider', description: 'Düzenli ve yapısal liderlik anlayışı ile geniş etkili değişim.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Michelle_Obama_2013_official_portrait.jpg' },
    ],
  },
  ESFJ: {
    type: 'ESFJ', label: 'Başkonsolos',
    description: 'Sıcak, sosyal ağları bir arada tutan ve uyumu önemseyen.',
    characters: [
      { id: 'esfj-1', name: 'Taylor Swift', category: 'Sanatçı', description: 'Hayranlarıyla derin bağ kuran, topluluk oluşturma gücü eşsiz pop ikonu.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png' },
      { id: 'esfj-2', name: 'Jennifer Lopez', category: 'Sanatçı', description: 'Aile değerleri ve çevresine bağlılık. Her ortamda sıcaklık yayan karizması.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Jennifer_Lopez_-_2022_Video_Music_Awards.jpg' },
      { id: 'esfj-3', name: 'Bill Clinton', category: 'Devlet Adamı', description: '42. ABD Başkanı. Karizmatik sosyal bağ kurma ve insanlara ulaşma.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Bill_Clinton.jpg' },
      { id: 'esfj-4', name: 'Pope Francis', category: 'Dini Lider', description: 'Sosyal uyum, sıcaklık ve topluluk bağının dini liderlikte öne çıkması.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Pope_Francis_Korea_Haemi_Castle_19.jpg' },
      { id: 'esfj-5', name: 'Tyra Banks', category: 'Model-Girişimci', description: 'Toplumu bir arada tutan ve yönlendiren güçlü enerji.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/TyraBanks09TIFF.jpg' },
      { id: 'esfj-6', name: 'Mary Berry', category: 'Şef', description: 'Sıcaklık, paylaşım ve topluluk. Great British Bake Off\'un sevilen yüzü.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Mary_Berry_2013_%28cropped%29.jpg' },
    ],
  },
  ISTP: {
    type: 'ISTP', label: 'Virtüöz',
    description: 'Pratik, çözüm odaklı, bağımsız ruhlar.',
    characters: [
      { id: 'istp-1', name: 'Clint Eastwood', category: 'Yönetmen-Oyuncu', description: 'Az konuşur, çok yapar. Pratik ve bağımsız liderlik anlayışı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Clint_Eastwood_-_1966.jpg' },
      { id: 'istp-2', name: 'Bruce Lee', category: 'Dövüş Sanatçısı', description: 'Pratik teknik, bağımsızlık ve sürekli iyileştirme tutkusu.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Bruce_Lee_1973.jpg' },
      { id: 'istp-3', name: 'Amelia Earhart', category: 'Havacı', description: 'Risk alan, bağımsız ve teknik ustalığa tutkulu ilk kadın Atlantik pilotu.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Amelia_Earhart_1935.jpg' },
      { id: 'istp-4', name: 'Tom Cruise', category: 'Oyuncu', description: 'Aksiyon sahnelerini bizzat yapan, teknik mükemmeliyete olan bağlılık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Tom_Cruise_by_Gage_Skidmore_2.jpg' },
      { id: 'istp-5', name: 'Steve Irwin', category: 'Belgeselci', description: 'Alandaki hızlı kararlar, pratik cesaret ve teknik doğa bilgisi.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Steve_Irwin-crop.jpg' },
      { id: 'istp-6', name: 'Megan Fox', category: 'Oyuncu', description: 'Bağımsız düşünce, sezgisel eylem ve kendi kurallarını yaratma.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Megan_Fox_2011.jpg' },
    ],
  },
  ISFP: {
    type: 'ISFP', label: 'Maceracı',
    description: 'Estetik duyarlılığı yüksek, anda yaşayan, değerlerine bağlı.',
    characters: [
      { id: 'isfp-1', name: 'Michael Jackson', category: 'Sanatçı', description: 'Pop\'un kralı. Derin sanatsal ifade ve anın güçlü performansı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Michael_Jackson_1984_Cropped.jpg' },
      { id: 'isfp-2', name: 'David Bowie', category: 'Müzisyen', description: 'Sürekli değişen yaratıcılık, estetik özgünlük ve anın ruhu.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/David_Bowie_1974.jpg' },
      { id: 'isfp-3', name: 'Frida Kahlo', category: 'Ressam', description: 'Acıyı sanata dönüştüren, derin ve özgün ifade tarzı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Self_portrait_with_Monkeys.jpg' },
      { id: 'isfp-4', name: 'Marilyn Monroe', category: 'Oyuncu', description: 'Kırılganlık ve estetik güç. Anı yakalamak ve hissetmek.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Marilyn_Monroe%2C_Korea%2C_1954_crop.jpg' },
      { id: 'isfp-5', name: 'Britney Spears', category: 'Sanatçı', description: 'Anlık performans tutkusu ve müzikle birleşen özgün duygu ifadesi.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Britney_Spears_-_The_Femme_Fatale_Tour_3_%28cropped%29.jpg' },
      { id: 'isfp-6', name: 'Bob Dylan', category: 'Müzisyen-Yazar', description: 'Özgün ses arayışı, sanatsal ifade özgürlüğü ve değerlere bağlılık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Bob_Dylan_-_Azkena_Rock_Festival_2010_2.jpg' },
    ],
  },
  ESTP: {
    type: 'ESTP', label: 'Girişimci',
    description: 'Hızlı düşünür, risk seven, anda yaşayan enerjik ruhlar.',
    characters: [
      { id: 'estp-1', name: 'Ernest Hemingway', category: 'Yazar', description: 'Aksiyon dolu hayat, anı yaşama ve cesur kararlar almak.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/ErnestHemingway.jpg' },
      { id: 'estp-2', name: 'Madonna', category: 'Sanatçı', description: 'Sürekli yenilenen risk alma, anı yakalama ve sınır tanımama.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Madonna_Rebel_Heart_Tour.jpg' },
      { id: 'estp-3', name: 'Winston Churchill', category: 'Devlet Adamı', description: 'Kriz anlarında pratik zeka, risk alma ve gerçekçi liderlik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Sir_Winston_Churchill_-_19086236948.jpg' },
      { id: 'estp-4', name: 'Angelina Jolie', category: 'Oyuncu-Aktivist', description: 'Pratik inisiyatif ve anlık karar alma. Eylem odaklı yardımseverlik.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Angelina_Jolie_2_June_2014_%28cropped%29.jpg' },
      { id: 'estp-5', name: 'Jack Nicholson', category: 'Oyuncu', description: 'Anlık enerji, risk alma ve kaotik yaratıcılık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Jack_Nicholson_2002.jpg' },
      { id: 'estp-6', name: 'Eddie Murphy', category: 'Komedyen', description: 'Anlık tepkiler, sahne riski ve neşeyi yayma gücü.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Eddie_Murphy_2012.jpg' },
    ],
  },
  ESFP: {
    type: 'ESFP', label: 'Eğlendirici',
    description: 'Spontane, neşe dolu, hayatı tam kapasite yaşayan ruhlar.',
    characters: [
      { id: 'esfp-1', name: 'Freddie Mercury', category: 'Müzisyen', description: 'Queen\'in solisti. Sahneye tutkun, sınır tanımayan enerji ve büyüleme.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977_%281%29.jpg' },
      { id: 'esfp-2', name: 'Adele', category: 'Sanatçı', description: 'Sahneye olan aşk, sıcak iletişim ve anlık duygu paylaşımı.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Adele_2016.jpg' },
      { id: 'esfp-3', name: 'Miley Cyrus', category: 'Sanatçı', description: 'Sonsuz enerji, sınır kırmak ve hayatı eğlenceyle yaşamak.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Miley_Cyrus_2019_cropped.jpg' },
      { id: 'esfp-4', name: 'John Travolta', category: 'Oyuncu', description: 'Dans ve sahne sevgisi. Spontane enerji ve izleyiciye bağlılık.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/John_Travolta_Cannes.jpg' },
      { id: 'esfp-5', name: 'Jamie Oliver', category: 'Şef', description: 'Mutfakta spontanelik, sıcaklık ve toplulukla paylaşım sevinci.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Jamie_Oliver_at_SXSW_2014_%28cropped%29.jpg' },
      { id: 'esfp-6', name: 'Elvis Presley', category: 'Müzisyen', description: 'Sahneyi hayata çeviren, sınır tanımayan karizmatik performans enerjisi.', imageUrl: 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Elvis_Presley_promoting_Jailhouse_Rock.jpg' },
    ],
  },
};

export function getCharactersByType(type, count = 5) {
  const typeData = personalityData[type];
  if (!typeData) return [];
  return typeData.characters.slice(0, count);
}

export function getAllCharacters() {
  return Object.values(personalityData).flatMap((typeData) =>
    typeData.characters.map((char) => ({ ...char, type: typeData.type, typeLabel: typeData.label }))
  );
}
