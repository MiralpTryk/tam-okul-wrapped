export const motivationalQuotes = [
    {
      text: "Zafer, zafer benimdir diyebilenindir. Başarı ise 'başaracağım' diye başlayarak sonunda 'başardım' diyenindir.",
      author: "Mustafa Kemal Atatürk",
    },
    {
      text: "Kazanma isteği ve başarıya ulaşma arzusu birleşirse kişisel mükemmelliğin kapısını açar.",
      author: "Konfüçyüs",
    },
    {
      text: "Hiçbir şeyden vazgeçme, çünkü sadece kaybedenler vazgeçer.",
      author: "Abraham Lincoln",
    },
    {
      text: "Başarıya çıkan asansör bozuk. Bekleyerek zaman kaybetmeyin, adım adım merdivenleri çıkmaya başlayın.",
      author: "Joe Girard",
    },
    {
      text: "Fırsatlar durup dururken karşınıza çıkmaz, onları siz yaratırsınız.",
      author: "Chris Grosser",
    },
    {
      text: "Şansa çok inanırım ve ne kadar çok çalıştıysam ona o kadar çok sahip oldum.",
      author: "Thomas Jefferson",
    },
    {
      text: "Bir şeye başlayıp başarısız olmaktan daha kötü tek şey hiçbir şeye başlamamaktır.",
      author: "Seth Godin",
    },
    {
      text: "Sadece sınırlarını aşmanın riskini alanlar ne kadar ileri gidebildiklerini görürler.",
      author: "T.S. Elliot",
    },
    {
      text: "Hayat her ne kadar zor görünse de, yapabileceğimiz ve başarabileceğimiz bir şey mutlaka vardır.",
      author: "Stephen Hawking",
    },
    {
      text: "Bir şeyi başarmak ne kadar zorsa, zaferin tadı o kadar güzeldir.",
      author: "Pele",
    },
    {
      text: "Hiç kimse başarı merdivenine elleri cebinde tırmanmamıştır.",
      author: "J. Keth Moorhead",
    },
    {
      text: "Ne zaman başarılı bir iş görseniz, birisi bir zamanlar mutlaka cesur bir karar almıştır.",
      author: "Peter Drucker",
    },
    {
      text: "Sessizce sıkı çalışın, bırakın başarı sesiniz olsun.",
      author: "Frank Ocean",
    },
    {
      text: "Eğer her şey kontrol altında gibi görünüyorsa, yeterince hızlı gitmiyorsunuzdur.",
      author: "Mario Andretti",
    },
    {
      text: "Başarısız insanlar içerisinde bulundukları duruma göre karar verirler. Başarılı insanlar ise olmak istedikleri yere göre karar verirler.",
      author: "Benjamin Hardy",
    },
    {
      text: "Sadece başarılı bir insan olmaya değil, değerli bir insan olmaya çalışın.",
      author: "Albert Einstein",
    },
    {
      text: "Başarı son değildir, başarısızlık ise ölümcül değildir: Önemli olan ilerlemeye cesaret etmektir.",
      author: "Winston S. Churchill",
    },
    {
      text: "Her gün tutarlılık ile tekrarlanan küçük disiplinler, zaman içinde büyük başarıların oluşmasını sağlar.",
      author: "John C. Maxwell",
    },
    {
      text: "En büyük makam, en büyük hak çalışanlara ait olacaktır.",
      author: "Mustafa Kemal Atatürk",
    },
    {
      text: "Bilginin efendisi olmak için çalışmanın uşağı olmak şarttır.",
      author: "Balzac",
    },
    {
      text: "Çalışmak bizi üç beladan kurtarır: Can sıkıntısı, kötü alışkanlıklar ve yoksulluk.",
      author: "Voltaire",
    },
    {
      text: "Keskin bıçak olmak için çok çekiç yemek gerekir.",
      author: "Türk Atasözü",
    },
    {
      text: "İnsanoğlu için en kutsal ibadet; çalışmak, doğruluk ve insan sevgisidir.",
      author: "Hacı Bektaş-i Veli",
    },
    {
      text: "10 bin tekmeyi bir kez çalışandan korkmam, bir tekmeyi 10 bin kez çalışandan korkarım.",
      author: "Bruce Lee",
    },
    {
      text: "Çalışma olmadan yetenek hiçbir şeydir.",
      author: "Cristiano Ronaldo",
    },
    {
      text: "Basit bir adamın elinden geleni yapmaya çalışması, zeki bir adamın tembelliğinden iyidir.",
      author: "G. Gracian",
    },
    {
      text: "Daima yukarıya bak, bilmediğin şeyleri öğren ve her gün yükselmeye çalış.",
      author: "Louis Pasteur",
    },
    {
      text: "İnsanlar, benim ustalığımı elde etmek için ne kadar sıkı çalıştığımı bilseler, o kadar da hayret edilecek bir şey olmadığını anlarlardı.",
      author: "Michelangelo",
    },
    {
      text: "Zamanlama, azim ve 10 yıl boyunca aralıksız çalışmak, sizi bir gecede başarılı olmuşsunuz gibi gösterir.",
      author: "Biz Stone",
    },
    {
      text: "Eğitim geleceğin pasaportudur, çünkü yarın, bugün hazırlananlara aittir.",
      author: "Malcolm X",
    },
    {
      text: "Dünyayı değiştirmek için kullanabileceğin en güçlü silah eğitimdir.",
      author: "B.B. King",
    },
  ];
  

export const getQuoteBackground = (id, backgroundImages) => {
  return `${backgroundImages[id % backgroundImages.length]}?auto=format&fit=crop&w=800&q=80`
} 