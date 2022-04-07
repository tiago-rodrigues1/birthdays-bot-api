import "dotenv/config";
import { WebhookClient, WebhookMessageOptions } from "discord.js";

export async function discordMessager(options: WebhookMessageOptions) {
	const { DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } = process.env;

	try {
		const webhookClient = new WebhookClient({
			id: String(DISCORD_WEBHOOK_ID),
			token: String(DISCORD_WEBHOOK_TOKEN),
		});

		const response = await webhookClient.send({
			content: options.content,
			username: "NuncioBot",
			embeds: options.embeds,
		});

		return response;
	} catch (e) {
		return new Error(`Não foi possível enviar a mensagem:\n ${e}`);
	}
}
