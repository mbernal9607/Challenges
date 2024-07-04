function checkIsValidCopy(original:String, copy:String): boolean {
    let valid = true;
    if(!(original.length === copy.length)) return !valid;
    interface Transformations { letter: string; hash: string; plus: string; colon: string; dot: string; space: string; invalid: string; }  
    const transformations: Transformations= {
      letter: "#",
      hash: "+",
      plus: ":",
      colon: ".",
      dot: " ",
      space: " ",
      invalid: "invalid"
    }
    
    const valid_chars :String[] = ["#", "+",":",".", " "];
    const original_array = original.split("");
    const copy_array = copy.split("");
    for(let char in original_array){
      if(original_array[char].toLowerCase() === copy_array[char].toLowerCase()) continue;
      const charIdentified = charIdentifier(original_array[char].toLowerCase());
      if(transformations[charIdentified as keyof Transformations] != copy_array[char]){
        valid = (valid_chars.includes(copy_array[char]));
        if(valid) continue;
        break;
      }
    }
    return valid;
  }
  
  function charIdentifier(char: string): string {
      if(char.match(/[a-z]/i))return "letter"
      else if(char === "#") return "hash"
      else if(char === "+") return "plus"
      else if(char === ":") return "colon"
      else if(char === ".") return "dot"
      else if(char === " ") return "space"
      
      return "invalid";
  }
  
  console.log(checkIsValidCopy(
    'Santa Claus', 's#+:.#c:. s'
  ))