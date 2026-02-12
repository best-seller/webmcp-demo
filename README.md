# 🤖 WebMCP Demo

> AI 代理与网页交互的未来 — Google Chrome 新标准示例

**[在线预览](https://best-seller.github.io/webmcp-demo/)** | **[官方文档](https://docs.google.com/document/d/1rtU1fRPS0bMqd9abMG_hc6K9OAI6soUy3Kh00toAgyk)**

## 📖 什么是 WebMCP？

**WebMCP** (Web Model Context Protocol) 是 Google Chrome 提出的新 Web 标准，让网站可以向 AI 代理（如 Gemini）暴露结构化的工具和 API，取代传统的"屏幕抓取"方式。

## 🎮 Demo 内容

| Demo | 说明 | API 类型 |
|------|------|----------|
| [🍜 智能点餐](./imperative/) | 餐厅点餐系统，AI 可以帮你点餐下单 | Imperative |
| [📦 快递查询](./declarative/) | 快递物流查询和预约取件 | Declarative |

## 🚀 快速开始

### 环境要求

1. **Chrome 146+** (Canary 或 Dev 版本)
2. 启用 Flag: `chrome://flags/#enable-webmcp-testing`
3. 安装 [Model Context Tool Inspector](https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd) 扩展

### 本地运行

```bash
git clone https://github.com/best-seller/webmcp-demo.git
cd webmcp-demo
npx serve .
# 或
python -m http.server 8080
```

## 🔍 两种 API

### Imperative API（编程式）

```javascript
navigator.modelContext.registerTool({
  name: "search_flights",
  description: "搜索航班",
  inputSchema: { ... },
  execute: (params) => { ... }
});
```

### Declarative API（声明式）

```html
<form toolname="track_package" tooldescription="查询快递">
  <input name="tracking_number" toolparamtitle="运单号">
  <button type="submit">查询</button>
</form>
```

## 📚 学习资源

- [官方文档 (Google Docs)](https://docs.google.com/document/d/1rtU1fRPS0bMqd9abMG_hc6K9OAI6soUy3Kh00toAgyk)
- [GitHub 仓库](https://github.com/webmachinelearning/webmcp)
- [Chrome Labs Demo](https://googlechromelabs.github.io/webmcp-tools/demos/react-flightsearch/)
- [讨论组](https://groups.google.com/a/chromium.org/g/chrome-ai-dev-preview-discuss/)

## 📜 License

MIT
