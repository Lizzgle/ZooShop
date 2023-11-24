let bannerIndex = 0;
let bannerInterval = null;
const banners = document.querySelectorAll('.banner');
let intervalInput = 5;
 intervalInput = document.getElementById('interval');

 const main = document.getElementById("main");

function showBanner(index) {
  banners.forEach((banner, idx) => {
    if (idx === index) {
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  });
}

function startRotation(intervalSeconds) {
    bannerInterval = setInterval(() => {
        bannerIndex = (bannerIndex + 1) % banners.length;
        showBanner(bannerIndex);
    }, intervalSeconds);
}


function stopRotation() {
  clearInterval(bannerInterval);
}

function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') {
    stopRotation();
  } else {
    startRotation(5 * 1000);
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

// Начинаем ротацию с первого баннера
showBanner(0);
startRotation(5 * 1000);

// Если пользователь суперпользователь, создаем обработчик формы
if (intervalInput && '{{ user.is_superuser }}' === 'True') {
  intervalInput.addEventListener('change', function () {
    stopRotation();
    startRotation(parseInt(this.value, 10) * 1000);
  });
}