
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  
  export const generateWordSet = async () => {
    let wordSet = new Set<string>();
    let todaysWord = "";
    
    try {
      const response = await fetch("./Bank.txt");
      const result = await response.text();
      
      const wordArr = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)].trim();
      wordSet = new Set(wordArr);
    } catch (error) {
      console.error("Error al obtener el archivo de palabras:", error);
    }
  
    return { wordSet, todaysWord };
  };
  