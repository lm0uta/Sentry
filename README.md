# Discord Self-Bot – Command Management with Whitelist

This project includes a **Discord self-bot** that allows managing specific commands through a whitelist system. The bot provides commands to add, remove, and list users in a dedicated whitelist for each command.

> **Warning:** This is a **self-bot** and is **intended for educational purposes only**. The use of **self-bots** violates [Discord's Terms of Service](https://discord.com/terms), which may result in your account being suspended or terminated. **The author of this project is not responsible for any consequences of its use.**

## Prerequisites

Before running the bot, make sure you have the following tools installed:

* [Node.js](https://nodejs.org/) (version 16 or higher recommended)
* [npm](https://www.npmjs.com/) (Node.js package manager)

## Installation

1. **Clone the repository:**

   If you haven't already, clone the source code using the following command:

   ```bash
   git clone <repository-url>
   cd <project-folder-name>
   ```

2. **Install dependencies:**

   Open a terminal in the project directory and run:

   ```bash
   npm install
   ```

   If you don’t want to install modules manually every time, you can also use the `start.bat` file. It ensures that all required modules are installed before launching the bot.

3. **Set up environment variables:**

   Create a `.env` file at the root of the project and add your Discord token:

   ```
   DISCORD_TOKEN=your-bot-token-here
   ```

   Replace `your-bot-token-here` with your actual Discord account token. **Do not share this token with anyone.**

## Running the Bot

To start the bot, either double-click the `start.bat` file, or run the following command manually:

```bash
npm start
```

If you're using `start.bat`, the script will check for missing modules and install them automatically before starting the bot.

## Available Commands

### `!whitelist <add|remove|list> <command> [@user]`

This command allows you to manage the whitelist for a specific command. The bot can add, remove, or list users authorized to use that command.

#### Available actions:

* `add` – Adds a user to the whitelist for the specified command.
* `remove` – Removes a user from the whitelist for the specified command.
* `list` – Displays all users in the whitelist for a given command.

### Other Custom Commands

The bot can also be configured to perform various other actions, such as managing voice channels, displaying user information, and more. Check the source code for additional available commands.

## Development

If you'd like to contribute or add new features, you’re welcome to fork the repository, create a feature branch, and submit a pull request.

1. Clone this repository.
2. Create a new branch (`git checkout -b feature-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push your changes (`git push origin feature-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

**Final Warning:** Keep in mind that using self-bots violates Discord’s Terms of Service. Use this code at your own risk and for educational purposes only.
