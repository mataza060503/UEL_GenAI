Based on your GBus project and your thesis titled **"Building an Information Retrieval System for University Documents Based on Generative AI Technologies"**, here's a tailored README.md draft that reflects the goals, structure, and tech of the UEL Generative AI system. This version uses your original structure but recontextualized for the academic IR system:

---

# UEL Generative AI Retrieval System

A smart and scalable information retrieval platform designed to improve access to university documents using cutting-edge Generative AI and semantic search technologies.

## Description

This system enables users—students, lecturers, and administrators—to efficiently search and retrieve academic documents stored at the University of Economics and Law. The platform enhances traditional keyword-based search with semantic understanding, leveraging modern language models to provide contextual, accurate, and helpful responses.

Developed as part of a graduation thesis, the project explores the synergy between Generative AI (e.g., LLMs like GPT) and classical information retrieval models, offering both document listing and answer generation from internal university sources.

## Table of Contents

- [Languages and Technologies](#languagesandtechnologies)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Languages and Technologies

### Front-End
[![HTML](https://img.shields.io/badge/HTML-5-orange?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)  [![CSS](https://img.shields.io/badge/CSS-3-blue?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  [![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)  

### Back-End
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)  [![LangChain](https://img.shields.io/badge/LangChain-4B8BBE?style=for-the-badge)](https://www.langchain.com/)  [![OpenAI API](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://platform.openai.com/)  

### Database & Storage
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)  [![FAISS](https://img.shields.io/badge/FAISS-005571?style=for-the-badge&logoColor=white)](https://github.com/facebookresearch/faiss)  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

## Demo

*Note: This project is under academic development and currently available for demo access upon request.*

![Search Demo](https://github.com/user-attachments/assets/8f29f21f-7176-4093-8aed-15716f2a3beb)

## Features

- 🔍 **Semantic Document Search**: Retrieve relevant documents even without exact keyword matches.
- ✍️ **Natural Language Q&A**: Ask questions and receive AI-generated answers sourced from real university documents.
- 🧠 **Vector Search** with Pinecone for fast and meaningful retrieval.
- 📚 **PDF Parsing**: Supports various academic documents (curriculum plans, regulations, etc.).
- 🔐 **Authentication** via Firebase.
- 🌐 **Responsive Frontend** with Angular Material.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/uel-generative-ai.git
   cd uel-generative-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - OpenAI API key
   - Pinecone API key
   - Firebase credentials
   - MongoDB URI

4. **Start development server**
   ```bash
   ng serve
   ```

## Usage

- Upload university documents (PDF format)
- Index documents to Pinecone via the backend
- Ask questions using the frontend search bar
- Receive context-aware answers and source references

## Build

To build the project for production:
```bash
ng build
```

## Test

- Run unit tests
```bash
ng test
```
- Run e2e tests
```bash
ng e2e
```

---

Would you like this version exported as a `README.md` file? I can also localize it into Vietnamese if you’re planning to submit it alongside your thesis.
