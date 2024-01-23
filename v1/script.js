
window.onload = () => {

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: '3D',
            location: {
                lat: 48.9136963,
                lng: 2.3271118,
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

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) { entity.setAttribute('scale', model.scale);}
    if (model.rotation) { entity.setAttribute('rotation', model.rotation);}
    if (model.position) { entity.setAttribute('position', model.position);}

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
