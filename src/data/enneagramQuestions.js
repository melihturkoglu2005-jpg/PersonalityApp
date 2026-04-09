// Her sorunun "tip" alanı, sorunun hangi Enneagram tipini ölçtüğünü söyler.
// 9 tip, her tipten 5 soru = 45 soru

export const enneagramQuestions = [
  // --- Tip 1: Reformcu ---
  { id: 1,  tip: 1, soru: 'İşlerin en doğru ve en kusursuz şekilde yapılması gerektiğine dair sarsılmaz bir inancım var.' },
  { id: 2,  tip: 1, soru: 'Yaptığım hataları zihnimden atıp kendimi bağışlamak benim için gerçekten çok güç.' },
  { id: 3,  tip: 1, soru: 'Etrafımdaki düzensizlik veya haksızlıkları gördüğümde, hemen müdahale edip düzeltme isteği duyarım.' },
  { id: 4,  tip: 1, soru: 'Standartlarımdan ödün vermektense, daha fazla yorulmayı göze alırım.' },
  { id: 5,  tip: 1, soru: 'Toplumda herkesin kurallara ve etik ilkelere uymasının hayati bir önem taşıdığına inanırım.' },

  // --- Tip 2: Yardımsever ---
  { id: 6,  tip: 2, soru: 'Başkalarının neye ihtiyacı olduğunu fark edip kendi isteklerimin önüne koymak benim için adeta bir reflekstir.' },
  { id: 7,  tip: 2, soru: 'İnsanlar tarafından sevildiğimi ve değer gördüğümü hissetmek benim temel motivasyon kaynağımdır.' },
  { id: 8,  tip: 2, soru: 'Birinin hayatına dokunup ona gerçekten yardım edebildiğimde içimde derin bir huzur uyanır.' },
  { id: 9,  tip: 2, soru: 'Başkalarının bana ihtiyaç duyduğunu bilmek, kendimi değerli ve anlamlı hissetmemi sağlar.' },
  { id: 10, tip: 2, soru: 'Zaman zaman başkalarına odaklanmaktan kendi duygularımı ve ihtiyaçlarımı tamamen ihmal ettiğimi fark ediyorum.' },

  // --- Tip 3: Başarıcı ---
  { id: 11, tip: 3, soru: 'Belirlediğim hedeflere ulaşmak ve somut başarılar elde etmek hayatımın merkezinde yer alır.' },
  { id: 12, tip: 3, soru: 'Bulunduğum ortama ve birlikte olduğum insanlara göre kendimi hızla uyarlamakta hiç zorlanmam.' },
  { id: 13, tip: 3, soru: 'Dışarıdan nasıl göründüğüm ve bıraktığım izlenim konusunda oldukça hassasım.' },
  { id: 14, tip: 3, soru: 'Zamanı verimli kullanmak ve kısa sürede sonuç üretmek benim için her şeyden önce gelir.' },
  { id: 15, tip: 3, soru: 'Başarısızlığa uğramak, hazmetmekte en çok zorlandığım duyguların başında gelir.' },

  // --- Tip 4: Bireyci ---
  { id: 16, tip: 4, soru: 'Çoğu zaman kimsede olmayan bir farklılığa sahip olduğumu ve tam olarak anlaşılamadığımı hissederim.' },
  { id: 17, tip: 4, soru: 'Yoğun duygular, hüzün ve melankoli; iç dünyamın vazgeçilmez birer parçasıdır.' },
  { id: 18, tip: 4, soru: 'Herkes gibi olmaktan kaçınırım; kendime has, özgün bir kimlik taşımak benim için çok değerlidir.' },
  { id: 19, tip: 4, soru: 'Elimde olmayan veya ulaşamadığım "uzaktaki" şeylere karşı her zaman içsel bir özlem duyarım.' },
  { id: 20, tip: 4, soru: 'Sanat, estetik ya da yaratıcı ifade biçimleri, karmaşık duygularımı dışa vurmamın en iyi yoludur.' },

  // --- Tip 5: Gözlemci ---
  { id: 21, tip: 5, soru: 'Kendi başıma kalıp düşüncelerime çekilmek, sosyal ortamlardan çok daha fazla enerji toplamamı sağlar.' },
  { id: 22, tip: 5, soru: 'Bir konunun tüm detaylarına tam olarak hakim olmadan o konuda fikir beyan etmekten kaçınırım.' },
  { id: 23, tip: 5, soru: 'Aşırı yoğun duygusal beklentiler veya uzun süren sosyal etkinlikler beni zihnen tüketebiliyor.' },
  { id: 24, tip: 5, soru: 'Yeni bilgiler toplamak ve dünyayı analiz ederek anlamlandırmak benim için en büyük keyiftir.' },
  { id: 25, tip: 5, soru: 'Kendi sınırlı enerjimi ve kaynaklarımı gereksiz yere harcamamak için her zaman temkinli davranırım.' },

  // --- Tip 6: Sadık ---
  { id: 26, tip: 6, soru: 'Ters gidebilecek her türlü risk ve tehlikeyi önceden öngörmek zihnimin otomatik çalışma şeklidir.' },
  { id: 27, tip: 6, soru: 'Güvenebileceğim bir liman ararım; birine güvenmem zaman alır ama güvendiğimde tam bağlılık gösteririm.' },
  { id: 28, tip: 6, soru: 'Önemli bir karar vermeden önce kafamda sürekli "Peki ya şöyle olursa?" diyerek felaket senaryoları kurarım.' },
  { id: 29, tip: 6, soru: 'Otorite figürlerine karşı hem saygılı bir tutum hem de içten içe bir şüphe duyarım.' },
  { id: 30, tip: 6, soru: 'Belirsizlik ve ne olacağını bilememek bende gerçek bir kaygı ve huzursuzluk yaratır.' },

  // --- Tip 7: Meraklı ---
  { id: 31, tip: 7, soru: 'Hayat yeni deneyimler ve maceralar barındırmadığında kendimi kapana kısılmış gibi hissederim.' },
  { id: 32, tip: 7, soru: 'Karamsar duygulara saplanıp kalmaktansa, odağımı hızla daha neşeli ve umut verici şeylere çeviririm.' },
  { id: 33, tip: 7, soru: 'Zihnimde her an bir sürü farklı proje ve heyecan verici fikir aynı anda uçar durur.' },
  { id: 34, tip: 7, soru: 'Özgürlüğümün kısıtlanmasından hoşlanmam; her zaman seçme şansımın olması benim için kritiktir.' },
  { id: 35, tip: 7, soru: 'Gelecekteki güzel bir olayı hayal etmek bile o anı yaşamaktan daha fazla heyecan verebilir.' },

  // --- Tip 8: Meydan Okuyucu ---
  { id: 36, tip: 8, soru: 'Kontrolün her zaman benim elimde olması ve zayıflık belirtisi göstermemek benim için temel bir kuraldır.' },
  { id: 37, tip: 8, soru: 'Haksızlığa uğradığımda veya şahit olduğumda tepkimi doğrudan, sert ve net bir şekilde ortaya koyarım.' },
  { id: 38, tip: 8, soru: 'İnsanların beni yönlendirmesine veya zayıf yanlarımdan yararlanmasına asla izin vermem.' },
  { id: 39, tip: 8, soru: 'Sevdiklerimi korumak söz konusu olduğunda, her türlü zorluğa ve engele göğüs gerebilirim.' },
  { id: 40, tip: 8, soru: 'Girdiğim her ortama yoğun bir enerjiyle dahil olmayı ve etkimi hissettirmeyi severim.' },

  // --- Tip 9: Barışçıl ---
  { id: 41, tip: 9, soru: 'Çatışmalardan kaçınmak ve ortamdaki huzuru korumak benim için kişisel isteklerimden daha önceliklidir.' },
  { id: 42, tip: 9, soru: 'Farklı görüşleri anlamak ve herkesin haklı yanlarını görebilmek benim doğal bir yeteneğimdir.' },
  { id: 43, tip: 9, soru: 'Başkalarıyla uyum içinde kalabilmek adına kendi fikirlerimi ve önceliklerimi sık sık ertelerim.' },
  { id: 44, tip: 9, soru: 'İçsel dinginliğim ve çevremle olan uyum, hayattaki en büyük huzur kaynağımdır.' },
  { id: 45, tip: 9, soru: 'Kesin bir karar vermek durumunda kalmak beni yoran ve kaçınmak istediğim bir süreçtir.' },
];