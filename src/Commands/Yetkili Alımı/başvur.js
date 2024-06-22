const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('başvuru-sistemi')
        .setDescription('Yetkili başvuru sistemini aktifleştirirsiniz.'),
    run: async (client, interaction) => {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`başvur_${interaction.user.id}`)
                    .setLabel('Başvur')
                    .setEmoji('📝')
                    .setStyle(ButtonStyle.Primary)
            );

        const embed = new EmbedBuilder()
            .setTitle('Yetkili Alımı')
            .setFields(
                { name: `__Bilgilendirme__`, value: `Merhaba, aşağıdaki butona basarak yetkili alımı için başvuru yapabilirsin. Başvuru yapmadan önce yetkili alımı şartlarını okumalısınız.` },
                { name: `__Şartlar__`, value: `> - Sunucu kurallarına uymalısınız.\n> - Sunucu içerisinde kendinizi üstün görmemelisiniz.\n> - Yaşınız 15'in üstünde olmalıdır.\n> - Sunucu içerisinde yakınlarınıza torpil yani ayrım yapmamalısınız.` }
            )
            .setColor(config.botCustom.color)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({ text: `YouTube SpanyRieS` })

        await client.channels.cache.get(config.basvuruKanal).send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: `Başvuru sistemi aktifleştirildi.`, ephemeral: true });
    },
};
