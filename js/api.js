async function submit() {
    const prefecture = document.getElementById("prefecture").value;

    const tokyo_latitude = 35.6785;
    const tokyo_longitude = 139.6823;
    const osaka_latitude = 34.4111;
    const osaka_longitude = 135.3112;
    const nagoya_latitude = 35.1537;
    const nagoya_longitude = 137.339;

    // 大阪、名古屋の緯度と経度も調べる

    let latitude = 0;
    let longitude = 0;

    if(prefecture === '東京') {
        latitude = tokyo_latitude;
        longitude = tokyo_longitude;
    }

    if(prefecture === '大阪') {
        latitude = osaka_latitude;
        longitude = osaka_longitude;
    }
    if(prefecture === '名古屋') {
        latitude = nagoya_latitude;
        longitude = nagoya_longitude;
    }


    let weather_api_url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=weathercode&current_weather=true&timezone=Asia%2FTokyo';

    const res = await fetch(weather_api_url);
    let weather_json = await res.json();

    // {
    //     'current_weather': {
    //         'temperature' : 15.0,
    //         'weathercode' : 0,
    //     }
    // }
    let temperature = weather_json.current_weather.temperature;
    let weather_code = weather_json.current_weather.weathercode;

    const weather = judge_weather(weather_code);

    document.getElementById('temperature').textContent = temperature;
    document.getElementById('weather').textContent = weather;
    document.getElementById('image').src = judge_images(weather_code);

    // https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=weathercode&current_weather=true&timezone=Asia%2FTokyo


}


function judge_weather(code){
    // 参考 : https://open-meteo.com/en/docs#latitude=35.6785&longitude=139.6823&daily=weathercode&current_weather=true&timezone=Asia%2FTokyo
    if(code === 0) {
        return '晴れ';
    }
    else if(code === 1 || code === 2 || code === 3) {
        return 'おおむね晴れ';
    }
    else if(code === 61 || code === 63 || code === 65){
        return '雨';
    }
    else if(code === 45 || code === 48){
        return '霧';
    }
    else {
    
        return '自分で考えろ';
    }
}

function judge_images(code) {
    const sunny_image = 'images/tenki_hare_otoko.png';
    const cloudy_image = 'images/kumo_bg.png';
    const rainy_image = 'images/fashion_ame_zubunure.png';
    const fog_image = 'images/kotowaza_gorimuchu.png';
    const luffy_image = 'images/onepiece01_luffy.png';
    
    if(code === 0) {
        return sunny_image;
    }
    else if(code === 1 || code === 2 || code === 3) {
        return cloudy_image;
    }
    else if(code === 61 || code === 63 || code === 65){
        return rainy_image;
    }
    else if(code === 45 || code === 48){
        return fog_image;
    }
    else {
        return luffy_image;
    }    
}