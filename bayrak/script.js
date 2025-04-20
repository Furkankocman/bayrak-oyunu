const countries = [
  { name: "Türkiye", flag: "https://flagcdn.com/w320/tr.png" },
  { name: "Almanya", flag: "https://flagcdn.com/w320/de.png" },
  { name: "Fransa", flag: "https://flagcdn.com/w320/fr.png" },
  { name: "İtalya", flag: "https://flagcdn.com/w320/it.png" },
  { name: "İngiltere", flag: "https://flagcdn.com/w320/gb.png" },
  { name: "Japonya", flag: "https://flagcdn.com/w320/jp.png" },
  { name: "Brezilya", flag: "https://flagcdn.com/w320/br.png" },
  { name: "Amerika", flag: "https://flagcdn.com/w320/us.png" },
  { name: "Rusya", flag: "https://flagcdn.com/w320/ru.png" },
  { name: "Çin", flag: "https://flagcdn.com/w320/cn.png" }
];

let current = 0;
let correct = 0;
let wrong = 0;
let timer;
let timeLeft = 5;

function loadQuestion() {
  if (current >= countries.length) return endGame();

  const flag = document.getElementById("flag");
  const options = document.getElementById("options");
  const country = countries[current];
  const choices = shuffle([
    country.name,
    ...getRandomNames(3, country.name)
  ]);

  flag.src = country.flag;
  options.innerHTML = "";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    options.appendChild(btn);
  });

  resetTimer();
}

function checkAnswer(answer) {
  clearInterval(timer);
  if (answer === countries[current].name) {
    correct++;
    document.getElementById("result").textContent = "✅ Doğru!";
  } else {
    wrong++;
    document.getElementById("result").textContent = "❌ Yanlış!";
  }
  updateScore();
  current++;
  setTimeout(loadQuestion, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 5;
  document.getElementById("time").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      document.getElementById("result").textContent = "⏱️ Süre doldu! Elendin!";
      setTimeout(() => {
        wrong++;
        updateScore();
        current++;
        loadQuestion();
      }, 1500);
    }
  }, 1000);
}

function updateScore() {
  document.getElementById("correct").textContent = correct;
  document.getElementById("wrong").textContent = wrong;
}

function endGame() {
  document.getElementById("options").innerHTML = "";
  document.getElementById("flag").style.display = "none";
  let resultText = "";

  if (correct > wrong) resultText = "🎉 Kazandın!";
  else if (wrong > correct) resultText = "😢 Kaybettin!";
  else resultText = "🤝 Berabere!";

  document.getElementById("result").textContent = `Oyun Bitti! ${resultText}`;
}

function getRandomNames(count, exclude) {
  const names = countries.map(c => c.name).filter(n => n !== exclude);
  const selected = [];
  while (selected.length < count) {
    const rand = names[Math.floor(Math.random() * names.length)];
    if (!selected.includes(rand)) selected.push(rand);
  }
  return selected;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Başlat
loadQuestion();
