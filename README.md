# 🚀 Yetkili Alım Botu

Bu proje, Discord sunucuları için bir yetkili alım botudur. Bot, kullanıcıların başvuru formunu doldurmasını sağlar ve cevapları belirli bir kanala loglar. Ayrıca, aynı kullanıcının birden fazla başvuru yapması durumunda, eski ve yeni cevapları birlikte loglar.

## ✨ Özellikler

- 📝 Başvuru formu oluşturma ve cevapları toplama
- 📋 Kullanıcıların başvurularını belirli bir kanala loglama
- 🔄 Eski ve yeni başvuru cevaplarını birleştirme
- ⏲️ Otomatik olarak belirli süre sonra başvuru mesajlarını silme

## 📦 Gereksinimler

- Node.js v16 veya daha üstü
- Discord.js v14

## ⚙️ Kurulum

1. Bu projeyi klonlayın veya projeyi indirin.

    ```bash
    git clone https://github.com/SpanyDev/v14-basvuru-botu.git
    ```

2. Proje klasöründe cmd'yi aktifleştirin.

3. Gerekli bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

4. `config.js` dosyasını kendinize göre düzenelyin.

5. Botu başlatın:

    ```bash
    node index.js veya node .
    ```

## 💡 Kullanım

1. Botunuz Discord sunucusunda yetkili olmalıdır.
2. Kullanıcılar belirli bir komut veya buton ile başvuru formunu doldurmaya başlayabilir.
3. Kullanıcıların cevapları belirli bir log kanalına gönderilecektir.
4. Aynı kullanıcı tekrar başvuru yaptığında, eski ve yeni cevaplar birlikte loglanacaktır. (Ayarlanabilir)

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen aşağıdaki adımları izleyin:

1. Bu projeyi forklayın.
2. Yeni bir dal (`feature-branch` gibi) oluşturun.
3. Değişikliklerinizi yapın ve commit edin.
4. Değişikliklerinizi push edin.
5. Bir pull request açın.

## 📜 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

## 📧 İletişim

Sorularınız veya önerileriniz için lütfen bana ulaşın: [Discord](https://discord.gg/gkcYAyrmMd)
