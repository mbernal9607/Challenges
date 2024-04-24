/*

Los elfos están muy ocupados en el taller de Santa Claus organizando regalos 🎁 para la víspera de Navidad 🎄.

El formato de entrada es especial, ya que indica el número de regalos y el tipo de regalo con letras de la a a la z. Por ejemplo, '66a11b' significa 66 regalos a y 11 regalos b.

Los elfos tienen un sistema especial para organizar los regalos:

Cada 10 regalos del mismo tipo se empaquetan en una caja, representada por {x}. Por ejemplo, 20 regalos tipo a se empaquetan en 2 cajas así: {a}{a}.
Cada 5 cajas se apilan en un palé, representado por [x]. Por ejemplo, 10 cajas de a se apilan en 2 palés de esta manera: [a][a]
Cualquier regalo adicional se coloca en una bolsa, representada por () y se colocan todas dentro. Por ejemplo 4 regalos de b se colocan en una bolsa así (bbbb)
Los regalos luego se colocan en el siguiente orden: palés, cajas y bolsas. Y los regalos aparecen en el mismo orden que la cadena de entrada.

Tu tarea es escribir una función organizeGifts que tome una cadena de regalos como argumento y devuelva una cadena representando el almacén.
*/

function organizeGifts(gifts: string): string {
  const separed_gifts: {[key: string]: any} = {}
  const object_result: {[key: string]: any} = {}
  let number_of_gift = ""
  gifts.split('').map(gift => {
    if(isNaN(parseInt(gift))){
      separed_gifts[gift] = number_of_gift
      number_of_gift = ""
    } else {
      number_of_gift += gift
    }
  });

  let boxes: number | String  = 0
  Object.keys(separed_gifts).forEach(typee => {
    object_result[typee] = {pales: "", boxes: "",individuals: ""  }
    // Building initial boxes
    boxes = (separed_gifts[typee] / 10 >= 1) ? separed_gifts[typee] / 10 : 0;
    // Building individual_gifts
    object_result[typee].individuals = boxes ? boxes.toString().split(".")[1] ?? 0 : separed_gifts[typee]
    // Round boxes
    if(object_result[typee].individuals && boxes) boxes = Math.floor(boxes);
    // Defining palés
    object_result[typee].pales = (boxes > 4) ? Math.floor(boxes / 5) : 0
    // Finally define the boxes
    object_result[typee].boxes = boxes - object_result[typee].pales*5
  });

  let response = ""
  Object.keys(object_result).forEach( types => {
    Object.keys(object_result[types]).forEach(kind => {
      const comes = object_result[types][kind] > 0
      if(kind === "pales" && comes) response += `[${types}]`.repeat(object_result[types][kind])
      else if(kind === "boxes" && comes) response += `{${types}}`.repeat(object_result[types][kind])
      else if(kind === "individuals" && comes) response += `(${types.repeat(object_result[types][kind])})`
    });
  });

  return response
}
// Cada 10 regalos se empaquetan en cajas asi {x}
// cada 5 cajas se apilas en un palé [x]
// y cada regalo adicional se empaqueta en unos parentecis (xxxxxx)
console.log(organizeGifts(`51d51e`))
console.log(organizeGifts("70b120a4c"))
