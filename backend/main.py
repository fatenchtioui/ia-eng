from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings, ChatOpenAI

import os
import openai
import time

# Load environment variables
load_dotenv()

# Set the OpenAI API key
openai.api_key = os.getenv("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")

class RAGSystem:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(openai_api_key=openai.api_key)
        self.llm = ChatOpenAI(temperature=0)
        self.vector_stores = {}
        self.setup_vector_stores()


    def setup_vector_stores(self):
        # Load datasets
        sustainability_df = pd.read_excel("C:/Users/21627/Desktop/Nouveau dossier/backend/data/Dataset 1.xlsx")
        christmas_df = pd.read_excel("C:/Users/21627/Desktop/Nouveau dossier/backend/data/Dataset 2.xlsx")

        sustainability_texts = self._process_dataframe(sustainability_df, "sustainability")
        christmas_texts = self._process_dataframe(christmas_df, "christmas")

        # Create vector stores
        self.vector_stores["sustainability"] = FAISS.from_texts(sustainability_texts, self.embeddings)
        self.vector_stores["christmas"] = FAISS.from_texts(christmas_texts, self.embeddings)

    def _process_dataframe(self, df: pd.DataFrame, context: str) -> List[str]:
        texts = []
        for col in df.columns:
            col_summary = f"Question: {col}\n"
            for idx, value in df[col].value_counts().items():
                col_summary += f"- {idx}: {value} responses\n"
            texts.append(f"Context: {context} survey\n{col_summary}")
        return texts

    def query(self, query_text: str, dataset: str = "both") -> dict:
        results = {}
        
        # Query sustainability dataset if applicable
        if dataset in ["both", "sustainability"]:
            sustainability_qa = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=self.vector_stores["sustainability"].as_retriever()
            )
            results["sustainability"] = sustainability_qa.run(query_text)

        # Query christmas dataset if applicable
        if dataset in ["both", "christmas"]:
            christmas_qa = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=self.vector_stores["christmas"].as_retriever()
            )
            results["christmas"] = christmas_qa.run(query_text)

        return results

# API Call Wrapper with Retry Logic
def call_openai_api_with_retry(api_call, retries=3, delay=2):
    for attempt in range(retries):
        try:
            response = api_call()
            return response
        except openai.error.RateLimitError:
            if attempt < retries - 1:
                print("Rate limit exceeded. Retrying...")
                time.sleep(delay)
            else:
                raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
        except (openai.error.Timeout, openai.error.APIError) as e:
            if attempt < retries - 1:
                time.sleep(delay)
            else:
                raise HTTPException(status_code=500, detail=str(e))
            

# FastAPI app initialization
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    text: str
    dataset: Optional[str] = "both"

# Initialize RAG system
rag_system = RAGSystem()

@app.post("/api/query")
async def query_surveys(query: Query):
    try:
        results = rag_system.query(query.text, query.dataset)
        return {"results": results}
    except openai.error.RateLimitError:
        # Optional: Log the error or notify the user
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

