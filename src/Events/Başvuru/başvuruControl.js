const { Collection, EmbedBuilder, ChannelType, ThreadAutoArchiveDuration, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config');
const consola = require('consola');

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        await interaction.deferUpdate();

        if (!interaction.isButton()) return;
        if (!interaction.customId.startsWith("onayla_") && !interaction.customId.startsWith("reddet_")) return;

        if (!config.başvuruYetkilisi.includes(interaction.user.id)) {
            return interaction.followUp({ content: `Bu işlemi yapmaya yetkiniz yok.`, ephemeral: true });
        }

        try {

            if (interaction.customId.startsWith("onayla_")) {
                const memberId = interaction.customId.split("_")[1];
                const member = interaction.guild.members.cache.get(memberId);

                if (!member) {
                    return interaction.followUp({ content: `Kullanıcı bulunamadı.`, ephemeral: true });
                }

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`Onaylandı_${memberId}`)
                            .setLabel('Başvuru Onaylandı')
                            .setEmoji('✅')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                    );

                interaction.editReply({ components: [row] });
                member.roles.add(config.yetkiliRol);
                interaction.followUp({ content: `Başvuru onaylandı.`, ephemeral: true });
            }

            if (interaction.customId.startsWith("reddet_")) {
                const memberId = interaction.customId.split("_")[1];
                const member = interaction.guild.members.cache.get(memberId);

                if (!member) {
                    return interaction.followUp({ content: `Kullanıcı bulunamadı.`, ephemeral: true });
                }

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`Reddedildi_${memberId}`)
                            .setLabel('Başvuru Reddedildi')
                            .setEmoji('❌')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                    );

                interaction.editReply({ components: [row] });
                interaction.followUp({ content: `Başvuru reddedildi.`, ephemeral: true });
            }

        } catch (error) {
            console.log(error);
        }
    }
}
