PrevisualizarImagemNAfolhaDeCadastro();
const MinhaLista = document.querySelector(".minhalista");
const alertMessage = document.querySelector(".alertMessage");
const telaCadastro = document.querySelector(".cadastrar");
alertMessage.classList.add('Ocultar');

function AcharIdade(data) {

    const dataNascimento = new Date(data.toString());
    const DataActual = new Date();

    const DifMeses = DataActual.getMonth() - dataNascimento.getMonth();
    let Idade = DataActual.getFullYear() - dataNascimento.getFullYear();

    if(DifMeses < 0 || (DifMeses === 0 && DataActual.getDate() < dataNascimento.getDate())) Idade--;

    return Idade;
}
function criarSection(pessoa) {
    const section = document.createElement("section");
    section.setAttribute("class", "pessoa");
    const divimg = document.createElement("div");
    divimg.setAttribute("class", "img");
    const divInfo = document.createElement("div");
    divInfo.setAttribute("class", "info");


    const perfil = document.createElement("img");
    perfil.setAttribute("class", "perfil");
    ReceberEMostarImage(pessoa.Image, perfil);

    const pNome = document.createElement("p");
    pNome.innerText = pessoa.Name;
    pNome.setAttribute("class", "pNome");

    const pIdade = document.createElement("p");
    pIdade.innerText = "Idade: " + pessoa.Age;
    pIdade.setAttribute("class", "pIdade");

    const pclasse = document.createElement("p");
    pclasse.innerText = "Classe: " + pessoa.Grade;
    pclasse.setAttribute("class", "pclasse");

    const pEscola = document.createElement("p");
    pEscola.innerText = "Escola: " + pessoa.School;
    pEscola.setAttribute("class", "pEscola");

    const pFamily = document.createElement("p");
    pFamily.innerText = "Familiaridade: " + pessoa.Family;
    pFamily.setAttribute("class", "pCategoria");

    divimg.appendChild(perfil);

    divInfo.appendChild(pNome);
    divInfo.appendChild(pIdade);
    divInfo.appendChild(pclasse);
    divInfo.appendChild(pEscola);
    divInfo.appendChild(pFamily);

    section.appendChild(divimg);
    section.appendChild(divInfo);


    return section;
}
function AddNaLista(section) {
    const li = document.createElement("li");
    li.appendChild(section);
    MinhaLista.appendChild(li);
    SalvarNoLocalStorege();
}
function ReceberEMostarImage(inImage, outImage) {
    let leitor = new FileReader();
    leitor.onload = () => {
        outImage.src = leitor.result;
    }
    leitor.readAsDataURL(inImage.files[0]);
}
function LimparInputs(inputs){
    let Previa = document.querySelector(".ImgPrevia");
    for(let input of inputs){
       input.value = '';
    }
    Previa.innerHTML = '';
    Previa.innerHTML = 'Sem Foto';
}
function PrevisualizarImagemNAfolhaDeCadastro() {
    const inImage = document.querySelector(".inImage");
    let Previa = document.querySelector(".ImgPrevia");
    Previa.innerHTML = 'Sem Foto';
    inImage.addEventListener('change', (e) => {
        const imgTarget = e.target;
        const imgFile = imgTarget.files[0];

        if (imgFile) {
            const leitor = new FileReader();

            leitor.addEventListener('load', (e) =>{
                const leitorTarget = e.target;

                const imgPrevia = document.createElement('img');
                imgPrevia.src = leitor.result;
                imgPrevia.classList.add('ImgPrevia');
                Previa.innerHTML = '';
                Previa.appendChild(imgPrevia);
            })
            leitor.readAsDataURL(inImage.files[0]);
        } else {
            Previa.innerHTML = 'Sem Foto';
        }
    })
}
function AbrirTelaDeCadastro(){
    telaCadastro.classList.add('Mostrar');
    document.querySelector(".DomAdd").innerHTML ='X';
    document.querySelector(".DomAdd").setAttribute('style','font-size: 45px;background-color: darkred');
}
function FecharTelaDeCadastro(){
    telaCadastro.classList.remove('Mostrar');
    document.querySelector(".DomAdd").innerHTML ='+';
    document.querySelector(".DomAdd").setAttribute('style','font-size: 60px;background-color: green');
}
function SalvarNoLocalStorege(){ 

    localStorage.setItem("Pessoas", 'ola mundo');
}

// Os Eventos Clicks
document.querySelector(".btnAdd").addEventListener("click", () => {

    const AllInputs = document.querySelectorAll('.in');
    let TodosPreenchidos = true;
    for(let input of AllInputs){
        if(!input.value) TodosPreenchidos = false;
    }

    if(TodosPreenchidos){
        alertMessage.classList.add('Ocultar');
        
        const BirthDate = document.querySelector(".inData").value;
        const Embriao = {
            Name: document.querySelector(".inNome").value,
            Age:  AcharIdade(BirthDate),
            Grade: document.querySelector(".inClasse").value,
            School: document.querySelector(".inEscola").value,
            Family: document.querySelector(".inFamily").value,
            Image: document.querySelector(".inImage"),
        }
        AddNaLista(criarSection(Embriao));
        LimparInputs(AllInputs);
        FecharTelaDeCadastro();
    }else{
        alertMessage.classList.remove('Ocultar');
    }
   
});

let telaAberta = false; //Primeira instancia da tela de cadastro 
document.querySelector(".DomAdd").addEventListener('click', () =>{

    if(telaAberta){
        FecharTelaDeCadastro(telaAberta);
        telaAberta = false;
    }
    else{
        AbrirTelaDeCadastro(telaAberta);
        telaAberta = true;
    }
       

});