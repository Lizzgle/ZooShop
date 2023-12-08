const packLeft = document.querySelector('#pack_left');
const packRight = document.querySelector('#pack_right');
const apples = document.querySelectorAll('.apple');

const applePositions = [];

// Генерируем координаты для каждой точки и сохраняем их в массиве
apples.forEach((item, index) => {
  const randomPosition = generateRandomPosition();
  const randomRotation = generateRandomRotation();

  applePositions.push(randomPosition);
  item.style.transform = `rotate(${randomRotation}deg)`;
});

window.addEventListener('scroll',()=>{

    let value = scrollY;
    packLeft.style.left = `${-value/2.1 + 561}px`
    packRight.style.left = `${value/2.2 + 735}px`

    apples.forEach((item, index) => {
    const position = applePositions[index];
    item.style.left = `${position.x}px`;
    item.style.top = `${position.y}px`;

    const itemLeft = position.x;

    const packLeftRight = parseInt(packLeft.style.left) + 146;
    const packRightLeft = parseInt(packRight.style.left) - 20;

        if (itemLeft > packLeftRight && itemLeft < packRightLeft) {
            item.style.opacity = '1';
        } else {
      item.style.opacity = '0';
    }
    })
})

function generateRandomPosition() {
  const maxX = 860; // Максимальное значение по горизонтали
  const maxY = 600; // Максимальное значение по вертикали

    const minX = 560;
    const minY = 200;

  const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
  const randomY = Math.floor(Math.random() * (maxY - minY) + minY);

  return { x: randomX, y: randomY };
}

function generateRandomRotation() {
  // Генерация случайного угла от 0 до 360 градусов
  return Math.floor(Math.random() * 360);
}



const cards = document.querySelectorAll(".card1");

cards.forEach((card) => {
  // card.style.backgroundImage = "url('//picsum.photos/id/643/720/720')";
  const height = card.clientHeight;
  const width = card.clientWidth;
      if (!document.hasFocus()) {
        return;
    }


  card.addEventListener("mousemove", handleMove);
  card.addEventListener("mouseout", handleMouseOut);
  card.addEventListener("mousedown", handleMouseDown);
  card.addEventListener("mouseup", handleMouseUp);

  function handleMove(e) {
    const xVal = e.layerX;
    const yVal = e.layerY;
    const yRotation = 24 * ((xVal - width / 2) / width);
    const xRotation = -24 * ((yVal - height / 2) / height);
    const string =
      "perspective(500px) scale(1.1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";
    card.style.transform = string;
  }

  function handleMouseOut() {
    card.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  }

  function handleMouseDown() {
    card.style.transform = "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  }

  function handleMouseUp() {
    card.style.transform = "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  }
});

const enterButton = document.getElementById("enterButton");
if (enterButton) {
    enterButton.addEventListener("click", function (e) {
        e.preventDefault();

        const kostyl = document.getElementById("kostyl");

        // const priceInput = document.getElementById("priceInput");
        const discountInput = document.getElementById("discountInput");
        const result = document.getElementById("result");

        // const price = priceInput.value;
        const discount = discountInput.value;
        var k = parseInt(kostyl.innerText);
        //k += parseInt(discount);

        if (k <= 0 || discount < 0 || discount > 100) {
            result.innerText = "Invalid Data!"
        } else {
            var general = k - k * (discount / 100);
            result.innerText = `New price = ${general}`;
        }
    });
}
