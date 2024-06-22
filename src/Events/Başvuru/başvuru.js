const { Collection, EmbedBuilder, ChannelType, ThreadAutoArchiveDuration, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config');
const consola = require('consola');

var sorular = config.sorular;
const cevaplar = {};

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {

        if (!interaction.isButton()) return;
        if (!interaction.customId.startsWith("başvur_")) return;

        try {

            const memberId = interaction.customId.split("_")[1];
            const member = interaction.guild.members.cache.get(memberId);

            const channelName = `Başvuru Formu - ${member.user.username}`;
            const channel = interaction.guild.channels.cache.find(channel => channel.name === channelName);

            if (channel) {
                return interaction.reply({ content: `Açık olan başvuru kanalınız bulunuyor.`, ephemeral: true });
            }

            const altBaslik = await interaction.channel.threads.create({
                name: `Başvuru Formu - ${member.user.username}`,
                type: ChannelType.PrivateThread,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
                reason: 'Başvuru formu oluşturuldu.'
            });

            const embed = new EmbedBuilder()
                .setTitle('Başvuru Formu')
                .setFields(
                    { name: '__Bilgilendirme__', value: 'Merhaba, aşağıdaki soruları cevaplayarak başvurunuzu tamamlayabilirsiniz. Başvurunuzun sonucu en kısa sürede size bildirilecektir.' },
                    { name: '__Uyarı__', value: '> - Bu formu ciddi bir şekilde doldurmalısınız eğer troll bir şekilde doldurursanız cezasına katlanmalısınız.\n> - Bu form 1 saat içinde ototmatikmen silinecektir.' }
                )
                .setColor(config.botCustom.color)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: 'YouTube SpanyRieS' });

            altBaslik.send({ content: `${interaction.member}`, embeds: [embed] });

            const soruEmbed = new EmbedBuilder()
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setColor(Colors.Blue)
                .setFooter({ text: `YouTube SpanyRieS` });

            const userId = member.id;
            let eskiCevapMetni = '';
            if (cevaplar[userId]) {
                const eskiCevaplar = cevaplar[userId];
                eskiCevaplar.forEach((cevap, index) => {
                    eskiCevapMetni += `> - Soru ${index + 1}: ${cevap}\n`;
                });
            }

            let cevapMetni = '';
            for (let i = 0; i < sorular.length; i++) {
                await altBaslik.send({ embeds: [soruEmbed.setFields({ name: '__Soru__', value: `${sorular[i]}` })] });
                const filter = (m) => m.author.id === member.id;
                const collected = await altBaslik.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
                const userResponse = collected.first().content;
                if (!cevaplar[userId]) cevaplar[userId] = [];
                cevaplar[userId][i] = userResponse; 
                cevapMetni += `> - ${sorular[i]}: ${userResponse}\n`;
            }

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`onayla_${member.id}`)
                        .setLabel('Onayla')
                        .setEmoji('✅')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`reddet_${member.id}`)
                        .setLabel('Reddet')
                        .setEmoji('❌')
                        .setStyle(ButtonStyle.Danger)
                );

            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: member.user.tag + " Yetkili Formu", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setColor(Colors.Blue)
                .addFields(
                    { name: `__ Kullanıcı Bilgilerİ__`, value: `> - Kullanıcı: ${member}\n> - Kullanıcı ID: ${member.id}` }
                )
                .setFooter({ text: `YouTube SpanyRieS` });

            logEmbed.addFields({ name: `__Cevaplar__`, value: `${cevapMetni}` });


            await altBaslik.delete();
            await client.channels.cache.get(config.basvuruLog).send({ embeds: [logEmbed], components: [row] });
        } catch (error) {
            console.log(error);
        }
    }
}
