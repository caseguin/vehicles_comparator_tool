from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import logging


app = Flask(__name__)
CORS(app)
app.logger.setLevel(logging.INFO)


# Liste déroulante pour marque, modeles, années
@app.route('/marques')
def get_marques():
    connection = sqlite3.connect('scrap_data.db')
    cursor = connection.cursor()
    cursor.execute('SELECT DISTINCT marque FROM vehicles;')
    marques = [row[0] for row in cursor.fetchall()]
    connection.close()
    
    return jsonify({'marques' : marques})

@app.route('/<marque>/models')
def get_models_for_marque(marque):
    connection = sqlite3.connect('scrap_data.db')
    cursor = connection.cursor()
    cursor.execute('SELECT DISTINCT modele FROM vehicles WHERE marque = ?;', (marque,))
    models = [row[0] for row in cursor.fetchall()]
    connection.close()
    
    return jsonify({'models': models})

@app.route('/<marque>/<models>/annee')
def get_annee_for_models(marque, models):
    connection = sqlite3.connect('scrap_data.db')
    cursor = connection.cursor()
    cursor.execute('SELECT DISTINCT annee FROM vehicles WHERE marque = ? AND modele = ?;', (marque, models))
    annee = [row[0] for row in cursor.fetchall()]
    connection.close()
    
    return jsonify({'annee': annee})


# Extraire la selection
@app.route('/eff', methods=['POST'])
def get_eff():
    # marque = 'Honda'
    # model = 'Civic'
    # annee = '2015'

    data = request.json  # Retrieve JSON data sent from JavaScript

    app.logger.info(f"Received data: {data}")

    marque = data.get('marque')  # Get values from the JSON data
    model = data.get('model')
    annee = data.get('annee')


    # connection = sqlite3.connect('scrap_data.db')
    # cursor = connection.cursor()
    # cursor.execute("SELECT eff FROM vehicles WHERE marque = ? AND modele = ? AND annee = ?", (marque, model, annee))
    # eff_result = cursor.fetchone()
    # eff = eff_result[0] if eff_result else None
    # connection.close()
    
    return jsonify({'marque': marque, 'model': model, 'annee': annee})



if __name__ == '__main__':
    app.run()

