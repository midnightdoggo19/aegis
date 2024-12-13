# Aegis

Aegis is a Discord bot designed to help maintain a positive community environment by detecting and managing potentially toxic content. With customizable settings, Aegis assists server administrators in moderating chat effectively.<br />

## Getting Started

### Prerequisites

    Node.js: Install Node.js (v14 or higher recommended).
    Discord Bot Token: Create a bot on the Discord Developer Portal and get the bot token. Make sure to check the box for member and message content intent.
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
    CLIENT_ID="bot-id"

#### Run the Bot:

Start the bot with:

    node main.js

  Add the bot to your Discord server of choice and you're all set!

## Usage

    /setthreshold value:<number>: Adjust the toxicity threshold (between 0 and 1).
    /setwarning message:<text>: Customize the warning message shown to users.

### Example Commands

    /setthreshold value:0.7: Set the toxicity threshold to 0.7.
    /setwarning message:Please be mindful of your language: Update the warning message.

### Logging

Aegis logs flagged messages and parameter changes to a local log file defined in the .env file. These logs help server administrators track toxicity detection events.
