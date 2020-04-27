## **Day19 Note**

### `本日主要內容 --`

#### 1. 取得視訊影像並同步生成在畫布中

#### 2. 製作拍照功能

#### 3. 製作濾鏡功能

---

### `解析 --`

```js
// 先選取出會需要使用到的部分, 並將畫布設定為2D
const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  // 運用navigtor.mediaDevices來取得視訊設備的共享連結,並使用.getUserMedia來取得許可(參數為media類型,必須至少一個被指定),接著用.then來取出這個物件
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      // 原教程中使用的方法已在18年底被廢除, 爬文找資料後改用video.srcObject的方式直接賦值, 為了避免可能發生瀏覽器不適用的狀況,將兩種方式都寫入, 假如第一種方式發生錯誤時再切換第二種嘗試, 最後還是再寫一次捕捉如果兩種都不成功的錯誤訊息
      try {
        video.srcObject = localMediaStream;
      } catch (err) {
        video.src = window.URL.createObjectURL(localMediaStream);
      }
      video.play();
    })
    .catch((err) => {
      console.log(`Oh no!Have error!`, err);
    });
}

function paintToCanvas() {
  // 開始設置畫布, 首先讓畫布的寬高等同於視訊影像的寬高
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // 設置畫布每16ms更新一次
  return setInterval(() => {
    // 設置畫布內容與視訊影像相同
    ctx.drawImage(video, 0, 0, width, height);

    // 取出畫布內容, 並開始實現濾鏡效果
    let pixels = ctx.getImageData(0, 0, width, height);

    // 紅色濾鏡
    pixedls = redEffext(pixels);
    // 色相分裂
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.1;
    // 過濾顏色
    pixels = greenScreen(pixels);

    // 將實現功能效果放回畫布
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // 設置拍照功能
  // 首先設置每次點擊音效都重頭開始撥放, 這樣如短時間內拍多張照片才可實現多次聲效
  snap.currentTime = 0;
  snap.play();
  // 將圖片存在網頁上並選擇存儲類型為jpeg檔, 並建立一個新的連結元素放置預覽圖片並實現點選圖片後可以直接下載圖片的功能
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome Man">`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffext(pixels) {
  // 紅色濾鏡效果, 將紅色增加, 藍及綠色減少
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i] + 100; // r
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // g
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // b
  }
  return pixels;
}

function rgbSplit(pixels) {
  // 色相分裂, 將紅綠藍三者顏色分別移動到不同位置
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i]; // r
    pixels.data[i + 500] = pixels.data[i + 1]; // g
    pixels.data[i - 550] = pixels.data[i + 2]; // b
  }
  return pixels;
}

function greenScreen(pixels) {
  // 過濾顏色, 指顏色如落在指定區間就抽掉顏色(透明)
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo(); // 啟動視訊裝置

video.addEventListener("canplay", paintToCanvas); // 監聽當視訊裝置啟動時進入paintToCanvas
```

---

### **`補充 --`**

- navigator.mediaDevices

  - 提供連結攝影機和麥克風的功能
  - 運用.getUserMedia()來取得用戶使用許可，參數為 video 或 audio，並且會回傳一個 Promise，此時可運用.then 來使用回傳的 MediaStream
  - [MDN--navigator.mediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices)

- appendChild & insertBefore

  - appendChild: 新增一個子節點到節點內(最後面)
  - insertBefore: 在現有的子節點前插入一個新的子節點(最前面)

- HTMLCanvasElement.toDataURL(type, encoderOptions)
  - 回傳含有圖像和參數設置特定格式的 dataURLs，type 預設為 image/png，encoderOptions 表示圖像品質，可以為 0-1 間的數值
  - [MDN--toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
