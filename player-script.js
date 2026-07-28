/*
 * BLOOD & SMOG — PLAYER DOSSIER DATA
 * -----------------------------------
 * Edit ONLY the playerData section below to add your characters.
 * The prisoner-file dropdown, dossier statistics, attacks, party list,
 * default color theme, and browser-saved notes all update automatically.
 */

const playerData = {
  player1: {
    name: 'Demascus Efferpot',
    fileLabel: 'Cell I — Demascus Efferpot',
    className: 'Artificer • Level 10',
    race: 'Human',
    level: 10,
    background: 'Criminal/Spy',
    defaultTheme: 'amethyst',
    hp: { current: 93, max: 93 },
    ac: 14,
    abilities: {
      STR: 12,
      DEX: 14,
      CON: 18,
      INT: 16,
      WIS: 13,
      CHA: 10
    },
    attacks: [
      'Club • +5 to hit • 1d4 + 1 bludgeoning',
      'Dagger • +6 to hit • 1d4 + 1 piercing',
      'Steel Defender: Rend • +7 to hit • 1d8 + 5 force',
      'Unarmed Strike • +5 to hit • 2 bludgeoning'
    ]
  },

  player2: {
    name: 'Prisoner Two',
    fileLabel: 'Cell II — Prisoner Two',
    className: 'Rogue • Level 10',
    race: 'Human',
    level: 10,
    background: 'Background',
    defaultTheme: 'oxblood',
    hp: { current: 70, max: 70 },
    ac: 15,
    abilities: {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10
    },
    attacks: [
      'Unarmed Strike • +4 to hit • 1 bludgeoning'
    ]
  },

  player3: {
    name: 'Prisoner Three',
    fileLabel: 'Cell III — Prisoner Three',
    className: 'Blood Hunter • Level 10',
    race: 'Species',
    level: 10,
    background: 'Background',
    defaultTheme: 'emerald',
    hp: { current: 70, max: 70 },
    ac: 15,
    abilities: {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10
    },
    attacks: [
      'Unarmed Strike • +4 to hit • 1 bludgeoning'
    ]
  },

  player4: {
    name: 'Player Four',
    fileLabel: 'Cell IV — Player Four',
    className: 'Sorcerer • Level 10',
    race: 'Vampire',
    level: 10,
    background: 'Background',
    defaultTheme: 'silver',
    hp: { current: 70, max: 70 },
    ac: 15,
    abilities: {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10
    },
    attacks: [
      'Unarmed Strike • +4 to hit • 1 bludgeoning'
    ]
  },

  player5: {
    name: 'Player Five',
    fileLabel: 'Cell V — Player Five',
    className: 'Barbarian • Level 10',
    race: 'Species',
    level: 10,
    background: 'Background',
    defaultTheme: 'sapphire',
    hp: { current: 70, max: 70 },
    ac: 15,
    abilities: {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10
    },
    attacks: [
      'Unarmed Strike • +4 to hit • 1 bludgeoning'
    ]
  },

  player6: {
    name: 'Player Six',
    fileLabel: 'Cell VI — Player Six',
    className: 'Rogue • Level 10',
    race: 'Species',
    level: 10,
    background: 'Background',
    defaultTheme: 'amethyst',
    hp: { current: 70, max: 70 },
    ac: 15,
    abilities: {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10
    },
    attacks: [
      'Unarmed Strike • +4 to hit • 1 bludgeoning'
    ]
  }
};

/* Stop editing here unless you want to change dashboard behavior. */

let currentPlayer = null;
const $ = id => document.getElementById(id);
const DEFAULT_THEME = 'oxblood';
const VALID_THEMES = new Set([
  'oxblood',
  'emerald',
  'sapphire',
  'amethyst',
  'amber',
  'rose',
  'silver'
]);

function getThemeKey(playerId = currentPlayer) {
  return playerId
    ? `blood-smog-dossier-theme-${playerId}`
    : 'blood-smog-dossier-theme-default';
}

function getPlayerTheme(playerId) {
  const player = playerData[playerId];
  const saved = localStorage.getItem(getThemeKey(playerId));
  const fallback = player?.defaultTheme || DEFAULT_THEME;
  return VALID_THEMES.has(saved) ? saved : fallback;
}

document.addEventListener('DOMContentLoaded', () => {
  populatePlayerSelect();
  applyTheme(DEFAULT_THEME);

  document.querySelectorAll('.theme-btn').forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      if (!VALID_THEMES.has(theme)) return;

      localStorage.setItem(getThemeKey(), theme);
      applyTheme(theme);
    });
  });

  $('loginForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const value = $('playerSelect').value;

    if (!value || !playerData[value]) {
      $('errorMessage').hidden = false;
      $('errorMessage').textContent = 'Select a prisoner file.';
      return;
    }

    currentPlayer = value;
    sessionStorage.setItem('bloodSmogPlayer', value);
    showDashboard();
  });

  $('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem('bloodSmogPlayer');
    currentPlayer = null;
    $('playerDashboard').classList.remove('active');
    $('loginSection').style.display = 'block';
    $('playerSelect').value = '';
    applyTheme(DEFAULT_THEME);
  });

  document.querySelectorAll('.dice-btn').forEach(button => {
    button.addEventListener('click', () => rollDie(Number(button.dataset.dice)));
  });

  const savedPlayer = sessionStorage.getItem('bloodSmogPlayer');
  if (savedPlayer && playerData[savedPlayer]) {
    currentPlayer = savedPlayer;
    showDashboard();
  }
});

function populatePlayerSelect() {
  const select = $('playerSelect');
  if (!select) return;

  select.innerHTML = '<option value="">-- Select a file --</option>';

  Object.entries(playerData).forEach(([playerId, player], index) => {
    const option = document.createElement('option');
    option.value = playerId;
    option.textContent = player.fileLabel || `Cell ${index + 1} — ${player.name}`;
    select.appendChild(option);
  });
}

function applyTheme(theme) {
  const safeTheme = VALID_THEMES.has(theme) ? theme : DEFAULT_THEME;
  document.body.dataset.dossierTheme = safeTheme;

  document.querySelectorAll('.theme-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.theme === safeTheme);
  });
}

function showDashboard() {
  const player = playerData[currentPlayer];
  if (!player) return;

  $('loginSection').style.display = 'none';
  $('playerDashboard').classList.add('active');
  $('errorMessage').hidden = true;

  applyTheme(getPlayerTheme(currentPlayer));

  $('playerName').textContent = player.name;
  $('playerClass').textContent = player.className;
  $('charName').textContent = player.name;
  $('charRace').textContent = player.race;
  $('charClass').textContent = player.className;
  $('charLevel').textContent = player.level;
  $('charBackground').textContent = player.background;
  $('currentHP').textContent = player.hp.current;
  $('maxHP').textContent = player.hp.max;
  $('armorClass').textContent = player.ac;

  renderAbilities(player.abilities);
  renderAttacks(player.attacks);
  setupNotes();
  populateParty();
}

function renderAbilities(abilities) {
  const grid = $('abilitiesGrid');
  grid.innerHTML = '';

  Object.entries(abilities).forEach(([name, score]) => {
    const card = document.createElement('div');
    card.className = 'stat-card ability-card';

    const label = document.createElement('span');
    label.className = 'record-label';
    label.textContent = name;

    const value = document.createElement('div');
    value.className = 'result-value';
    value.textContent = score;

    const modifier = Math.floor((Number(score) - 10) / 2);
    const modifierText = document.createElement('small');
    modifierText.className = 'ability-modifier';
    modifierText.textContent = modifier >= 0 ? `+${modifier}` : String(modifier);

    card.append(label, value, modifierText);
    grid.appendChild(card);
  });
}

function renderAttacks(attacks) {
  const list = $('attacksList');
  list.innerHTML = '';

  attacks.forEach(attack => {
    const item = document.createElement('p');
    item.textContent = attack;
    list.appendChild(item);
  });
}

function rollDie(sides) {
  if (!Number.isInteger(sides) || sides < 2) return;

  const modifier = Number($('diceModifier').value || 0);
  const roll = Math.floor(Math.random() * sides) + 1;
  const total = roll + modifier;

  $('resultValue').textContent = total;
  $('resultBreakdown').textContent = `d${sides}: ${roll}${
    modifier ? `${modifier > 0 ? ' + ' : ' - '}${Math.abs(modifier)}` : ''
  }`;

  const row = document.createElement('div');
  row.className = 'saved-note-item';
  row.textContent = `d${sides} → ${total}`;
  $('historyList').prepend(row);

  while ($('historyList').children.length > 8) {
    $('historyList').lastChild.remove();
  }
}

function setupNotes() {
  ['sessionNotes', 'inventoryNotes', 'relationshipNotes', 'theoriesNotes'].forEach(id => {
    const section = $(`${id}Section`);
    if (!section) return;

    section.querySelector('textarea')?.remove();

    const area = document.createElement('textarea');
    area.rows = 7;
    area.placeholder = 'Write in the margin…';

    const storageKey = `blood-smog-${currentPlayer}-${id}`;
    area.value = localStorage.getItem(storageKey) || '';
    area.addEventListener('input', () => {
      localStorage.setItem(storageKey, area.value);
    });

    section.appendChild(area);
  });
}

function populateParty() {
  const box = $('partyList');
  box.innerHTML = '';

  Object.entries(playerData)
    .filter(([playerId]) => playerId !== currentPlayer)
    .forEach(([, player]) => {
      const item = document.createElement('div');
      item.className = 'saved-note-item';
      item.textContent = player.name;
      box.appendChild(item);
    });
}
