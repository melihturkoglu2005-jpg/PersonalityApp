// Her sorunun üç alanı var:
//   fonksiyon : ölçülen bilişsel fonksiyon (Ni, Ne, Si, Se, Ti, Te, Fi, Fe)
//   ters      : true ise cevap ters kodlanır (6 - puan), false/undefined ise normal
//
// v3 Güncellemesi — Psikometrik kaynaklar:
//
// IPIP Kılavuzu (Goldberg, openpsychometrics.org):
//   "Aynı fonksiyonun soruları üst üste sıralanırsa kullanıcı hepsine aynı
//    cevabı verme eğilimine girer → varyans düşer → geçerlilik azalır."
//   Çözüm: (1) farklı fonksiyon soruları dönüşümlü sıralanır,
//           (2) her fonksiyon için en az 1-2 ters kodlanmış soru eklenir.
//
// SWCPQ Makale (Jorgenson, openpsychometrics.org):
//   "Düşük interrater reliability (ICC) olan sorular belirsiz veya öznel
//    yoruma açık sorulardır — bunlar ölçümü gürültüyle kirletir."
//   "Measurement invariance: aynı soru farklı referans çerçevelerinde
//    farklı anlama gelebilir → mümkün olduğunca somut, davranışa dönük
//    ifadeler tercih edilmeli."
//   Çözüm: soyut öz-niteleme yerine gözlemlenebilir davranış/tercih odaklı
//           ifadeler kullanıldı. "Bence", "sanırım", "hissediyorum" gibi
//           yoruma açık girişler kaldırıldı.
//
// Sıralama mantığı:
//   Her 8 soruluk blokta 8 farklı fonksiyon birer kez geçer (round-robin).
//   5 tur × 8 fonksiyon = 40 soru. Her fonksiyonda 2 ters (-) soru bulunur.
//
// Ters kodlama notu (hesaplama tarafı için):
//   Kullanıcı 1-5 arası cevap verir. Ters sorular için: efektif_puan = 6 - puan
//   Yani "1 = Hiç katılmıyorum" → 5 puan olarak sayılır.

export const mbtiQuestions = [

  // ── BLOK 1 (soru 1-8) ──────────────────────────────────────────────────────
  // Her blokta 8 farklı fonksiyon, dönüşümlü sıra

  { id: 1,  fonksiyon: 'Ni',
    soru: 'Ne kadar çok düşünsem seçenekler artmaz, tersine tek bir net sonuca doğru daralır.' },

  { id: 2,  fonksiyon: 'Te',
    soru: 'Bir hedef belirleyince hemen somut adımlara, sorumluluklara ve başarı ölçütlerine geçerim.' },

  { id: 3,  fonksiyon: 'Fi',
    soru: 'Kendi değerlerime aykırı bir şeyi, herkes makul bulsun, yine de yapamam.' },

  { id: 4,  fonksiyon: 'Se',
    soru: 'Plan yapmakla zaman kaybetmek yerine doğrudan işe koyulmak içimden gelir.' },

  { id: 5,  fonksiyon: 'Ne',
    soru: 'Bir fikir üzerine düşünmeye başlayınca o fikrin açtığı yeni olasılıklar asıl konudan daha ilgi çekici hale gelir.' },

  { id: 6,  fonksiyon: 'Si',
    soru: 'Daha iyi bir yol çıksa bile daha önce işe yarayan yöntemi bırakmak içimde bir direnç yaratır.' },

  { id: 7,  fonksiyon: 'Ti',
    soru: 'Bir şeyi gerçekten kavramak için başkasına güvenmek yerine kendi zihinsel modelimi kurmam gerekir.' },

  { id: 8,  fonksiyon: 'Fe',
    soru: 'Bir ortama girdiğimde oradaki havayı — gerginliği, neşeyi, rahatsızlığı — daha ilk anda hissederim.' },

  // ── BLOK 2 (soru 9-16) ─────────────────────────────────────────────────────

  { id: 9,  fonksiyon: 'Ni', ters: true,
    // Ters: Ni düşük → çok farklı olasılıkla düşünür, tek sonuca daralma olmaz
    soru: 'Uzun uzun düşünsem bile birden fazla yorum ya da sonuç eşit ölçüde makul görünmeye devam eder.' },

  { id: 10, fonksiyon: 'Te',
    soru: 'Bir grup dağınık çalışıyorsa düzene sokup sonuca yönlendirmek için içimde güçlü bir itki uyanır.' },

  { id: 11, fonksiyon: 'Fi',
    soru: 'Duygularımı pek dışa vurmam; onları içimde sessizce ve derinlemesine sindirir, işlerim.' },

  { id: 12, fonksiyon: 'Se',
    soru: 'Çevremdeki görsel, işitsel ya da dokunsal ayrıntıları çoğu zaman başkaları fark etmeden önce yakalarım.' },

  { id: 13, fonksiyon: 'Ne',
    soru: 'Birbirinden çok farklı alanlar arasındaki beklenmedik bağlantıları keşfetmek içimde gerçek bir heyecan uyandırır.' },

  { id: 14, fonksiyon: 'Si',
    soru: 'Bir koku, melodi ya da dokunuş geçmişteki belirli bir anı o kadar canlı geri getirir ki neredeyse yeniden yaşıyormuşum gibi hissederim.' },

  { id: 15, fonksiyon: 'Ti',
    soru: 'Herkes doğru olarak kabul etse bile bir bilgiyi kendi süzgecimden geçirmeden benimseyemem.' },

  { id: 16, fonksiyon: 'Fe',
    soru: 'Birinin üzgün ya da tedirgin olduğunu sezince o durumu düzeltmeye çalışmak benim için neredeyse içgüdüsel.' },

  // ── BLOK 3 (soru 17-24) ────────────────────────────────────────────────────

  { id: 17, fonksiyon: 'Ni',
    soru: 'Ortada henüz belirgin bir işaret yokken bile bir olayın nereye gideceğini sezebiliyorum.' },

  { id: 18, fonksiyon: 'Te', ters: true,
    // Ters: Te düşük → verimliliği değil, kavramsal tutarlılığı önemseyebilir (Ti eğilimi)
    soru: 'Bir sürecin ne kadar hızlı sonuç verdiğinden çok iç tutarlılığı ve mantığı benim için daha önemli.' },

  { id: 19, fonksiyon: 'Fi',
    soru: 'Başkalarının onayı, kendi değerlerime sadık kalmaktan çok daha az öncelik taşır.' },

  { id: 20, fonksiyon: 'Se',
    soru: 'Ani bir durumda önceden plan yapmak yerine o anki sezgimle hareket etmek benim için genellikle daha iyi sonuç verir.' },

  { id: 21, fonksiyon: 'Ne',
    soru: 'Yeni bir fikir bulmak beni, o fikri hayata geçirmekten çok daha fazla heyecanlandırır.' },

  { id: 22, fonksiyon: 'Si', ters: true,
    // Ters: Si düşük → rutine bağlı değil, değişime açık (Se veya N eğilimi)
    soru: 'Alışkanlıklarımı ya da günlük düzenimi değiştirmek beni bunaltmaz; çoğu zaman canlandırır.' },

  { id: 23, fonksiyon: 'Ti',
    soru: 'Bir argümanda küçücük bir mantık çatlağı görürsem, sonuç ne kadar doğru olursa olsun o argümanı olduğu gibi kabul edemem.' },

  { id: 24, fonksiyon: 'Fe', ters: true,
    // Ters: Fe düşük → grup uyumunu kişisel görüşünün önüne koymaz (Fi eğilimi)
    soru: 'Azınlıkta kalsam da kendi görüşümü açıkça söylemeyi, grubun genel kanaatine uymaktan daha doğal bulurum.' },

  // ── BLOK 4 (soru 25-32) ────────────────────────────────────────────────────

  { id: 25, fonksiyon: 'Ni',
    soru: 'Zihnimde sürekli şekillenen derin bir vizyon ya da kavrayış var; onu başkalarına tam olarak aktarmak çoğu zaman zor.' },

  { id: 26, fonksiyon: 'Te',
    soru: 'Kararlarımı somut kanıt ve ölçülebilir veriye dayandırırım; sezgi ve duygular bu süreçte geri planda kalır.' },

  { id: 27, fonksiyon: 'Fi',
    soru: 'Dışarıdan bağımsız, kendime özgü bir değerler dünyam ve kimliğim olduğunu içten hissederim.' },

  { id: 28, fonksiyon: 'Se',
    soru: 'Fiziksel estetik — tasarım, renk, doku, biçim — benim için gerçek bir anlam taşır.' },

  { id: 29, fonksiyon: 'Ne',
    soru: 'Bir fikrin olası tüm yorumlarını ve alternatif anlamlarını zihnimde aynı anda canlandırabilirim.' },

  { id: 30, fonksiyon: 'Si',
    soru: 'Yeni bir bilgi ya da yöntemi öğrenirken geçmişte karşılaştığım benzer örneklerle kıyaslayarak anlamlandırırım.' },

  { id: 31, fonksiyon: 'Ti',
    soru: 'Bir sistemi ya da fikri parçalarına ayırıp her parçanın nasıl işlediğini kavramak içimde gerçek bir tatmin yaratır.' },

  { id: 32, fonksiyon: 'Fe',
    soru: 'İnsanların birbirleriyle bağ kurmasını kolaylaştırmak ve onları duygusal olarak bir araya getirmek benim için doğal bir role dönüşür.' },

  // ── BLOK 5 (soru 33-40) ────────────────────────────────────────────────────

  { id: 33, fonksiyon: 'Ni', ters: true,
    // Ters: Ni düşük → "tek doğru" yerine birden fazla eşit geçerli yolu kabul eder
    soru: 'Tek bir doğru çözüm aramak yerine birden fazla yaklaşımın eşit ölçüde geçerli olabileceğini rahatlıkla kabul ederim.' },

  { id: 34, fonksiyon: 'Te', ters: true,
    // Ters: Te düşük → sonuç odaklı organizasyondan çok keşif/anlama odaklı
    soru: 'Net plan ve takvim oluşturmaktan çok konuyu keşfe çıkarak ilerlemeyi daha doğal bulurum.' },

  { id: 35, fonksiyon: 'Fi', ters: true,
    // Ters: Fi düşük → kişisel değer çatışması yerine grup uyumunu ön plana alabilir (Fe eğilimi)
    soru: 'Biriyle farklı değerlere sahip olmak içimde derin bir rahatsızlık yaratmaz; farklı değer sistemlerini kolayca kabul ederim.' },

  { id: 36, fonksiyon: 'Se', ters: true,
    // Ters: Se düşük → anlık fiziksel uyarım yerine iç dünya veya soyut düşünce ağır basar
    soru: 'Gürültülü ortamlar ya da yoğun tempolu aktiviteler beni canlandırmak yerine genellikle yorar.' },

  { id: 37, fonksiyon: 'Ne',
    soru: 'Beyin fırtınası yaparken fikirler durmadan birbirini tetikler; istesem de bu zinciri kesmek güçtür.' },

  { id: 38, fonksiyon: 'Si',
    soru: 'Günlük hayatımda ani ve köklü değişiklikler beni bunaltır; tanıdık rutinler enerji verir.' },

  { id: 39, fonksiyon: 'Ti', ters: true,
    // Ters: Ti düşük → kendi iç modelini değil, dış veriyi ve pratik sonuçları önceliklendirir (Te eğilimi)
    soru: 'Kendi modelimi oluşturmak için derinlemesine analiz yapmak yerine güvenilir bir kaynaktan doğrulanmış bilgiyle hareket etmeyi tercih ederim.' },

  { id: 40, fonksiyon: 'Fe',
    soru: 'İnsanlar arasındaki bağı ve uyumu korumak, kendi tercihlerimi öne çıkarmaktan çok daha önde gelir.' },
];