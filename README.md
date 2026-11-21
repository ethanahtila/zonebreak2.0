# ZONEBREAK 1.2.0 — deployment

The ZIP uses the same ZONEBREAK/ folder layout as the supplied working example.
Read **DEPLOY-ON-RENDER.txt** for upload instructions and a folder checklist.

| Render field | Value |
| --- | --- |
| Root Directory | Leave blank when uploading the contents of ZONEBREAK |
| Build Command | `npm ci --omit=dev` |
| Start Command | `npm start` |
| Health Check Path | `/health` |
| NODE_VERSION | `24` |

The bundled vendor/ws folder is required for multiplayer. The test folder holds
optional checks. Both are included in this ZIP. Drag the folders onto GitHub's
upload page along with the loose files to preserve their paths.

Deployment checks: `node --test test/deploy.test.cjs`.
The older gameplay notes and tests below predate the 1.2.0 expansion.

---

# ZONEBREAK — 1.0.5

A lightweight, original browser arena game with 70 fighters, seven class menus, Duel, Hot Zone, Knockout, bot practice, friend rooms and real-player matchmaking. All art is drawn in code and all sound is synthesized. This game is separate from CU-Escape.

This update adds **credits, personalized trophy-road rewards, rarity-based recruitment, 40 new fighters, Controllers and destructible cover**. Coins, individual fighter trophies, daily chests and twenty-level stat growth remain. There are no real-money purchases.

## Try it

Extract the ZIP and open **PLAY.html** in a desktop browser for offline bot practice. Online play needs the included Node Web Service. No separate image packs or asset uploads are needed.

| Control | Action |
| --- | --- |
| WASD | Move |
| Mouse | Aim |
| Left click / hold | Basic attack |
| Q or right click | Charged super |
| E | Equipped gadget |
| Escape | Pause practice / open online match menu / close reward screens |

This version uses a keyboard and mouse, without touch movement controls.

## Start with Jolt and build a roster

**New profiles own Jolt only.** Other fighters can be previewed in their class menu, but cannot be played, leveled or equipped until collected. Join-room fighter selectors also disable unowned fighters.

| Class | Fighters |
| --- | --- |
| Tanks | Rook, Bulwark, Bramble, Kiln, Anchor, Rampart, Golem, Atlas, Vanguard, Titan |
| Damage dealers | Jolt, Nova, Flint, Echo, Prism, Blaze, Burst, Rivet, Cascade, Vector |
| Healers | Sprig, Pulse, Brook, Lumen, Mender, Fern, Aegis, Chorus, Solace, Link |
| Artillery | Fuse, Tumble, Cinder, Drizzle, Orbit, Pebble, Scoria, Tempest, Mortar, Comet |
| Assassins | Wisp, Nyx, Talon, Volt, Shade, Fang, Mirage, Reaper, Blink, Specter |
| Marksmen | Scope, Kestrel, Vega, Quill, Sable, Horizon, Osprey, Needle, Parallax, Zenith |
| Controllers | Relay, Bastion, Glade, Patch, Cipher, Magnet, Sentry, Tide, Mosaic, Circuit |

Choose a class to see its ten fighters. Each fighter has its own stats, attack pattern and super; see **FIGHTERS.md**. Rarity measures credit cost and mastery complexity, not an automatic stat multiplier.

Damage dealers now have **60% stronger basic attacks, 10% faster reload times and 15% stronger super damage**. Marksmen keep their separate long-range tuning. All tanks gain **150 maximum health**; level-1 health receives the proportional increase under the existing 65%–100% scaling.

Fighters have three reloading ammo cells. Staying out of combat restores health after four seconds. Damage/healing and passive charge fill supers. Bushes conceal enemies unless close or revealed by combat. Cover blocks ordinary movement and shots until a permitted ability breaks it.

## Controllers and wall destruction

Controllers deal medium basic damage with varied attack ranges. Their supers hold areas through damage/slow/pull fields, returning projectile fans, or destructible turrets. Relay deploys a turret; Patch throws a returning fan; Cipher lays a line of control fields; Magnet pulls enemies into a well; Mosaic manages two turrets; Circuit sequences hazards.

Turrets can be destroyed by opposing basic attacks, explosions and damage fields. They expire, obey line-of-sight rules unless explicitly built as a lobber, and do not count as students or capture zones. Fields and deployables have finite lifetimes and bounded counts.

Super wall breakers: **Rook** (Faultline), **Fuse** (Fireworks), **Kiln** (Open Furnace), **Flint** (Breach Volley), **Orbit** (Impact Event), **Rampart** (Breach Rush), **Titan** (Aftershock), **Burst** (Demolition Line), **Pebble** (Shatter Grid), **Scoria** (Caldera), **Comet** (Orbital Breach).

- **Marksmen and assassins can never break walls.**
- **Controller supers can never break walls.** Cipher, Sentry and Mosaic can purchase the third gadget, **Lane Cutter**, at level 15 to breach nearby cover.
- Other listed fighters break cover through their supers. Breaks remove the wall for everyone for the rest of that match, including later rounds; new matches restore intact cover.
- Collision, projectile blocking, sight lines, bot navigation, aim previews and rendered terrain use the same remaining walls. Outer arena boundaries remain intact.

## Trophies and trophy road

Completed matches grant trophies **only to the fighter used**:

| Result | Fighter trophies |
| --- | --- |
| Win | +8 |
| Draw | +4 |
| Loss | +2 |
| Leave before the match ends | 0 |

Practice, friend-room and public online matches count. Trophies do not increase a fighter’s level. Switching fighters switches to that fighter’s own trophy counter.

The combined lifetime total advances a **personalized, saved trophy road**. Trophies are not copied to other fighters. Milestone gaps vary from 18–49 trophies; rewards vary between coins, credits and bonus chests, with varied amounts and occasional larger payouts. The road extends as you advance and no longer alternates fixed fighter/coin rewards. There are **no direct fighter rewards** on the road. Bonus road chests do not consume daily win-drop slots.

Road rewards are added automatically once. The screen shows recent and upcoming milestones. Reloading preserves the road seed and rewards instead of rerolling them.

## Credits, fighter rarities and recruitment

Open **Recruit** to see your randomly rolled rarity and up to **three unowned fighters from that rarity**. Choose one fighter to work toward. Newly earned credits automatically fill that target’s requirement; when full, the fighter unlocks and surplus credits remain banked. A new random-rarity offer is then prepared for your next choice.

| Fighter rarity | Credits required | Initial rarity-roll weight | Mastery complexity |
| --- | --- | --- | --- |
| Common | 100 | 35% | 1 / 5 |
| Rare | 250 | 28% | 2 / 5 |
| Epic | 500 | 20% | 3 / 5 |
| Mythic | 900 | 12% | 4 / 5 |
| Legendary | 1,500 | 5% | 5 / 5 |

Each rarity contains 14 fighters, with two from every class. The starting Jolt is Common. Higher rarities tend toward multi-part attacks, positioning, timing and deployable management; they do not get a universal rarity damage/health bonus.

Offers and selected-target progress are saved. You cannot reroll by closing/reloading or change targets midway. Exhausted rarities are excluded from future rolls and remaining weights are normalized. If fewer than three candidates remain in the selected rarity, all remaining ones are shown. Credits are never spent on random unwanted fighters: you choose before any credits are allocated.

Credits come from road rewards and can also appear in chests. Coins continue to buy levels and abilities. If a Legendary chest directly grants your current target, already allocated credits are refunded to your bank. If every fighter is owned, credits remain banked for future additions.

See **ECONOMY.md** for prices, road examples and reward details.

## Five daily win chests

The first **five wins per day** each award one chest. Losses/draws do not award chests. Further wins still award trophies. The counter resets at **midnight in Cedarville, Ohio: America/New_York / Eastern Time**, automatically accounting for daylight saving.

Click Daily Drops in the menu or Open Daily Drop on the result screen. Each chest starts Common and gives **exactly six upgrade attempts**. Each successful click advances one rarity; a failed attempt keeps the current rarity. Reward delivery happens once, on click six.

| Current rarity | Chance each click upgrades it | Coin reward if final rarity |
| --- | --- | --- |
| Common | 60% → Rare | 60–100 |
| Rare | 40% → Epic | 120–180 |
| Epic | 25% → Mythic | 240–360 |
| Mythic | 12% → Legendary | 500–750 |
| Legendary | Already maximum | 1,000–1,500 |

Only a **Legendary** chest can award a fighter: it has a **25% chance** to award one randomly chosen unowned fighter instead of coins. For non-fighter payouts, there is a 25% chance to receive credits instead of coins: 30 / 70 / 150 / 300 / 500 credits for Common through Legendary chests. If every fighter is owned, a Legendary payout is coins or banked credits. Lower chest rarities never award a fighter directly. Upgrade odds are conditional on the chest’s current rarity, not the probability of obtaining that final rarity.

Earned unopened chests carry over to later days. The chest’s seed, clicks, rarity and final reward are saved, so closing/reloading cannot restart its attempts or pay out again.

## Coins buy levels and abilities separately

XP is no longer earned or used. Coins come from chests and trophy-road rewards. Spend them to level **an owned fighter**, one level at a time, up to 20. The level-2 upgrade costs 60 coins; each subsequent upgrade costs 20 more, up to 420 for level 20. All nineteen upgrades together cost 4,560 coins.

Health, damage and healing still start at **65% of their maximum values**, growing evenly each level to 100% at level 20. The former level-1 base values are the current level-20 maxima. Speed, range and cooldowns do not grow with level. The menu shows current/max stats and a 20-level track. Level 20 grants the mastery badge automatically.

An ability’s level requirement only makes it **eligible for purchase**. It is not free when leveling up:

| Choice | Gadget level / price | Passive level / price |
| --- | --- | --- |
| I | Level 5 / 150 coins | Level 8 / 250 coins |
| II | Level 10 / 300 coins | Level 12 / 450 coins |
| III | Level 15 / 600 coins | Level 16 / 750 coins |
| IV | Level 18 / 1,000 coins | Level 20 / 1,200 coins |

Purchasing equips that ability. Switching between already-owned choices is free. Only one gadget and one passive are equipped at once. All gadgets have cooldowns. Supers are available from level 1 and cost no coins. Descriptions list level-20 damage/healing values; the actual output scales with level.

## Online matchmaking and friends

Everyone must open the same hosted website.

- **Public Online:** separate queues by mode **and exact selected-fighter trophy count**. Duel needs two real players at that trophy count; Hot Zone and Knockout each need six. Level is not a matchmaking restriction. The queue never widens the trophy range or quietly adds bots. This can mean waiting longer when few players are online.
- **Friends:** create a room, share the code, and join using the code alone. Private rooms do not require equal trophies, so friends can play together. The host can start with empty seats filled by bots. Rooms support replays and mode changes after matches.
- **Practice:** local bots only. Bots are given the selected fighter’s trophy count and level; their characters are random. Choose Rookie, Contender or Veteran.

| Mode | Rules |
| --- | --- |
| Duel | 1v1, first to two round wins, up to 80 seconds per round, no mid-round respawn |
| Hot Zone | 3v3, capture to 100%, contested zone stops scoring, 3.5-second respawn, three-minute cap |
| Knockout | 3v3, first to two elimination-round wins, up to 90 seconds per round |

Duel/Knockout have a closing danger ring in the last 25 seconds. Timeout compares remaining health fractions; ties draw the round. A ten-minute overall cap prevents endless tied rounds. There are three original cover/bush layouts.

The server owns combat, uses a 30 Hz simulation, and sends 15 Hz snapshots. Clients predict local movement and interpolate remote movement. Disconnecting fighters become bots without resetting the match, and the room host transfers to another member. Online games continue while the match menu is open.

## Saves and upgrading from earlier versions

**Profiles remain browser-local, not server accounts.** Coins, credits, fighter ownership, purchases, levels, trophies, road seed/claims, recruitment offers, target progress and chest progress save in this browser. Clearing its storage can erase them. Saves do not automatically transfer between devices or between file-based practice and a hosted website.

Profiles from 1.0.4 keep their coins, owned fighters, levels, trophies, ability purchases, daily counters and earned chests. Newly introduced fighters start locked. Existing road rewards are retained; earlier milestones on the new road are marked complete to prevent retroactive double rewards. Credits start at zero and a saved recruitment offer is created.

Older XP-era profiles still migrate: fighters with earned XP retain ownership, corresponding levels and earned ability choices. Jolt is always owned. XP is no longer granted. No new trophies or daily chests are created for old results.

Combat validates level limits, purchased ability declarations and unlock levels. However, **there is no authoritative account database**: the server trusts the local profile’s supplied ownership, purchases and trophies. These casual profiles and exact-trophy queues are not cheat-proof or a secure ranked economy. The daily clock uses the device’s time interpreted in Eastern Time. A server-account economy would need server-owned profiles and transactions.

## Update your existing Render game

Replace the contents of your existing ZONEBREAK repository with the files inside this ZIP’s `ZONEBREAK` folder, then commit. **Include the new `expansion.js` and updated `economy.js`**, as well as the updated `roster.js`, `core.js`, `render.js`, `app.js`, `index.html`, `style.css`, `PLAY.html` and package files. Keep `vendor` in the repository. No `public` folder or separate art upload is used.

Use the same Render **Web Service**, with these unchanged settings:

| Setting | Value |
| --- | --- |
| Build | `npm ci --omit=dev` |
| Start | `npm start` |
| Health check | `/health` |
| Node | `24` |
| Root directory | Blank if package.json is at repository root |

Once deployed, reload and check for **1.0.5** in the menu. HTTPS automatically uses WSS for game connections. This package has not been deployed to your Render account. Keep CU-Escape in its separate repository/service.

One server instance is supported. Rooms/queues are in memory, so deploying or restarting ends active matches. Additional instances would need shared matchmaking/room infrastructure.

## Run and verify locally

Install Node 24, then run in this folder:

```sh
npm ci --omit=dev
npm start
```

Open `http://localhost:3000`. The server reads `PORT` when hosted. The MIT-licensed WebSocket dependency is bundled in `vendor/ws`, including its license, so installation needs no registry downloads.

After changing sources, regenerate the offline page and run checks:

```sh
node build.cjs
npm test
```

The 80 automated tests cover all 70 fighters, rarity pools, saved recruitment choices and progress, credit allocation/carryover, personalized roads, migration, purchased abilities, daily chests and Eastern Time/DST resets, exact-trophy matchmaking, wall-breaking restrictions, collision/visibility/navigation changes, destructible turrets, live wall/turret synchronization, room replays, and UI flows. Forty-two additional bot matches exercised all fighters across three modes with bounded effects and finite state. All portraits and a controller/breaching scene were rendered for visual inspection. UI tests use a simulated DOM; they do not replace live browser or internet-latency playtesting.

## 1.1.0 update

- Every fighter now has its own four gadgets and four passives (no shared abilities).
- Artillery range/damage reduced (marksmen keep the longest range), tanks slower, assassins fastest.
- Bots: Rookie → Beginner → Normal → Veteran; bot levels follow your selected fighter's trophies; smarter objective play, retreating, dodging and gas avoidance.
- New modes: Solo Showdown, Duo Showdown, Gem Grab, Bounty, Soccer, Training and Ranked (Wood → Pro, 5 divisions each, unlocks at 1,000 road trophies, bots fill after 2:30).
- Three maps per mode on staggered daily rotations (+5 trophies when you open a new rotation); bigger maps with water; Showdown maps are about six times larger. Sight range is unchanged.
- Poison gas in Knockout, Duel and both Showdowns.
- Trophy Road to 1,000,000 with random chests, a Legendary chest every 1,000, mode unlocks and the first common fighter of each class.
- Wins +10, draws +4, losses -2 trophies; Showdown uses placement tables. Mastery = 2,000 fighter trophies.
- White-bordered attack area previews, fighter-coloured projectiles with class shapes, bigger super and wall-break effects, wall breaks also clear grass.
- Friends rooms: top half of the list vs bottom half. Invisible assassins leave a decoy clone and can swap with it by pressing super again.

## 1.2.0 update

- Aiming: the mouse cursor is hidden in matches; the white attack-area indicator is the only aim. Moving the cursor very close to your fighter no longer spins the aim (90-unit dead zone keeps the last direction).
- Roster expanded to 154 fighters (22 per class) with the new Ultra rarity: exactly one Ultra tank, damage dealer and controller. Every new fighter has its own super, gadgets and passives.
- Color store: 6 daily fighter + color offers for unlocked fighters only, no repeated pair, bought with coins. Grey is free; "Original" keeps the standard look.
- Daily quests: 6 per day (3 normal for coins, 3 Battle Pass only for pass XP).
- Battle Pass: 3-month season, 300 levels, 3,000 coins, one reward per level (max 50 coins/credits), random chest every 30 levels (10 total), no fighters.
- Gears: 8 gears at 300 coins each per fighter; slot 1 at level 8, slot 2 at level 16; two equipped at most.
