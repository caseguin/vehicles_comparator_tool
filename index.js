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

async function initializeDropdowns(list_nb) {
  const dropdownMarquesId = `excel_dropdown_marque_${list_nb}_vehicle`;
  const dropdownModelsId = `excel_dropdown_model_${list_nb}_vehicle`;
  const dropdownAnneeId = `excel_dropdown_annee_${list_nb}_vehicle`;

  try {
    const selectedMarque = await fetchDropdownData('http://127.0.0.1:5000/marques', dropdownMarquesId, 'marques');
    
    const selectElementMarque = document.getElementById(dropdownMarquesId);
    selectElementMarque.addEventListener('change', async () => {
      const selectedMarqueValue = selectElementMarque.value;
      await fetchDropdownData(`http://127.0.0.1:5000/${selectedMarqueValue}/models`, dropdownModelsId, 'models');

      const selectElementModel = document.getElementById(dropdownModelsId);
      const selectedModelMarque = selectElementMarque.value; // Use a different variable name to avoid confusion
      await fetchDropdownData(`http://127.0.0.1:5000/${selectedModelMarque}/${selectElementModel.value}/annee`, dropdownAnneeId, 'annee');

    });

    const event = new Event('change');
    selectElementMarque.dispatchEvent(event);
    
  } catch (error) {
    console.error('Error:', error);
  }
}


initializeDropdowns('first');
initializeDropdowns('second');


// send data to flask
let data_to_send = {
  marque: 'Honda',
  model: 'Civic',
  annee: '2015'
};

// Fetch request to Flask endpoint
fetch('/eff', {
  method: 'POST', // Use POST method to send data
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(data_to_send) // Convert data to JSON format
})
.then(response => response.json())
.then(data_to_send => {
  // Handle response from Flask
  console.log(data_to_send);
})
.catch(error => {
  // Handle error
  console.error('Error:', error);
});






const effDropdown = document.getElementById('effDropdown');

effDropdown.addEventListener('change', function () {
  const selectedEffValue = effDropdown.value;
  console.log('Selected Fuel Efficiency:', selectedEffValue);
  // Now you can use the selectedEffValue as needed, for example, updating another part of your UI or sending it to the server.
});


const distance = document.getElementById('parametre_input')
console.log(distance)

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