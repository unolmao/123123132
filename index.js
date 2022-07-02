var Discord = require(`discord.js`)
var client = new Discord.Client({disableEveryone: true})

var config = require(`./config.json`)

var chalk = require(`chalk`)
var HTTP = require(`http`)
var express = require(`express`)
var app = express()
var fetch = require(`node-fetch`)
var Server = HTTP.createServer(app)
Server.listen(8080)
app.get(`/`, (req, res) => res.send(`Bot is online! Stats: ${client.guilds.cache.size} servers, ${client.users.cache.size} users, and ${client.channels.cache.size} channels.`))
var fs = require(`fs`)
const prefix = '!';
require("dotenv").config
const token = process.env.TOKEN;
client.commands = new Discord.Collection()


fs.readdir(`./commands/`, (err, files) => {
	if(err) throw err

	let file = files.filter(f => f.endsWith(`.js`))
	if (file.length <= 0) return console.log(`There are js files in the commands folder`)

	file.forEach((f) => {
		let props = require(`./commands/${f}`)
		console.log(chalk.yellow(`Loading ${f}`))

		client.commands.set(props.help, props)
	})
	console.log(chalk.bold.bgGreen(`All files are ready!`))
})

process.on(`unhandledRejection`, error => {
	console.error(`Unhandled promise rejection:`, error)
})

client.on(`error`, () => console.error)

client.on(`warn`, () => console.warn)

client.on(`ready`, async () => {

	console.log(`${client.user.username} is online!`)

	client.user.setActivity({ name: "Account Generator", type: "PLAYING", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })

	console.log(`Stats: ${client.guilds.cache.size} servers, ${client.users.cache.size} users, and ${client.channels.cache.size} channels.`)
  console.log("< -- LOG STARTS HERE -- >")
})

client.on(`message`, async (msg) => {
	if(msg.author.bot) return
	if(!msg.content.startsWith(config.PREFIX)) return
	if(msg.content.indexOf(config.PREFIX) != 0) return
	if(msg.channel.type == `dm`) return

	const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()

	let commandFile = require(`./commands/${command}.js`)
	commandFile.run(client, msg, args, config)
})

//also other file handler stuff loolol



client.login(token)