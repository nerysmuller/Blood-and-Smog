/*
 * BLOOD & SMOG — PLAYER DOSSIER DATA
 * The prisoner-file dropdown, dossier statistics, attacks, party list,
 * default color theme, and browser-saved notes all update automatically.
 */

const playerData = {
  player1: {
    name: 'Demascus Efferpot',
    fileLabel: 'Prisoner: Demascus Efferpot',
    className: 'Artificer • Level 10',
    race: 'Human',
    level: 10,
    background: 'Criminal/Spy',
    defaultTheme: 'amethyst',
    hp: { current: 93, max: 93 },
    ac: 14,
    abilities: { STR: 12, DEX: 14, CON: 18, INT: 16, WIS: 13, CHA: 10 },
    attacks: [
      'Club • +5 to hit • 1d4 + 1 bludgeoning',
      'Dagger • +6 to hit • 1d4 + 1 piercing',
      'Steel Defender: Rend • +7 to hit • 1d8 + 5 force',
      'Unarmed Strike • +5 to hit • 2 bludgeoning'
    ]
  },
  player2: {
    name: 'Persidus Kaladin', fileLabel: 'Prisoner: Persidus Kaladin', className: 'Barbarian • Level 10',
    race: 'Goliath', level: 10, background: 'Haunted One', defaultTheme: 'oxblood',
    hp: { current: 95, max: 95 }, ac: 18,
    abilities: { STR: 19, DEX: 14, CON: 14, INT: 14, WIS: 6, CHA: 14 },
    attacks: [
      'Javelin • +8 to hit • 1d4 + 4 piercing',
      'Longsword • +8 to hit • 1d10 + 4 slashing',
      'Shortbow • +6 to hit • 1d6 + 2 piercing',
      'Spear • +8 to hit • 1d6 + 4 piercing'
    ]
  },
  player3: {
    name: 'Luce of the Hems', fileLabel: 'Prisoner: Luce of the Hems', className: 'Blood Hunter • Level 10',
    race: 'Yuan-Ti', level: 10, background: 'Haunted One', defaultTheme: 'emerald',
    hp: { current: 74, max: 74 }, ac: 14,
    abilities: { STR: 12, DEX: 14, CON: 13, INT: 16, WIS: 18, CHA: 11 },
    attacks: [
      'Pistol • +8 to hit • 1d10 + 2 piercing',
      'Chill Touch • +8 to hit • 2d8 necrotic',
      'Eldritch Blast • +8 to hit • 1d10 force',
      'Unarmed Strike • +5 to hit • 2 bludgeoning'
    ]
  },
  player4: {
    name: 'Ezra Sharpwood', fileLabel: 'Prisoner: Ezra Sharpwood', className: 'Sorcerer • Level 10',
    race: 'Dhampir', level: 10, background: 'Charlatan', defaultTheme: 'sapphire',
    hp: { current: 62, max: 62 }, ac: 14,
    abilities: { STR: 9, DEX: 18, CON: 15, INT: 13, WIS: 14, CHA: 19 },
    attacks: [
      'Fire Bolt • +8 to hit • 2d10 fire',
      'Shocking Grasp • +8 to hit • 2d8 lightning',
      'Sorcerous Burst • +8 to hit • 2d8 choice damage',
      'Vampiric Touch • +5 to hit • 3d6 necrotic'
    ]
  },
  player5: {
    name: 'Nellie Tenkettle', fileLabel: 'Prisoner: Nellie Tenkettle', className: 'Warlock • Level 10',
    race: 'Halfling', level: 10, background: 'Pact Seeker', defaultTheme: 'amethyst',
    hp: { current: 73, max: 73 }, ac: 14,
    abilities: { STR: 13, DEX: 16, CON: 14, INT: 13, WIS: 14, CHA: 20 },
    attacks: [
      'Dagger • +7 to hit • 1d4 + 3 piercing',
      'Guiding Bolt • +9 to hit • 8d6 radiant',
      'Unarmed Strike • +5 to hit • 2 bludgeoning',
      'Sacred Flame • saving throw • 2d8 radiant'
    ]
  },
  player6: {
    name: 'Ryn of Old Town', fileLabel: 'Prisoner: Ryn of Old Town', className: 'Gunslinger • Level 10',
    race: 'Human', level: 10, background: 'Merchant', defaultTheme: 'amber',
    hp: { current: 53, max: 53 }, ac: 14,
    abilities: { STR: 10, DEX: 16, CON: 10, INT: 13, WIS: 11, CHA: 16 },
    attacks: [
      'Dagger • +7 to hit • 1d4 + 3 piercing',
      'Revolver • +9 to hit • 2d6 + 3 piercing',
      'Unarmed Strike • +4 to hit • 1 bludgeoning',
      'Enhanced Unarmed Strike • +4 to hit • 1d4 bludgeoning'
    ]
  }
};


let currentPlayer = null;
const $ = id => document.getElementById(id);
const DEFAULT_THEME = 'oxblood';
const VALID_THEMES = new Set([
  'oxblood',
  'emerald',
  'sapphire',
  'amethyst',
  'amber',
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

  const openSelectedFile = event => {
    event?.preventDefault();
    event?.stopPropagation();

    const select = $('playerSelect');
    const value = select?.value || sessionStorage.getItem('bloodSmogPendingPlayer') || '';

    if (!value || !playerData[value]) {
      $('errorMessage').hidden = false;
      $('errorMessage').textContent = 'Select a prisoner file.';
      return false;
    }

    currentPlayer = value;
    sessionStorage.setItem('bloodSmogPlayer', value);
    sessionStorage.removeItem('bloodSmogPendingPlayer');
    showDashboard();
    return false;
  };

  $('loginForm')?.addEventListener('submit', openSelectedFile);
  $('openRecordBtn')?.addEventListener('click', openSelectedFile);
  $('playerSelect')?.addEventListener('change', event => {
    sessionStorage.setItem('bloodSmogPendingPlayer', event.target.value);
    $('errorMessage').hidden = true;
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

  const pending = sessionStorage.getItem('bloodSmogPendingPlayer');
  if (pending && playerData[pending]) select.value = pending;
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
