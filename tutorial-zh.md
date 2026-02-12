# WebMCP：让 AI 代理与网页交互的全新方式（Chrome 新标准详解）

> 2026年2月10日，Google Chrome 团队发布了 WebMCP 的早期预览版。这是一个可能改变 AI 与网页交互方式的新标准。本文将带你深入了解 WebMCP 是什么、怎么用、以及它的未来潜力。

**🔗 Demo：https://best-seller.github.io/webmcp-demo/**

## 🤔 先说痛点：AI 代理的困境

你有没有想过，当你让 ChatGPT、Claude 或者 Gemini 帮你"在网上订个机票"时，它们是怎么做的？

**现状是这样的：**

1. AI 需要"看"网页截图或 HTML
2. 猜测每个按钮、输入框的作用
3. 尝试填写表单、点击按钮
4. 祈祷不会出错...

这就像让一个外国人只看图片来操作你的手机 App —— 能用，但效率低、容易出错。

**问题的根源：** 网页是为人类设计的，不是为 AI 设计的。

## 💡 WebMCP：给网页装上 AI 接口

**WebMCP** (Web Model Context Protocol) 的思路很简单：

> 与其让 AI 猜测如何操作网页，不如让网页直接告诉 AI："我能做什么、怎么调用我"。

**举个例子：**

**传统方式（AI 猜测）：**
```
AI: 看到一个日历控件... 应该是选日期的？
AI: 这个下拉框有很多城市... 可能是出发地？
AI: 点击这个蓝色按钮试试...
```

**WebMCP 方式（网页告知）：**
```javascript
// 网站注册一个工具
navigator.modelContext.registerTool({
  name: "book_flight",
  description: "预订机票",
  inputSchema: {
    origin: "出发城市",
    destination: "目的城市", 
    date: "出发日期"
  },
  execute: (params) => { /* 执行订票逻辑 */ }
});
```

AI 直接调用 `book_flight` 工具，传入结构化参数，完成！

## 🛠️ 两种实现方式

WebMCP 提供了两种 API：

### 1️⃣ Imperative API（编程式）

用 JavaScript 动态注册工具，适合复杂场景：

```javascript
navigator.modelContext.registerTool({
  name: "search_flights",
  description: "搜索航班信息",
  inputSchema: {
    type: "object",
    properties: {
      origin: { type: "string", description: "出发城市代码" },
      destination: { type: "string", description: "目的城市代码" },
      date: { type: "string", description: "出发日期 YYYY-MM-DD" }
    },
    required: ["origin", "destination", "date"]
  },
  execute: async ({ origin, destination, date }) => {
    const results = await searchFlightsAPI(origin, destination, date);
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
});
```

### 2️⃣ Declarative API（声明式）

用 HTML 属性标注表单，零 JavaScript：

```html
<form toolname="track_package" tooldescription="查询快递物流信息">
  <select name="carrier" required
          toolparamtitle="快递公司"
          toolparamdescription="选择快递公司">
    <option value="SF">顺丰速运</option>
    <option value="YTO">圆通速递</option>
  </select>
  
  <input type="text" name="tracking_number" required
         toolparamtitle="运单号">
  
  <button type="submit">查询</button>
</form>
```

浏览器会自动把这个表单转换为一个 WebMCP 工具！

## 🎮 动手试试

### 环境要求

1. **Chrome 146+**（Canary 或 Dev 版本）
2. 启用 Flag：`chrome://flags/#enable-webmcp-testing`
3. 安装 [Model Context Tool Inspector](https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd) 扩展

### 在线 Demo

- **我的 Demo**：https://best-seller.github.io/webmcp-demo/
- **官方 Demo**：https://googlechromelabs.github.io/webmcp-tools/demos/react-flightsearch/

## 🔮 未来展望

WebMCP 目前还是早期预览，但潜力很大：

- 🗣️ 用自然语言完成复杂操作
- 🔌 为网站添加 AI 能力的标准方式
- 🎯 AI 更准确地理解网页功能

## 📚 资源链接

- [官方文档](https://docs.google.com/document/d/1rtU1fRPS0bMqd9abMG_hc6K9OAI6soUy3Kh00toAgyk)
- [GitHub 仓库](https://github.com/webmachinelearning/webmcp)
- [讨论组](https://groups.google.com/a/chromium.org/g/chrome-ai-dev-preview-discuss/)

---

**你觉得 WebMCP 怎么样？欢迎在评论区讨论！**

---

*日期：2026年2月12日*
