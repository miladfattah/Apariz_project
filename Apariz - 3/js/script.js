const form = document.getElementById('form');

form.addEventListener('submit' , function(e){
    if(this.children[0].value == ""){
        e.preventDefault();
        this.children[0].classList.add('input-active');
        this.children[0+1].classList.add('active');
    }
    if(this.children[2].value == ""){
        e.preventDefault();
        this.children[2].classList.add('input-active');
        this.children[2+1].classList.add('active');
    }
    if(this.children[4].value == ""){
        e.preventDefault();
        this.children[4].classList.add('input-active');
        this.children[4+1].classList.add('active');
    }
    if(this.children[6].value == ""){
        e.preventDefault();
        this.children[6].classList.add('input-active');
        this.children[6+1].classList.add('active');
    }else{
        const telephone = Number(this.children[6].value)
        if(!Number.isInteger(telephone)){
            e.preventDefault();
            this.children[6].classList.add('input-active');
            this.children[6+1].classList.add('active');
            this.children[6+1].children[0].textContent = 'فیلد شماره تلفن نامعتبر است'
        }
    }

    if(this.children[8].value == ""){
        e.preventDefault();
        this.children[8].classList.add('input-active');
        this.children[8+1].classList.add('active');
    }else{
        const Ncode = Number(this.children[8].value) 
        if(!Number.isInteger(Ncode)){
            e.preventDefault();
            this.children[8].classList.add('input-active');
            this.children[8+1].classList.add('active');
            this.children[8+1].children[0].textContent = 'فیلد کد ملی نامعتبر است'
        }
    }
    
})

