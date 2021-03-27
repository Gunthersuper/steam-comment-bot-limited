# steam-comment-bot-limited
Comment bot for the limited steam accounts

Steam comment bot using limited steam accounts (0 lvl). As you know, you can comment another profiles if you have unlimited account or if you have limited account and commented profile is in your friend list. So this script made for the second case. 

### How to work this script:
1. Login to your main account (that you need commented).
2. Login to the bot limited account (with 0 lvl).
3. Add to friend this bot from your main, then accept this request on the bot account.
4. Comment your main account by the bot.
5. Unfriend the bot, log off the bot, go to the first step.


### Installing:
1. Download the latest stabe version of Node JS - nodejs.org
2. Download and unpack the archive to any location
3. Open PowerShell or command prompt (or terminal for Linux) in the folder with the bot. To do this enter: cd c:\path_to_the_folder or if you use Windows go to the needed folder in the explorer, then press SHIFT + right mouse, select: Open PowerShell window here
4. Enter in the console: npm i or npm install

### Configuration:
1. `comments.txt` contains comments in each line. Bot will take from this file a random comment for each bot.
2. `bots.txt`. This is text file with login details of bots (limited steam accounts), format: `username:password:shared_secret` in each line.
Make sure that your accounts have steam guard enabled. 

### How to get accounts for the bot:
1. Register accounts using steam account generator or in the hand mode.
2. Enable steam guard usind[SDA](https://github.com/Jessecar96/SteamDesktopAuthenticator) (you need to add a phone number, you can get it here - [onlinesim.ru](https://onlinesim.ru?ref=1285661))
3. Fill out these profiles. Automatic script for this - [https://github.com/Gunthersuper/steam-profile-filler](https://github.com/Gunthersuper/steam-profile-filler)
4. Add these accounts to the `bot.txt` file with this formatting: `username:password:shared_secret` in each line.

### Using:
1. In the console type: node index or node index.js
2. Wait when the process is complete.
