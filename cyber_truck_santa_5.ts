/*Santa 🎅 está probando su nuevo trineo eléctrico, el CyberReindeer, en una carretera del Polo Norte. La carretera se representa con una cadena de caracteres, donde:

. = Carretera
S = Trineo de Santa
* = Barrera abierta
| = Barrera cerrada
Ejemplo de carretera: S...|....|.....

Cada unidad de tiempo, el trineo avanza una posición a la derecha. Si encuentra una barrera cerrada, se detiene hasta que la barrera se abra. Si está abierta, la atraviesa directamente.

Todas las barreras empiezan cerradas, pero después de 5 unidades de tiempo, se abren todas para siempre.

Crea una función que simule el movimiento del trineo durante un tiempo dado y devuelva un array de cadenas representando el estado de la carretera en cada unidad de tiempo:

const road = 'S..|...|..'
const time = 10 // unidades de tiempo
const result = cyberReindeer(road, time)

-> result:
[
  'S..|...|..', // estado inicial
  '.S.|...|..', // avanza el trineo la carretera
  '..S|...|..', // avanza el trineo la carretera
  '..S|...|..', // el trineo para en la barrera
  '..S|...|..', // el trineo para en la barrera
  '...S...*..', // se abre la barrera, el trineo avanza
  '...*S..*..', // avanza el trineo la carretera
  '...*.S.*..', // avanza el trineo la carretera
  '...*..S*..', // avanza el trineo la carretera
  '...*...S..', // avanza por la barrera abierta
]

El resultado es un array donde cada elemento muestra la carretera en cada unidad de tiempo.

Ten en cuenta que si el trineo está en la misma posición que una barrera, entonces toma su lugar en el array.

Los elfos se inspiraron en este reto de Code Wars.*/



function cyberReindeer(road: String, time: number) {
    const times = [road];
    let unit = 1;
    let result = "";
    let last_item = ""
    let new_road: String = "";
    let passed_barrier = false
    let open_barriers = false
    while(unit <= road.length && unit < time){
        new_road = times[times.length - 1]; 
        if(open_barriers)  new_road = new_road.replace(/\|/g, "*");
        for(let step in new_road){
            if(new_road[step] === "S" && new_road[Number(step)+1] !== "|"){
                result = result+(passed_barrier ? "*" : ".") 
                if(passed_barrier) passed_barrier = false;
            }else if (last_item === "S" && (new_road[step] === "." || new_road[step] === "*")){
                result = result + "S"
            }else {
                result = result + new_road[step]
            }
            passed_barrier = (new_road[step] === "*" && last_item === "S") || passed_barrier
            last_item = new_road[step]
        }
        times.push(result)
        unit++
        open_barriers = unit == 5
        result = ""
    }
    return times
}


const road = 'S..|...|..'
const time = 10 // unidades de tiempo
const result = cyberReindeer(road, time)
for(let res of  result){
    console.log(res , "\n")
}
  