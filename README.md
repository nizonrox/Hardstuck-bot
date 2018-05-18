# HardStuck Bot v3.0.0+dev
Bot made and aimed to keep track of daily custom game schedules for autistic kids that doesn't show up.

### Current commands:
* Create Name|Details
* Remove
* Join (reserve)
* Leave
* Coinflip

### Work in progress
1. Reply to commands; to confirm an action
2. Implement Kayn Riot API
3. Hook up presistent cache to an online db.
4. Add command to change thumbnail of event
5. On event remove, deleted the event message
6. Implement flexible ban system
7. Implement extensive logging system

### Dependencies / Documentation:
[Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) //Discord.js Module<br />
[Erlpack](https://www.npmjs.com/package/erlpack) //Preformance Module (Requires Python 2.7.X)<br />
[Python2.7.X](https://www.python.org/) //Python, Duh<br />
[Presistent Cache](https://www.npmjs.com/package/persistent-cache) //Database Module<br />
[kayn](https://www.npmjs.com/package/kayn) //Riot Api module (Not in use)<br />

### Change log:
3.0.0 - Command Handler added, Database hook updated, Console colors added!<br />
2.2.1 - Added config.json for ease of acces, ban system removed temp<br />
2.2.0 - Locate replaced by automatic function<br />
2.1.1 - Syntax error fixes<br />
2.1.0 - Added coinflip & Join reserve<br />
2.0.0 - Code overhaul

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
