export async function validateWord(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(url);
        const data = await response.json(); // Properly await the JSON parsing
        return data.title? "invalid" : "valid";
    } catch (error) {
        // Handle errors like network issues or if the word does not exist in the dictionary (404 response)
        console.error("Error fetching or parsing data:", error);
        return "valid";
    }
}