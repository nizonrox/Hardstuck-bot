# Discord Bot v3.2.1
The bot was named Hardstuck as a discord meme, coded by NizonRox.<br />
npm.install contains the needed programs/modules to efficiently use this bot.<br />

### What does this bot do?
HardStuck is here to keep track of planned custom events helt on a discord server between friends,<br />
the bot was intended to only do that but later branched out to aiming for the skyes so to say.<br />
There came demands for keeping track of the discord users ranks and a coin flip methode.<br />
Rank tracking system is still MIA and might be 4 ever.

### Current commands:
* Create Name|Details
* Remove
* Join (reserve)
* Leave
* Coinflip

### Work in progress
1. Check for admin status
2. Implement extensive logging system
3. Implement flexible ban system
4. Implement Kayn Riot API
5. Change DB

### Might add/fix
1. Check for channel permissions before crashing to an error
2. Messy slice in create event
3. Redo DB storing

### Dependencies / Documentation:
[Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) //Discord.js Module<br />
[Erlpack](https://www.npmjs.com/package/erlpack) //Preformance Module (Requires Python 2.7.X)<br />
[Python2.7.X](https://www.python.org/) //Python, Duh<br />
[Presistent Cache](https://www.npmjs.com/package/persistent-cache) //Database Module<br />
[Kayn](https://www.npmjs.com/package/kayn) //Riot Api module (To be Implemented)<br />

### Change log:
3.2.1 - Admin status checking, done<br />
3.2.0 - Code clean up; Make everything work as intended<br />
3.1.2 - Streamlined alof of stuff, just getting the repo ready for public<br />
3.1.1 - Database creation hot fixed, join only letting people into reserve hot fixed.<br />
3.1.0 - Responding to commands, Database hooker fired, Command overhaul, Coinflip is back!<br />
3.0.0 - Command Handler added, Database hook updated, Console colors added! Coinflip removed.<br />
2.2.1 - Added config.json for ease of acces, ban system removed temp.<br />
2.2.0 - Locate replaced by automatic function.<br />
2.1.1 - Syntax error fixes.<br />
2.1.0 - Added coinflip & Join reserve.<br />
2.0.0 - Code overhaul.<br />
Pre 2 - Spaghet code, be happy it's not documented in this repo<br />

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.<br />
Copyright © 2019 NizonRox
