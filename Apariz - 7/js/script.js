const form = document.getElementById('form');

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


form.children[2].addEventListener('click', function(){
    form.children[2-2].removeAttribute('disabled')
    form.children[2-2].value = "";
})

form.children[5].addEventListener('click', function(){
    form.children[5-2].removeAttribute('disabled')
    form.children[5-2].value = "";
})