const versionSelect = document.getElementById('versionSelect');
const javaPath = document.getElementById('javaPath');
const minMemory = document.getElementById('minMemory');
const maxMemory = document.getElementById('maxMemory');
const gameDir = document.getElementById('gameDir');
const jarPath = document.getElementById('jarPath');
const launchBtn = document.getElementById('launchBtn');
const closeBtn = document.getElementById('close');
const minimizeBtn = document.getElementById('minimize');

launchBtn.addEventListener('click', async () => {
  try {
    launchBtn.disabled = true;
    launchBtn.textContent = 'Launching...';

    const result = await window.launcher.launch({
      javaPath: javaPath.value,
      minMemory: minMemory.value,
      maxMemory: maxMemory.value,
      gameDir: gameDir.value,
      jarPath: jarPath.value,
      version: versionSelect.value,
      profileName: 'Default'
    });

    console.log('Launched:', result);
  } catch (error) {
    console.error(error);
    alert('Launch failed: ' + error.message);
  } finally {
    launchBtn.disabled = false;
    launchBtn.textContent = 'Launch';
  }
});

closeBtn.addEventListener('click', () => {
  window.close();
});

minimizeBtn.addEventListener('click', () => {
  window.blur();
});
