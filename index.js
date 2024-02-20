const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	VoiceConnectionStatus,
	EndBehaviorType,
	getVoiceConnection
} = require('@discordjs/voice');



const gTTS = require('gtts') ;
const { createWriteStream } = require('fs') ;
const {opus} = require('prism-media') 

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;


// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

const token = "INSERT YOUR OWN TOKEN HERE"

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates,

] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});



// When the client receives a message, run this code
client.on(Events.MessageCreate, async (message) => {
	if (message.author.bot) return;
	console.log(`Received message: ${message.content}`);
	if (message.content === 'ping') {
		// Send "pong" to the same channel
		message.channel.send('pong');
		return
	}
	if (message.content === '-join') {
		const channel = message.member?.voice.channel;
		if (channel) {
			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});
		} else {
			message.reply('Join a voice channel then try again!');
		}
	}

	if (message.content.startsWith('-say')) {
		const channel = message.member?.voice.channel;
		let connection;
		if (channel) {
			connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});
		} else {
			message.reply('Join a voice channel then try again!');
		}

		connection.on(VoiceConnectionStatus.Ready, () => {
			console.log('The connection has entered the Ready state - ready to play audio!');
		});

		let text = message.member.displayName + " says " + message.content.split(' ').slice(1).join(' ');
		console.log(text);

		let gtts = new gTTS(text, 'en');
		gtts.save('output.mp3', function (err, result) {
			if (err) { return console.error(err); }
			console.log('Text has been saved to output.mp3');
			const player = createAudioPlayer();
			const resource = createAudioResource('output.mp3');
			const subscription = connection.subscribe(player);
			player.play(resource);
			message.reply(text + " in voice channel: " + channel.name);
			console.log('Playing audio!')
		});
	}


	if (message.content.startsWith('-leave')) {
		getVoiceConnection(message.guild.id).disconnect();
		message.reply('Leaving voice channel in this guild');
		

	}

	

	
});





// Log in to Discord with your client's token
client.login(token);