// gönderilen verileri locale kaydeder
export const setStorage=(data)=>{
// gelen veriyi stringe çevirme

const strData=JSON.stringify(data);

//locale kaydetme

localStorage.setItem('NOTES',strData)

}



//verileri localden alınır

export const getStorage =(key)=>{
//localden verileri string olarak alır
const strData =localStorage.getItem(key);

// veriyi js objesine çevirme

return JSON.parse(strData);


}


// value lere karşılık gelen içerikler için

export const translate={
goto:"Ziyaret",
home:"Ev",
job:"iş",
park:"Park Yeri"

}
//bir objesin içindeki elemaları görüntüleme
//console.log(translate["job"]); //gibi


// https://leafletjs.com/ dökümanından icon eklemeye bakıldı
export var userIcon = L.icon({
  iconUrl: '/images/Person.png',
  iconSize: [50, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34]
});


var homeIcon = L.icon({
    iconUrl: '/images/Home_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -50],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
  });
  
  var jobIcon = L.icon({
    iconUrl: '/images/Briefcase_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -30],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
  });
  
  var gotoIcon = L.icon({
    iconUrl: '/images/Aeroplane_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -30],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
  });
  
  var parkIcon = L.icon({
    iconUrl: '/images/Parking_8.png',
    iconSize: [70, 75],
    popupAnchor: [0, -30],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 34],
  });
  
  // value'ları karşılık gelen içerikler için
  export const icons = {
    goto: gotoIcon,
    home: homeIcon,
    job: jobIcon,
    park: parkIcon,
  };
  