import "dotenv/config";
import express from "express";
import { MessageEmbed, WebhookMessageOptions } from "discord.js";

import { routes } from "./routes";

import { discordMessager } from "./services/Discord";
import { ListBirthdaysByDateService } from "./services/Birthdays/ListBirthdaysByDateService";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running");

	const oneMinuteMilliseconds = 1000 * 60;
	const tenMinutesMilliseconds = oneMinuteMilliseconds * 10;

	setInterval(async () => {
		const currentHour = new Date().getHours();

		if (currentHour === 8) {
			try {
				const result = await sendHappyBirthdays();

				if (!result) {
					throw new Error();
				}
			} catch (e) {
				console.log(e);
			}
		}
	}, tenMinutesMilliseconds);
});

async function sendHappyBirthdays() {
	const todayDate = new Date().toLocaleDateString("pt-br");

	let birthdaysMessage: string = "";

	try {
		const service = new ListBirthdaysByDateService();
		const dbResponse = (await service.execute(todayDate)) || [];

		if (dbResponse instanceof Error) {
			console.log(dbResponse.message);
		} else {
			dbResponse.forEach((birthday) => {
				birthdaysMessage += `- ${birthday.name}\n`;
			});
		}
	} catch (e) {
		console.log(
			"Não foi possível resgatar os aniversariantes no banco de dados:\n",
			e
		);
	}

	let discordResponse;

	try {
		const embed = new MessageEmbed()
			.setColor("#B6FFCE")
			.setTitle("Feliz aniversário para")
			.setDescription(`${birthdaysMessage}`);

		const discordMessagerOptions: WebhookMessageOptions = {
			content: birthdaysMessage ? null : "Não temos aniversariantes hoje",
			embeds: birthdaysMessage ? [embed] : undefined,
		};

		discordResponse = await discordMessager(discordMessagerOptions);
	} catch (e) {
		console.log("Não foi possível enviar a mensagem: \n", e);
	}

	if (discordResponse) {
		return true;
	} else {
		return false;
	}
}
