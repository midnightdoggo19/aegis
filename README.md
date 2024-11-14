# Aegis

Aegis is a Discord bot designed to help maintain a positive community environment by detecting and managing potentially toxic content. With customizable settings, Aegis assists server administrators in moderating chat effectively.
Features include: <br />

Toxicity Detection: Identifies potentially harmful language in messages using a machine learning model.<br />
Customizable Warning Threshold: Adjust the sensitivity of toxicity detection.<br />
Configurable Warning Messages: Customize the warning message users receive for detected toxic content.<br />
Logging: Logs flagged messages and command interactions for moderation purposes.<br />
Slash Commands: Intuitive commands for setting the bot’s threshold and warning message directly from Discord.<br />

## Getting Started

Follow these steps to set up Aegis for your server.
### Prerequisites

    Node.js: Install Node.js (v14 or higher recommended).
    Discord Bot Token: Create a bot on the Discord Developer Portal and get the bot token.
    TensorFlow.js: Aegis uses TensorFlow.js for toxicity detection.

### Installation

#### Clone the Repository:

    git clone https://github.com/midnightdoggo19/aegis.git
    cd aegis

#### Install Dependencies:

    npm install

#### Configure Environment Variables:

Copy the example.env file and insert the following information:

    DISCORD_TOKEN="your-bot-token"
    CLIENT_ID="your-client-id"

#### Run the Bot:

Start the bot with:

    node main.js

  Add the bot to your Discord server of choice and yoy're all set!

## Usage

Aegis uses slash commands to configure and control its functionality. Here are some key commands:

    /setthreshold value:<number>: Adjust the toxicity threshold (between 0 and 1).
    /setwarning message:<text>: Customize the warning message shown to users.

### Example Commands

    /setthreshold value:0.7: Set the toxicity threshold to 0.7.
    /setwarning message:Please be mindful of your language: Update the warning message.

### Logging

Aegis logs flagged messages and parameter changes to a local log file defined in the .env file. These logs help server administrators track toxicity detection events.

### Contributing

Feel free to fork the repository, create pull requests, or open issues to contribute to Aegis. I welcome improvements, new features, and bug fixes!
