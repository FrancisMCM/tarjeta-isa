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
  const sound = new Audio(`sonidos/${soundName}.mp3`);
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

    // Mostrar la ficha del auto
    const ficha = car.querySelector(".ficha-auto");

    // Cerrar otras fichas abiertas
    document.querySelectorAll(".ficha-auto.visible").forEach(f => {
      if (f !== ficha) f.classList.remove("visible");
    });

    // Mostrar esta ficha
    if (!ficha.classList.contains("visible")) {
      ficha.classList.add("visible");
    }
  }

  // Escucha en escritorio y móvil
  car.addEventListener('click', toggleCarSound);
  car.addEventListener('touchstart', toggleCarSound);

  const btnCerrar = car.querySelector(".cerrar-ficha");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que vuelva a abrirse
      const ficha = car.querySelector(".ficha-auto");
      if (ficha) ficha.classList.remove("visible");
    });
  }
});
