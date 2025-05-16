const music = document.getElementById("bg-music");
let currentSound = null;

// Detiene el sonido actual si hay uno en reproducción
function stopCurrentSound() {
  if (currentSound && !currentSound.paused) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }
}

document.querySelectorAll('.car').forEach(car => {
  const soundName = car.dataset.sound;

  function toggleCarSound() {
    if (currentSound && !currentSound.paused) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }
    const sound = new Audio(`sonidos/${soundName}`);
    const newSound = new Audio(`sonidos/${soundName}.mp3`);
    newSound.play();
    currentSound = newSound;
    music.pause();
  }

  car.addEventListener('click', toggleCarSound);
  car.addEventListener('touchstart', toggleCarSound);


  // Guardar el sonido como parte del elemento (opcional)
  car.dataset.soundInstance = sound;

  function toggleCarSound() {
    // Si este mismo sonido ya está sonando
    if (sound === currentSound && !sound.paused) {
      sound.pause();
      sound.currentTime = 0;
      currentSound = null;
      music.play();
    } else {
      // Detener el anterior si existe
      stopCurrentSound();
      music.pause();
      sound.currentTime = 0;
      sound.play();
      currentSound = sound;
    }
  }

  // Escucha en escritorio y móvil
  car.addEventListener('click', toggleCarSound);
  car.addEventListener('touchstart', toggleCarSound);
});

document.querySelectorAll(".car").forEach(auto => {
  const ficha = auto.querySelector(".ficha-auto");
  const btnCerrar = auto.querySelector(".cerrar-ficha");

  auto.addEventListener("click", () => {
    // Cerrar cualquier otra ficha abierta
    document.querySelectorAll(".ficha-auto.visible").forEach(f => {
      f.classList.remove("visible");
    });
    // Mostrar esta ficha si no está visible
    if (!ficha.classList.contains("visible")) {
      ficha.classList.add("visible");
    }
  });

  btnCerrar.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que vuelva a abrirse
    ficha.classList.remove("visible");
  });
});
