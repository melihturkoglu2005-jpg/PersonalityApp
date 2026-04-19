// Her sorunun "tip" alanı, sorunun hangi Enneagram tipini ölçtüğünü söyler.
// "ters: true" olan sorular ters kodlanır (6 - puan).
// v2: Her tip için 5 soru, bunlardan 2'si ters kodlanmış (acquiescence bias azaltma).
// Sorular gözlemlenebilir davranışlara ve temel motivasyonlara dayalıdır.

export const enneagramQuestions = [

  // --- Tip 1: Reformcu ---
  { id: 1,  tip: 1, soru: 'Bir iş eksik ya da hatalı yapıldığında, onu bırakıp geçmek benim için neredeyse imkânsızdır.' },
  { id: 2,  tip: 1, soru: 'İç sesim yaptıklarımı sürekli değerlendirir ve daha iyisini yapabilirdim diye düşünürüm.' },
  { id: 3,  tip: 1, soru: 'Haksızlık veya ahlaki yanlışlıkla karşılaştığımda güçlü bir öfke ve düzeltme isteği duyarım.' },
  { id: 4,  tip: 1, ters: true, soru: 'Yeterince iyi olan bir sonuç beni tatmin eder; mükemmeli aramak çoğu zaman gereksiz gelir.' },
  { id: 5,  tip: 1, ters: true, soru: 'Kurallar ve prosedürler benim için bağlayıcı değildir; duruma göre esnek davranabilirim.' },

  // --- Tip 2: Yardımsever ---
  { id: 6,  tip: 2, soru: 'Birinin zor bir dönemden geçtiğini fark ettiğimde, ne yapabileceğimi düşünmeden edemem.' },
  { id: 7,  tip: 2, soru: 'Başkalarının takdirini ve minnetini hissetmek benim için duygusal olarak çok önemlidir.' },
  { id: 8,  tip: 2, soru: 'Yardım etmeme fırsatı olmadığında, kendimi gereksiz ve anlamsız hissedebilirim.' },
  { id: 9,  tip: 2, ters: true, soru: 'Birisi benden bir şey istediğinde bile kendi ihtiyaçlarımı ön planda tutmakta zorlanmam.' },
  { id: 10, tip: 2, ters: true, soru: 'Sevilip sevilmediğimi kanıtlamak için çabalamanın gereğini duymam; bu benim için doğal bir kaygı değildir.' },

  // --- Tip 3: Başarıcı ---
  { id: 11, tip: 3, soru: 'Bir hedefe ulaştığımda, o hedefin verdiği tatminden önce bir sonrakini planlamaya başlarım.' },
  { id: 12, tip: 3, soru: 'İnsanların beni nasıl algıladığı benim için gerçekten önem taşır ve bunu aktif olarak yönetirim.' },
  { id: 13, tip: 3, soru: 'Başarısız görünmek, başarısız olmaktan bile daha rahatsız edicidir.' },
  { id: 14, tip: 3, ters: true, soru: 'Verimsiz geçen bir günün ardından, sonuç üretmemiş olmak beni rahatsız etmez.' },
  { id: 15, tip: 3, ters: true, soru: 'Bulunduğum ortamda nasıl algılandığım genellikle aklımın köşesinde bile yer etmez.' },

  // --- Tip 4: Bireyci ---
  { id: 16, tip: 4, soru: 'Başkalarının kolayca erişebildiği bir şeyi ben yaşayamıyor ya da hissedemiyorsam, derin bir özlem ve eksiklik duyarım.' },
  { id: 17, tip: 4, soru: 'Kendimi çoğu insanın anlayamayacağı kadar karmaşık ve farklı hissederim.' },
  { id: 18, tip: 4, soru: 'Duygularımı özgün bir biçimde ifade edemediğimde, içimde bir şeyler tıkanmış gibi hissederim.' },
  { id: 19, tip: 4, ters: true, soru: 'Sıradan rutinler ve günlük tekrarlar beni bunaltmaz; aksine güven ve istikrar verir.' },
  { id: 20, tip: 4, ters: true, soru: 'Çoğu insan gibi hissetmemek beni rahatsız etmez; aidiyet benim için birincil bir ihtiyaç değildir.' },

  // --- Tip 5: Gözlemci ---
  { id: 21, tip: 5, soru: 'Yoğun sosyal etkileşimlerden sonra, tek başıma kalıp enerji toparlamam gerekir.' },
  { id: 22, tip: 5, soru: 'Bir konuda yeterince bilgim olmadan fikir beyan etmek beni rahatsız eder.' },
  { id: 23, tip: 5, soru: 'Zamanımı, enerjimi ve kaynaklarımı ihtiyatlı biçimde yönetmek benim için önceliklidir.' },
  { id: 24, tip: 5, ters: true, soru: 'Duygusal ve yoğun sosyal ortamlarda kendimi genellikle rahat ve yerinde hissederim.' },
  { id: 25, tip: 5, ters: true, soru: 'Ayrıntılı bilgiye sahip olmadan da bir konuda fikirlerimi paylaşmaktan çekinmem.' },

  // --- Tip 6: Sadık ---
  { id: 26, tip: 6, soru: 'Bir karar almadan önce olası senaryoları ve riskleri zihnimde defalarca canlandırırım.' },
  { id: 27, tip: 6, soru: 'Güvendiğim kişi ya da kurumların desteği, kendi yetkinliğimden daha güvenli hissettirir.' },
  { id: 28, tip: 6, soru: 'Belirsizlik ve öngörülemeyen durumlar bende ciddi bir kaygı ve gerginlik yaratır.' },
  { id: 29, tip: 6, ters: true, soru: 'Belirsiz ve belirsiz kalan durumlar beni genellikle endişelendirmez; oluruna bırakabilirim.' },
  { id: 30, tip: 6, ters: true, soru: 'Otoriteye ve kurallara sorgulamadan uymak benim için doğal ve sorunsuz bir davranıştır.' },

  // --- Tip 7: Meraklı ---
  { id: 31, tip: 7, soru: 'Yeni bir deneyim, yer ya da fikir keşfetme ihtimali beni hızla canlandırır ve motive eder.' },
  { id: 32, tip: 7, soru: 'Uzun süreli taahhütler ve sınırlayıcı seçimler bende bir hapis hissi yaratabilir.' },
  { id: 33, tip: 7, soru: 'Olumsuz duygu ve deneyimlerle uzun süre kalmak yerine, onları yeniden çerçevelemeyi tercih ederim.' },
  { id: 34, tip: 7, ters: true, soru: 'Tek bir alana, projeye ya da ilgi alanına derinlemesine odaklanmak beni bunaltmaz; aksine tatmin verir.' },
  { id: 35, tip: 7, ters: true, soru: 'Seçeneklerimin kapanması ve bağlı kalmak zorunda olduğumu hissetmek beni pek rahatsız etmez.' },

  // --- Tip 8: Meydan Okuyucu ---
  { id: 36, tip: 8, soru: 'Beni kontrol altına almaya ya da sınırlamaya çalışan biriyle karşılaştığımda sert ve doğrudan tepki veririm.' },
  { id: 37, tip: 8, soru: 'Zayıf görünmek, hata yapmaktan çok daha kabul edilemez bir şeydir.' },
  { id: 38, tip: 8, soru: 'Önemsediğim insanları korumak için gerektiğinde güç ve otorite kullanmaktan çekinmem.' },
  { id: 39, tip: 8, ters: true, soru: 'Başkalarının otoritesine uymak ya da yönlendirilmek beni pek rahatsız etmez.' },
  { id: 40, tip: 8, ters: true, soru: 'Savunmasız hissettiğimde bunu başkalarıyla açıkça paylaşmak bende doğal bir tepkidir.' },

  // --- Tip 9: Barışçıl ---
  { id: 41, tip: 9, soru: 'Çevremdeki çatışma ve gerginliği azaltmak, kendi görüşümü savunmaktan genellikle daha önce gelir.' },
  { id: 42, tip: 9, soru: 'Kendi önceliklerimi ve isteklerimi fark etmek, başkalarının ihtiyaçlarını fark etmekten çok daha zordur.' },
  { id: 43, tip: 9, soru: 'Karar vermekten kaçınır, seçenekleri açık tutmayı ve sürecin kendiliğinden şekillenmesini beklerim.' },
  { id: 44, tip: 9, ters: true, soru: 'Çatışma ve gerginlik beni bunaltmaz; gerektiğinde doğrudan yüzleşmekten kaçınmam.' },
  { id: 45, tip: 9, ters: true, soru: 'Kendi isteklerimi ve önceliklerimi başkalarınkiyle eşit derecede önemserim.' },
];
