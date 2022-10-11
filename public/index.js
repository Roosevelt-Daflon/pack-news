
//import axios from 'axios';

const btn = document.querySelector("button");

const listGlobo = document.getElementById('list-globo')
const listCnn = document.getElementById('list-cnn')
btn.addEventListener("click", Search);





function Search(){
  reset(listGlobo)
  reset(listCnn)
  const input = document.querySelector("input");
  axios.get('http://localhost:3000/search/'+input.value).then(res => {
    const pack = res.data;
    const newsGlobo = pack.globo;
    const newsCnn = pack.cnn;
    for (const i in newsGlobo) 
    {
      const card = newsGlobo[i]
      CreteCard(card, listGlobo)
    }

    for (const i in newsCnn) 
    {
      const card = newsCnn[i]
      CreteCard(card, listCnn)
    }
  })
}

function reset(list)
{
  list.innerHTML = ""
}

function CreteCard(data, list)
{

  if(data.description)
  {
    
    list.innerHTML += `<div class="col-xs-1 center-block" >
      <div class="card bg-secondary rounded shadow" style="--bs-bg-opacity: .1;">
        <div class="card-body">
          <h5 class="card-title text-white">${data.title}</h5>
            <span class="card-text text-white">
              ${data.description}
            </span>
          <a href="//${data.url}" target="_lank" class="btn btn-primary stretched-link">Go somewhere</a>
        </div>
      </div>
    </div>`

    return
  }

  list.innerHTML += `<div class="col-xs-1 center-block" >
    <div class="card bg-secondary rounded shadow" style="--bs-bg-opacity: .1;">
      <div class="card-body">
        <h5 class="card-title text-white">${data.title}</h5>
        <a href="//${data.url}" target="_lank" class="btn btn-primary stretched-link">Go somewhere</a>
      </div>
    </div>
  </div>`
    
}