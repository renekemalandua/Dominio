
const Birth = new Date(2002,11,2);
const Today = new Date();

let Idade = Today.getFullYear() - Birth.getFullYear();
const DifMeses = Today.getMonth() - Birth.getMonth();

if(DifMeses < 0 || (DifMeses === 0 && Today.getDate() < Birth.getDate())){
    Idade--;
}

console.log(Idade);

