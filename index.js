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






// Lien de db vers liste déroullante
function fetchMarque() {
    fetch('http://127.0.0.1:5000')
        .then(response => response.json())
        .then(data => {
            console.log('Retrieved marques:', data.marques);
            lienListMarque(data.marques)
        })
        .catch(error => console.error('Error:', error));
}

function lienListMarque(marques) {
    let selectElement = document.getElementById('excel_dropdown_marque_first_vehicle');
    marques.forEach(function(marque) {
      let opt = document.createElement('option');
      opt.value = marque;
      opt.innerHTML = marque;
      selectElement.appendChild(opt);
    })
}

function fetchMarque() {
  fetch('http://127.0.0.1:5000/models')
      .then(response => response.json())
      .then(data => {
          console.log('Retrieved model:', data.model);
          lienListMarque(data.marques)
      })
      .catch(error => console.error('Error:', error));
}

function lienListMarque(marques) {
  let selectElement = document.getElementById('excel_dropdown_model_first_vehicle');
  marques.forEach(function(marque) {
    let opt = document.createElement('option');
    opt.value = marque;
    opt.innerHTML = marque;
    selectElement.appendChild(opt);
  })
}

fetchMarque()


// Calcul de la consommation annuelle
function calculConsommation() {

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