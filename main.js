const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const toxicity = require('@tensorflow-models/toxicity');
const dotenv = require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

let threshold = 0.9; // Default toxicity threshold
let warningMessage = 'Please avoid using toxic language!'; // Default warning message

// From .env
const botToken = process.env.TOKEN
const botID = process.env.ID
const logFile = process.env.LOG

async function loadModel() {
  return await toxicity.load(threshold);
}

// Function to log messages
function logMessage(message, isToxic) {
  const logEntry = `${new Date().toISOString()} - User: ${message.author.tag}, Content: "${message.content}", Toxic: ${isToxic}`;
  console.log(logEntry);
  fs.appendFile(logFile, logEntry + '\n', (err) => {
    if (err) console.error('Failed to log message:', err);
  });
}

function logUpdate(parameter, oldValue, newValue) {
  const logEntry = `${new Date().toISOString()} - Updated ${parameter} from "${oldValue}" to "${newValue}"`;
  console.log(logEntry);
  fs.appendFile(logFile, logEntry + '\n', (err) => {
    if (err) console.error('Failed to log update:', err);
  });
}

// Load and classify messages for toxicity
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const model = await loadModel();
  const predictions = await model.classify([message.content]);

  const isToxic = predictions.some((prediction) =>
    prediction.results.some((result) => result.match)
  );

  logMessage(message, isToxic);

  if (isToxic) {
    message.reply(warningMessage);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'setthreshold') {
    const newThreshold = options.getNumber('value');
    if (newThreshold < 0 || newThreshold > 1) {
      await interaction.reply({ content: 'Please enter a threshold between 0 and 1.', ephemeral: true });
    } else {
      // Log the old and new threshold values
      logUpdate('threshold', threshold, newThreshold);
      threshold = newThreshold;
      await interaction.reply(`Toxicity threshold updated to ${threshold}.`);
    }
  } else if (commandName === 'setwarning') {
    const newWarningMessage = options.getString('message');

    // Log the old and new warning messages
    logUpdate('warning message', warningMessage, newWarningMessage);
    warningMessage = newWarningMessage;
    await interaction.reply(`Warning message updated to: "${warningMessage}"`);
  }
});

async function registerCommands() {
  const commands = [
    {
      name: 'setthreshold',
      description: 'Set the toxicity threshold (0-1)',
      options: [
        {
          name: 'value',
          type: 10, // Number type
          description: 'New threshold value',
          required: true,
        },
      ],
    },
    {
      name: 'setwarning',
      description: 'Set the warning message for toxic content',
      options: [
        {
          name: 'message',
          type: 3, // String type
          description: 'New warning message',
          required: true,
        },
      ],
    },
  ];

  const rest = new REST({ version: '10' }).setToken(botToken);
  try {
    console.log('Registering global slash commands...');
    await rest.put(
      Routes.applicationCommands(botID), // Register commands globally
      { body: commands }
    );
    console.log('Global slash commands registered successfully.');
  } catch (error) {
    console.error('Failed to register global slash commands:', error);
  }
}

// Log in and register commands
client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await registerCommands();
});

client.login(botToken);
