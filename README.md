# Buffer Insight Engine

Turn Buffer analytics into actionable content recommendations.

## Why?

Buffer provides excellent publishing and analytics tools, but creators still need to answer an important question:

**"What should I post next?"**

Buffer Insight Engine is a small experiment built on top of Buffer's GraphQL API that transforms post history and analytics into evidence-backed content recommendations using AI.

## Features

* Fetch posts from Buffer using the GraphQL API
* Analyze posting history and engagement trends
* Identify high-performing content themes
* Suggest future content ideas
* Recommend optimal posting times
* Explain recommendations with supporting evidence

## Architecture

Frontend:

* HTML
* CSS
* JavaScript

Backend:

* Node.js
* Express

AI:

* Google Gemini

Data Source:

* Buffer GraphQL API

## Flow

Buffer API → Content Analysis → Gemini → Recommendations

## Example Output

Best Topic:
Backend Engineering

Best Posting Time:
9:00 AM

Recommended Posts:

* Kafka Retry Strategies
* Redis Memory Optimization
* BullMQ Dead Letter Queues

Evidence:

Kafka-related posts generated 2.3x higher engagement than the account average.

## Motivation

This project was built as an exploration of Buffer's newly released public API and to investigate how AI can help creators move from analytics to action.
