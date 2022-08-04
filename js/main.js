// DESAFIO FETCH

fetch('js/productos.json')
.then((response) => response.json())
.then((data) => {
    const api = document.getElementById("api");
    data.forEach(visual => {
        let titulo = document.createElement("p");
        

        let div1 = document.createElement("div");
        div1.classList = "card w-50 d-flex";
        
        let div2 = document.createElement("div");
        div2.classList = "card-header m-2";
        
        let img = document.createElement("img");
        
        titulo.innerText = `${visual.descripción}`;
        div2.innerHTML = `${visual.nombre}`;
        img.src = "img/" + visual.imagen;
        img.width = 100;
        img.length = 150;

        div1.appendChild(titulo);
        div1.appendChild(div2);
        div2.appendChild(img);
        api.appendChild(div1);
    });
});
