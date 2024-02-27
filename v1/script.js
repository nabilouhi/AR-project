
window.onload = () => {

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: '3D',
            location: {
                lat: 48.91298583526182 ,
                lng: 2.32887366708586,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.2 0.2 0.2',
        info: 'Magnemite',
        rotation: '0 180 0',
    }
];

var setModel = function (model, entity) {
    if (model.scale) { entity.setAttribute('scale', model.scale);}
    if (model.rotation) { entity.setAttribute('rotation', model.rotation);}
    if (model.position) { entity.setAttribute('position', model.position);}

    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('animation-mixer', '');

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let entity = document.createElement('a-entity');

        entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        setModel(models[0], entity);
        scene.appendChild(entity);
    });
}
