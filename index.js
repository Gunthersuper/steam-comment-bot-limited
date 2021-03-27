const SteamCommunity = require('steamcommunity');
const SteamUser = require('steam-user')
const SteamTotp = require('steam-totp');
const Colors = require('colors');
const path = require('path');
var Async = require('async');
var fs = require('fs');
const ReadLine = require('readline');
var request = require('request')
const reader = require("readline-sync");

var community = new SteamCommunity; // Instance for the commenting
var user1 = new SteamUser; // Instance for bots
var user = new SteamUser; // Instance for the main account

var i=0; var j=0;

var text = fs.readFileSync('./bots.txt').toString('utf-8');
var bot = text.split('\n');
var bot1 = text.split('\n');
var text2 = fs.readFileSync('./comments.txt').toString('utf-8');
var comments = text2.split('\n')
config = require(path.resolve('config.json'));
let configRaw = fs.readFileSync('./config.json').toString();
const steamid = config.steamid;
const betweenComments = config.betweenComments;
const amount = config.amount;

console.log('%s is SteamID'.gray, steamid);

var coocs;
var success = 0; var failed = 0;

let rl = ReadLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Input Username, password, steam guard code:
rl.question('Username: ', (accountName) => {
	rl.question('Password: ', (password) => {
		rl.question('GuardCode: ', (guard) => {
			doLogin(accountName, password, guard);
		});
	});
});

// Login to the main account:
function doLogin(accountName, password, authCode, captcha) {
	user.logOn({
		accountName: accountName,
		password: password,
		twoFactorCode: authCode,
		captcha: captcha
	})
}

// Callback when loggen in to the main account
user.on("loggedOn", function() {
	(async() => {
	   console.log('Main account: \n%s - succesfully logged in\n----------------------'.cyan, user.steamID);
	   await new Promise(r => setTimeout(r, 2000));
	   bot_login()
	})();
})

// Add to friend from the main account
function add1(steamid) {
	user.addFriend(steamid, function(err, personaName) {
		if (err) { console.log('Cant add to friend %s, error: %s'.red, steamid, err); }
		else { 
			(async() => {
				console.log('[%s] Request sent'.green, steamid); 
				await new Promise(r => setTimeout(r, 5000));
			    add2(user.steamID); 

			})();
		}	 
	})
}

// Accept friend request on the bot account
function add2(steamid) {
	user1.addFriend(steamid, function(err, personaName) {
		if (err) { console.log('Cant add to friend %s, error: %s'.red, steamid, err); }
		else { 
			(async() => {	
				console.log('[%s] Accepted'.green, user1.steamID); 
				await new Promise(r => setTimeout(r, 30000));
				comm() 
			})();
		}
	})
}

// When loggen in the bot acc lets add this fom the main acc (function add1)
user1.on("loggedOn", function() {
   console.log('Bot № %s: \n[%s] Succesfully logged in'.cyan, i+1, user1.steamID);
   add1(user1.steamID)
})

// When logged off the bot acc go to the next bot acc
user1.on("disconnected", function() {
	(async() => {	
	   console.log('[%s] Succesfully logged off\n--------------'.gray, user1.steamID);
	   await new Promise(r => setTimeout(r, 5000));
	   bot_login()
	})();
})

// Login to the bot account using node-user
function bot_login() {
	(async() => {
		if (i < bot.length) {
			user1.logOn({
				"accountName": bot[i].split(":")[0],
				"password": bot[i].split(":")[1],
				"twoFactorCode": SteamTotp.generateAuthCode(bot[i].split(":")[2]),
			});		
		}
		else { console.log('The process is finished'); }
	})();
}

// Comment using steam-community, then remove from friends, then log off
function comm() {
	(async() => {
		comm1();
		function comm1() {
			community.login({
				"accountName": bot[j].split(":")[0],
				"password": bot[j].split(":")[1],
				"twoFactorCode": SteamTotp.generateAuthCode(bot[j].split(":")[2]),
			},
			function (err, sessionID, cookies, steamguard, oAuthToken) {
				if (err) { 
					if (err.message == 'SteamGuardMobile') { comm1() }
					else console.log('[%s] Unable to auth (Error: %s)'.red, community.steamID, err);
				 }
				if (!err) {	
					var comment = comments[Math.floor(Math.random() * comments.length)];
					community.postUserComment(user.steamID, comment, (error) => {
			            if (error) { console.log("error posting: %s",error); }
			            if (!error) { console.log('[%s] Successfully commented. Comment: %s'.green, community.steamID, comment);  }
			        });
				};
			});
		};
		await new Promise(r => setTimeout(r, 2000));
		user.removeFriend(user1.steamID);
		i++; j++;
		await new Promise(r => setTimeout(r, 2000));
		user1.logOff() 
	})();
}

