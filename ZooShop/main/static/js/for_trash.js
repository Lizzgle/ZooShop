const fontSizeCheckbox = document.getElementById('fontSizeCheckbox');
    const textColorCheckbox = document.getElementById('textColorCheckbox');
    const bgColorCheckbox = document.getElementById('bgColorCheckbox');

    fontSizeCheckbox.addEventListener('change', () => {
      const body = document.body;
      body.style.fontSize = fontSizeCheckbox.checked ? '20px' : '16px';
    });

    textColorCheckbox.addEventListener('change', () => {
      const body = document.body;
      body.style.color = textColorCheckbox.checked ? '#FF0000' : '#000000';
    });

    bgColorCheckbox.addEventListener('change', () => {
      const body = document.body;
      body.style.backgroundColor = bgColorCheckbox.checked ? '#FFFF00' : '#FFFFFF';
    });


    function calculateAge() {
      const dobInput = document.getElementById('dob');
      const dob = new Date(dobInput.value);
      const currentDate = new Date();

      age = currentDate.getFullYear() - dob.getFullYear();

      if (currentDate.getMonth() < dob.getMonth() ||
          (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
        age--;
      }

      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = dayOfWeek[dob.getDay()];

      if (age >= 18) {
        alert(`You are ${age} years old and your birthdate falls on a ${day}.`);
      } else {
        alert("You are a minor. Please get parental permission to access this website.");
      }
    }function calculateAge() {
      const dobInput = document.getElementById('dob');
      const dob = new Date(dobInput.value);
      const currentDate = new Date();

      const age = currentDate.getFullYear() - dob.getFullYear();

      if (currentDate.getMonth() < dob.getMonth() ||
          (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
        age--;
      }

      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = dayOfWeek[dob.getDay()];

      if (age >= 18) {
        alert(`You are ${age} years old and your birthdate falls on a ${day}.`);
      } else {
        alert("You are a minor. Please get parental permission to access this website.");
      }
    }


    function startCountdown() {
      const countdownElement = document.getElementById('countdown');
      const countdownStart = localStorage.getItem('countdownStart');

      let countdown;
      if (countdownStart) {
        const endTime = new Date(countdownStart);
        const currentTime = new Date();

        const timeRemaining = Math.max((endTime - currentTime) / 1000, 0);

        countdown = setInterval(updateCountdown, 1000);
        updateCountdown();
      } else {
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 1);
        localStorage.setItem('countdownStart', endTime.toString());

        countdown = setInterval(updateCountdown, 1000);
        updateCountdown();
      }

      function updateCountdown() {
        const endTime = new Date(localStorage.getItem('countdownStart'));
        const currentTime = new Date();

        const timeRemaining = Math.max((endTime - currentTime) / 1000, 0);

        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = Math.floor(timeRemaining % 60);

        countdownElement.innerHTML = `Time remaining: ${hours}h ${minutes}m ${seconds}s`;

        if (timeRemaining <= 0) {
          clearInterval(countdown);
          countdownElement.innerHTML = 'Countdown has ended.';
          localStorage.removeItem('countdownStart');
        }
      }
    }

    startCountdown();
const exportData = {};

  function addExportData() {
    const productName = document.getElementById('productName').value;
    const exportCountry = document.getElementById('exportCountry').value;
    const exportVolume = parseInt(document.getElementById('exportVolume').value);

    if (!exportData[productName]) {
      exportData[productName] = { countries: [exportCountry], totalVolume: exportVolume };
    } else {
      exportData[productName].countries.push(exportCountry);
      exportData[productName].totalVolume += exportVolume;
    }

    displayExportData();
  }




  function displayExportData() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    for (const product in exportData) {
      const countries = exportData[product].countries.join(', ');
      const totalVolume = exportData[product].totalVolume;

      const productInfo = document.createElement('p');
      productInfo.textContent = `Товар: ${product}, Страны экспорта: ${countries}, Общий объем: ${totalVolume} штук`;
      resultDiv.appendChild(productInfo);
    }
  }

  function findExportData(productName) {
  const foundProduct = Object.keys(exportData).find(product => product.toLowerCase() === productName.toLowerCase());
  return foundProduct ? exportData[foundProduct] : null;
}

function displayResult() {
  const productName = document.getElementById('productName').value;
  const exportResult = findExportData(productName);

  if (exportResult) {
    const countries = exportResult.countries.join(', ');
    const totalVolume = exportResult.totalVolume;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Товар: ${productName}, Страны экспорта: ${countries}, Общий объем: ${totalVolume} штук`;
  } else {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Товар "${productName}" не найден в базе данных экспорта`;
  }
}

document.getElementById('exportForm').addEventListener('submit', function(event) {
  event.preventDefault();
  displayResult();
});
