import {
    userIcon,
    setStorage, 
    getStorage,
    translate,
    icons,

} from "./helper.js";

// htmlden gelenler

const form = document.querySelector('form')
const input = document.querySelector('form #title');
const cancelBtn = document.querySelector('form #cancel');
const noteList = document.querySelector('ul')
const expandBtn = document.querySelector('#checkbox');
const aside = document.querySelector('.wrapper');


// ortak değişkenler
var map;
var coords = []
var notes = getStorage('NOTES') || [];
var markerLayer = []


// olay izleyicileri

cancelBtn.addEventListener('click', () => {
    form.style.display = 'none'
    clearForm();
});






// kullanıcının konumuna göre haritayı ekrana basma
function loadMap(coords) {
    map = L.map('map').setView(coords, 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // imleci tutacağımız bir katman oluşturma
    markerLayer = L.layerGroup().addTo(map);
    //    markerLayer = L.layerGroup().addTo(map)

    L.marker(coords, { icon: userIcon }).addTo(map).bindPopup('Bulunduğunuz konum');


    // lokalden gelen notları ekran bas
    renderNoteList(notes);

    map.on("click", onMapClick)

}

// formun gönderilmesini izle
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // formun içindeki değerlere ulaşma
    const title = e.target[0].value
    const data = e.target[1].value
    const status = e.target[2].value

    // console.log(title,data,status);

    // notlar dizisine bu elemanları ekle

    notes.unshift({
        id: new Date().getTime(),
        title,
        data,
        status,
        coords,
    })
    // console.log(notes);

    renderNoteList(notes)

    // gönderilen elemanları locale kaydetme 
    setStorage(notes)

    //formu kapat
    form.style.display = 'none'

    clearForm();

})


// imleci ekrana basar
function renderMarker(item) {
    // imleç oluştur dökümandan bakılabilir
    L.marker(item.coords,
        { icon: icons[item.status] }
    )
        // imleci katmana ekle
        .addTo(markerLayer)
        // popup ekle
        .bindPopup(item.title)

}




// noteları ekrana basar

function renderNoteList(items) {

    // console.log(items);

    // eski elemanları temizle
    noteList.innerHTML = '';

    // eski imleçleri temizle
    //   markerLayer.clearLayers();


    // her bir eleman için ekrana basma fonk. çalıştır
    items.forEach((ele) => {
        // li elemanı oluştur

        const listEle = document.createElement('li');


        // data-id ekleme önemli

        listEle.dataset.id = ele.id;



        // içeriğini belirleme
        listEle.innerHTML = `
        <div>
        <p>${ele.title}</p>
        <p><span>Tarih:</span>${ele.date} </p>
        <p><span>Durum:</span>${translate[ele.status]}</p>
    </div>


    <div>
    <i id='fly' class="bi bi-airplane-fill"></i>
    <i  id='delete' class="bi bi-trash3"></i>
   </div>`;
        // html gönder 
        noteList.appendChild(listEle);
        // ekrana imleç bas

        renderMarker(ele);
    });
}
// kullanıcının konumunu isteme
navigator.geolocation.getCurrentPosition(
    // kullanınıcı izin veriirse haritayı
    // onun bulundpu konumda açma

    (e) => loadMap([e.coords.latitude, e.coords.longitude]), () => { loadMap([41.020168, 28.933865]) }
    // console.log(navigator);
)


// haritaya tıklanınca çalışan fonk

const onMapClick = (e) => {
    // console.log(e);
    // tıklanılan koordinatı al
    coords = [e.latlng.lat, e.latlng.lng]
    // console.log(coords);

    // tıklanınca formu göster

    form.style.display = "flex"
    // inputa focuslanma
    input.focus();


}
// formu temizleme


function clearForm() {
    form[0].value = ''
    form[1].value = ''
    form[2].value = 'goto'

}


// silme ve uçuş

noteList.addEventListener('click', (e) => {

    //closest('li') en yakın kapsayıcı li gitme 
    const found_id = e.target.closest('li').dataset.id;
    // console.log(notes);

    // console.log(found_id);


    if (
        e.target.id === 'delete' && confirm('silmek istediğinizden emin misiniz ?')
    ) {

        //id si  bilinen elemanı diziden çıkartma

        notes = notes.filter((note) => note.id !== Number(found_id));
        //locali güncelleme
        setStorage(notes);

        //ekranı güncelleme

        renderNoteList(notes);

    }


    if(e.target.id==='fly'){
        //id si bilinen elemanın coordinatlarına erişme

const note= notes.find((note)=>note.id===Number(found_id))


//animasyonu çalıştır leafled sitesinin kütüphasnesinden bakıldı

map.flyTo(note.coords,12);

//popup tanımlama

var popup =L.popup()
.setLatLng(note.coords)
.setContent(note.title)

//popup açma
popup.openOn(map);


    }
})

//gizle/göster

checkbox.addEventListener('input',(e)=>{
const isChecked =e.target.checked;

if(isChecked){
    aside.classList.remove('hide');

} else{

    aside.classList.add('hide')
}

})