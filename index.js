  // Sample data for the bar graph
  const data = [10, 30, 45, 20, 25];

  // Get the canvas element and its context
  const canvas = document.getElementById('bar_graph_consom');
  const ctx = canvas.getContext('2d');

  // Calculate the width of each bar
  const barWidth = canvas.width / data.length;

  // Set up the maximum value for the y-axis
  const maxValue = Math.max(...data);

  // Draw each bar based on the data
  data.forEach((value, index) => {
    const barHeight = (value / maxValue) * canvas.height;
    const x = index * barWidth;
    const y = canvas.height - barHeight;

    // Draw the bar
    ctx.fillRect(x, y, barWidth, barHeight);

    // Draw the value above the bar
    ctx.fillStyle = 'black';
    ctx.fillText(value, x + barWidth / 2, y - 5);
  });


// Envoi des données vers flask
function sendDropdown(dataToSend, path) {
  fetch(path, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
  .then(response => {
    console.log('Response from server:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}



function listDropdown(dropdown_id, data) {
  const selectElement = document.getElementById(dropdown_id);
  selectElement.innerHTML = '';

  const initialOpt = document.createElement('option');
  initialOpt.value = '';
  initialOpt.textContent = '';
  selectElement.appendChild(initialOpt);

  data.forEach((value) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    selectElement.appendChild(opt);
  });

}


async function fetchDropdownData(path, dropdown_id, value_search) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    listDropdown(dropdown_id, data[value_search]);

    return new Promise((resolve) => {
      const selectElement = document.getElementById(dropdown_id);
      selectElement.addEventListener('change', () => {
        const selectedValue = selectElement.value;
        resolve(selectedValue);
      });
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


// Main function
async function initializeDropdowns(list_nb, consId, gesId) {
  const dropdownMarquesId = `excel_dropdown_marque_${list_nb}_vehicle`;
  const dropdownModelsId = `excel_dropdown_model_${list_nb}_vehicle`;
  const dropdownAnneeId = `excel_dropdown_annee_${list_nb}_vehicle`;

  try {
    await fetchDropdownData('http://127.0.0.1:5000/marques', dropdownMarquesId, 'marques');
    const selectElementMarque = document.getElementById(dropdownMarquesId);
    selectElementMarque.addEventListener('change', async () => {
      const selectMarqueValue = selectElementMarque.value; // Extrait la valeur de la marque

      await fetchDropdownData(`http://127.0.0.1:5000/${selectMarqueValue}/models`, dropdownModelsId, 'models');
      const selectElementModel = document.getElementById(dropdownModelsId);  
      const selectModelValue = selectElementModel.value; // Extrait la valeur du model
      
      await fetchDropdownData(`http://127.0.0.1:5000/${selectMarqueValue}/${selectModelValue}/annee`, dropdownAnneeId, 'annee');
      const selectElementAnne = document.getElementById(dropdownAnneeId);
      const selectedAnneeValue = selectElementAnne.value;  // Extrait la valeur de l'année


      // Optenir l'efficacité
      if (selectMarqueValue && selectModelValue && selectedAnneeValue) {
        console.log(selectMarqueValue);
        console.log(selectModelValue);
        console.log(selectedAnneeValue);
  
        const dropdown_values = {
          key: 'value',
          marque: selectMarqueValue,
          model: selectModelValue,
          annee: selectedAnneeValue
        };
        sendDropdown(dropdown_values, 'http://127.0.0.1:5000/dropdown_value');
        retreiveEff(consId, selectMarqueValue, selectModelValue, selectedAnneeValue);
        retreiveGes(gesId, selectMarqueValue, selectModelValue, selectedAnneeValue);
      }
      
    });
    
    const event = new Event('change');
    selectElementMarque.dispatchEvent(event);
    
    
  } catch (error) {
    console.error('Error:', error);
  }
}

 
// Obtenir Cons et imprimer sur html
async function retreiveEff(consId, marque, model, annee) {
  try {
  const effResponse = await fetch('http://127.0.0.1:5000/eff');
  const effValue = await effResponse.json();
  console.log('Efficiency: ', effValue.eff);

  const effValuePrint = document.getElementById(consId);
  effValuePrint.innerHTML = `${marque} ${model} ${annee} : ${effValue.eff} L/100km`;
  } catch (error) {
    console.log('Error:', error);
  }
}

// Obtenir GES et imprimer sur html
async function retreiveGes(gesId, marque, model, annee) {
  try {
  const gesResponse = await fetch('http://127.0.0.1:5000/ges');
  const gesValue = await gesResponse.json();
  console.log('GES: ', gesValue.ges);

  const gesValuePrint = document.getElementById(gesId);
  gesValuePrint.innerHTML = `${marque} ${model} ${annee} : ${gesValue.ges} g CO2`;
  } catch (error) {
    console.log('Error:', error);
  }
}

// Obtenir la distance choisi
function definirDistance() {
  let distance = 1; // Assuming a default value of 1
  const inputDistance = document.getElementById('input_distance');
  if (inputDistance) {
    distance = inputDistance.value;
    console.log(distance);
  } else {
    console.error("Input element not found");
  }
}



initializeDropdowns('first', 'consom_value_first_vehicle', 'ges_value_first_vehicle');
initializeDropdowns('second', 'consom_value_second_vehicle', 'ges_value_second_vehicle');



// const distance = document.getElementById('parametre_input')
// console.log(distance)

// Calcul de la consommation annuelle
function calculConsommation() {
  // const 
}

// Calcul des émissions de ges annuelle
function calculGes() {

}

// Graphique Consommation
function graphConsommation() {

}

// Graphique GES
function graphConsommation() {

}