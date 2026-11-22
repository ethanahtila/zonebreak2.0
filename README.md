# ZONEBREAK 1.3.1 — roster sorting

The roster now defaults to rarity, from Common to Ultra. SORT BY also offers
Power level and Trophies, both highest first. Power uses the level you own for
each fighter, and trophies uses that fighter’s own trophy count. In those two
sorts, unlocked fighters appear first; ties and locked fighters follow rarity
order. Fighters tied within the same rarity retain stable catalogue order.

The sort preference is saved in the existing profile and applies across classes.
Search and rarity filters continue to work, sorting happens before pagination,
and changing sort resets to page one. Upgrading a fighter or returning from a
match refreshes its position. Existing progress and all 1,400 kits remain intact.

Render settings are unchanged: Node 24; Build `npm ci --omit=dev`; Start
`npm start`; Health Check Path `/health`. Upload all contents of ZONEBREAK
together, preserving vendor/ and test/. PLAY.html is included for practice.
Run the current acceptance suite with `npm test`. It includes sorting, saved
preferences, pagination, upgrades, combat, and real WebSocket checks.

## Earlier release notes

# ZONEBREAK 1.3.0 — 1,400 fighters

Seven classes, 200 fighters each. Original IDs and saved progression are preserved.

| Rarity | Per class | Total |
| --- | ---: | ---: |
| common | 50 | 350 |
| rare | 50 | 350 |
| epic | 40 | 280 |
| mythic | 30 | 210 |
| legendary | 25 | 175 |
| ultra | 5 | 35 |

The 1,225 additions are built from a deterministic modular kit grammar. They combine
class attack chassis with cadence, bank, recall, helix, bloom, tether and wake
techniques. Kits share underlying mechanics, with different complete attack,
super, gadget, conditional-passive and appearance configurations. They are not
1,225 independently hand-animated characters. New rarity assignments follow kit
complexity; rarity is not a direct stat multiplier. The earlier 175 kits and
rarities remain intact. Ultra now appears in all seven classes, with five each.

Each new fighter has four purchasable gadget options and four purchasable passive
options. Gadgets combine bounded effects and targeting/placement rules; passive
doctrines add conditional bonuses that are reevaluated during play. Their full
descriptions appear in the fighter menu. Unlock levels and prices stay unchanged.
Grey remains the free starting color; other colors retain their purchase rules.

Class browsing now paints 25 portrait cards at a time, with eight pages per
class, search by name/attack/playstyle, and a rarity filter. Searches include
locked fighters, who can still be tried in Training. Fighter lookups use an
index, and live snapshots contain only active match state, not all 1,400 kits.
Training retains both ponds and its left-side medic. Other maps are unchanged.

Render settings are unchanged: Node 24; Build `npm ci --omit=dev`; Start
`npm start`; Health Check Path `/health`. Upload the contents of ZONEBREAK with
vendor/ and test/ in place. PLAY.html is included for standalone practice.

Current checks:
`node --test test/grand-roster.test.cjs test/arsenal.test.cjs test/peculiar.test.cjs test/artillery-friends.test.cjs test/hyper-purchase.test.cjs test/hypercharge.test.cjs test/lootbox-cosmetics.test.cjs test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`

These test combat, all new kit options, saved-profile migration, pagination,
conditional passives and real WebSocket connections. Native canvas checks cover
all portraits and sampled attack scenes. Large-scale live browser balance testing
remains useful; automated uniqueness checks establish distinct configurations,
not perfect competitive balance. Historical release notes/tests below can retain
old roster counts and are not the current acceptance suite.

## Earlier notes

# ZONEBREAK 1.2.9 — full roster basic-attack rework

All 150 non-tank fighters now have individual basic attack configurations, including
the 132 older fighters in those classes. Together with the previous tank update,
all 175 fighters now have their own basic attack forms. Supers, gadgets, passive
choices, ownership and progression are retained. New attack descriptions appear
in fighter selection and the included FIGHTERS.md guide.

- Damage dealers: fans, beams, timed volleys, parallel rails, split crystals, returning wheels and short impact splashes.
- Healers: seeds, healing halos, piercing threads, notes, curving petals and healing lobs.
- Artillery: circular, ring, cross and strip blasts; rows, lines, square corners, chevrons, spirals and staggered landings. All remain finite-range throws over walls.
- Assassins: close-range cuts, curved scissors, returning sickles, rear strikes, claw lanes and radial blades.
- Marksmen: precision slugs, beam windups, parallel needles, bank shots, returning arrows and small impact splashes. Longest class range retained.
- Controllers: slowing impact patches, rope lanes, lobbed gates, piercing ribbons, trap grids and ricocheting signs.

White guides use the same lane, trajectory and blast-shape helpers as combat.
Delayed beams and slashes show a warning before resolving. Burst follow-up shots
retain their original firing direction and are canceled if the shooter is defeated.
All fighters keep their class silhouettes with weapon-head details matching their
new projectile shapes. Grey remains the free starting color.

Training now has two ponds on every rotation, a clear central route, walking
space around each pond and the existing left-side medic. Water blocks ordinary
fighters, permits existing swimmers and does not block shots or lobs. Other maps
are unchanged. Existing profiles retain coins, purchases, levels and trophies.

Render settings remain unchanged:
- Build: npm ci --omit=dev
- Start: npm start
- Health check path: /health
- Node 24

Upload the contents of ZONEBREAK, preserving vendor/ and test/. PLAY.html is a
standalone practice build; use the server for online play.

Current focused verification:
`node --test test/arsenal.test.cjs test/peculiar.test.cjs test/artillery-friends.test.cjs test/hyper-purchase.test.cjs test/hypercharge.test.cjs test/lootbox-cosmetics.test.cjs test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`

Checks exercise shared combat simulation, real WebSocket clients, and the client
with a DOM/input fixture. Native canvas rendering checks cover every portrait
and every non-tank attack. Live browser multiplayer balance testing remains
useful. The historical tests and release notes below may retain old counts or
balance expectations and are not the current acceptance suite.

## Previous release notes

# ZONEBREAK 1.2.8 — peculiar fighters and tank variety

Adds 21 fighters, three in every class, bringing the roster to 175 (25 per class).
New kits include returning ribbons, ricochets, splitting orbs, healing tea,
control trails and curved projectiles. Each new fighter has its own super and
signature gadget, plus four gadget and four passive choices.

All 25 tanks now use different basic attack patterns: forward jabs, rear strikes,
360-degree attacks, hooks, delayed quakes, returning discs and more. Their aim
previews, weapon equipment and hit effects follow those attack patterns.
Every fighter also has individual armor, visor and equipment details while
retaining its class silhouette. Grey remains the only free starting color.

Training now has a stationary healer on the left that shoots you every three
seconds so you can test healing and damage-dependent abilities. Training has
no rewards and can still be exited freely. Existing saves gain the new locked
fighters without resetting coins, upgrades or owned cosmetics.

Render: Build `npm ci --omit=dev`, Start `npm start`, Health Check Path `/health`.
Upload the contents of ZONEBREAK, preserving vendor/ and test/.

Current focused verification command:
`node --test test/peculiar.test.cjs test/artillery-friends.test.cjs test/hyper-purchase.test.cjs test/hypercharge.test.cjs test/lootbox-cosmetics.test.cjs test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`

These cover actual combat state, real WebSocket clients and a DOM/input fixture.
They do not replace live browser multiplayer balance testing. Legacy tests below
retain historical expectations and are not the current acceptance suite.

## Previous release notes

# ZONEBREAK 1.2.7 — artillery aiming and Friends bot difficulty

Normal artillery attacks now have a movable landing marker. Move the captured
mouse inward, outward or sideways to choose a point anywhere in the throw
radius, just as with super aiming. The throw arc and landing area follow that
point and actual bombs use it. Targets are bounded by both throw range and the
playable map. The target follows the fighter while moving; super targeting has
its own temporary target and returns to the normal landing marker afterward.
Other direct-fire fighters retain their existing full-range aim and turning.

In a Friends lobby, the host can choose **Bot Difficulty**: Rookie, Beginner,
Normal or Veteran. Normal is the default. Everyone sees the setting; only the
host may change it, and only between matches. It applies to bots filling empty
seats and to bots taking over disconnected fighters. It persists for replays
and after host migration. Bot fighter levels and loadouts still follow trophies;
this setting changes AI skill, not upgrade progression. Ranked and public online
matchmaking retain their existing difficulty settings.

Hypercharge purchases, poison, lootboxes, grey defaults, match-leaving rules,
map layouts and saved profiles are unchanged. Render settings are unchanged:
Build `npm ci --omit=dev`, Start `npm start`, Health Check Path `/health`.
Upload all ZONEBREAK contents, preserving vendor/ and test/.

Focused checks:
`node --test test/artillery-friends.test.cjs test/hyper-purchase.test.cjs test/hypercharge.test.cjs test/lootbox-cosmetics.test.cjs test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`

Earlier release notes follow for reference.

---

# ZONEBREAK 1.2.6 — hypercharge purchase

Hypercharge is a separate, permanent **2,500-coin purchase per fighter** in that
fighter's menu. You must own the fighter and raise its base level to **20** first.
Reaching level 20 does not grant it automatically. Power cubes cannot satisfy
the requirement. Buying it for one fighter does not unlock it for another.

Ownership saves alongside that fighter's upgrades. Duplicate purchases do not
charge again, and existing profiles do not receive free hypercharges. All other
coins, unlocks, colors and progress are preserved.

Until purchased, the fighter cannot gain hypercharge meter, activate F, receive
hypercharge stats or show its ready/active effects. The HUD explains the lock.
After purchase, it still takes three super charges' worth of energy and activates
with F for eight seconds, using the existing bonuses and class upgrades.

Training remains a free max-level preview and does not grant permanent ownership.
Bots may use a hypercharge loadout only at base level 20.

The prior match-leaving, poison, map and aiming rules are unchanged. Keep your
working Render settings: Build `npm ci --omit=dev`, Start `npm start`, Health
Check Path `/health`. Upload all ZONEBREAK contents, preserving vendor/ and test/.

Focused checks:
`node --test test/hyper-purchase.test.cjs test/hypercharge.test.cjs test/lootbox-cosmetics.test.cjs test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`

Earlier release notes follow for reference.

---

# ZONEBREAK 1.2.5 — Hypercharge

Press **F** when the hypercharge meter reaches 100%. All fighters start with an
empty meter. It takes 300 points of earned super-charge energy (three full
supers' worth) to fill, including combat energy earned while a super is already
ready. Activating it does not automatically fill or fire your super.

For eight seconds, gain 20% movement speed, 25% faster reload and 15% stronger
basic attacks. Supers gain 30% stronger damage/healing plus class upgrades:

| Class | Additional upgrade |
| --- | --- |
| Tank | Extra shockwave and shielding |
| Damage dealer | Extra rounds in directed volleys |
| Healer | Wider fields and a nearby healing/shield pulse |
| Artillery | Wider explosions leaving damaging purple ground |
| Assassin | Brief protection and an extra close-range strike |
| Marksman | Wider, piercing super rounds |
| Controller | Wider fields and tougher, faster, longer-lasting turrets |

Four jagged points appear on the ring only when hypercharge is ready or active.
While active, the fighter has a moving purple flame aura; the super ring,
targeting guide and empowered attacks turn purple. The meter cannot refill
while active. The boost ends on defeat or a new round; unspent meter progress
persists through respawns within the match. Hypercharge ownership now follows the level-20 purchase rules above.

General passive super charging is removed. Only **Rook, Bulwark, Wisp and Nyx**
retain slow automatic charging. Damage and healing charge supers; all tanks
also charge from enemy damage taken. Environmental gas does not grant tank
charge. Dynamo passives now increase combat charge instead of idle charging.

**Bramble, Cinder, Needle, Fern and Shade** poison enemies with basic attacks for
three seconds. Repeated hits refresh rather than stack the damage; poison has
visible green droplets and credits the attacking fighter for damage/takedowns.

In-game buttons and the multiplayer leave request cannot abandon an unfinished
match, including the countdown. Escape still releases the mouse and opens the
pause/menu. You can leave after the match ends. Training remains exit-able
because it has no ending condition. Closing a browser, refreshes and network
failures cannot be prevented; disconnects still hand the fighter to a bot.

**Maps are unchanged**, as requested. The previous aiming speed, grey defaults,
lootboxes, save key and Render setup remain.

Build: `npm ci --omit=dev`; Start: `npm start`; Health Check Path: `/health`.
Use the existing Node service and upload all ZONEBREAK contents, preserving
vendor/ and test/. No separate assets or database changes are required.

Focused checks:
`node --test test/hypercharge.test.cjs test/lootbox-cosmetics.test.cjs test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`

These use the real client with a DOM/input fixture, all 154 super implementations,
a live WebSocket server, production startup, and rendered-art inspection. Real
browser feel and group balance still require player testing. Historical notes
and legacy tests below predate the expanded game.

---

# ZONEBREAK 1.2.4 — steadier aiming

Turning uses a shared 150-unit steering radius, up from 100 in 1.2.3.
Small mouse movements turn fighters about one-third slower than 1.2.3, while
remaining faster than the original captured-aim controls. This applies equally
to every class. Mouse capture, full attack ranges and super targeting remain.

Keep the same working Render settings and folder upload process.
Build: `npm ci --omit=dev`; Start: `npm start`; Health Check Path: `/health`.

Earlier release notes follow for reference.

---

# ZONEBREAK 1.2.3 — faster shared turning

All fighters now use a 100-unit steering radius, approximately the basic reach
of a tank, instead of 480. Small mouse movements therefore turn fighters about
4.8 times faster regardless of their class or weapon range. Large single-event
mouse deltas are bounded to prevent accidental instant direction flips.

The mouse stays captured and hidden. Normal attacks still use their full weapon
range and the white guide; artillery range and super targeting are unchanged.
Grey defaults, super rings, lootboxes and player progress are preserved.

Upload the ZONEBREAK contents as before. Keep your working Render settings:
Build `npm ci --omit=dev`, Start `npm start`, Health Check Path `/health`.

---

# ZONEBREAK 1.2.2 — grey defaults, super rings and lootboxes

Every fighter's default color is Grey. New profiles own only Grey; old free
Original/null selections migrate to Grey. Purchased colors and player progress
are preserved. Old character palettes remain available as paid Signature colors
in the rotating shop. Grey character bodies and weapons are monochrome; team
markers keep their team colors for readability.

A white ring shows a living, visible fighter has a fully charged super. It turns
yellow while the player holds Q/right mouse to aim. This state is synchronized
for multiplayer and clears on cast, pause, death or respawn.

Reward containers are called Lootboxes in the menu, results, Trophy Road, Battle
Pass and opening screen. The menu displays how many unopened lootboxes are ready;
the opening screen separately displays the five-per-day win allowance. Bonus
lootboxes do not use that allowance. Six upgrade attempts remain per lootbox.

| Per-click upgrade | Previous | New |
| --- | --- | --- |
| Common to Rare | 60% | 45% |
| Rare to Epic | 40% | 25% |
| Epic to Mythic | 25% | 12% |
| Mythic to Legendary | 12% | 5% |

Reward amounts, the five daily win lootboxes, and guaranteed Legendary Trophy
Road lootboxes are unchanged. Previously opened and part-opened lootboxes keep
their rewards, clicks and current rarity. Remaining clicks use the new odds.

The enclosing ZONEBREAK folder, bundled vendor folder, Render commands and saved
profile key are unchanged. Build: `npm ci --omit=dev`; Start: `npm start`;
Health Check Path: `/health`. Keep your existing working Node service settings.

Focused checks:
`node --test test/lootbox-cosmetics.test.cjs test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`

The historical notes and legacy gameplay tests below predate the expanded game.

---

# ZONEBREAK 1.2.1 — captured aiming

- Play captures and hides the mouse. If the browser requires another click after
  online matchmaking, click the capture prompt or arena. That click does not fire.
- Normal attacks aim at the full-range edge of the white guide. Relative mouse
  movement turns the guide with a fixed virtual radius instead of a close cursor.
- Hold Q or right mouse to aim your super. Move the target within its finite range,
  then release to cast. Basic attacks pause while targeting. Multiple held super
  controls must all be released before the cast happens.
- Escape opens the match menu and releases the mouse; Back to the Fight captures
  it again. Pausing, switching away, death or leaving cancels a held super.
- The server clamps super target range and retains quick release events between
  simulation ticks. This applies to offline play and multiplayer.

Deployment layout and commands are unchanged. Upload all contents of ZONEBREAK,
including vendor/ and test/, and retain your working Render Node service settings.
Build: `npm ci --omit=dev`; Start: `npm start`; Health: `/health`.

Run the focused controls and deployment checks with:
`node --test test/aim-controls.test.cjs test/aim-network.test.cjs test/deploy.test.cjs`
These exercise the real client code with a DOM/input fixture, all 154 super ranges,
a live WebSocket super release, and production HTTP/WebSocket startup. A physical
browser pointer-lock playtest remains a manual check. The older gameplay tests
below predate the 1.2.0 expansion.

---

# ZONEBREAK 1.2.1 — deployment

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
