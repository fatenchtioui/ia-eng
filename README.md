# AI / Machine Learning Engineer Coding Challenge

Welcome to our AI / Machine Learning Engineer coding challenge! In this challenge, you will create a web application that implements a Retrieval-Augmented Generation (RAG) backend system to analyze and compare two provided datasets of survey results. Your task is to build a frontend that communicates with a Python backend running FastAPI. The application should allow users to explore, analyze, and cross-compare the datasets using AI-powered interactions.

## Challenge Overview

Your task is divided into three main parts:

1. **Python Backend**: Develop a server using Python and FastAPI that acts as an intermediary between your frontend and the RAG system. Your server should handle requests from the frontend, process the datasets, interact with the language model, and return the results to your frontend.

2. **RAG System**: Implement a Retrieval-Augmented Generation system that processes the survey datasets, retrieves relevant information based on user queries, and generates insightful responses. Consider using techniques like vector embeddings, semantic search, and prompt engineering to enhance the quality of the generated insights.

3. **Frontend**: Create a simple user interface that allows users to interact with the survey datasets and AI-generated insights. The design and functionality are up to you – be creative! Your frontend should make requests to your backend server to fetch data and AI-generated responses.

## Datasets

You will be working with two provided datasets of survey results:

- **Dataset 1 (Sustainability Research Results)**: An Excel file containing an NxN breakdown of the results to a survey commissioned by Bounce Insights asking consumers in the UK about the importance of sustainability in their purchasing decisions and their engagement with sustainable brands.

- **Dataset 2 (Christmas Research Results)**: An Excel file containing an NxN breakdown of the results to a survey commissioned by Bounce Insights asking consumers in Ireland about their plans for Christmas and overall spending.

Feel free to manipulate or abstract the datasets into other formats that may be more suited for an optimized RAG workflow and user experience.

## Mandatory Technologies

- Python
- FastAPI
- A language model of your choice (e.g., OpenAI's GPT models, Hugging Face's models)
- Any frontend technology

## Evaluation Criteria

- Creativity and uniqueness of the RAG implementation
- Quality of AI-generated insights and comparisons
- Backend architecture and RAG system integration
- Rendering/displaying the source to back up any results provided by the system
- Frontend design & UI/UX
- Error handling and edge cases
- Loading state management
- Code structure, quality, and best practices
- File/repository organization
- README.md clarity and completeness
- Deployment of the application (e.g., Vercel, Render, Heroku)

