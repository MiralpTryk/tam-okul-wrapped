// Book Covers
import AclikCover from "@/assets/img/aclik.jpeg";
import AgantaCover from "@/assets/img/aganta-burina-burinata.jpeg";
import AkdenizCover from "@/assets/img/akdeniz.jpeg";
import AyasliCover from "@/assets/img/ayasli-ve-kiracilari.jpg";
import BabalarCover from "@/assets/img/babalar-ve-ogullar.jpg";
import BeyazDisCover from "@/assets/img/beyaz-dis.webp";
import BeyazGemiCover from "@/assets/img/beyaz-gemi.jpg";
import BirBilimAdamiCover from "@/assets/img/bir-bilim-adaminin-romani.jpg";
import CalikusuCover from "@/assets/img/calikusu.jpeg";
import CanlarCover from "@/assets/img/canlar-kimin-icin-caliyor.jpg";
import CemoCover from "@/assets/img/cemo.jpeg";
import DervisCover from "@/assets/img/dervis-ve-olum.jpg";
import DokuzuncuCover from "@/assets/img/dokuzuncu-hariciye-kogusu.jpg";
import DonKisotCover from "@/assets/img/don-kisot.jpg";
import DrinaCover from "@/assets/img/drina-koprusu.jpeg";
import DrinadaCover from "@/assets/img/drinada-son-gun.jpg";
import EsirCover from "@/assets/img/esir-sehrin-insanlari.jpg";
import EskiciCover from "@/assets/img/eskici-ve-ogullari.jpg";
import FarelerCover from "@/assets/img/fareler-ve-insanlar.jpg";
import FatihHarbiyeCover from "@/assets/img/fatih-harbiye.jpg";
import GoraCover from "@/assets/img/gora.jpg";
import GunOlurCover from "@/assets/img/gun-olur-asra-bedel.jpg";
import IbrahimCover from "@/assets/img/ibrahim-efendi-konagi.webp";
import IkiSehrinCover from "@/assets/img/iki-sehrin-hikayesi.webp";
import KalpaklilarCover from "@/assets/img/kalpaklilar.jpg";
import KaplumbagalarCover from "@/assets/img/kaplumbagalar.jpg";
import KaratmaCover from "@/assets/img/karartma-geceleri.jpg";
import KayipCover from "@/assets/img/kayip-araniyor.webp";
import KiralikCover from "@/assets/img/kiralik-konak.jpg";
import KucukCover from "@/assets/img/kucuk-aga.jpg";
import KuyrukluCover from "@/assets/img/kuyruklu-yildiz.webp";
import KuyucakliCover from "@/assets/img/kuyucakli-yusuf.jpg";
import MadameCover from "@/assets/img/madame-bovary.webp";
import MaiCover from "@/assets/img/mai-ve-siyah.webp";
import MorCover from "@/assets/img/mor-salkimli-ev.jpeg";
import OluCover from "@/assets/img/olu-canlar.webp";
import OnlarCover from "@/assets/img/onlar-da-insandi.jpg";
import RobinsonCover from "@/assets/img/robinson.jpg";
import SahneninCover from "@/assets/img/sahnenin-disindakiler.jpg";
import SavasCover from "@/assets/img/savas-ve-baris.jpg";
import SefillerCover from "@/assets/img/sefiller.jpg";
import SerguzestCover from "@/assets/img/serguzest.jpg";
import SesCover from "@/assets/img/ses-ve-ofke.png";
import SinekliCover from "@/assets/img/sinekli-bakkal.jpg";
import SokaktaCover from "@/assets/img/sokakta.jpg";
import SucCover from "@/assets/img/suc-ve-ceza.jpg";
import TutunCover from "@/assets/img/tutun-zamani.jpg";
import VadiCover from "@/assets/img/vadideki-zambak.jpg";
import YabanCover from "@/assets/img/yaban.jpg";
import YasarCover from "@/assets/img/yasar-ne-yasar-ne-yasamaz.jpg";
import YedinciCover from "@/assets/img/yedinci-gun.jpg";
import YilkiCover from "@/assets/img/yilki-ati.png";

export const books = [
    {
      id: 1,
      title: "Açlık",
      subtitle: "Knut Hamsun",
      image: AclikCover,
      description:
        "Genç bir yazarın açlık ve yoksullukla mücadelesini anlatan roman, insanın varoluşsal sancılarını ve toplumsal gerçekleri işler. Modern edebiyatın öncü eserlerinden biridir.",
      category: ["Dünya Klasikleri", "Psikolojik Roman", "Modern Edebiyat"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 2,
      title: "Aganta Burina Burinata",
      subtitle: "Halikarnas Balıkçısı",
      image: AgantaCover,
      description:
        "Ege denizinde geçen, balkçıların yaşamını ve denizle olan mücadelelerini anlatan roman. Deniz kültürü ve insan-doğa ilişkisini ustalıkla işler.",
      category: ["Türk Edebiyatı", "Deniz Hikayeleri", "Toplumsal Roman"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 3,
      title: "Akdeniz",
      subtitle: "Panait Istrati",
      image: AkdenizCover,
      description:
        "Akdeniz'in büyülü atmosferinde geçen, dostluk ve özgürlük temalı hikayeler. Deniz insanlarının yaşamını ve Akdeniz kültürünü canlı bir şekilde yansıtır.",
      category: ["Dünya Klasikleri", "Deniz Edebiyatı", "Gezi-Macera"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 4,
      title: "Ayaşlı ile Kiracıları",
      subtitle: "Memduh Şevket Esendal",
      image: AyasliCover,
      description:
        "Bir apartmanda yaşayan insanların gündelik hayatları üzerinden toplumsal değişimi anlatan roman. Cumhuriyet dönemi Türk toplumunun panoramasını sunar.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Cumhuriyet Dönemi"],
      readingTime: "9 saat",
      pages: "216 sayfa",
    },
    {
      id: 5,
      title: "Babalar ve Oğullar",
      subtitle: "Turgenyev",
      image: BabalarCover,
      description:
        "Kuşak çatışması teması üzerinden 19. yüzyıl Rus toplumundaki değişimleri anlatan klasik roman. Geleneksel ve modern değerler arasındaki çatışmayı işler.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Toplumsal Roman"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 6,
      title: "Beyaz Diş",
      subtitle: "Jack London",
      image: BeyazDisCover,
      description:
        "Yarı kurt yarı köpek olan Beyaz Diş'in vahşi doğadan medeniyete uzanan yolculuğu. Doğa, sadakat ve hayatta kalma mücadelesini anlatan etkileyici bir eser.",
      category: ["Dünya Klasikleri", "Macera", "Doğa ve Hayvan"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 7,
      title: "Beyaz Gemi",
      subtitle: "Cengiz Aytmatov",
      image: BeyazGemiCover,
      description:
        "Küçük bir çocuğun hayal dünyası üzerinden geleneksel değerler ve modern yaşam arasındaki çatışmayı anlatan roman. Kırgız kültürünün zengin motiflerini barındırır.",
      category: ["Dünya Klasikleri", "Kırgız Edebiyatı", "Modern Klasik"],
      readingTime: "7 saat",
      pages: "168 sayfa",
    },
    {
      id: 8,
      title: "Bir Bilim Adamının Romanı",
      subtitle: "Oğuz Atay",
      image: BirBilimAdamiCover,
      description:
        "Mustafa İnan'ın hayatı üzerinden Türkiye'de bilim insanı olmanın zorluklarını anlatan biyografik roman. Bilim, eğitim ve kişisel gelişim temalarını işler.",
      category: ["Türk Edebiyatı", "Biyografik Roman", "Modern Klasik"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 9,
      title: "Cemo",
      subtitle: "Kemal Bilbaşar",
      image: CemoCover,
      description:
        "Doğu Anadolu'da geçen bir aşk ve mücadele hikayesi. Feodal düzen, toplumsal adaletsizlik ve kadın hakları temalarını işleyen etkileyici bir roman.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Anadolu Edebiyatı"],
      readingTime: "11 saat",
      pages: "264 sayfa",
    },
    {
      id: 10,
      title: "Çalıkuşu",
      subtitle: "Reşat Nuri Güntekin",
      image: CalikusuCover,
      description:
        "Feride'nin İstanbul'dan Anadolu'ya uzanan hayat hikayesi. Eğitim, aşk ve fedakarlık temalarını işleyen, Cumhuriyet dönemi Türk edebiyatının başyapıtlarından.",
      category: ["Türk Edebiyatı", "Romantik Roman", "Cumhuriyet Klasikleri"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 11,
      title: "Çanlar Kimin İçin Çalıyor",
      subtitle: "Ernest Hemingway",
      image: CanlarCover,
      description:
        "İspanya İç Savaşı sırasında geçen, savaşın insan üzerindeki etkilerini anlatan güçlü bir roman. Savaş, aşk ve fedakarlık temalarını işler.",
      category: ["Dünya Klasikleri", "Savaş Romanı", "Modern Klasik"],
      readingTime: "20 saat",
      pages: "480 sayfa",
    },
    {
      id: 12,
      title: "Derviş ve Ölüm",
      subtitle: "Mehmet Selimoviç",
      image: DervisCover,
      description:
        "Bir dervişin iç dünyası ve manevi arayışları üzerinden insanın varoluşsal sorunlarını ele alan felsefi roman. Boşnak edebiyatının başyapıtlarından.",
      category: ["Dünya Klasikleri", "Felsefi Roman", "Balkan Edebiyatı"],
      readingTime: "15 saat",
      pages: "360 sayfa",
    },
    {
      id: 13,
      title: "Dokuzuncu Hariciye Koğuşu",
      subtitle: "Peyami Safa",
      image: DokuzuncuCover,
      description:
        "Hasta bir gencin fiziksel ve ruhsal mücadelesini anlatan otobiyografik roman. Hastalık, aşk ve yaşama tutunma temalarını işleyen etkileyici bir eser.",
      category: ["Türk Edebiyatı", "Psikolojik Roman", "Cumhuriyet Klasikleri"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
    {
      id: 14,
      title: "Don Kişot",
      subtitle: "Cervantes",
      image: DonKisotCover,
      description:
        "Şövalye romanlarının etkisiyle maceraya atılan Don Kişot'un trajikomik hikayesi. Modern romanın başlangıcı sayılan, idealizm ve gerçeklik arasındaki çatışmayı işleyen başyapıt.",
      category: ["Dünya Klasikleri", "Hiciv", "Macera"],
      readingTime: "35 saat",
      pages: "840 sayfa",
    },
    {
      id: 15,
      title: "Drina Köprüsü",
      subtitle: "İvo Andriç",
      image: DrinaCover,
      description:
        "Drina Köprüsü'nün yapılışından yıkılışına kadar geçen sürede Balkanlar'ın tarihini anlatan roman. Farklı kültürlerin bir arada yaşamasını işleyen Nobel ödüllü eser.",
      category: ["Dünya Klasikleri", "Tarihi Roman", "Balkan Edebiyatı"],
      readingTime: "18 saat",
      pages: "432 sayfa",
    },
    {
      id: 16,
      title: "Drina'da Son Gün",
      subtitle: "Faik Baysal",
      image: DrinadaCover,
      description:
        "Balkan Savaşı sırasında yaşanan dramı anlatan roman. Savaşın insan psikolojisi üzerindeki etkilerini ve göçün trajik sonuçlarını işler.",
      category: ["Türk Edebiyatı", "Savaş Romanı", "Tarihi Roman"],
      readingTime: "13 saat",
      pages: "312 sayfa",
    },
    {
      id: 17,
      title: "Esir Şehrin İnsanları",
      subtitle: "Kemal Tahir",
      image: EsirCover,
      description:
        "İstanbul'un işgal yıllarında geçen, direniş ve mücadele hikayesi. Kurtuluş Savaşı döneminin İstanbul'unu ve insanlarını anlatan tarihi roman.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Kurtuluş Savaşı"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 18,
      title: "Eskici ve Oğulları",
      subtitle: "Orhan Kemal",
      image: EskiciCover,
      description:
        "Yoksul bir ailenin çocuklarının hayat mücadelesini anlatan roman. Toplumsal gerçekçi bir yaklaşımla işçi sınıfının yaşamını ele alır.",
      category: ["Türk Edebiyatı", "Toplumsal Gerçekçilik", "İşçi Edebiyatı"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 19,
      title: "Fareler ve İnsanlar",
      subtitle: "John Steinbeck",
      image: FarelerCover,
      description:
        "Büyük Buhran döneminde iki göçmen tarım işçisinin dostluk ve hayatta kalma hikayesi. İnsan ilişkileri ve yalnızlık temalarını işleyen çarpıcı bir eser.",
      category: ["Dünya Klasikleri", "Amerikan Edebiyatı", "Toplumsal Roman"],
      readingTime: "4 saat",
      pages: "96 sayfa",
    },
    {
      id: 20,
      title: "Fatih-Harbiye",
      subtitle: "Peyami Safa",
      image: FatihHarbiyeCover,
      description:
        "Doğu-Batı çatışmasını bir genç kızın iç dünyası üzerinden anlatan roman. Modernleşme sürecinde yaşanan kimlik bunalımını işler.",
      category: ["Türk Edebiyatı", "Psikolojik Roman", "Toplumsal Roman"],
      readingTime: "7 saat",
      pages: "168 sayfa",
    },
    {
      id: 21,
      title: "Gora",
      subtitle: "Rabindranath Tagore",
      image: GoraCover,
      description:
        "Hindistan'ın kültürel kimlik arayışını ve toplumsal sorunlarını ele alan roman. Din, milliyetçilik ve modernleşme temalarını işler.",
      category: ["Dünya Klasikleri", "Hint Edebiyatı", "Toplumsal Roman"],
      readingTime: "22 saat",
      pages: "528 sayfa",
    },
    {
      id: 22,
      title: "Gün Olur Asra Bedel",
      subtitle: "Cengiz Aytmatov",
      image: GunOlurCover,
      description:
        "Sovyet rejiminin Orta Asya halklarının kültürel kimliği üzerindeki etkilerini anlatan roman. Geleneksel değerler ve modernleşme çatışmasını işler.",
      category: ["Dünya Klasikleri", "Kırgız Edebiyatı", "Politik Roman"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 23,
      title: "İbrahim Efendi Konağı",
      subtitle: "Samiha Ayverdi",
      image: IbrahimCover,
      description:
        "Osmanlı'dan Cumhuriyet'e geçiş döneminde bir konağın ve ailenin hikayesi. Değişen toplum yapısını ve değerleri ele alan nostaljik roman.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Sosyal Roman"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 24,
      title: "İki Şehrin Hikayesi",
      subtitle: "Charles Dickens",
      image: IkiSehrinCover,
      description:
        "Fransız Devrimi döneminde Londra ve Paris'te geçen, aşk ve fedakarlık temalı tarihi roman. İnsan doğasının karmaşıklığını ustaca işler.",
      category: ["Dünya Klasikleri", "Tarihi Roman", "Romantik Roman"],
      readingTime: "20 saat",
      pages: "480 sayfa",
    },
    {
      id: 25,
      title: "Kalpaklılar",
      subtitle: "Samim Kocagöz",
      image: KalpaklilarCover,
      description:
        "Kurtuluş Savaşı'nda Ege'de verilen mücadeleyi anlatan roman. Milli mücadele ruhunu ve halkın direnişini işleyen tarihi eser.",
      category: ["Türk Edebiyatı", "Kurtuluş Savaşı", "Tarihi Roman"],
      readingTime: "15 saat",
      pages: "360 sayfa",
    },
    {
      id: 26,
      title: "Kaplumbağalar",
      subtitle: "Fakir Baykurt",
      image: KaplumbagalarCover,
      description:
        "Köy yaşamını ve köylülerin modernleşme ile olan mücadelesini anlatan roman. Toplumsal gerçekçi bir yaklaşımla köy sorunlarını ele alır.",
      category: ["Türk Edebiyatı", "Köy Edebiyatı", "Toplumsal Roman"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 27,
      title: "Karartma Geceleri",
      subtitle: "Rıfat Ilgaz",
      image: KaratmaCover,
      description:
        "İkinci Dünya Savaşı yıllarında İstanbul'da geçen, savaş döneminin zorluklarını anlatan roman. Toplumsal gerçekçi bir bakış açısıyla yazılmıştır.",
      category: ["Türk Edebiyatı", "Savaş Dönemi", "Toplumsal Roman"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 28,
      title: "Kayıp Aranıyor",
      subtitle: "Sait Faik Abasıyanık",
      image: KayipCover,
      description:
        "Modern kent yaşamının yalnızlaştırdığı insanların hikayesi. İstanbul'un kenar mahallelerini ve sıradan insanların yaşamlarını anlatan roman.",
      category: ["Türk Edebiyatı", "Modern Roman", "Kent Edebiyatı"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
    {
      id: 29,
      title: "Kiralık Konak",
      subtitle: "Yakup Kadri Karaosmanoğlu",
      image: KiralikCover,
      description:
        "Osmanlı'nın son döneminde yaşanan toplumsal değişimi bir konak ve ailesi üzerinden anlatan roman. Kuşak çatışması ve değerler çatışmasını işler.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Tarihi Roman"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 30,
      title: "Kuyruklu Yıldız Altında Bir İzdivaç",
      subtitle: "Hüseyin Rahmi Gürpınar",
      image: KuyrukluCover,
      description:
        "Halley kuyruklu yıldızının dünyaya çarpacağı söylentileri etrafında gelişen olayları anlatan mizahi roman. Toplumsal eleştiri içeren bir hiciv eseri.",
      category: ["Türk Edebiyatı", "Mizah", "Toplumsal Hiciv"],
      readingTime: "9 saat",
      pages: "216 sayfa",
    },
    {
      id: 31,
      title: "Kuyucaklı Yusuf",
      subtitle: "Sabahattin Ali",
      image: KuyucakliCover,
      description:
        "Taşra yaşamı ve bürokrasinin birey üzerindeki etkilerini anlatan roman. Aşk, adalet ve toplumsal düzen temalarını işleyen güçlü bir eser.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Anadolu Romanı"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 32,
      title: "Küçük Ağa",
      subtitle: "Tarık Buğra",
      image: KucukCover,
      description:
        "Kurtuluş Savaşı döneminde bir imamın değişim öyküsü. Milli mücadele yıllarında Anadolu insanının yaşadığı iç çatışmaları anlatan tarihi roman.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Kurtuluş Savaşı"],
      readingTime: "18 saat",
      pages: "432 sayfa",
    },
    {
      id: 33,
      title: "Madame Bovary",
      subtitle: "Gustave Flaubert",
      image: MadameCover,
      description:
        "Taşra yaşamından bunalan bir kadının romantik arayışlarını ve düş kırıklıklarını anlatan roman. Realizmin başyapıtlarından biri kabul edilir.",
      category: ["Dünya Klasikleri", "Psikolojik Roman", "Fransız Edebiyatı"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 34,
      title: "Mai ve Siyah",
      subtitle: "Halit Ziya Uşaklıgil",
      image: MaiCover,
      description:
        "Bir şairin sanat ve hayat karşısındaki yenilgisini anlatan roman. Servet-i Fünun döneminin önemli eserlerinden biri.",
      category: ["Türk Edebiyatı", "Psikolojik Roman", "Edebi Roman"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 35,
      title: "Mor Salkımlı Ev",
      subtitle: "Halide Edib Adıvar",
      image: MorCover,
      description:
        "Yazarın çocukluk ve gençlik yıllarını anlattığı otobiyografik eser. Osmanlı'nın son dönemini ve modernleşme sürecini bireysel bir hikaye üzerinden aktarır.",
      category: ["Türk Edebiyatı", "Anı", "Otobiyografi"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 36,
      title: "Onlar da İnsandı",
      subtitle: "Cengiz Dağcı",
      image: OnlarCover,
      description:
        "Kırım Türklerinin İkinci Dünya Savaşı sırasında yaşadıkları trajedileri anlatan roman. Sürgün ve vatan hasreti temalarını işler.",
      category: ["Türk Edebiyatı", "Savaş Romanı", "Tarihi Roman"],
      readingTime: "13 saat",
      pages: "312 sayfa",
    },
    {
      id: 37,
      title: "Ölü Canlar",
      subtitle: "Nikolay Gogol",
      image: OluCover,
      description:
        "19. yüzyıl Rus toplumunu hicveden roman. Bürokrasi, yozlaşma ve toplumsal çürümeyi keskin bir mizahla ele alır.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Hiciv"],
      readingTime: "20 saat",
      pages: "480 sayfa",
    },
    {
      id: 38,
      title: "Robinson Crusoe",
      subtitle: "Daniel Defoe",
      image: RobinsonCover,
      description:
        "Issız bir adada hayatta kalma mücadelesi veren bir adamın hikayesi. Macera ve keşif temalı romanın öncü örneklerinden biri.",
      category: ["Dünya Klasikleri", "Macera", "Robinsonad"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 39,
      title: "Sahnenin Dışındakiler",
      subtitle: "Ahmet Hamdi Tanpınar",
      image: SahneninCover,
      description:
        "Mütareke İstanbul'unda geçen, bir aydının iç dünyasını ve dönemin toplumsal panoramasını sunan roman.",
      category: ["Türk Edebiyatı", "Modern Roman", "Tarihi Roman"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 40,
      title: "Savaş ve Barış",
      subtitle: "Lev Tolstoy",
      image: SavasCover,
      description:
        "Napolyon'un Rusya seferi sırasında iç içe geçen hayatları anlatan epik roman. İnsan doğası ve tarih felsefesi üzerine derin gözlemler sunar.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Tarihi Roman"],
      readingTime: "60 saat",
      pages: "1440 sayfa",
    },
    {
      id: 41,
      title: "Sefiller",
      subtitle: "Victor Hugo",
      image: SefillerCover,
      description:
        "Jean Valjean'ın hikayesi üzerinden adalet, merhamet ve toplumsal eşitsizlik temalarını işleyen başyapıt. Fransız toplumunun panoramasını sunar.",
      category: ["Dünya Klasikleri", "Fransız Edebiyatı", "Toplumsal Roman"],
      readingTime: "40 saat",
      pages: "960 sayfa",
    },
    {
      id: 42,
      title: "Sergüzeşt",
      subtitle: "Samipaşazade Sezai",
      image: SerguzestCover,
      description:
        "Bir cariyenin trajik aşk hikayesi üzerinden kölelik sistemini eleştiren roman. Tanzimat döneminin önemli eserlerinden biri.",
      category: ["Türk Edebiyatı", "Tanzimat Edebiyatı", "Romantik Roman"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
    {
      id: 43,
      title: "Ses ve Öfke",
      subtitle: "William Faulkner",
      image: SesCover,
      description:
        "Güney Amerika'da çöküş halindeki bir ailenin hikayesi. Modern anlatım teknikleriyle yazılmış, bilinç akışı tekniğinin başyapıtlarından.",
      category: ["Dünya Klasikleri", "Modern Roman", "Amerikan Edebiyatı"],
      readingTime: "15 saat",
      pages: "360 sayfa",
    },
    {
      id: 44,
      title: "Sinekli Bakkal",
      subtitle: "Halide Edib Adıvar",
      image: SinekliCover,
      description:
        "II. Abdülhamit döneminde İstanbul'un bir mahallesinde geçen, Doğu-Batı sentezini işleyen roman. Toplumsal değişimi farklı karakterler üzerinden anlatır.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Toplumsal Roman"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 45,
      title: "Sokakta",
      subtitle: "Bahaeddin Özkişi",
      image: SokaktaCover,
      description:
        "Modern kent yaşamında insanın yalnızlaşmasını ve yabancılaşmasını anlatan öyküler. Toplumsal değişimin birey üzerindeki etkilerini işler.",
      category: ["Türk Edebiyatı", "Modern Öykü", "Kent Edebiyatı"],
      readingTime: "5 saat",
      pages: "120 sayfa",
    },
    {
      id: 46,
      title: "Suç ve Ceza",
      subtitle: "Fyodor Dostoyevski",
      image: SucCover,
      description:
        "Bir öğrencinin işlediği cinayet üzerinden suç, vicdan ve ahlak kavramlarını sorgulayan psikolojik roman. İnsan ruhunun derinliklerini araştıran başyapıt.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Psikolojik Roman"],
      readingTime: "24 saat",
      pages: "576 sayfa",
    },
    {
      id: 47,
      title: "Tütün Zamanı",
      subtitle: "Necati Cumalı",
      image: TutunCover,
      description:
        "Ege'de tütün üreticilerinin yaşamını anlatan roman. Toprak, emek ve insan ilişkilerini gerçekçi bir dille işler.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Köy Edebiyatı"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 48,
      title: "Vadideki Zambak",
      subtitle: "Honoré de Balzac",
      image: VadiCover,
      description:
        "Saf bir genç kızın trajik aşk hikayesi. Fransız taşra yaşamını ve toplumsal sınıf farklılıklarını gerçekçi bir dille anlatan roman.",
      category: ["Dünya Klasikleri", "Fransız Edebiyatı", "Romantik Roman"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 49,
      title: "Yaban",
      subtitle: "Yakup Kadri Karaosmanoğlu",
      image: YabanCover,
      description:
        "Kurtuluş Savaşı döneminde bir aydının Anadolu'daki gözlemlerini anlatan roman. Aydın-köylü çatışmasını ve yabancılaşma temasını işler.",
      category: ["Türk Edebiyatı", "Kurtuluş Savaşı", "Toplumsal Roman"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 50,
      title: "Yaşar Ne Yaşar Ne Yaşamaz",
      subtitle: "Aziz Nesin",
      image: YasarCover,
      description:
        "Bürokrasinin saçmalıklarını hicveden roman. Toplumsal eleştiriyi mizahi bir dille sunan, bürokrasi eleştirisi yapan önemli bir eser.",
      category: ["Türk Edebiyatı", "Mizah", "Toplumsal Hiciv"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 51,
      title: "Yedinci Gün",
      subtitle: "Orhan Hançerlioğlu",
      image: YedinciCover,
      description:
        "Toplumsal değişim sürecinde bir ailenin yaşadıklarını anlatan roman. Modernleşme ve değerler çatışmasını işler.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Modern Roman"],
      readingTime: "9 saat",
      pages: "216 sayfa",
    },
    {
      id: 52,
      title: "Yılkı Atı",
      subtitle: "Abbas Sayar",
      image: YilkiCover,
      description:
        "Bir yılkı atının özgürlük mücadelesini anlatan roman. İnsan-doğa ilişkisini ve özgürlük temasını işleyen etkileyici bir eser.",
      category: ["Türk Edebiyatı", "Doğa Edebiyatı", "Alegorik Roman"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
  ];

export const bookImages = [
    AclikCover,
    AgantaCover,
    AkdenizCover,
    AyasliCover,
    BabalarCover,
    BeyazDisCover,
    BeyazGemiCover,
    BirBilimAdamiCover,
    CalikusuCover,
    CanlarCover,
    CemoCover,
    DervisCover,
    DokuzuncuCover,
    DonKisotCover,
    DrinaCover,
    DrinadaCover,
    EsirCover,
    EskiciCover,
    FarelerCover,
    FatihHarbiyeCover,
    GoraCover,
    GunOlurCover,
    IbrahimCover,
    IkiSehrinCover,
    KalpaklilarCover,
    KaplumbagalarCover,
    KaratmaCover,
    KayipCover,
    KiralikCover,
    KucukCover,
    KuyrukluCover,
    KuyucakliCover,
    MadameCover,
    MaiCover,
    MorCover,
    OluCover,
    OnlarCover,
    RobinsonCover,
    SahneninCover,
    SavasCover,
    SefillerCover,
    SerguzestCover,
    SesCover,
    SinekliCover,
    SokaktaCover,
    SucCover,
    TutunCover,
    VadiCover,
    YabanCover,
    YasarCover,
    YedinciCover,
    YilkiCover,
] 