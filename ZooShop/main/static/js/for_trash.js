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

      let age = currentDate.getFullYear() - dob.getFullYear();
      if (dob > currentDate) {
          alert('Error. Birthdate > Current date')
      }

      if (currentDate.getMonth() < dob.getMonth() ||
          (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
        age--;
      }

      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = dayOfWeek[dob.getDay()];

      if (age >= 18) {
        alert(`You are ${age} years old and your birthdate falls on a ${day}.`);
      } else {
        alert("Your age < 18");
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


const sizeForm = document.getElementById("tableSize");
let max;

sizeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //�������� ��� �������� �� �����
    const tableSize = +document.getElementById("inputSize").value || 1;
    max = +document.getElementById("inputMax").value || tableSize;

    generateTable(tableSize);
});

//����� �� �������� �������
function generateTable(size) {
    //�������� ��������� ��� ������� � ������� ���
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = null;

    //������� ������� � ������ �����
    const table = document.createElement("table");
    table.setAttribute("class", "js");

    //� ����� ������� ������ � ������
    for (let i = 0; i < size; i++) {
        const row = table.insertRow();
        row.setAttribute("class", "js");

        for (let j = 0; j < size; j++) {
            const cell = row.insertCell();
            const randomNum = Math.floor(Math.random() * 100);

            cell.textContent = randomNum;

            cell.setAttribute("class", "js");
            cell.addEventListener('click', () => {
                clickSell(cell, randomNum)
            });
        }
    }

    //��������� � ��������� ������
    tableContainer.appendChild(table);
};

document.querySelector('#transposeBtn').addEventListener('click', transposeTable);

function transposeTable() {
    const table = document.querySelector('table');
    if (!table) {
        alert("Table does not exists");
        return;
    }

    const rows = Array.from(table.rows);

    const transposedData = [];

    // ������� ����� ������ transposedData, ����� ������� ����������������� ������.
    for (let i = 0; i < rows[0].cells.length; i++) {
        transposedData.push([]);
    }

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].cells.length; j++) {
            transposedData[j][i] = rows[i].cells[j].textContent;
        }
    }

    // ������� ������� ����� �������� ����������������� ������.
    table.innerHTML = '';

    // ������� ����� ������� � ��������� ����������������� ������.
    for (let i = 0; i < transposedData.length; i++) {
        const row = table.insertRow();
        row.setAttribute("class", "js");

        for (let j = 0; j < transposedData[i].length; j++) {
            const cell = row.insertCell();
            cell.textContent = transposedData[i][j];
            cell.setAttribute("class", "js");

            cell.addEventListener('click', () => {
                clickSell(cell, transposedData[i][j])
            });
        }
    }
};

document.getElementById('addColumnBtn').addEventListener('click', function () {
    addColumn();
});

function addColumn() {
    const table = document.querySelector('table');
    if (!table) {
        alert("Table does not exists");
        return;
    }

    for (let i = 0; i < table.rows.length; i++) {
        const newCell = table.rows[i].insertCell();
        const randomNum = Math.floor(Math.random() * 100);

        newCell.textContent = randomNum;

        newCell.setAttribute("class", "js");
        newCell.addEventListener('click', () => {
            clickSell(newCell, randomNum)
        });
    }
}

document.getElementById('addRowBtn').addEventListener('click', function () {
    addRow();
});

function addRow() {
    const table = document.querySelector('table');
    if (!table) {
        alert("Table does not exists");
        return;
    }

    const newRow = table.insertRow();

    for (let i = 0; i < table.rows[0].cells.length; i++) {
        const newCell = newRow.insertCell();
        const randomNum = Math.floor(Math.random() * 100);

        newCell.textContent = randomNum;

        newCell.setAttribute("class", "js");
        newCell.addEventListener('click', () => {
            clickSell(newCell, randomNum)
        });
    }
}

function clickSell(cell, value) {
    if (cell.classList.contains('selected-even') || cell.classList.contains('selected-odd')) {
        cell.classList.remove('selected-even', 'selected-odd');
        cell.removeAttribute('clicked');
    }
    else if (checkSelectedCell(cell)) {
        if (value % 2 === 0) {
            cell.classList.add('selected-even');
        }
        else {
            cell.classList.add('selected-odd');
        }

        cell.setAttribute('clicked', 'true');
    }
};

function checkSelectedCell(cell) {
    const table = document.getElementsByTagName('table')[0];
    if (!table) {
        return false;
    }

    const rowId = cell.parentNode.rowIndex;
    const columnId = cell.cellIndex;

    const tableRow = table.rows[rowId];
    let count = 0;
    //�������� ������
    for (let cell of tableRow.cells) {
        if (cell.hasAttribute('clicked')) {
            count++;
        }

        if (count >= max) {
            return false;
        }
    }

    count = 0;
    //�������� �������
    for (let row of table.rows) {

        if (row.cells[columnId].hasAttribute('clicked')) {
            count++;
        }

        if (count >= max) {
            return false;
        }
    }

    //�������� �������
    if ((tableRow.cells[columnId - 1] && tableRow.cells[columnId - 1].hasAttribute('clicked')) //left
        || (tableRow.cells[columnId + 1] && tableRow.cells[columnId + 1].hasAttribute('clicked')) //right
        || (table.rows[rowId - 1] && table.rows[rowId - 1].cells[columnId] && table.rows[rowId - 1].cells[columnId].hasAttribute('clicked')) // Up
        || (table.rows[rowId + 1] && table.rows[rowId + 1].cells[columnId] && table.rows[rowId + 1].cells[columnId].hasAttribute('clicked'))) //down
    {
        return false;
    }

    return true;
}


/*
10. In accordance with your subject area, create a base class and a successor class
with five functions (including getters and setters), to provide a demonstration of their
capabilities. Create a decorator for one of the functions and demonstrate its use. Implement
two options: 1) prototypical inheritance in the functional style and 2) the "class"/"extends"
construction
*/

const generateTableButton = document.getElementById("generateTable");
const transposeTableButton = document.getElementById("transposeTable");
const addRowButton = document.getElementById("addRow");
const addColumnButton = document.getElementById("addColumn");

if (generateTableButton) {
    generateTableButton.addEventListener("click", function () {
        const size = document.getElementById("tableSize").value;
        if (size <= 0 || size > 30) {
            return;
        }

        const table = document.getElementById("table");
        table.innerHTML = "";

        for (let i = 0; i < size; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                createCell(row);
            }
            table.appendChild(row);
        }
   });
}
if (transposeTableButton) {
    transposeTableButton.addEventListener("click", function () {
        const table = document.getElementById("table");
        if (table.innerHTML === "") {
            return;
        }

        const clonedTable = table.cloneNode(true);
        table.innerHTML = "";

        var rows = clonedTable.getElementsByTagName("tr");
        const rowsCount = rows[0].childElementCount;
        const columnsCount = rows.length;

        for (let i = 0; i < rowsCount; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < columnsCount; j++) {
                var columns = rows[j].getElementsByTagName("td");
                var cell = columns[i].cloneNode(true);
                cell.addEventListener("click", cellSelection);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    });
}
if (addRowButton) {
    addRowButton.addEventListener("click", function () {
        const table = document.getElementById("table");

        var size = 0;
        if (table.innerHTML === "") {
             size = parseInt(tableSize.value);
        } else {
             size = table.getElementsByTagName("tr")[0].childElementCount;
        }

        const row = document.createElement("tr");
        for (let i = 0; i < size; i++) {
            const cell = document.createElement("td");
            cell.textContent = Math.floor(Math.random() * 100);
            cell.addEventListener("click", cellSelection);
            row.appendChild(cell);
        }
        table.appendChild(row);
    });
}
if (addColumnButton) {
    addColumnButton.addEventListener("click", function () {
        if (table.innerHTML === "") {
            const row = document.createElement("tr");
            createCell(row);
            table.appendChild(row);
            return;
        }

        var rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            createCell(rows[i]);
        }
    });
}

function createCell(row) {
    const cell = document.createElement("td");
    cell.textContent = Math.floor(Math.random() * 100);
    cell.addEventListener("click", cellSelection);
    row.appendChild(cell);
}
function cellSelection(e) {
    var maxSelection = document.getElementById("maxSelection").value;
    if (maxSelection > 30) {
        maxSelection = 30;
    } else if (maxSelection < 0) {
        maxSelection = 0;
    }

    const cell = e.target;
    const row = cell.parentElement;
    const rowCells = Array.from(row.cells);
    const cellIndex = rowCells.indexOf(cell);

    const selectedInRow = rowCells.filter(c => c.classList.contains("selected"));
    const columnCells = Array.from(cell.parentElement.parentElement.rows);
    const selectedInColumn = columnCells
        .map(r => r.cells[cellIndex])
        .filter(c => c.classList.contains("selected"));

    if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
    } else if (
        selectedInRow.length < maxSelection &&
        selectedInColumn.length < maxSelection &&
        !hasNeighborSelected(rowCells, cellIndex)
    ) {
        cell.classList.add("selected");
    }
}
function hasNeighborSelected(cells, i) {
    if (i > 0 && cells[i - 1].classList.contains("selected")) {
        return true;
    }
    if (i < cells.length - 1 && cells[i + 1].classList.contains("selected")) {
        return true;
    }
    return false;
}

