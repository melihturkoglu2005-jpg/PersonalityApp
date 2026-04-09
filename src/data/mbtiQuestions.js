// Her sorunun üç alanı var:
//   fonksiyon : ölçülen bilişsel fonksiyon (Ni, Ne, Si, Se, Ti, Te, Fi, Fe)
//   ters      : true ise cevap ters kodlanır (6 - puan), false/undefined ise normal
//
// v3 Güncellemesi — Psikometrik Düzenleme:
// (1) Farklı fonksiyon soruları dönüşümlü sıralanmıştır (Round-robin).
// (2) Her fonksiyon için 5 soru bulunur; bunlardan 2 tanesi ters (-) kodlanmıştır.
// (3) Soyut ifadeler yerine gözlemlenebilir davranışlar tercih edilmiştir.

export const mbtiQuestions = [

  // ── BLOK 1 (Soru 1-8) ──────────────────────────────────────────────────────

  { id: 1,  fonksiyon: 'Ni',
    soru: 'Bir konu üzerinde ne kadar çok düşünürsem düşüneyim, seçenekler artmak yerine tek ve net bir sonuca doğru evrilir.' },

  { id: 2,  fonksiyon: 'Te',
    soru: 'Bir hedef belirlediğim an, işi somut adımlara bölmeye ve başarıyı nasıl ölçeceğimi planlamaya başlarım.' },

  { id: 3,  fonksiyon: 'Fi',
    soru: 'Herkes mantıklı olduğunu söylese bile, kendi değerlerime ters düşen bir şeyi yapmaya elim varmaz.' },

  { id: 4,  fonksiyon: 'Se',
    soru: 'Ayrıntılı planlarla vakit kaybetmektense, doğrudan eyleme geçip süreci yaşayarak görmeyi tercih ederim.' },

  { id: 5,  fonksiyon: 'Ne',
    soru: 'Bir fikir üzerine kafa yorarken, o fikrin dallanıp budaklanarak açtığı yeni olasılıklar asıl konudan daha çekici hale gelir.' },

  { id: 6,  fonksiyon: 'Si',
    soru: 'Daha iyi bir yol önerilse bile, geçmişte işe yaradığı kanıtlanmış yöntemleri değiştirmek beni huzursuz eder.' },

  { id: 7,  fonksiyon: 'Ti',
    soru: 'Bir konuyu gerçekten anlamış sayılmam için, başkalarının açıklamalarından ziyade zihnimde kendi mantık şemamı kurmam gerekir.' },

  { id: 8,  fonksiyon: 'Fe',
    soru: 'Bir ortama girdiğimde oradaki havayı —gerginliği, neşeyi ya da huzursuzluğu— daha kimse konuşmadan hissederim.' },

  // ── BLOK 2 (Soru 9-16) ─────────────────────────────────────────────────────

  { id: 9,  fonksiyon: 'Ni', ters: true,
    soru: 'Bir mesele üzerine uzun süre düşünsem bile, farklı yorumlar ve sonuçlar gözüme eşit derecede makul görünmeye devam eder.' },

  { id: 10, fonksiyon: 'Te',
    soru: 'Bir grubun dağınık ve verimsiz çalıştığını gördüğümde, hemen dizginleri ele alıp işleri yoluna koyma isteği duyarım.' },

  { id: 11, fonksiyon: 'Fi',
    soru: 'Duygularımı dışa vurmak yerine, onları kendi içimde sessizce ve derinlemesine yaşamayı tercih ederim.' },

  { id: 12, fonksiyon: 'Se',
    soru: 'Çevremdeki görsel detayları, sesleri veya dokuları çoğu insanın ruhu bile duymadan fark ederim.' },

  { id: 13, fonksiyon: 'Ne',
    soru: 'Birbirinden tamamen kopuk görünen konular arasında beklenmedik bağlar kurmak beni gerçekten heyecanlandırır.' },

  { id: 14, fonksiyon: 'Si',
    soru: 'Bazen bir koku veya melodi, geçmişteki bir anıyı o kadar canlı canlandırır ki kendimi o ana geri dönmüş gibi hissederim.' },

  { id: 15, fonksiyon: 'Ti',
    soru: 'Herkes bir bilginin doğruluğu konusunda hemfikir olsa bile, onu kendi mantık süzgecimden geçirmeden kabul edemem.' },

  { id: 16, fonksiyon: 'Fe',
    soru: 'Birinin üzgün ya da tedirgin olduğunu sezdiğimde, ortamı yumuşatmak ve onu rahatlatmak benim için neredeyse refleksif bir durumdur.' },

  // ── BLOK 3 (Soru 17-24) ────────────────────────────────────────────────────

  { id: 17, fonksiyon: 'Ni',
    soru: 'Henüz somut bir işaret yokken bile, olayların eninde sonunda nereye varacağını önsezilerimle kestirebilirim.' },

  { id: 18, fonksiyon: 'Te', ters: true,
    soru: 'Bir işin ne kadar hızlı bittiğinden ziyade, sürecin kendi içindeki mantık örgüsü ve tutarlılığı benim için daha önemlidir.' },

  { id: 19, fonksiyon: 'Fi',
    soru: 'Kendi değerlerime sadık kalmak, başkalarının onayını almaktan her zaman daha önceliklidir.' },

  { id: 20, fonksiyon: 'Se',
    soru: 'Beklenmedik durumlarda önceden plan yapmak yerine, o anki şartlara göre anlık tepki vermek bende daha iyi sonuç verir.' },

  { id: 21, fonksiyon: 'Ne',
    soru: 'Yeni bir fikir üretmenin verdiği haz, o fikri hayata geçirmek için gereken teknik detaylarla uğraşmaktan çok daha büyüktür.' },

  { id: 22, fonksiyon: 'Si', ters: true,
    soru: 'Alışkanlıklarımı ya da günlük rutinimi değiştirmek beni yormaz, aksine çoğu zaman bana taze bir enerji verir.' },

  { id: 23, fonksiyon: 'Ti',
    soru: 'Bir argümanın içinde küçücük bir mantık hatası yakalarsam, ulaştığı sonuç doğru olsa bile o düşünceyi bütünüyle benimseyemem.' },

  { id: 24, fonksiyon: 'Fe', ters: true,
    soru: 'Grubun genel görüşüne aykırı düşsem bile, kendi fikrimi açıkça söylemeyi uyum sağlamaya çalışmaktan daha doğal bulurum.' },

  // ── BLOK 4 (Soru 25-32) ────────────────────────────────────────────────────

  { id: 25, fonksiyon: 'Ni',
    soru: 'Zihnimde sürekli şekillenen öyle derin bir öngörü var ki, bunu kelimelere döküp başkalarına tam olarak anlatmakta zorlanıyorum.' },

  { id: 26, fonksiyon: 'Te',
    soru: 'Karar alırken duygulardan veya sezgilerden ziyade, somut verilere ve ölçülebilir kanıtlara dayanırım.' },

  { id: 27, fonksiyon: 'Fi',
    soru: 'Dış dünyadan bağımsız, sadece kendime has bir değerler sistemine ve kimlik duygusuna sahip olduğumu hissederim.' },

  { id: 28, fonksiyon: 'Se',
    soru: 'Tasarım, doku, renk ve estetik gibi fiziksel ayrıntılar yaşam kalitemi doğrudan etkileyen unsurlardır.' },

  { id: 29, fonksiyon: 'Ne',
    soru: 'Bir fikrin zihnimde uyandırabileceği tüm farklı yorumları ve alternatif anlamları aynı anda görebilirim.' },

  { id: 30, fonksiyon: 'Si',
    soru: 'Yeni bir şeyi öğrenirken, onu zihnimdeki mevcut bilgilerle ve geçmiş tecrübelerimle kıyaslayarak anlamlandırırım.' },

  { id: 31, fonksiyon: 'Ti',
    soru: 'Karmaşık bir sistemi parçalarına ayırıp her bir çarkın nasıl işlediğini çözmek bana büyük bir zihinsel tatmin sağlar.' },

  { id: 32, fonksiyon: 'Fe',
    soru: 'İnsanlar arasında köprü kurmak ve grubu duygusal bir uyum içinde tutmak, sosyal ortamlarda üstlendiğim doğal bir roldür.' },

  // ── BLOK 5 (Soru 33-40) ────────────────────────────────────────────────────

  { id: 33, fonksiyon: 'Ni', ters: true,
    soru: 'Tek bir "mutlak doğru" peşinde koşmak yerine, hayata dair pek çok farklı bakış açısının aynı derecede geçerli olabileceğine inanırım.' },

  { id: 34, fonksiyon: 'Te', ters: true,
    soru: 'Sıkı bir takvime bağlı kalmaktansa, konunun beni götürdüğü yere göre esnek bir şekilde ilerlemeyi daha doğal bulurum.' },

  { id: 35, fonksiyon: 'Fi', ters: true,
    soru: 'Biriyle değerlerimizin uyuşmaması bende derin bir gerginlik yaratmaz; herkesin kendine has bir dünyası olduğunu kolayca kabul ederim.' },

  { id: 36, fonksiyon: 'Se', ters: true,
    soru: 'Aşırı hareketli ve gürültülü ortamlar beni heyecanlandırmaktan ziyade enerjimi tüketen birer yük gibidir.' },

  { id: 37, fonksiyon: 'Ne',
    soru: 'Beyin fırtınası yaparken fikirler birbirini öyle hızlı tetikler ki, bu düşünce zincirini durdurmakta bazen zorlanırım.' },

  { id: 38, fonksiyon: 'Si',
    soru: 'Hayatımdaki ani ve köklü değişimler beni kaygılandırır; bildiğim rutinler kendimi güvende hissetmemi sağlar.' },

  { id: 39, fonksiyon: 'Ti', ters: true,
    soru: 'Kendi mantık modelimi inşa etmekle uğraşmaktansa, alanında uzman kişilerin onayladığı hazır bilgileri kullanmayı tercih ederim.' },

  { id: 40, fonksiyon: 'Fe',
    soru: 'İnsanlarla olan huzurumu ve bağımı korumak, kendi kişisel isteklerimi kabul ettirmekten çok daha önemlidir.' },
];