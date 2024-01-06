from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/')
def get_marques():
    connection = sqlite3.connect('scrap_data.db')
    cursor = connection.cursor()
    cursor.execute('SELECT DISTINCT marque FROM vehicles;')
    marques = [row[0] for row in cursor.fetchall()]
    connection.close()
    
    return jsonify({'marques' : marques})

@app.route('/models')
def get_model():
    connection = sqlite3.connect('scrap_data.db')
    cursor = connection.cursor()
    cursor.execute('SELECT DISTINCT modele FROM vehicles;')
    model = [row[0] for row in cursor.fetchall()]
    connection.close()
    
    return jsonify({'models' : model})

if __name__ == '__main__':
    app.run()

