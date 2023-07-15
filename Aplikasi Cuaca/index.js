const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherApps = document.querySelector('.weather-apps')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {
    const Key = 'b640a7af95feb8740c8a280723f84f8f'
    const city = document.querySelector('.search-box input').value

    if (city === '')
        return

        fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${Key}`).then(response => response.json()).then(json => {

            if(json.cod === '404'){
                container.style.height = '400px'
                weatherApps.style.display = 'none'
                weatherDetails.style.display = 'none'
                error404.style.display = 'block'
                error404.classList.add('fadeIn')
                return
            }

            error404.style.display = 'none'
            error404.classList.remove('fadeIn')

            const image = document.querySelector('.weather-apps img')
            const temp = document.querySelector('.weather-apps .temp')
            const description = document.querySelector('.weather-apps .description')
            const humidity = document.querySelector('.weather-details .humidity span')
            const wind = document.querySelector('.weather-details .wind span')
            
            switch (json.weather[0].main){

                case'Clear' :
                    image.src = 'images/succesrmv.png'
                    break;

                case'Rain' :
                    image.src = 'images/rainrmv.png'
                    break;

                case'Clouds' :
                    image.src = 'images/clouds.png'
                    break;

                case'Snow' :
                    image.src = 'images/snowrmv.png'
                    break;

                case'Haze' :
                    image.src = 'images/hazermv.png'
                    break;

                default:
                    image.src = ''
            }
            
            temp.innerHTML = `${parseInt(json.main.temp)}<span>°K</span>`
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

            weatherApps.style.display = ''
            weatherDetails.style.display = ''
            weatherApps.classList.add('fadeIn')
            weatherDetails.classList.add('fadeIn')
            container.style.height = '590px'

        });
});