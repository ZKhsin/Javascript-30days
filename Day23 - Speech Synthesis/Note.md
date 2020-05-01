## **Day23 Note**

### `本日主要內容 --`

#### 1. 運用 SpeechSynthesisUtterance 設置應讀取的文字內容的細節與語音服務

#### 2. 設定播放語系選單及播放功能設定

---

### `解析 --`

```js
// 首先創建一個SpeechSynthesisUtterance物件,並宣告一個空陣列用於存放語音相關資訊, 接著選取出需要用到的元素,再將需要轉為語音的文字(輸入框內的內容)放入放入SpeechSynthesisUtterance物件中
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg.text = document.querySelector('[name="text"]').value;

// 取出所有語系資訊, 將所有語系放入下拉選單中, 接著使用filter篩選出包含en的語系, 再使用map把篩選完的陣列組成html元素, 並運用join合併並消除陣列的逗點
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes("en"))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang}</option>`
    )
    .join("");
}

// 設定選定對應的選擇語系
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

// 設定語音播放及暫停的切換
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// 設定語音速度及音調
function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

// 監聽語音清單變更後進行語系更新
speechSynthesis.addEventListener("voiceschanged", populateVoices);

// 監聽下拉選單中選擇的語系變動時進入setVoice
voicesDropdown.addEventListener("change", setVoice);

// 監聽速度及音調的控制條變動時進入setOption
options.forEach((option) => option.addEventListener("change", setOption));

// 監聽點擊播放按鈕事件並進入toggle
speakButton.addEventListener("click", toggle);
// 監聽點擊暫停按鈕時使用.bind()將toggle的參數startOver設置為false
stopButton.addEventListener("click", toggle.bind(null, false));
```

---

### **`補充 --`**

- SpeechSynthesisUtterance

  - 設置語音需求，包含語音的內容及辨識的方法
  - 可取得的內容包含語音語言(.lang)、語音音調(.pitch)、語音速度(.rate)、語音文字內容(.text)、語音聲音(.voice)、語音音量(.volume)
  - [MDN--SpeechSynthesisUtterance](https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechSynthesisUtterance)

- SpeechSynthesis

  - 控制語音服務，取得語音資訊並控制其狀態
  - [MDN--SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

- bind(thisArg, arg)
  - 建立一個新函式，當函式被呼叫時，將 this 設為給定的參數，而其餘參數作為新函數的參數供調用使用
  - [MDN--bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
