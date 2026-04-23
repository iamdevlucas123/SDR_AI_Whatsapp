# SDR AI WhatsApp – Lead Qualification Bot

An AI-powered WhatsApp assistant designed to automate conversations, qualify leads, and simulate a real Sales Development Representative (SDR) workflow using OpenAI.

---

## 🚀 Overview

This project integrates WhatsApp messaging with AI to create an automated sales assistant capable of:

* Answering user questions in real-time
* Qualifying leads through structured conversations
* Storing interactions and lead data
* Simulating real-world SDR workflows

---

## 🧠 Features

* AI-powered responses using OpenAI
* WhatsApp integration via webhook
* Lead qualification logic (new, qualified, lost)
* Conversation history tracking
* Modular and scalable backend architecture

---

## 🏗️ Tech Stack

* **Backend:** Node.js, TypeScript, Express
* **AI:** OpenAI API
* **Database:** PostgreSQL + Prisma
* **Messaging:** Twilio WhatsApp API
* **DevOps:** Docker

---

## 📁 Project Structure

```
src/
  routes/
  controllers/
  services/
  prompts/
  utils/
  config/
  database/
```

---

## ⚙️ Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/sdr-ai-whatsapp.git
cd sdr-ai-whatsapp
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```
PORT=3000
OPENAI_API_KEY=your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
DATABASE_URL=your_db_url
```

### 4. Run the project

```
npm run dev
```

---

## 🔄 Workflow

1. User sends a message via WhatsApp
2. Webhook receives the message
3. Backend processes and sends it to OpenAI
4. AI generates a response based on SDR prompt
5. Response is sent back via WhatsApp
6. Data is stored for tracking and analysis

---

## 💡 Use Cases

* Lead qualification automation
* Customer support chatbot
* Sales funnel optimization

---

## 📌 Future Improvements

* Dashboard for lead management
* CRM integration
* Advanced analytics
* Multi-language support

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

Lucas Borges
