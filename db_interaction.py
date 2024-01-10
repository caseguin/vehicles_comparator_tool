from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)


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




received_data = {}

# Recoit les valeurs des dropDown
@app.route('/dropdown_value', methods=['POST'])
def get_dropdown():
    data = request.json  # Retrieve JSON data sent from JavaScript
    global received_data
    received_data = {
        'marque': data.get('marque'),
        'model': data.get('model'),
        'annee': data.get('annee')
    }
    return jsonify({'message': 'Data received successfully'})



# Envoyer eff associé au dropdown
@app.route('/eff')
def get_eff():
    global received_data
    marque = received_data.get('marque')
    model = received_data.get('model')
    annee = received_data.get('annee')

    connection = sqlite3.connect('scrap_data.db')
    cursor = connection.cursor()
    cursor.execute("SELECT eff FROM vehicles WHERE marque = ? AND modele = ? AND annee = ?", (marque, model, annee))
    eff_result = cursor.fetchone()
    eff = eff_result[0]
    connection.close()

    return jsonify({'eff' : eff})
    

# Envoyer ges associé au dropdown
@app.route('/ges')
def get_ges():
    global received_data
    marque = received_data.get('marque')
    model = received_data.get('model')
    annee = received_data.get('annee')

    connection = sqlite3.connect('scrap_data.db')
    cursor = connection.cursor()
    cursor.execute("SELECT ges FROM vehicles WHERE marque = ? AND modele = ? AND annee = ?", (marque, model, annee))
    ges_result = cursor.fetchone()
    ges = ges_result[0]
    connection.close()

    return jsonify({'ges' : ges})



if __name__ == '__main__':
    app.run()

