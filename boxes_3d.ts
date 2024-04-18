/*
Santa está experimentando con nuevos diseños de regalos y necesita tu ayuda para visualizarlos en 3D.

Tu tarea es escribir una función que, dado un tamaño n (entero), genere un dibujo de un regalo en 3D utilizando caracteres ASCII.

Las líneas de los regalos se dibujan con # y las caras con el símbolo que nos pasan como parámetro:

drawGift(4, '+')

/*
   ####
  #++##
 #++#+#
####++#
#++#+#
#++##
####
*/

drawGift(5, '*')
/*
    #####
   #***##
  #***#*#
 #***#**#
#####***#
#***#**#
#***#*#
#***##
#####
*/

drawGift(1, '^')
/*
#
*/
Importante: Nos han dicho que siempre hay que dejar un salto de línea al final del dibujo.

Nota: Ten en cuenta que, en los tests, la primera línea se ve empujada por el caracter ".
*/


function drawGift(size: number, symbol: string) {
  const front_face = buildFrontFace(size, symbol);
  const face_up = buildFaceOfAbove(front_face);
  const result = buildFinalGift(face_up, front_face, symbol)

  return result;
}


  function buildFrontFace(size: number, sym: string):String[]{
    const front_face: String[] = [];
    for(let row = 0; row < size; row++ ){
      let result = ""
      for(let column = 0; column < size; column++){
        if(row === 0 || row === size-1){
          result = result + "#"
        } else {
          result = result + ((column === 0 || column === size-1) ? "#" : sym)
        }
      }
      front_face.push(result)
    }
    return front_face;
  }

  function buildFaceOfAbove(front_face: String[]): String[]{
    const face_up: String[] = [];
    let result = ""
    let space_num = ""
    const middle = front_face[0];
    for(let space = 0; space < front_face[0].length - 1; space++){
      space_num = space_num + " "
    }

    for(let row of front_face){
      result = result + space_num + row;
      if(result != middle) face_up.push(result)
      result = ""
      space_num = space_num.slice(0, -1);
    }
    return face_up;
  }

  function buildFinalGift(face_up: String[], front_face: String[], sym: String): String{

    let first_part = "";
    let tail = ""
    let last_part = "";
    face_up.map(( row, i ) =>{
      last_part = (i === 0) ? "" : last_part + sym.repeat(i-1) + "#"
      first_part = first_part + "\n" + row + last_part;
      last_part = "";
    })

    front_face.reverse().map(( row, i ) =>{
      last_part = (i === 0) ? "" : last_part + sym.repeat(i-1) + "#"
      tail = "\n" + row +last_part + tail;
      last_part = "";
    })


    return (first_part + tail+"\n").replace("\n", "")
  }

console.log(drawGift(4, "$"))


