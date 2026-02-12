const MENU = [
  { id: 1, name: "红烧牛肉面", price: 28, category: "main", emoji: "🍜", description: "浓郁牛肉汤底" },
  { id: 2, name: "宫保鸡丁饭", price: 25, category: "main", emoji: "🍚", description: "经典川菜" },
  { id: 3, name: "番茄鸡蛋面", price: 18, category: "main", emoji: "🍝", description: "家常风味" },
  { id: 4, name: "麻辣香锅", price: 45, category: "main", emoji: "🥘", description: "麻辣鲜香" },
  { id: 5, name: "珍珠奶茶", price: 12, category: "drink", emoji: "🧋", description: "Q弹珍珠" },
  { id: 6, name: "柠檬茶", price: 10, category: "drink", emoji: "🍋", description: "清爽解腻" },
  { id: 7, name: "可乐", price: 5, category: "drink", emoji: "🥤", description: "冰镇可乐" },
  { id: 8, name: "豆浆", price: 6, category: "drink", emoji: "🥛", description: "现磨豆浆" },
];
let cart = [];

function getMenuItems(category = "all") {
  return category === "all" ? MENU : MENU.filter(item => item.category === category);
}

function addToCart(itemId, quantity = 1) {
  const item = MENU.find(m => m.id === itemId);
  if (!item) return { success: false, error: "找不到菜品" };
  const idx = cart.findIndex(c => c.id === itemId);
  if (idx >= 0) cart[idx].quantity += quantity;
  else cart.push({ ...item, quantity });
  renderCart();
  return { success: true, message: `已添加 ${quantity} 份 ${item.name}` };
}

function removeFromCart(itemId) {
  const idx = cart.findIndex(c => c.id === itemId);
  if (idx < 0) return { success: false, error: "购物车中没有这个菜品" };
  const item = cart[idx];
  cart.splice(idx, 1);
  renderCart();
  return { success: true, message: `已移除 ${item.name}` };
}

function getCart() {
  return { items: cart, total: cart.reduce((s, i) => s + i.price * i.quantity, 0) };
}

function placeOrder(customerName, phoneNumber, address, notes = "") {
  if (cart.length === 0) return { success: false, error: "购物车为空" };
  const order = { id: `ORD-${Date.now()}`, customer: customerName, phone: phoneNumber, address, notes, items: [...cart], total: cart.reduce((s, i) => s + i.price * i.quantity, 0), status: "confirmed" };
  cart = [];
  renderCart();
  return { success: true, message: "下单成功！", order };
}

function checkout() {
  const name = prompt("请输入您的姓名:");
  if (!name) return;
  const phone = prompt("请输入您的电话:");
  if (!phone) return;
  const address = prompt("请输入送餐地址:");
  if (!address) return;
  const result = placeOrder(name, phone, address);
  alert(result.success ? `✅ ${result.message}\n订单号: ${result.order.id}` : `❌ ${result.error}`);
  log(`📦 下单: ${JSON.stringify(result, null, 2)}`);
}

function log(msg) {
  const c = document.getElementById('log-container');
  c.textContent = `[${new Date().toLocaleTimeString()}] ${msg}\n\n` + c.textContent;
}

function renderMenu() {
  document.getElementById('menu-container').innerHTML = MENU.map(i => `
    <div class="menu-item" onclick="handleAddToCart(${i.id})">
      <span class="menu-item-icon">${i.emoji}</span>
      <div><div class="menu-item-name">${i.name}</div><div style="font-size:0.85rem;color:var(--text-secondary)">${i.description}</div><div class="menu-item-price">¥${i.price}</div></div>
      <button class="btn btn-primary" style="padding:0.5rem 1rem">+</button>
    </div>
  `).join('');
}

function renderCart() {
  const c = document.getElementById('cart-container'), t = document.getElementById('cart-total'), p = document.getElementById('total-price'), b = document.getElementById('checkout-btn');
  if (cart.length === 0) { c.innerHTML = '<p style="color:var(--text-secondary)">还没有添加任何菜品</p>'; t.style.display = 'none'; b.style.display = 'none'; return; }
  c.innerHTML = cart.map(i => `<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border)"><span>${i.emoji} ${i.name} × ${i.quantity}</span><span style="color:var(--accent)">¥${i.price * i.quantity} <button onclick="handleRemoveFromCart(${i.id})" style="background:none;border:none;cursor:pointer">✕</button></span></div>`).join('');
  p.textContent = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  t.style.display = 'block';
  b.style.display = 'inline-flex';
}

function handleAddToCart(id) { log(`🛒 ${addToCart(id, 1).message}`); }
function handleRemoveFromCart(id) { log(`🗑️ ${removeFromCart(id).message}`); }

function renderTools() {
  document.getElementById('tools-list').innerHTML = [
    { name: "get_menu", desc: "获取菜单" },
    { name: "add_to_cart", desc: "添加到购物车" },
    { name: "remove_from_cart", desc: "从购物车移除" },
    { name: "get_cart", desc: "获取购物车" },
    { name: "place_order", desc: "提交订单" },
  ].map(t => `<div style="display:flex;align-items:center;gap:1rem;padding:0.75rem;background:var(--bg);border-radius:8px;margin-bottom:0.5rem"><code style="background:var(--primary);color:#fff;padding:0.25rem 0.5rem;border-radius:4px">${t.name}</code><span>${t.desc}</span></div>`).join('');
}

function registerWebMCPTools() {
  if (!navigator.modelContext) { log("⚠️ WebMCP 不可用。请用 Chrome 146+ 并启用 chrome://flags/#enable-webmcp-testing"); return; }
  log("✅ WebMCP 可用，正在注册工具...");
  
  navigator.modelContext.registerTool({ name: "get_menu", description: "获取餐厅菜单", inputSchema: { type: "object", properties: { category: { type: "string", enum: ["main", "drink", "all"] } } }, execute: ({ category = "all" }) => { log(`🔧 get_menu(${category})`); return { content: [{ type: "text", text: JSON.stringify(getMenuItems(category)) }] }; } });
  navigator.modelContext.registerTool({ name: "add_to_cart", description: "添加菜品到购物车", inputSchema: { type: "object", properties: { itemId: { type: "number" }, quantity: { type: "number" } }, required: ["itemId"] }, execute: ({ itemId, quantity = 1 }) => { log(`🔧 add_to_cart(${itemId}, ${quantity})`); return { content: [{ type: "text", text: JSON.stringify(addToCart(itemId, quantity)) }] }; } });
  navigator.modelContext.registerTool({ name: "remove_from_cart", description: "从购物车移除菜品", inputSchema: { type: "object", properties: { itemId: { type: "number" } }, required: ["itemId"] }, execute: ({ itemId }) => { log(`🔧 remove_from_cart(${itemId})`); return { content: [{ type: "text", text: JSON.stringify(removeFromCart(itemId)) }] }; } });
  navigator.modelContext.registerTool({ name: "get_cart", description: "获取购物车内容", inputSchema: { type: "object", properties: {} }, execute: () => { log(`🔧 get_cart()`); return { content: [{ type: "text", text: JSON.stringify(getCart()) }] }; } });
  navigator.modelContext.registerTool({ name: "place_order", description: "提交订单", inputSchema: { type: "object", properties: { customerName: { type: "string" }, phoneNumber: { type: "string" }, address: { type: "string" }, notes: { type: "string" } }, required: ["customerName", "phoneNumber", "address"] }, execute: ({ customerName, phoneNumber, address, notes = "" }) => { log(`🔧 place_order(${customerName})`); return { content: [{ type: "text", text: JSON.stringify(placeOrder(customerName, phoneNumber, address, notes)) }] }; } });
  
  log("✅ 5 个工具注册完成！");
  document.getElementById('tool-indicator').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => { renderMenu(); renderCart(); renderTools(); registerWebMCPTools(); });
