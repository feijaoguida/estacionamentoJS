(function(){
  //atribui o valor document.querySelector a variavel $
  const $ = q => document.querySelector(q);
  const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

  function convertPeriod(mil){
    let hor = Math.floor()

    let min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);

    if(min > 60){
      hor = Math.floor(min / 60)
      min = Math.floor(min % 60);
      return `${hor}h:${min}m e ${sec}s`
    }
    return `${min}m e ${sec}s`
  }

  function renderGarage() {
    const garage = getGarage();
    $("#garage").innerHTML = "";
    garage.map(c => addCarToGarage(c))
  }

  function addCarToGarage(car) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${car.name}</td>
      <td>${car.licence}</td>
      <td data-time="${car.time}">${new Date(car.time)
                    .toLocaleString("pt-BR", {
                      hour: "numeric", minute: "numeric"
                    })}</td>
      <td>
        <button type="button" class="btn btn-danger delete">x</button>
      </td>
    `;

    $("#garage").appendChild(row);
  }

  function checkOut(info){
    const licence = info[1].textContent;
    let period = new Date() - new Date(info[2].dataset.time);
    period = convertPeriod(period);

    const msg = `O veiculo ${info[0].textContent} de placa ${licence} permanceu
    por ${period}. Deseja Encerrar?`;

    if (!confirm(msg)) return;

    const garage = getGarage().filter(c => c.licence !== licence);
    localStorage.garage = JSON.stringify(garage);

    renderGarage();
  }

  renderGarage();
  $("#send").addEventListener("click", e => {
    const name = $("#name").value;
    const licence = $("#licence").value;

    if(!name || !licence){
      alert("os campos são Obrigatórios!");
      return;
    }

    const car = { name, licence, time: new Date()};

    const garage = getGarage();
    garage.push(car);

    localStorage.garage = JSON.stringify(garage);

    addCarToGarage(car)


    $("#name").value = "";
    $("#licence").value = "";

  });

  $("#garage").addEventListener("click", e => {
    //if(e.target.className == "delete")
    checkOut(e.target.parentElement.parentElement.cells);
  })


})()