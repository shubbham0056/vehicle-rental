const BASE_URL = ""; // Vite proxy in dev, direct URL in prod handled by Vercel rewrites

// ===== MOCK DATA (fallback / local IDs for booking page) =====
const vehicles = [
  { id: 1,  name: "Toyota Camry",            type: "Sedan",  seats: 5,  fuel: "Petrol",   transmission: "Auto",   price: 3500, status: "available", rating: 4.8, image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80" },
  { id: 2,  name: "Ford Explorer",           type: "SUV",    seats: 7,  fuel: "Diesel",   transmission: "Auto",   price: 5500, status: "available", rating: 4.6, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80" },
  { id: 3,  name: "Honda CBR 500",           type: "Bike",   seats: 2,  fuel: "Petrol",   transmission: "Manual", price: 1800, status: "available", rating: 4.7, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { id: 4,  name: "Mercedes Sprinter",       type: "Van",    seats: 12, fuel: "Diesel",   transmission: "Manual", price: 7500, status: "booked",    rating: 4.5, image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=600&q=80" },
  { id: 5,  name: "BMW 3 Series",            type: "Sedan",  seats: 5,  fuel: "Petrol",   transmission: "Auto",   price: 6500, status: "available", rating: 4.9, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80" },
  { id: 6,  name: "Jeep Wrangler",           type: "SUV",    seats: 5,  fuel: "Petrol",   transmission: "Manual", price: 6800, status: "available", rating: 4.7, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80" },
  { id: 7,  name: "Yamaha MT-07",            type: "Bike",   seats: 2,  fuel: "Petrol",   transmission: "Manual", price: 2200, status: "available", rating: 4.6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80" },
  { id: 8,  name: "Hyundai Tucson",          type: "SUV",    seats: 5,  fuel: "Diesel",   transmission: "Auto",   price: 4800, status: "booked",    rating: 4.4, image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600&q=80" },
  { id: 9,  name: "Royal Enfield Classic 350", type: "Bike", seats: 2,  fuel: "Petrol",   transmission: "Manual", price: 1500, status: "available", rating: 4.8, image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80" },
  { id: 10, name: "KTM Duke 390",            type: "Bike",   seats: 2,  fuel: "Petrol",   transmission: "Manual", price: 2000, status: "available", rating: 4.7, image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&q=80" },
  { id: 11, name: "Bajaj Pulsar 220F",       type: "Bike",   seats: 2,  fuel: "Petrol",   transmission: "Manual", price: 1200, status: "available", rating: 4.5, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80" },
  { id: 12, name: "Hero Splendor Plus",      type: "Bike",   seats: 2,  fuel: "Petrol",   transmission: "Manual", price: 700,  status: "available", rating: 4.4, image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80" },
  { id: 13, name: "Hero Pleasure+",          type: "Scooty", seats: 2,  fuel: "Petrol",   transmission: "Auto",   price: 600,  status: "available", rating: 4.3, image: "https://media1.thrillophilia.com/filestore/oqa1j7v9ikia3l3vupkfi9913pf1_sc1.webp?w=576&h=650" },
  { id: 14, name: "Suzuki Access 125",       type: "Scooty", seats: 2,  fuel: "Petrol",   transmission: "Auto",   price: 680,  status: "available", rating: 4.4, image: "https://imgd.aeplcdn.com/272x153/n/cw/ec/188491/access-125-right-side-view-20.png?isig=0&q=80" },
  { id: 15, name: "TVS iQube Electric",      type: "Scooty", seats: 2,  fuel: "Electric", transmission: "Auto",   price: 750,  status: "available", rating: 4.6, image: "https://www.tvsmotor.com/electric-scooters/tvs-iqube/-/media/Vehicles/Feature/Iqube/Variant/TVS-iQube-3-0-KW/Color-Images/Copper-Brown/3-kw-copper-brown-01.webp" },
  { id: 16, name: "Electric Scooter",        type: "Scooty", seats: 2,  fuel: "Electric", transmission: "Auto",   price: 500,  status: "available", rating: 4.2, image: "https://www.joyebike.com/wp-content/uploads/2024/10/Essential-Safety-Features-to-Look-for-in-an-Electric-Scooter.jpg" },
];

// ===== UTILS =====
function getVehicle(id) { return vehicles.find(v => v.id === id); }

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  t.className = `toast ${type}`;
  t.innerHTML = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// ===== AUTH STATE =====
function getToken()        { return localStorage.getItem("token"); }
function getRefreshToken() { return localStorage.getItem("refreshToken"); }
function getUser()         { try { return JSON.parse(localStorage.getItem("user")); } catch { return null; } }
function isLoggedIn()      { return !!getToken(); }

// ===== SOCKET NOTIFICATIONS =====
let _socket = null;
let _notifications = [];
let _unread = 0;

function initSocket() {
  const token = getToken();
  if (!token || _socket) return;

  const script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";
  script.onload = () => {
    _socket = io("https://rentwheels-api.onrender.com");

    // Get userId from JWT payload
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      _socket.emit("join", payload.id);
    } catch {}

    _socket.on("bookingUpdate", (data) => {
      const icons = { Active: "✅", Cancelled: "❌", Completed: "🏁" };
      addUserNotification({
        title:   `Booking ${data.status === "Active" ? "Approved" : data.status}`,
        message: data.message,
        icon:    icons[data.status] || "🔔",
      });
    });
  };
  document.head.appendChild(script);
}

function addUserNotification(notif) {
  _notifications.unshift({ ...notif, id: Date.now(), read: false, time: "Just now" });
  _unread++;
  renderNotifBell();
  // Also show as toast
  showToast(notif.message, "info");
}

function renderNotifBell() {
  const bell = document.getElementById("notifBell");
  if (!bell) return;
  const badge = bell.querySelector(".notif-badge");
  if (badge) badge.textContent = _unread > 9 ? "9+" : _unread;
  if (badge) badge.style.display = _unread > 0 ? "flex" : "none";

  const dropdown = document.getElementById("notifDropdown");
  if (!dropdown) return;
  if (!_notifications.length) {
    dropdown.innerHTML = `<p style="text-align:center;color:var(--muted);font-size:0.8125rem;padding:2rem 1rem;">No notifications yet</p>`;
    return;
  }
  dropdown.innerHTML = _notifications.slice(0, 10).map(n => `
    <div style="padding:0.75rem 1rem;border-bottom:1px solid var(--border);${!n.read ? 'background:#eff6ff;' : ''}">
      <p style="font-size:0.8125rem;font-weight:600;color:var(--text);margin-bottom:0.2rem;">${n.icon || "🔔"} ${n.title}</p>
      <p style="font-size:0.75rem;color:var(--muted);">${n.message}</p>
      <p style="font-size:0.7rem;color:#94a3b8;margin-top:0.2rem;">${n.time}</p>
    </div>`).join("");
}

function toggleNotifDropdown() {
  const panel = document.getElementById("notifPanel");
  if (!panel) return;
  const isOpen = panel.style.display === "block";
  panel.style.display = isOpen ? "none" : "block";
  if (!isOpen) {
    // Mark all read
    _notifications = _notifications.map(n => ({ ...n, read: true }));
    _unread = 0;
    renderNotifBell();
  }
}

document.addEventListener("click", e => {
  const panel = document.getElementById("notifPanel");
  const bell  = document.getElementById("notifBell");
  if (panel && bell && !bell.contains(e.target)) panel.style.display = "none";
});

// Authenticated fetch — auto-refreshes access token on 401
async function apiFetch(url, options = {}) {
  const makeReq = (t) => fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers, Authorization: `Bearer ${t}` },
  });

  let res = await makeReq(getToken());
  if (res.status !== 401) return res;

  // Try to refresh
  const rt = getRefreshToken();
  if (!rt) { handleLogout(); return res; }

  const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: rt }),
  });
  if (!refreshRes.ok) { handleLogout(); return res; }

  const { token, refreshToken } = await refreshRes.json();
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  return makeReq(token);
}

function updateNavAuth() {
  const user = getUser();
  const actions = document.querySelector(".nav-actions");
  if (!actions) return;
  if (user) {
    actions.innerHTML = `
      <span style="font-size:0.875rem;color:var(--muted);">Hi, ${user.name.split(" ")[0]}</span>
      <div id="notifBell" onclick="toggleNotifDropdown()" style="position:relative;cursor:pointer;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:6px;border:1px solid var(--border);background:#fff;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        <span class="notif-badge" style="display:none;position:absolute;top:4px;right:4px;width:16px;height:16px;background:#ef4444;color:#fff;font-size:10px;font-weight:700;border-radius:50%;align-items:center;justify-content:center;">0</span>
        <div id="notifPanel" style="display:none;position:absolute;top:42px;right:0;width:300px;background:#fff;border:1px solid var(--border);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:200;overflow:hidden;">
          <div style="padding:0.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:0.875rem;font-weight:600;">Notifications</span>
          </div>
          <div id="notifDropdown" style="max-height:280px;overflow-y:auto;">
            <p style="text-align:center;color:var(--muted);font-size:0.8125rem;padding:2rem 1rem;">No notifications yet</p>
          </div>
        </div>
      </div>
      <button class="btn btn-ghost" onclick="handleLogout()">Sign out</button>`;
    initSocket();
  } else {
    actions.innerHTML = `
      <button class="btn btn-ghost" onclick="location.href='login.html'">Sign in</button>
      <button class="btn btn-primary" onclick="location.href='signup.html'">Get Started</button>`;
  }
}

function handleLogout() {
  const rt = getRefreshToken();
  if (rt) {
    fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: rt }),
    }).catch(() => {});
  }
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  updateNavAuth();
  showToast("Signed out successfully.");
}

// ===== MODAL HELPERS =====
function openModal(id)  { document.getElementById(id)?.classList.add("open"); }
function closeModal(id) { document.getElementById(id)?.classList.remove("open"); }

document.addEventListener("click", e => {
  if (e.target.classList.contains("modal-overlay")) e.target.classList.remove("open");
});

// ===== LOGIN =====
async function handleLogin() {
  const inputs = document.querySelectorAll("#loginModal input");
  const email    = inputs[0]?.value.trim();
  const password = inputs[1]?.value.trim();
  if (!email || !password) { showToast("Please fill in all fields.", "error"); return; }

  try {
    const res  = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.errors ? data.errors.map(e => e.msg).join(" · ") : (data.msg || "Login failed.");
      showToast(msg, "error");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    const storedUser = { name: data.name || email.split("@")[0], email };
    localStorage.setItem("user", JSON.stringify(storedUser));

    closeModal("loginModal");
    updateNavAuth();
    showToast("Welcome back!");
  } catch {
    showToast("Could not connect to server.", "error");
  }
}

// ===== FORGOT PASSWORD =====
function openForgotPassword() {
  const modal = document.getElementById("loginModal");
  if (!modal) return;
  modal.querySelector(".modal").innerHTML = `
    <div class="modal-title">Reset your password</div>
    <p style="color:var(--muted);font-size:0.875rem;margin-bottom:1.25rem;">Enter your email and we'll send you a reset link.</p>
    <div class="form-group" style="margin-bottom:1rem;">
      <label>Email address</label>
      <input type="email" id="forgotEmail" placeholder="you@example.com" />
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline btn-sm" onclick="closeModal('loginModal')">Cancel</button>
      <button class="btn btn-primary" onclick="handleForgotPassword()">Send reset link</button>
    </div>
    <p style="text-align:center;margin-top:1rem;font-size:0.8125rem;color:var(--muted);">
      <a href="#" style="color:var(--accent);" onclick="restoreLoginModal()">Back to sign in</a>
    </p>`;
}

async function handleForgotPassword() {
  const email = document.getElementById("forgotEmail")?.value.trim();
  if (!email) { showToast("Please enter your email address.", "error"); return; }

  try {
    await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    closeModal("loginModal");
    showToast("If that email is registered, a reset link has been sent.");
  } catch {
    showToast("Could not connect to server. Please try again.", "error");
  }
}

function restoreLoginModal() {
  const modal = document.getElementById("loginModal");
  if (!modal) return;
  modal.querySelector(".modal").innerHTML = `
    <div class="modal-title">Sign in to your account</div>
    <div class="form-group" style="margin-bottom:1rem;">
      <label>Email address</label>
      <input type="email" placeholder="you@example.com" />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" placeholder="Enter your password" />
    </div>
    <div style="text-align:right;margin-top:0.5rem;">
      <a href="#" style="font-size:0.8rem;color:var(--accent);" onclick="openForgotPassword()">Forgot password?</a>
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline btn-sm" onclick="closeModal('loginModal')">Cancel</button>
      <button class="btn btn-primary" onclick="handleLogin()">Sign in</button>
    </div>
    <p style="text-align:center;margin-top:1.25rem;font-size:0.8125rem;color:var(--muted);">
      Don't have an account?
      <a href="#" style="color:var(--accent);" onclick="closeModal('loginModal');openModal('signupModal')">Create one</a>
    </p>`;
}

// ===== SIGNUP =====
async function handleSignup() {
  const inputs   = document.querySelectorAll("#signupModal input");
  const firstName = inputs[0]?.value.trim();
  const lastName  = inputs[1]?.value.trim();
  const email     = inputs[2]?.value.trim();
  const password  = inputs[3]?.value.trim();
  if (!firstName || !lastName || !email || !password) { showToast("Please fill in all fields.", "error"); return; }

  try {
    const res  = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `${firstName} ${lastName}`, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.errors ? data.errors.map(e => e.msg).join(" · ") : (data.msg || "Registration failed.");
      showToast(msg, "error"); return;
    }

    closeModal("signupModal");
    showToast("Account created! You can now sign in.");
  } catch {
    showToast("Could not connect to server.", "error");
  }
}

// ===== FEATURED VEHICLES (index.html) =====
async function loadFeaturedVehicles() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  try {
    const res  = await fetch(`${BASE_URL}/api/vehicles`);
    const data = await res.json();
    const list = res.ok && data.length ? data.slice(0, 4) : vehicles.slice(0, 4);
    renderVehicleCards(grid, list, true);
  } catch {
    renderVehicleCards(grid, vehicles.slice(0, 4), false);
  }
}

function renderVehicleCards(container, list, fromAPI) {
  container.innerHTML = list.map(v => {
    const id    = fromAPI ? v._id : v.id;
    const price = v.pricePerHour ?? v.price ?? 0;
    const img   = v.image || "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80";
    return `
      <div class="vehicle-card">
        <div class="card-img">
          <img src="${img}" alt="${v.name}" loading="lazy" />
          <span class="badge available">Available</span>
        </div>
        <div class="card-body">
          <div class="card-type">${v.type || "Vehicle"}</div>
          <h3>${v.name}</h3>
          <div class="card-price">
            <div class="price">${formatINR(price)} <span>/ day</span></div>
            <button class="btn btn-primary btn-sm" onclick="location.href='booking.html?id=${id}'">Book now</button>
          </div>
        </div>
      </div>`;
  }).join("");
}

// ===== SEARCH (index.html) =====
function doSearch() {
  const type = document.getElementById("searchType")?.value;
  const loc  = document.getElementById("searchLocation")?.value;
  let url = "vehicles.html";
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (loc)  params.set("location", loc);
  if (params.toString()) url += "?" + params.toString();
  location.href = url;
}

// ===== SUBMIT BOOKING (booking.html) — calls backend =====
async function submitBooking() {
  const required = ["firstName","lastName","email","phone","license"];
  for (const id of required) {
    if (!document.getElementById(id)?.value.trim()) {
      showToast("Please fill in all required fields.", "error");
      document.getElementById(id)?.focus();
      return;
    }
  }
  const pickupLocationRaw = document.getElementById("pickupLocation")?.value;
  if (!pickupLocationRaw) {
    showToast("Please select a pickup location on the map.", "error");
    return;
  }

  // Get times based on booking type
  const type = typeof bookingType !== 'undefined' ? bookingType : 'day';
  const startTime = type === 'hour'
    ? document.getElementById("pickupDateTime")?.value
    : document.getElementById("pickupDate")?.value;
  const endTime = type === 'hour'
    ? document.getElementById("returnDateTime")?.value
    : document.getElementById("returnDate")?.value;

  if (!startTime || !endTime) {
    showToast("Please select pickup and return date/time.", "error"); return;
  }

  const start = new Date(startTime);
  const end   = new Date(endTime);
  const now   = new Date();

  if (start < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    showToast("Pickup date cannot be in the past.", "error"); return;
  }
  if (end <= start) {
    showToast("Return must be after pickup.", "error"); return;
  }

  let totalPrice = 0;
  const v = window._bookingVehicle;
  if (type === 'hour') {
    const hours = (end - start) / 3600000;
    if (hours < 1)  { showToast("Minimum booking is 1 hour.", "error"); return; }
    if (hours > 24) { showToast("Hourly booking cannot exceed 24 hours.", "error"); return; }
    totalPrice = hours * (v?.pricePerHour || 0);
  } else {
    const days = Math.ceil((end - start) / 86400000);
    if (days > 30) { showToast("Booking duration cannot exceed 30 days.", "error"); return; }
    totalPrice = days * (v?.pricePerDay || v?.pricePerHour || 0);
  }

  if (!isLoggedIn()) {
    showToast("Please sign in to complete your booking.", "error");
    setTimeout(() => location.href = "login.html", 1200);
    return;
  }

  if (typeof isAvailable !== "undefined" && !isAvailable) {
    showToast("Vehicle is not available for the selected dates.", "error"); return;
  }

  const vehicleId = new URLSearchParams(location.search).get("id");

  try {
    const res  = await apiFetch(`${BASE_URL}/api/bookings`, {
      method: "POST",
      body: JSON.stringify({ vehicleId, startTime, endTime, totalPrice, pickupLocation: JSON.parse(pickupLocationRaw) }),
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.msg || "Booking failed.", "error"); return; }

    const bookingRef = "BK-" + data._id.slice(-6).toUpperCase();
    document.getElementById("bookingId").textContent = bookingRef;
    document.getElementById("confirmModal").classList.add("open");
  } catch {
    showToast("Could not connect to server. Please try again.", "error");
  }
}

// ===== MY BOOKINGS — fetch from backend =====
async function loadMyBookings() {
  if (!document.getElementById("bookingsList")) return;
  if (!isLoggedIn()) return;

  try {
    const res  = await apiFetch(`${BASE_URL}/api/bookings/my`);
    if (res.ok) {
      const data = await res.json();
      if (data.length) {
        window._apiBookings = data;
      }
    }
  } catch { /* use mock data */ }
}

// ===== ACTIVE NAV LINK =====
document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === page);
  });
  updateNavAuth();
  loadFeaturedVehicles();
  loadMyBookings();
});
