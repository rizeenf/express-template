
# 🚀 Node.js + Express + TypeScript + PM2 Boilerplate

Backend starter template using **Node.js**, **Express**, **TypeScript**, structured routing, versioned API, centralized error handling, and **PM2** for process management.

---

## ✨ Features

- ⚡ **Express** — Fast and flexible web framework  
- 🟦 **TypeScript** — Type-safe backend development  
- 📁 **Modular routing** with API versioning (v1, v2, ...)  
- 🚨 **Centralized error handling** with custom HttpError  
- 🔁 **PM2 integration** (cluster mode, logs, auto-restart)  
- 🔧 **Environment variable support** (dotenv)  

---

## 📂 Project Structure

```

src/
│── app.ts
│── server.ts
│── routes/
│   ├── index.ts
│   ├── v1/
│   │    ├── index.ts
│   │    └── public.ts
│   ├── v2/
│        ├── index.ts
│        └── public.ts
│── middlewares/
│   └── error/
│        └── errorHandler.ts
│── utils/
│    └── exceptions/
│         └── HttpError.ts
ecosystem.config.js
tsconfig.json
package.json
README.md

````

---

## 🛠 Installation

### 1. Clone the repository

```bash
git clone https://github.com/rizeenf/express-template
cd express-template
````

### 2. Install dependencies

```bash
pnpm install
```

or

```bash
npm install
```

---

## ▶️ Running the App

### Development Mode (auto reload)

```bash
pnpm dev
```

### Build TypeScript

```bash
pnpm build
```

### Start Production (with PM2)

```bash
pnpm start
```

### Start Development with PM2

```bash
pnpm start:dev
```

### PM2 Commands

```bash
pnpm logs
pnpm restart
pnpm stop
```

---

## 🌐 API Endpoints

### **v1 Routes**

Example:

```
GET /api/v1/health
```

### **v2 Routes**

Example:

```
GET /api/v2/health
```

Each version is isolated and can evolve independently.

---

## 🔥 Error Handling

All errors are captured by a global middleware:

```ts
throw new HttpError(400, "Bad Request");
```

Response format:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": 400,
    "message": "Bad Request"
  }
}
```

---

## 🧱 PM2 Ecosystem

The project includes `ecosystem.config.js`:

```bash
pm2 start ecosystem.config.js --env production
pm2 monit
pm2 logs
```

Supports:

* Cluster mode
* Auto-restart
* Log files
* Environment-based configs

---

## 🧪 Environment Variables

Create a `.env` file:

```
PORT=3000
NODE_ENV=development
```

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open Issues and Pull Requests.

---

## 📜 License

MIT License

