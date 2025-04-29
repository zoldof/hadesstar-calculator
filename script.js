const keys = ["ship", "weapon", "shield", "support1", "support2", "support3", "support4", "support5"];

const selectedLevels = Object.fromEntries(
  keys.map(key => [key, 2])
);

const levelButtonConfigs = keys.map(key => ({
  id: `${key}LevelButtons`,
  max: key === "ship" ? 6 : 12,
  setter: level => selectedLevels[key] = level
}));

levelButtonConfigs.forEach(config => {
  createLevelButtons(config.id, config.max, config.setter);
});

toggleSupportVisibility(selectedLevels["ship"]);

function createLevelButtons(containerId, maxLevel, onSelect) {
    const container = document.getElementById(containerId);
    for (let i = 1; i <= maxLevel; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.onclick = () => {
        [...container.children].forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        onSelect(i);
        if (containerId === "shipLevelButtons") {
          toggleSupportVisibility(i);
        }
        calculate();  // ←選んだら即計算
      };
      container.appendChild(btn);
      if (containerId === "shipLevelButtons" && i === 1) {
        btn.disabled = true; // 1だけ押せない
      }
      if (i === 2) {
        btn.classList.add("selected");
      }
    }
}

function toggleSupportVisibility(shipLevel) {
  const maxSupports = Math.max(0, shipLevel - 1); // 2→1, 3→2, ..., 6→5
  for (let i = 1; i <= 5; i++) {
    const supportContainer = document.getElementById(`support${i}LevelButtons`);
    if (supportContainer) {
      supportContainer.style.display = i <= maxSupports ? "" : "none";
    }
  }
}

// 計算ロジック
function calculate() {
  const { ship, weapon, shield, support1, support2, support3, support4, support5 } = selectedLevels;

  const weaponType = document.getElementById('weaponType').value;
  const supportType = document.getElementById('supportType').value;

  const shipValues = [4.2, 5, 6, 7.5, 9, 9.5];
  const normalWeaponValues = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20];
  const dartLauncherWeaponValues = [6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20];
  const shieldValues = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18];
  const leapSupportValues = [3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 11, 12];
  const normalSupportValues = [2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10];

  const shipValue = shipValues[ship - 1];
  const weaponValue = (weaponType === 'dartLauncher' ? dartLauncherWeaponValues : normalWeaponValues)[weapon - 1];
  const shieldValue = shieldValues[shield - 1];
  const supportValue1 = (supportType === 'leap' ? leapSupportValues : normalSupportValues)[support1 - 1];
  const supportValue2 = normalSupportValues[support2 - 1];
  const supportValue3 = normalSupportValues[support3 - 1];
  const supportValue4 = normalSupportValues[support4 - 1];
  const supportValue5 = normalSupportValues[support5 - 1];

  let total = shipValue + weaponValue + shieldValue;
  const supportValues = [supportValue1, supportValue2, supportValue3, supportValue4, supportValue5];
  for (let i = 0; i < ship - 1; i++) {
    total += supportValues[i];
  }
  document.getElementById('result').innerText = total;
}


