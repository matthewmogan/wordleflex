export async function validateWord(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data.title? "invalid" : "valid";
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
        return "valid";
    }
}