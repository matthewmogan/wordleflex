// Valid word API call, checks whether a submitted word is a valid english language word

export async function validateWord(word) { 
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data.title? false : true;
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
        return true;
    }
}