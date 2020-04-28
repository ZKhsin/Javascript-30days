## **Day20 Note**

### `本日主要內容 --`

#### 1. 取得 speechRecognition 許可

#### 2. 建立語音輸出區域

#### 3. 監聽語音識別並回傳輸出頁面

---

### `解析 --`

```js
// 依據不同瀏覽器(加webkit)向用戶請求麥克風許可
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// 建立一變數存放語音辨別
const recognition = new SpeechRecognition();
// 語音辨識是否即時顯示, 預設為false(等一段話說完才會顯示)
recognition.interimResults = true;

// 建立一個p元素在設定好的輸出文字的區域裡
let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

// 監聽語音辨識返回的結果
recognition.addEventListener("result", (e) => {
  // 將語音辨識的結果轉為陣列,先運用map取出SpeechRecognitionAlternative,接著再次運用map取出SpeechRecognitionAlternative內存放字串的transcript, 最後再用join將語音合併成字串
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  // 將合併的字串放入設定好的p元素內, 並設定當回傳內容結束時再建立一個新的p元素準備放下一段內容
  p.textContent = transcript;
  // 確認SpeechRecognitionAlternative的isFinal狀態, 如果是true則表示語音辨識結束
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }

  // 如果語音內容有包含某個指定句則console出指定字串
  if (transcript.includes("get the weather")) {
    console.log("Getting the weater");
  }

  console.log(transcript);
});

// 監聽一段語音辨識結束時,再次觸發啟動新的語音辨識
recognition.addEventListener("end", recognition.start);

// 開始語音辨識
recognition.start();
```

---

### **`補充 --`**

- SpeechRecognition & SpeechSynthesis
  - SpeechRecognition: 提供語音辨識
  - SpeechSynthesis:　提供語音合成(文字轉語音)
  - [MDN--SpeechAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
