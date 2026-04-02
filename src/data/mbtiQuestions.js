// Her sorunun bir "fonksiyon" alanı var.
// Bu alan, sorunun hangi bilişsel fonksiyonu ölçtüğünü söyler.
// Ni, Ne, Si, Se, Ti, Te, Fi, Fe — 8 fonksiyon, her birinden 5 soru = 40 soru

export const mbtiQuestions = [
  // --- Ni (İçe Dönük Sezgi) ---
  { id: 1,  fonksiyon: 'Ni', soru: 'Bir konuyu düşünürken zamanla tek bir net sonuca ulaştığımı fark ederim.' },
  { id: 2,  fonksiyon: 'Ni', soru: 'Olayların nereye gideceğini, olmadan önce sezebiliyorum.' },
  { id: 3,  fonksiyon: 'Ni', soru: 'Semboller ve metaforlar aracılığıyla düşünmek benim için doğal gelir.' },
  { id: 4,  fonksiyon: 'Ni', soru: 'Zihnimde sürekli derin ve soyut bir vizyon şekillenir.' },
  { id: 5,  fonksiyon: 'Ni', soru: 'Bir şeyin "doğru" olduğunu kanıtlayamasam da içten bildiğim anlar olur.' },

  // --- Ne (Dışa Dönük Sezgi) ---
  { id: 6,  fonksiyon: 'Ne', soru: 'Bir fikirden çok hızlı başka fikirlere dallanırım.' },
  { id: 7,  fonksiyon: 'Ne', soru: 'Olasılıkları ve alternatifleri keşfetmek beni heyecanlandırır.' },
  { id: 8,  fonksiyon: 'Ne', soru: 'Farklı alanlardaki kavramlar arasında bağlantılar kurmaktan zevk alırım.' },
  { id: 9,  fonksiyon: 'Ne', soru: 'Yeni bir fikir üretmek, o fikri hayata geçirmekten daha ilgi çekici gelir.' },
  { id: 10, fonksiyon: 'Ne', soru: 'Beyin fırtınası yaparken fikirler birbirini tetikleyerek çoğalır.' },

  // --- Si (İçe Dönük Duyum) ---
  { id: 11, fonksiyon: 'Si', soru: 'Geçmişteki deneyimlerim, bugün nasıl davranacağımı büyük ölçüde şekillendirir.' },
  { id: 12, fonksiyon: 'Si', soru: 'Alışkanlıklarım ve rutinlerim benim için önemli bir güvence kaynağıdır.' },
  { id: 13, fonksiyon: 'Si', soru: 'Bir koku, ses veya dokunuş geçmişteki anıları canlı biçimde geri getirebilir.' },
  { id: 14, fonksiyon: 'Si', soru: 'Denenmiş ve işe yaramış yöntemlere güvenmeyi tercih ederim.' },
  { id: 15, fonksiyon: 'Si', soru: 'Ayrıntıları ve geçmiş bilgileri doğru biçimde hatırlamak benim için kolaydır.' },

  // --- Se (Dışa Dönük Duyum) ---
  { id: 16, fonksiyon: 'Se', soru: 'Şu an yaşadığım anı tamamen hissederek yaşamayı severim.' },
  { id: 17, fonksiyon: 'Se', soru: 'Fiziksel ortam ve estetik benim için oldukça önemlidir.' },
  { id: 18, fonksiyon: 'Se', soru: 'Ani gelişmelere hızlı ve etkili biçimde tepki verebilirim.' },
  { id: 19, fonksiyon: 'Se', soru: 'Eylem halindeyken, plan yaparken değil, en iyi kararlarımı alırım.' },
  { id: 20, fonksiyon: 'Se', soru: 'Çevremdeki küçük değişiklikleri başkalarından önce fark ederim.' },

  // --- Ti (İçe Dönük Düşünme) ---
  { id: 21, fonksiyon: 'Ti', soru: 'Bir sistemi veya fikri içten dışa doğru analiz etmekten keyif alırım.' },
  { id: 22, fonksiyon: 'Ti', soru: 'Kendi içinde tutarsız olan argümanlara karşı çok hassasım.' },
  { id: 23, fonksiyon: 'Ti', soru: 'Bir şeyi gerçekten anlamak için kendi zihinsel modelimi oluşturmam gerekir.' },
  { id: 24, fonksiyon: 'Ti', soru: 'Başkalarının kabul ettiği bilgileri sorgulamak benim için doğaldır.' },
  { id: 25, fonksiyon: 'Ti', soru: 'Verimliliğin yanı sıra bir sistemin mantıksal tutarlılığı da benim için önemlidir.' },

  // --- Te (Dışa Dönük Düşünme) ---
  { id: 26, fonksiyon: 'Te', soru: 'Hedeflere ulaşmak için net planlar ve sistemler oluşturmayı severim.' },
  { id: 27, fonksiyon: 'Te', soru: 'Verimsizliği ve gereksiz karmaşıklığı gördüğümde düzeltme ihtiyacı duyarım.' },
  { id: 28, fonksiyon: 'Te', soru: 'Kararlarımı duygulardan çok veriler ve sonuçlar üzerine temellendiririm.' },
  { id: 29, fonksiyon: 'Te', soru: 'Bir gruba liderlik etmek ve organize etmek benim için doğal gelir.' },
  { id: 30, fonksiyon: 'Te', soru: 'Söylediklerimin net, doğrudan ve uygulanabilir olmasına özen gösteririm.' },

  // --- Fi (İçe Dönük Hissetme) ---
  { id: 31, fonksiyon: 'Fi', soru: 'Kendi değerlerime ve ilkelerime aykırı bir şey yapmak içimde derin bir rahatsızlık yaratır.' },
  { id: 32, fonksiyon: 'Fi', soru: 'Duygularımı başkalarıyla paylaşmak yerine içimde derinlemesine işlemeyi tercih ederim.' },
  { id: 33, fonksiyon: 'Fi', soru: 'Bir karakterin veya kişinin iç dünyasını kolayca hissedebilirim.' },
  { id: 34, fonksiyon: 'Fi', soru: 'Kendime özgü bir kimliğim ve değerler setim olduğunu güçlü biçimde hissederim.' },
  { id: 35, fonksiyon: 'Fi', soru: 'Otantik olmak, başkaları tarafından onaylanmaktan daha önemlidir.' },

  // --- Fe (Dışa Dönük Hissetme) ---
  { id: 36, fonksiyon: 'Fe', soru: 'Bulunduğum ortamdaki duygusal havayı hemen sezinlerim.' },
  { id: 37, fonksiyon: 'Fe', soru: 'İnsanların ihtiyaçlarını karşılamak ve onları mutlu etmek beni tatmin eder.' },
  { id: 38, fonksiyon: 'Fe', soru: 'Grup uyumunu korumak benim için kişisel tercihlerimden daha önceliklidir.' },
  { id: 39, fonksiyon: 'Fe', soru: 'Başkalarının duygularını kendi duygularım gibi hissedebiliyorum.' },
  { id: 40, fonksiyon: 'Fe', soru: 'İnsanları bir araya getirmek ve bağ kurmalarını sağlamak benim için doğal gelir.' },
];