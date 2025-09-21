let step = 0;
let catName = "malbavisco";
let userName = "";
let lastFoodImg = null;
let lastDrinkImg = null;
let history = []; // para botón atrás

const dialog = document.getElementById("dialog");
const catImage = document.getElementById("catImage");
const catNameBox = document.getElementById("catName");
const inputBox = document.getElementById("inputBox");
const optionsContainer = document.getElementById("optionsContainer");
const backBtn = document.getElementById("backBtn");
const respondBtn = document.getElementById("respondBtn");
const letterPanel = document.getElementById("letterPanel");
const letterContent = document.getElementById("letterContent");
const closeLetterBtn = document.getElementById("closeLetterBtn");

backBtn.onclick = goBack;
closeLetterBtn.onclick = closeLetter;

function setCatImage(img){ catImage.src = "img/" + img; }
function clearOptions(){ optionsContainer.innerHTML=""; }
function createOption(text, callback){
    const btn=document.createElement("button");
    btn.className="btn";
    btn.innerText=text;
    btn.onclick=callback;
    optionsContainer.appendChild(btn);
}

// Guardar estado anterior
function saveHistory(stateFunc){ history.push(stateFunc); }

function goBack(){
    if(history.length>0){
        const prev = history.pop();
        prev();
    }
}

// Botón responder solo aparece con input
function nextStep(){
    const input = inputBox.value.trim();
    if(step===0){
        userName = input || "Hali";
        inputBox.style.display="none";
        respondBtn.style.display="none";
        dialog.innerText=`Hola linda ${userName}! ¿Oyesss quieres ser mi amiga?`;
        setCatImage("gatito.png");
        saveHistory(askName);
        createOption("Sí",()=>friendResponse(true));
        createOption("No",()=>friendResponse(false));
        step++;
    }
}

function askName(){
    step=0;
    dialog.innerText="¡wuaaau que linda eres!! ¿Cómo se llama tu nombre?";
    inputBox.style.display="inline-block";
    respondBtn.style.display="inline-block";
    clearOptions();
}

// Respuesta amistad
function friendResponse(isFriend){
    clearOptions();
    saveHistory(askFood);
    if(isFriend){
        dialog.innerText=`¡yeaaaaa ${userName}! me agradaaa!!`;
        setCatImage("gatito_flor.png");
    }else{
        dialog.innerText="Ohh, triste!!";
        setCatImage("gatito_triste.png");
    }
    createOption("Siguiente", askFood);
}

// Preguntar comida
function askFood(){
    clearOptions();
    saveHistory(()=>askFood());
    dialog.innerText="¿Ya comiste?!!";
    setCatImage("gatito_chef.png");
    createOption("Sí",()=>ateFood(true));
    createOption("No",()=>ateFood(false));
}

// Comida
function ateFood(didEat){
    clearOptions();
    if(lastFoodImg){ lastFoodImg.remove(); lastFoodImg=null; }
    if(lastDrinkImg){ lastDrinkImg.remove(); lastDrinkImg=null; }

    if(didEat){
        setCatImage("gatito_florcarta.png");
        dialog.innerText="¡yeaaaa!! Un amigo te envía flores y dos cartas 💌🌼";
        saveHistory(chooseLetter);
        chooseLetter();
    }else{
        setCatImage("orden.png");
        dialog.innerText="Yo invito, ¿Qué quieres comer?";
        saveHistory(ateFood.bind(null,false));
        createOption("Sushi",()=>offerFood("Sushi","img/sushi.png"));
        createOption("Pizza",()=>offerFood("Pizza","img/pizza.png"));
        createOption("Tacos",()=>offerFood("Tacos","img/tacos.png"));
    }
}

function offerFood(food,img){
    clearOptions();
    dialog.innerText=`Aquí tienes tu ${food}!!!`;
    setCatImage("orden.png");
    if(lastFoodImg) lastFoodImg.remove();
    lastFoodImg=document.createElement("img");
    lastFoodImg.src=img;
    lastFoodImg.className="foodImg";
    optionsContainer.appendChild(lastFoodImg);

    saveHistory(()=>offerFood(food,img));

    dialog.innerText+="\nAhora, ¿qué quieres tomar?";
    createOption("Naranjada",()=>offerDrink("Naranjada","img/naranjada.png"));
    createOption("Coca Cola",()=>offerDrink("Coca Cola","img/coca.png"));
    createOption("Boing",()=>offerDrink("Boing","img/boing.png"));
}

function offerDrink(drink,img){
    clearOptions();
    dialog.innerText=`Aquí tienes tu ${drink}!!!🥤`;
    setCatImage("orden.png");
    if(lastDrinkImg) lastDrinkImg.remove();
    lastDrinkImg=document.createElement("img");
    lastDrinkImg.src=img;
    lastDrinkImg.className="foodImg";
    optionsContainer.appendChild(lastDrinkImg);

    saveHistory(()=>offerDrink(drink,img));

    // Continuar al panel de cartas
    createOption("Siguiente",()=>{
        setCatImage("gatito_florcarta.png");
        dialog.innerText="Un amigo te manda flores y dos cartas 💌🌼";
        saveHistory(chooseLetter);
        chooseLetter();
    });
}

// Cartas
function chooseLetter(){
    clearOptions();
    dialog.innerText=" Un amigo cercano me dijo que te mandara esto... unas flores amarillas y dos cartas!! ¿Cuál carta quieres leer? 💌";
    createOption("Carta pequeña",()=>openLetter("pequeña"));
    createOption("Carta grande",()=>openLetter("grande"));
}

function openLetter(tipo){
    letterPanel.style.display="flex";
    if(tipo==="pequeña"){
        letterContent.innerText="Hola Hali,Solo quería enviarte estas flores amarillas y recordarte que eres increíble.Cuídate, cuida de los tuyos y sigue echándole ganas en todo. Con cariño,Daniel";
    }else{
        letterContent.innerText="Hola Hali,Espero que tu semana y tu fin de semana se hayan pasado chidos. Sé que no todo es perfecto y hay días difíciles, esos en los que sentimos que no nos levantamos de nada, pero solo quiero recordarte que siempre hay que echarle ganas.Cuídate mucho, cuida de los tuyos y de quienes amas. Echa ganitas en la uni, que sé que te gusta lo que estudias y confío plenamente en que lo lograrás. Eres una chica increíble, con muchas cualidades; incluso cuando sientas que no puedes, sé que eres capaz de lograrlo.Hay días que el mundo parece lleno de personas malas, pero también hay días en los que hay más personas buenas. Piensa positivo siempre y no dejes que los malos momentos te bajen el ánimo.Espero que leas esto jajaja, y que haya valido la pena mi desvelada. Lo hago con mucho cariño; esto es lo que me queda de mi 5% de pila emocional, mis últimos esfuerzos para ver si podemos arreglar nuestra amistad, porque siento que ya no ha sido lo mismo. Pero al final, tú decidirás.Esperaré tu respuesta, si decides contarme cómo te has sentido estos últimos días, ya que siento que no la estás pasando del todo bien.Venga, Hali, ¡sí se puede! Si ya estás en exámenes, los vas a pasar con buena calificación. Para mí no eres una calificación: eres mucho más. Te deseo suerte en tus terapias y que sigas brillando.Con cariño,Daniel";
    }
    saveHistory(()=>chooseLetter());
}

function closeLetter(){
    letterPanel.style.display="none";
    dialog.innerText="Bueno, me despido… fue un gusto 🐾✨.Espero verte más seguido.Ah, y dice mi amigo Dani que si quieres hablar o aclarar algo con él, le mandes un mensajito.Si no, con un simple 'gracias' es suficiente.Lo importante es que los dos sean honestos con ustedes mismos 💛.";
    setCatImage("gatito.png");
    clearOptions();
    createOption("Reiniciar juego",()=>{ step=0; askName(); });
}

// Agregar animación parpadeo
function catBlink() {
    catImage.classList.add("cat-blink");
    setTimeout(() => catImage.classList.remove("cat-blink"), 4000); // dura un ciclo completo
}

// Animación leve de movimiento arriba-abajo
function catFloat(duration = 1200) {
    catImage.classList.add("cat-float");
    setTimeout(() => catImage.classList.remove("cat-float"), duration);
}