# Buffer Insight Engine

A simple AI-powered tool built on top of the Buffer GraphQL API.

The goal is straightforward:

> Instead of just showing analytics, help creators understand what they should post next.

The application fetches recent Buffer posts and performance metrics, analyzes them using an LLM, and generates actionable content recommendations backed by engagement data.

## Why?

Buffer provides great publishing and analytics capabilities, but many creators still spend time figuring out:

* Which topics perform best?
* What content should I create next?
* What opportunities am I missing?

This project explores how AI can bridge the gap between analytics and action.

## Motivation

I built this project to experiment with Buffer's public GraphQL API and explore practical AI use cases for content creators.

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express

### APIs

* Buffer GraphQL API
* OpenRouter

## Setup

### Prerequisites

* Node.js installed
* Buffer Personal API Key
* OpenRouter API Key

### 1. Clone the Repository

```bash
git clone <repo-url>
cd buffer-insight-engine
```

### 2. Configure Environment Variables

Inside the `backend` folder create a `.env` file based on `.env.example`.

Example:

```env
BUFFER_API_KEY=your_buffer_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Start the Backend

```bash
npm start
```

The server will start on:

```text
http://localhost:3000
```

### 5. Launch the Frontend

Open the `index.html` file from the `frontend` folder in your browser.

That's it.

## Feedback

If you have ideas, suggestions, or improvements, feel free to open an issue or reach out.
