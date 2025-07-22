Optimus World Time
Optimus World Time, dünya üzerindeki farklı şehirlerin zaman dilimlerini ve mevcut saatlerini gerçek zamanlı olarak görüntüleyen modern bir web uygulamasıdır. Proje; React, React Query ve Emotion ile geliştirilmiştir.

📋 Özellikler
Dünya çapındaki tüm zaman dilimlerini listeler.

Seçilen şehrin/ülkenin mevcut saatini canlı olarak gösterir.

Zaman dilimleri arasında arama yapabilme.

Koyu/Açık tema desteği.

Saat bilgisi her saniye otomatik olarak güncellenir.

🛠️ Kullanılan Teknolojiler
React: Kullanıcı arayüzü için.

React Router: Sayfa yönlendirmeleri için.

React Query: API sorgularını yönetmek ve önbelleklemek için.

Emotion: CSS-in-JS çözümü ile stillendirme için.

Day.js: Tarih ve saat işlemleri için.

Tanstack Query: (React Query) zaman dilimi ve saat verilerini almak için.

 Proje Yapısı
 optimus-world-time/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── timeApi.js            # Zaman ve zaman dilimi API çağrıları
│   ├── components/
│   │   └── TimezoneList.jsx      # Zaman dilimi listesi
│   ├── contexts/
│   │   └── ConfigContext.jsx     # Tema yönetimi ve diğer ayarlar
│   ├── pages/
│   │   └── Home.jsx              # Ana sayfa
│   ├── styles/
│   │   └── Home.styles.js        # Sayfa stilleri
│   ├── App.jsx                   # Uygulama kök bileşeni
│   ├── index.js                  # Giriş noktası
├── package.json
└── README.md

Kurulum ve Çalıştırma

Projeyi klonlama:
git clone <repo-url>
cd optimus-world-time

Bağımlılıkları yükleme:
npm install

Uygulamayı başlatma:
npm start

API:

Projede iki adet API çağrısı bulunmaktadır:

getTimezones(): Tüm zaman dilimlerini döner.

getTime(timezone): Belirtilen zaman dilimindeki mevcut saati döner.
