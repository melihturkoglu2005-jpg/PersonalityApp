// Her sorunun "tip" alanı, sorunun hangi Enneagram tipini ölçtüğünü söyler.
// 9 tip, her tipten 5 soru = 45 soru

export const enneagramQuestions = [
  // --- Tip 1: Reformcu ---
  { id: 1,  tip: 1, soru: 'Bir şeyin doğru şekilde yapılması gerektiğine güçlü bir şekilde inanırım.' },
  { id: 2,  tip: 1, soru: 'Yaptığım hataları unutmak ve kendimi affetmek zordur.' },
  { id: 3,  tip: 1, soru: 'Etrafımdaki düzensizlik veya adaletsizlik beni rahatsız eder.' },
  { id: 4,  tip: 1, soru: 'Standartlarımı düşürmek yerine daha çok çalışmayı tercih ederim.' },
  { id: 5,  tip: 1, soru: 'İnsanların kurallara ve ilkelere uyması gerektiğine inanırım.' },

  // --- Tip 2: Yardımsever ---
  { id: 6,  tip: 2, soru: 'Başkalarının ihtiyaçlarını kendi ihtiyaçlarımdan önce düşünürüm.' },
  { id: 7,  tip: 2, soru: 'Sevildiğimi ve takdir edildiğimi hissetmek benim için çok önemlidir.' },
  { id: 8,  tip: 2, soru: 'Birine yardım etmek bana derin bir tatmin duygusu verir.' },
  { id: 9,  tip: 2, soru: 'İnsanların bana ihtiyaç duymasını isterim.' },
  { id: 10, tip: 2, soru: 'Zaman zaman kendi duygularımı ve ihtiyaçlarımı göz ardı ettiğimi fark ederim.' },

  // --- Tip 3: Başarıcı ---
  { id: 11, tip: 3, soru: 'Hedeflerime ulaşmak ve başarılı olmak benim için çok önemlidir.' },
  { id: 12, tip: 3, soru: 'Bulunduğum ortama göre kendimi uyarlayabilirim.' },
  { id: 13, tip: 3, soru: 'Başkalarının beni nasıl gördüğü konusunda oldukça bilinçliyim.' },
  { id: 14, tip: 3, soru: 'Verimli olmak ve sonuç üretmek benim için önceliklidir.' },
  { id: 15, tip: 3, soru: 'Başarısızlık benim için çok zor bir deneyimdir.' },

  // --- Tip 4: Bireyci ---
  { id: 16, tip: 4, soru: 'Kendimi çoğu zaman başkalarından farklı ve yanlış anlaşılmış hissederim.' },
  { id: 17, tip: 4, soru: 'Yoğun duygular ve melankoli hayatımın doğal bir parçasıdır.' },
  { id: 18, tip: 4, soru: 'Özgün ve kendime özgü bir kimliğe sahip olmak çok önemlidir.' },
  { id: 19, tip: 4, soru: 'Eksik olan veya ulaşamadığım şeylere karşı güçlü bir özlem duyarım.' },
  { id: 20, tip: 4, soru: 'Sanat, müzik veya yaratıcılık duygularımı ifade etmem için vazgeçilmezdir.' },

  // --- Tip 5: Gözlemci ---
  { id: 21, tip: 5, soru: 'Yalnız kalmak ve kendi düşüncelerime çekilmek bana enerji verir.' },
  { id: 22, tip: 5, soru: 'Bir konuyu derinlemesine anlamadan hakkında konuşmak istemem.' },
  { id: 23, tip: 5, soru: 'Duygusal veya sosyal talepler zaman zaman bunaltıcı gelebilir.' },
  { id: 24, tip: 5, soru: 'Bilgi toplamak ve analiz etmek en sevdiğim faaliyetler arasındadır.' },
  { id: 25, tip: 5, soru: 'Kaynaklarımı ve enerjimi korumak benim için önemlidir.' },

  // --- Tip 6: Sadık ---
  { id: 26, tip: 6, soru: 'Olası tehlikeleri ve riskleri önceden düşünmek benim için doğaldır.' },
  { id: 27, tip: 6, soru: 'Güvendiğim insanlara ve kurumlara büyük değer veririm.' },
  { id: 28, tip: 6, soru: 'Bir karara varmadan önce çok sayıda senaryoyu kafamda canlandırırım.' },
  { id: 29, tip: 6, soru: 'Otoriteye karşı hem saygı hem de şüpheyle yaklaşabilirim.' },
  { id: 30, tip: 6, soru: 'Belirsizlik benim için oldukça rahatsız edicidir.' },

  // --- Tip 7: Meraklı ---
  { id: 31, tip: 7, soru: 'Yeni deneyimler ve maceralar benim için vazgeçilmezdir.' },
  { id: 32, tip: 7, soru: 'Olumsuz duygulardan uzak durmak veya onları pozitife çevirmek isterim.' },
  { id: 33, tip: 7, soru: 'Aynı anda birçok ilginç proje veya fikir üzerinde çalışmayı severim.' },
  { id: 34, tip: 7, soru: 'Seçeneklerimi açık tutmak ve kısıtlanmamak benim için önemlidir.' },
  { id: 35, tip: 7, soru: 'Gelecekteki olası deneyimleri hayal etmek bana mutluluk verir.' },

  // --- Tip 8: Meydan Okuyucu ---
  { id: 36, tip: 8, soru: 'Kontrolü elinde tutmak ve zayıf görünmemek benim için önemlidir.' },
  { id: 37, tip: 8, soru: 'Haksızlıkla karşılaştığımda doğrudan ve güçlü bir tepki veririm.' },
  { id: 38, tip: 8, soru: 'İnsanlar beni kolayca manipüle edemez, buna karşı çok dikkatli olurum.' },
  { id: 39, tip: 8, soru: 'Koruyup kolladığım insanlar için her şeyi yapabilirim.' },
  { id: 40, tip: 8, soru: 'Yoğun ve güçlü bir enerjiyle hayata katılmayı severim.' },

  // --- Tip 9: Barışçıl ---
  { id: 41, tip: 9, soru: 'Çatışmalardan kaçınmak ve ortamı sakin tutmak benim için önceliklidir.' },
  { id: 42, tip: 9, soru: 'Başkalarının bakış açılarını anlamak ve herkesi dinlemek benim için doğaldır.' },
  { id: 43, tip: 9, soru: 'Zaman zaman kendi önceliklerimi ve isteklerimi göz ardı ettiğimi fark ederim.' },
  { id: 44, tip: 9, soru: 'İç huzur ve dış uyum benim için en değerli şeylerdir.' },
  { id: 45, tip: 9, soru: 'Karar vermek bazen benim için oldukça zorlu bir süreçtir.' },
];