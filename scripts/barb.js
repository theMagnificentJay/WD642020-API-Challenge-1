const baseURL = 'https://www.dnd5eapi.co/api/';
let url;

dndClass = 'barbarian';
// dndClass = 'bard';
// dndClass = 'cleric';
// dndClass = 'druid';
// dndClass = 'fighter';
// dndClass = 'monk';
// dndClass = 'paladin';
// dndClass = 'ranger';
// dndClass = 'sorcerer';
// dndClass = 'warlock';
// dndClass = 'wizard';

let classNameInfo = document.querySelector('.h2-className');
let hitDiceInfo = document.querySelector('.p-hitDice');
let profInfo = document.querySelector('.p-prof');
let saveThrowInfo = document.querySelector('.p-saves');
let profChoiceAmountInfo = document.querySelector('.p-profChoiceAmount');
let profChoiceInfo = document.querySelector('.p-profChoice');

function fetchResults(e) {
    url = baseURL + 'classes/' + dndClass + '/'
    console.log('URL: ', url)

    fetch(url)
        .then(data => {
            // console.log(data);
            return data.json()
        })
        .then(json => {
            console.log(json);
            displayClass(json);
        })

};

fetchResults();

function displayClass(data) {

    let className = data.name;
    let hitDie = data.hit_die;
    let classProf = data.proficiencies;
    let saveThrow = data.saving_throws;
    let classProfChoice = data.proficiency_choices[0].from;
    
    for(classProf of classProf) {
        // console.log(classProf.name);
        profInfo.innerHTML += classProf.name + ', ';
    }

    for(saveThrow of saveThrow) {
        // console.log(saveThrow.name);
        saveThrowInfo.innerHTML += saveThrow.name + ', ';
    }

    for(classProfChoice of classProfChoice) {
        // console.log(classProfChoice.name);
        profChoiceAmountInfo.innerHTML = 'Choose up to ' + data.proficiency_choices[0].choose + ' skills from the following:';
        profChoiceInfo.innerHTML += classProfChoice.name + ', ';
    }

    // console.log(className);
    // console.log(hitDie);
    // console.log(data.proficiency_choices[0].from[0].name);
    
    classNameInfo.innerHTML = className;
    hitDiceInfo.innerHTML = 'Hit Dice: d' + hitDie;

}