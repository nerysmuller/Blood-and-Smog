# Adding Blood & Smog Players

Open `player-script.js`. The editable section begins immediately beneath:

```js
const playerData = {
```

Each `player1`, `player2`, and so on is one character dossier. Edit these fields:

```js
player1: {
  name: 'Character Name',
  fileLabel: 'Cell I — Character Name',
  className: 'Rogue • Level 10',
  race: 'Human',
  level: 10,
  background: 'Criminal',
  defaultTheme: 'oxblood',
  hp: { current: 67, max: 67 },
  ac: 17,
  abilities: {
    STR: 8,
    DEX: 20,
    CON: 14,
    INT: 16,
    WIS: 12,
    CHA: 18
  },
  attacks: [
    'Rapier • +9 to hit • 1d8 + 5 piercing',
    'Sneak Attack • +5d6 damage',
    'Hand Crossbow • +9 to hit • 1d6 + 5 piercing'
  ]
}
```

## Available dossier colors

- `oxblood`
- `emerald`
- `sapphire`
- `amethyst`
- `amber`
- `rose`
- `silver`

Each player can change their dossier color on the page. That choice is saved separately for each character in that browser.

## Adding or removing players

Duplicate or remove a complete player block inside `playerData`. The dropdown and party list are generated automatically, so `players.html` does not need to be edited.

Keep commas between player blocks. The final player block does not require a trailing comma, though one is permitted in modern browsers.

## Browser storage

Each character's notes and selected color theme are stored locally in the browser. They do not sync across devices and disappear if the player clears site data.
