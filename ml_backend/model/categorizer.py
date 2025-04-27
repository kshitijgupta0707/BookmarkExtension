import re
import time
import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from sklearn.feature_extraction.text import TfidfVectorizer

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


from tqdm import tqdm






class URLPreprocessor:
    """Handle all preprocessing steps for both URL and content text"""
    
    def __init__(self, max_features=15000, max_text_length=500):
        self.max_features = max_features
        self.max_text_length = max_text_length
        self.tokenizer = None
        self.tfidf = TfidfVectorizer(
            max_features=max_features,
            ngram_range=(1, 3),
            stop_words='english',
            min_df=2
        )
        self.label_encoder = None
        
    def extract_domain_features(self, urls):
        """Extract features from the URL itself"""
        features = []
        for url in urls:
            try:
                parsed = urlparse(url)
                domain = parsed.netloc
                path = parsed.path
                
                # Extract domain-specific features
                feature_dict = {
                    'domain_length': len(domain),
                    'path_length': len(path),
                    'num_subdomains': domain.count('.'),
                    'has_www': 1 if 'www.' in domain else 0,
                    'path_depth': path.count('/') - (1 if path.endswith('/') else 0),
                }
                
                # Common TLDs as features
                tlds = ['.com', '.org', '.net', '.edu', '.gov', '.io', '.co', '.info']
                for tld in tlds:
                    feature_dict[f'is_{tld.replace(".", "")}'] = 1 if domain.endswith(tld) else 0
                
                features.append(feature_dict)
            except:
                # Handle malformed URLs
                features.append({
                    'domain_length': 0,
                    'path_length': 0,
                    'num_subdomains': 0,
                    'has_www': 0,
                    'path_depth': 0,
                    'is_com': 0, 'is_org': 0, 'is_net': 0, 'is_edu': 0,
                    'is_gov': 0, 'is_io': 0, 'is_co': 0, 'is_info': 0
                })
                
        return pd.DataFrame(features)

    def clean_text(self, text):
        """Clean and normalize text content"""
        if not isinstance(text, str):
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'https?://\S+|www\.\S+', '', text)
        
        # Remove HTML tags
        text = re.sub(r'<.*?>', '', text)
        
        # Remove special characters and digits
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\d+', '', text)
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Truncate if too long
        return text[:self.max_text_length]
    
    def fit(self, urls, content_texts, labels=None):
        """Fit preprocessor on training data"""
        # Clean text data
        cleaned_texts = [self.clean_text(text) for text in content_texts]
        
        # Fit TF-IDF vectorizer
        self.tfidf.fit(cleaned_texts)
        
        # Process labels if provided
        if labels is not None:
            from sklearn.preprocessing import LabelEncoder
            self.label_encoder = LabelEncoder()
            self.label_encoder.fit(labels)
            
        # For deep learning approach
        self.tokenizer = Tokenizer(num_words=self.max_features)
        self.tokenizer.fit_on_texts(cleaned_texts)
        
        return self
        
    def transform(self, urls, content_texts=None):
        """Transform data to model-ready features"""
        # If content_texts is None, we're in inference mode with just URLs
        if content_texts is None:
            content_texts = [self.fetch_and_extract_content(url) for url in tqdm(urls)]
        
        # Extract URL features
        url_features = self.extract_domain_features(urls)
        
        # Clean and transform text content
        cleaned_texts = [self.clean_text(text) for text in content_texts]
        text_features = self.tfidf.transform(cleaned_texts)
        
        # For deep learning approach
        sequences = self.tokenizer.texts_to_sequences(cleaned_texts)
        padded_sequences = pad_sequences(sequences, maxlen=self.max_text_length)
        
        return {
            'url_features': url_features,
            'text_features': text_features,
            'text_sequences': padded_sequences
        }
    
    def encode_labels(self, labels):
        """Convert text labels to numeric"""
        if self.label_encoder is None:
            raise ValueError("Label encoder not fitted. Call fit() first.")
        return self.label_encoder.transform(labels)
    
    def decode_labels(self, encoded_labels):
        """Convert numeric labels back to text"""
        if self.label_encoder is None:
            raise ValueError("Label encoder not fitted. Call fit() first.")
        return self.label_encoder.inverse_transform(encoded_labels)
    
    def fetch_and_extract_content(self, url, max_retries=2):
        """Fetch webpage content and extract text"""
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        for attempt in range(max_retries):
            try:
                response = requests.get(url, headers=headers, timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # Remove script and style elements
                    for script in soup(["script", "style"]):
                        script.extract()
                    
                    # Get text
                    text = soup.get_text(separator=' ')
                    
                    # Clean text
                    return self.clean_text(text)
                
                return ""
            except Exception as e:
                if attempt < max_retries - 1:
                    time.sleep(1)  # Wait before retrying
                else:
                    print(f"Error fetching {url}: {str(e)}")
                    return ""