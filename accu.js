const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const updateUI= (data)=>{
    //destructure property
    const {cityDets,weather}=data;
    //update details templates
    details.innerHTML= `
     <h5 class="my-3">${cityDets.EnglishName}</h5>
     <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg; C</span>
     </div>
    `;
    //update the night/day &icon images
    const iconSrc=`${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc=null;
    if(weather.IsDayTime){
        timeSrc=`day.svg`;
    }else{
        timeSrc=`night.svg`;
    }
    time.setAttribute('src',timeSrc);
    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        (card.classList.remove('d-none'));
    } 
};
const updateCity= async(city) =>{
    const cityDets= await getCity(city);
    const weather= await getWeather(cityDets.Key);
    return{cityDets,weather};
};
cityForm.addEventListener('submit', e =>{
    //prevent Default Action
    e.preventDefault();
    //get city Value
    const city=cityForm.city.value.trim();
    cityForm.reset();
    //update the UI with new City
    updateCity(city)
    .then(data=> updateUI(data))
    .catch(err=>console.log(err));

    // set local storage 
    localStorage.setItem('city', city);
});