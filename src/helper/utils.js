export const getCurrentTime = () => {
    const date = new Date().getDate(); //To get the Current Date
    const month = new Date().getMonth() + 1; //To get the Current Month
    const year = new Date().getFullYear(); //To get the Current Year
    const hours = new Date().getHours(); //To get the Current Hours
    const min = new Date().getMinutes(); //To get the Current Minutes
    const sec = new Date().getSeconds(); //To get the Current Seconds
    
    
    // Calculate milliseconds in a year
    // const date = new Date();
    // const showTime = date.getHours() 
    //     + ':' + date.getMinutes() 
    //     + ":" + date.getSeconds();
    
    const showTime = `${hours}:${min}:${sec} - ${date}/${month}/${year}`;
    
    return showTime
}