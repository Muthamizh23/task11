async function api() {
  try {
    data = fetch("https://restcountries.com/v3.1/all");
    output = await data;
    prom = output.json();
    final = await prom;
    parent = document.querySelector(".container");
    parent1 = document.querySelector(".row");
    final.forEach((element) => {
      parent1.innerHTML += `
             <div id="cardDetails " >
            <div class="card ">
             <div class="card-head">
             <h5 class="card-title">${element.name.common}</h5>
            </div><br>

            <div class="card-body">  
            <img src="${element.flags.png}" >
           <div class="card-text">
           <ul class="list-group">
           <li class="list-group-item "><b>Capital:${element.capital}</li>
           <li class="list-group-item "><b>Region:${element.region}</li>
           <li class="list-group-item "><b>Country Code:${element.cca3}</li>
           </ul>
         </div> <br>
    
          
<button class="btn btn-primary" target="_blank" value="${element.name.common}" id="demo">Click for Weather</button>
           
        
            </div>
          </div>
        
        `;
      parent.append(parent1);

      let btn = document.querySelectorAll(".btn");
      btn.forEach((ele) => {
        ele.addEventListener("click", () => {
          let value = ele.value;
          console.log(value);
          async function weather() {
            let res = fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${ele.value}&APPID=ae6e6a13a47c0114c86e27f6fb10594b`
            );
            let ress = await res;
            let res11 = ress.json();
            let res1 = await res11;

            console.log(res1);
            ele.innerHTML = `<h5>weather: ${res1.weather[0].description}<br>Temp: ${res1.main.temp}<br>Pressure: ${res1.main.pressure}<br>
              lat:${res1.coord.lon}<br>lon:${res1.coord.lat}</h5>`;
            console.log(res1.weather[0].description);
            console.log(res1.main.temp);
            console.log(res1.main.pressure);
            console.log(res1.coord.lat);
            console.log(res1.coord.lon);
          }
          weather();
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
}
api();
  