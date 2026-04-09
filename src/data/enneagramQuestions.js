// Her sorunun "tip" alanı, sorunun hangi Enneagram tipini ölçtüğünü söyler.
// 9 tip, her tipten 5 soru = 45 soru

export const enneagramQuestions = [
  // --- Tip 1: Reformcu ---
  { id: 1,  tip: 1, soru: 'Bir şeyin doğru biçimde yapılması gerektiğine dair içimde güçlü ve vazgeçilmez bir inanç var.' },
  { id: 2,  tip: 1, soru: 'Yaptığım hataları aklımdan çıkarmak ve kendimi affetmek gerçekten zor.' },
  { id: 3,  tip: 1, soru: 'Etrafımdaki düzensizlik ya da haksızlık içimde bir şeylerin düzeltilmesi gerektiğini söyler.' },
  { id: 4,  tip: 1, soru: 'Standartlarımı indirmek yerine daha çok çabalamayı tercih ederim.' },
  { id: 5,  tip: 1, soru: 'İnsanların kurallara ve ilkelere uyması gerektiğine yürekten inanırım.' },

  // --- Tip 2: Yardımsever ---
  { id: 6,  tip: 2, soru: 'Başkalarının ne istediğini kendi ihtiyaçlarımdan önce düşünmek benim için neredeyse doğal.' },
  { id: 7,  tip: 2, soru: 'Sevildiğimi ve değer gördüğümü hissetmek benim için çok şey ifade eder.' },
  { id: 8,  tip: 2, soru: 'Birine gerçekten yardım ettiğimde içimde derin bir tatmin duygusu uyanır.' },
  { id: 9,  tip: 2, soru: 'İnsanların bana ihtiyaç duyduğunu bilmek beni anlamlı hissettiriyor.' },
  { id: 10, tip: 2, soru: 'Zaman zaman kendi duygularımı ve ihtiyaçlarımı farkında olmadan bir kenara ittiğimi görüyorum.' },

  // --- Tip 3: Başarıcı ---
  { id: 11, tip: 3, soru: 'Hedeflerime ulaşmak ve başarılı olmak hayatımda gerçekten merkezi bir yer tutuyor.' },
  { id: 12, tip: 3, soru: 'Bulunduğum ortama ve insanlara göre kendimi uyarlamakta pek zorlanmam.' },
  { id: 13, tip: 3, soru: 'Başkalarının gözünde nasıl göründüğüm konusunda oldukça farkındayım.' },
  { id: 14, tip: 3, soru: 'Verimli çalışmak ve somut sonuçlar üretmek benim için önce gelir.' },
  { id: 15, tip: 3, soru: 'Başarısız olmak benim için gerçekten sindirmesi güç bir deneyim.' },

  // --- Tip 4: Bireyci ---
  { id: 16, tip: 4, soru: 'Çoğu zaman başkalarından farklı olduğumu ve tam anlaşılamadığımı hissederim.' },
  { id: 17, tip: 4, soru: 'Yoğun duygular ve melankoli hayatımın ayrılmaz bir parçası.' },
  { id: 18, tip: 4, soru: 'Özgün olmak ve kendime ait bir kimlik taşımak benim için çok değerli.' },
  { id: 19, tip: 4, soru: 'Sahip olmadığım ya da ulaşamadığım şeylere karşı derin bir özlem duyarım.' },
  { id: 20, tip: 4, soru: 'Sanat, müzik ya da yaratıcılık, duygularımı dışa vurmanın benim için vazgeçilmez yolu.' },

  // --- Tip 5: Gözlemci ---
  { id: 21, tip: 5, soru: 'Yalnız kalıp kendi düşüncelerime çekilmek bana enerji veriyor.' },
  { id: 22, tip: 5, soru: 'Bir konuyu içimde derinlemesine oturtmadan o konuda konuşmak istemem.' },
  { id: 23, tip: 5, soru: 'Yoğun duygusal ya da sosyal talepler zaman zaman gerçekten bunaltıcı gelebiliyor.' },
  { id: 24, tip: 5, soru: 'Bilgi toplamak ve her şeyi iyice analiz etmek en sevdiğim uğraşlar arasında.' },
  { id: 25, tip: 5, soru: 'Kaynaklarımı ve enerjimi bilinçli olarak korumak benim için önemli.' },

  // --- Tip 6: Sadık ---
  { id: 26, tip: 6, soru: 'Olası tehlikeleri ve riskleri önceden düşünmek benim için neredeyse otomatik bir refleks.' },
  { id: 27, tip: 6, soru: 'Güvendiğim insanlara ve kurumlara büyük değer veririm; bu güveni zor kazanırım, zor da yitiririm.' },
  { id: 28, tip: 6, soru: 'Bir karara varmadan önce kafamda pek çok farklı senaryo canlandırırım.' },
  { id: 29, tip: 6, soru: 'Otoriteye karşı hem saygı hem de içgüdüsel bir şüpheyle yaklaşırım.' },
  { id: 30, tip: 6, soru: 'Belirsizlik içinde kalmak benim için gerçekten rahatsız edici.' },

  // --- Tip 7: Meraklı ---
  { id: 31, tip: 7, soru: 'Yeni deneyimler ve maceralar olmadan hayat eksik hissettiriyor.' },
  { id: 32, tip: 7, soru: 'Olumsuz duygularla boğuşmak yerine onları dönüştürmek ya da uzaklaştırmak isterim.' },
  { id: 33, tip: 7, soru: 'Aynı anda birden fazla ilginç proje ya da fikrin içinde olmayı severim.' },
  { id: 34, tip: 7, soru: 'Seçeneklerimin açık kalması ve kısıtlanmamam benim için önemli.' },
  { id: 35, tip: 7, soru: 'Henüz yaşamamış olduğum deneyimleri hayal etmek bile içimde gerçek bir sevinç uyandırır.' },

  // --- Tip 8: Meydan Okuyucu ---
  { id: 36, tip: 8, soru: 'Kontrolün bende olması ve zayıf görünmemek benim için önemli.' },
  { id: 37, tip: 8, soru: 'Haksızlıkla yüz yüze geldiğimde tepkim doğrudan ve güçlü olur.' },
  { id: 38, tip: 8, soru: 'İnsanların beni manipüle etmesine karşı her zaman tetikte olurum.' },
  { id: 39, tip: 8, soru: 'Önem verdiğim insanlar için gerektiğinde her şeyi göze alabilirim.' },
  { id: 40, tip: 8, soru: 'Hayata yoğun ve güçlü bir enerjiyle dahil olmayı seviyorum.' },

  // --- Tip 9: Barışçıl ---
  { id: 41, tip: 9, soru: 'Çatışmalardan uzak durmak ve ortamı sakin tutmak içimde önce gelen şeylerden.' },
  { id: 42, tip: 9, soru: 'Farklı bakış açılarını anlamak ve herkesi gerçekten dinlemek benim için oldukça doğal.' },
  { id: 43, tip: 9, soru: 'Zaman zaman kendi önceliklerimi ve isteklerimi farkında olmadan geri plana attığımı görüyorum.' },
  { id: 44, tip: 9, soru: 'İç huzur ve çevremdeki uyum, benim için en değerli şeyler arasında.' },
  { id: 45, tip: 9, soru: 'Karar vermek zaman zaman benim için gerçekten yorucu ve zorlu bir süreç.' },
];