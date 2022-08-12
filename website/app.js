//Weather app API

let websiteURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const myAPI = '&appid=1f4eb02b39c57d53f2609e7c0fa5094e';
/* Global Variables */

let generateBTN = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



generateBTN.addEventListener('click',(e)=>{
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;
    cloneWeatherData(websiteURL, zipCode, myAPI).then(
        (data)=>{
            postData('/send',{date:d, temp:data.list[0].main.temp, content:userFeelings})
            .then(()=>{newUI()})
            .catch((err)=>{
                console.log(error);
                alert('The zip code is invalid. Try again');
            })
        }
    )
});


//clone weather data
const cloneWeatherData = async(websiteURL, zipCode, myAPI)=>{
    const res = await fetch(websiteURL+zipCode+myAPI)
    try{
        const data = await res.json();
        return data;
    }catch(err){
        console.log('we found error that is ', err);
    }
}

// Posting Data
const postData = async (URL='', data ={})=>{
    const res = await fetch(URL, {
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try{
        const newDate = await res.json();
        return newDate;
    }catch(err){
        console.log('we found error that is ', err);
    }

}

//Get Data

const newUI = async ()=>{
    const req = await fetch('/tempData');
    try{
        const tempData = await req.json();
        console.log(tempData);
        document.getElementById('date').innerHTML = `Date: ${tempData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${tempData.temp}`;
        document.getElementById('content').innerHTML = `Feelings: ${tempData.content}`;
    }catch(err){
        console.log('we found error that is ', err);
    }
}