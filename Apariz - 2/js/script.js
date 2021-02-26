const form = document.getElementById('form');

form.addEventListener('submit' , function(e){
    if(this.children[0].value == ""){
        e.preventDefault()
        this.children[1].classList.add('active')
    }
    if(this.children[2].value == ""){
        e.preventDefault()
        this.children[3].classList.add('active')
    }
})

