const form = document.getElementById('form');

const mapElement = document.querySelector('.map-element');

const centerMarker = document.querySelector('#center-marker');


// form validation
form.addEventListener('submit' , function(e){
    if(this.children[0].value == ""){
        e.preventDefault()
        this.children[0+1].classList.add('active')
    }
    if(this.children[3].value == ""){
        e.preventDefault()
        this.children[3+1].classList.add('active')
    }
})


// hide map
centerMarker.addEventListener('click' , function (e){  
    mapElement.classList.remove('active');
})




