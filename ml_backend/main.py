# from flask import Flask, request, jsonify
# import pickle
# import tensorflow as tf
# import os
# import sys
# from urllib.parse import urlparse
# import requests
# from bs4 import BeautifulSoup
# import re
# import numpy as np
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer

# # You'll need to import your URLPreprocessor class here
# # Since it's not in the provided code, I'll create a basic placeholder
# class URLPreprocessor:
#     def __init__(self):
#         self.max_text_length = 1000
#         self.max_features = 10000
#         self.label_encoder = None
#         self.tfidf_vectorizer = None
        
#     def fetch_and_extract_content(self, url):
#         """Fetch and extract text content from a URL"""
#         try:
#             headers = {
#                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
#             }
#             response = requests.get(url, headers=headers, timeout=10)
#             response.raise_for_status()
            
#             soup = BeautifulSoup(response.text, 'html.parser')
            
#             # Remove script and style elements
#             for script in soup(["script", "style"]):
#                 script.extract()
                
#             # Get text
#             text = soup.get_text()
            
#             # Break into lines and remove leading and trailing space
#             lines = (line.strip() for line in text.splitlines())
#             # Break multi-headlines into a line each
#             chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
#             # Drop blank lines
#             text = ' '.join(chunk for chunk in chunks if chunk)
            
#             # Clean text
#             text = re.sub(r'[^\w\s]', '', text)
#             text = re.sub(r'\s+', ' ', text).strip()
            
#             # Limit text length
#             return text[:5000]
#         except Exception as e:
#             print(f"Error fetching URL content: {e}")
#             return ""
    
#     def transform(self, urls, contents):
#         """Transform URLs and contents into model-ready features"""
#         # Process text features
#         if hasattr(self, 'tokenizer') and self.tokenizer is not None:
#             text_sequences = self.tokenizer.texts_to_sequences(contents)
#             from tensorflow.keras.preprocessing.sequence import pad_sequences
#             text_sequences = pad_sequences(text_sequences, maxlen=self.max_text_length)
#         else:
#             # Fallback to TF-IDF if tokenizer not available
#             text_features = self.tfidf_vectorizer.transform(contents)
        
#         # Extract URL features
#         url_features = pd.DataFrame([self._extract_url_features(url) for url in urls])
        
#         # Return appropriate format based on what's available
#         if hasattr(self, 'tokenizer') and self.tokenizer is not None:
#             return {
#                 'text_sequences': text_sequences,
#                 'url_features': url_features
#             }
#         else:
#             return {
#                 'text_features': text_features,
#                 'url_features': url_features
#             }
    
#     def _extract_url_features(self, url):
#         """Extract features from URL structure"""
#         parsed = urlparse(url)
        
#         # Simple URL feature extraction
#         features = {
#             'domain_length': len(parsed.netloc),
#             'path_length': len(parsed.path),
#             'has_params': len(parsed.params) > 0,
#             'query_length': len(parsed.query),
#             'fragment_length': len(parsed.fragment),
#             'has_www': parsed.netloc.startswith('www.'),
#             'num_dots': parsed.netloc.count('.'),
#             'num_dash': url.count('-'),
#             'num_underscore': url.count('_'),
#             'num_paths': parsed.path.count('/'),
#             'url_length': len(url)
#         }
        
#         return features
    
#     def decode_labels(self, predictions):
#         """Convert numerical predictions back to category names"""
#         return self.label_encoder.inverse_transform(predictions)

# class URLCategorizer:
#     """Model for categorizing URLs based on content and URL structure"""
    
#     def __init__(self, model_type='deep_learning'):
#         self.model_type = model_type
#         self.model = None
#         self.preprocessor = URLPreprocessor()
    
#     @classmethod
#     def load(cls, filepath):
#         """Load saved model and preprocessor"""
#         # Check if we're loading a deep learning model
#         if os.path.exists(f"{filepath}_model.h5"):
#             # Load components
#             with open(f"{filepath}_components.pkl", 'rb') as f:
#                 model_data = pickle.load(f)
                
#             # Create instance
#             instance = cls(model_type=model_data['model_type'])
#             instance.preprocessor = model_data['preprocessor']
            
#             # Load Keras model
#             instance.model = tf.keras.models.load_model(f"{filepath}_model.h5")
            
#             return instance
#         elif os.path.exists(f"{filepath}_model.keras"):
#             # Load components
#             with open(f"{filepath}_components.pkl", 'rb') as f:
#                 model_data = pickle.load(f)
                
#             # Create instance
#             instance = cls(model_type=model_data['model_type'])
#             instance.preprocessor = model_data['preprocessor']
            
#             # Load Keras model
#             instance.model = tf.keras.models.load_model(f"{filepath}_model.keras")
            
#             return instance
#         else:
#             # Load traditional ML model
#             with open(f"{filepath}.pkl", 'rb') as f:
#                 model_data = pickle.load(f)
                
#             # Create instance
#             instance = cls(model_type=model_data['model_type'])
#             instance.model = model_data['model']
#             instance.preprocessor = model_data['preprocessor']
            
#             return instance
    
#     def predict(self, X):
#         """Make predictions with the trained model"""
#         if self.model_type == 'deep_learning':
#             text_sequences = X['text_sequences']
#             url_features = X['url_features'].values.astype('float32')
            
#             # Get predictions
#             predictions = self.model.predict([text_sequences, url_features])
#             return np.argmax(predictions, axis=1)
#         else:
#             # Traditional ML approach
#             from scipy.sparse import hstack
#             features = hstack([
#                 X['text_features'],
#                 X['url_features'].values
#             ])
            
#             return self.model.predict(features)
    
#     def categorize_url(self, url):
#         """Categorize a single URL - main inference function for production use"""
#         # Preprocess the URL
#         content = self.preprocessor.fetch_and_extract_content(url)
#         features = self.preprocessor.transform([url], [content])
        
#         # Make prediction
#         prediction = self.predict(features)
        
#         # Convert to category name
#         category = self.preprocessor.decode_labels(prediction)[0]
        
#         return {
#             'url': url,
#             'category': category
#         }

# # Create Flask app
# app = Flask(__name__)

# # Load the model
# MODEL_PATH = os.environ.get('MODEL_PATH', './trained_Model/url_categorizer')
# categorizer = None

# def load_model():
#     global categorizer
#     try:
#         categorizer = URLCategorizer.load(MODEL_PATH)
#         print("Model loaded successfully!")
#     except Exception as e:
#         print(f"Error loading model: {e}")
#         raise

# @app.route('/health', methods=['GET'])
# def health_check():
#     """Simple health check endpoint"""
#     return jsonify({
#         'status': 'ok',
#         'model_loaded': categorizer is not None
#     })

# @app.route('/categorize', methods=['POST'])
# def categorize_url():
#     """Endpoint to categorize a URL"""
#     # Get URL from request
#     data = request.get_json()
    
#     if not data or 'url' not in data:
#         return jsonify({
#             'error': 'URL is required'
#         }), 400
    
#     url = data['url']
    
#     try:
#         # Categorize URL
#         result = categorizer.categorize_url(url)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'url': url
#         }), 500

# if __name__ == '__main__':
#     # Load model before starting the app
#     load_model()
    
#     # Get port from environment variable or default to 5000
#     port = int(os.environ.get('PORT', 5000))
    
#     # Run app
#     app.run(host='0.0.0.0', port=port, debug=False)




# from flask import Flask, request, jsonify
# import pickle
# import numpy as np
# import tensorflow as tf
# from model.categorizer import URLPreprocessor

# # Initialize Flask app
# app = Flask(__name__)

# # Load model and preprocessor
# model = tf.keras.models.load_model("./trained_Model/url_categorizer_model.keras")
# with open("./trained_Model/url_categorizer_components.pkl", "rb") as f:
#     model_data = pickle.load(f)
# preprocessor = model_data['preprocessor']
# label_encoder = preprocessor.label_encoder




# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
    
#     url = data.get("url")
#     content = data.get("content", None)  # optional
    
#     if not url:
#         return jsonify({"error": "Missing 'url' in request"}), 400
    

#     # Preprocess
#     content_list = [content] if content else None
#     transformed = preprocessor.transform([url], content_list)
    
#     sequence_input = transformed["text_sequences"]
#     url_input = transformed["url_features"].values.astype("float32")
    
#     prediction = model.predict([sequence_input, url_input])
#     predicted_class = np.argmax(prediction, axis=1)
#     category = label_encoder.inverse_transform(predicted_class)[0]

#     return jsonify({
#         "url": url,
#         "predicted_category": category,
#         "confidence": float(np.max(prediction))
#     })

# if __name__ == "__main__":
#     app.run(debug=True)









from flask import Flask, request, jsonify
import pickle
import numpy as np
import tensorflow as tf
from model.categorizer import URLPreprocessor


# Initialize Flask app
app = Flask(__name__)

# Load model and preprocessor
# model = tf.keras.models.load_model("./trained_Model/url_categorizer_model.keras")
# with open("./trained_Model/url_categorizer_components.pkl", "rb") as f:
#     model_data = pickle.load(f)
# preprocessor = model_data['preprocessor']
# label_encoder = preprocessor.label_encoder


import pickle
import tensorflow as tf

def load_model_and_preprocessor(filepath):
    """Load saved model and preprocessor from given filepath"""
    if tf.io.gfile.exists(f"{filepath}_model.h5"):
        with open(f"{filepath}_components.pkl", 'rb') as f:
            model_data = pickle.load(f)
        
        model_type = model_data['model_type']
        preprocessor = model_data['preprocessor']
        model = tf.keras.models.load_model(f"{filepath}_model.h5")

        return model, preprocessor, model_type
    else:
        with open(f"{filepath}.pkl", 'rb') as f:
            model_data = pickle.load(f)

        model = model_data['model']
        preprocessor = model_data['preprocessor']
        model_type = model_data['model_type']

        return model, preprocessor, model_type


import numpy as np

def categorize_url(url, model, preprocessor):
    """Predict category for a single URL"""
    content = preprocessor.fetch_and_extract_content(url)
    features = preprocessor.transform([url], [content])
    
    if isinstance(model, tf.keras.Model):
        # Deep learning model expects two inputs
        prediction = model.predict([
            features['text_sequences'], 
            features['url_features'].values.astype("float32")
        ])
        predicted_class = np.argmax(prediction, axis=1)
    else:
        # Traditional model
        prediction = model.predict(features)
        predicted_class = prediction

    category = preprocessor.decode_labels(predicted_class)[0]

    return {
        'url': url,
        'category': category,
        'confidence': float(np.max(prediction)) if isinstance(model, tf.keras.Model) else None
    }



@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    
    url = data.get("url")
    content = data.get("content", None)  # optional
    
    if not url:
        return jsonify({"error": "Missing 'url' in request"}), 400
    

    model, preprocessor, model_type = load_model_and_preprocessor('./trained_Model/url_categorizer')
    

    # Categorize the URL
    result = categorize_url(url, model, preprocessor)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)



