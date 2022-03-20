/* Global Variables */
const apiKey = ',&appid=d09bfb0dc8a1088642f4a861903afc5b&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

let generateButton = document.querySelector('#generate')
    zip = document.querySelector('#zip')
    feelings = document.querySelector('#feelings');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async (url = '',info) => {
    console.log(info);
    const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),}
        );

    try {
      const newData = await res.json();
      return newData;
      
    } catch (error) {
      console.log(error);
    }
  };
generateButton.addEventListener('click',async () =>{
    try{
        const zipVal = zip.value;
        const feelingsVal = feelings.value;

        const response = await fetch(baseURL+zipVal+apiKey);
        const data = await response.json();
        if(! response.ok)
            throw data.message;

            console.log(newDate,data.main.temp);
            postData('/add' ,{date:newDate,temperatue:data.main.temp ,feelings:feelingsVal});
            updateUI();
    }
    catch (error){
        invalidZip();
        console.log('server error\n' + error);
    }

})
function invalidZip(){
    alert('Invalid zip code');
}
const updateUI = async () => {
    const req = await fetch('/all')
    try{
        const clintData = await req.json();
        document.querySelector('#date').innerHTML = `Date: ${clintData.date}`;
        document.querySelector('#temp').innerHTML = `Temperature: ${clintData.temperatue} F` ;
        document.querySelector('#content').innerHTML =`You  feel: ${clintData.feelings}`;

    }
    catch(error){
        console.log('UI error\n' + error);
    }
}
