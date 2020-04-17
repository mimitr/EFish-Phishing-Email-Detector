const links_checks_div = document.getElementById("links_checks");
const spell_checks_div = document.getElementById("spell_checks");
const phishing_info_div = document.getElementById("phishing_info");

console.log(links_checks);
chrome.storage.local.get(["body"], function(items) {
    console.log(items.body);
});


chrome.storage.local.get(['check_links_array'], function(items) {
    let bad_links_num = items.check_links_array.length;
    console.log(bad_links_num);

    const h3_url_checks = document.createElement("h3");
    h3_url_checks.innerText = "URL Links Checks:";
    h3_url_checks.style.color = '#3d6387';
    links_checks_div.appendChild(h3_url_checks);

    for (let i = 0; i < bad_links_num; i++) {
        let type = items.check_links_array[i].threatType;
        let bad_url = items.check_links_array[i].threat.url;

        console.log(type);
        console.log(bad_url);
        
        const bold1 = document.createElement("b");
        links_checks_div.appendChild(bold1);
        const p_links_checks = document.createElement("p");
        p_links_checks.innerText = "Threatening link:";
        bold1.appendChild(p_links_checks);

        const p_bad_url = document.createElement("p");
        links_checks_div.appendChild(p_bad_url);
        p_bad_url.innerText = bad_url;

        const bold2 = document.createElement("b");
        links_checks_div.appendChild(bold2);
        const p_type_checks = document.createElement("p");
        p_type_checks.innerText = "Threat Type:";
        bold2.appendChild(p_type_checks);

        const p_type_url = document.createElement("p");
        links_checks_div.appendChild(p_type_url);
        p_type_url.innerText = type;
    }
});

chrome.storage.local.get(["spell_error_array"], function(items) {
    console.log(items.spell_error_array);
    let bad_spells_num = items.spell_error_array.length;
    console.log(bad_spells_num);

    const h3_spell_checks = document.createElement("h3");
    h3_spell_checks.innerText = "Spell Checks:";
    h3_spell_checks.style.color = '#3d6387';
    spell_checks_div.appendChild(h3_spell_checks);

    const p_spell_num = document.createElement("p");
    p_spell_num.innerText = "Number of spell errors: " + bad_spells_num;
    p_spell_num.style.color = '#3d6387';
    spell_checks_div.appendChild(p_spell_num);

    for (let i = 0; i < bad_spells_num; i++) {
        let typo_word = items.spell_error_array[i].token;
        let suggestion = items.spell_error_array[i].suggestions[0].suggestion;

        console.log(typo_word);
        console.log(suggestion);
        
        const p_typo_word = document.createElement("p");
        p_typo_word.innerText = typo_word + "   =>   " + suggestion;
        p_typo_word.style.fontStyle = "italic";
        spell_checks_div.appendChild(p_typo_word);
    }

});
//});

