import { MessageEmbed, WebhookMessageOptions } from "discord.js";

import { discordMessager } from "../Discord";
import { ListBirthdaysByDateService } from "./ListBirthdaysByDateService";

export class SendHappyBirthdaysService {
	async execute() {
		const todayDate = new Date().toLocaleDateString("pt-br");
		const [currentDay, currentMonth] = todayDate.split("/");

		const queryDate = `${currentDay}/${currentMonth}`;

		let birthdaysMessage = "";

		try {
			const service = new ListBirthdaysByDateService();
			const dbResponse = (await service.execute(queryDate)) || [];

			if (dbResponse instanceof Error) {
				return new Error(dbResponse.message);
			} else {
				dbResponse.forEach((birthday) => {
					birthdaysMessage += `- ${birthday.name}\n`;
				});
			}
		} catch (e) {
			return new Error(
				"Não foi possível resgatar os aniversariantes no banco de dados"
			);
		}

		try {
			const embed = new MessageEmbed()
				.setColor("#B6FFCE")
				.setTitle("Feliz aniversário para")
				.setDescription(`${birthdaysMessage}`);

			const discordMessagerOptions: WebhookMessageOptions = {
				content: birthdaysMessage
					? null
					: "Não temos aniversariantes hoje",
				embeds: birthdaysMessage ? [embed] : undefined,
			};

			await discordMessager(discordMessagerOptions);
		} catch (e) {
			return new Error("Não foi possível enviar a mensagem");
		}

		return true;
	}
}
