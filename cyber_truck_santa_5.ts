function cyberReindeer(road: String, time: number) {
    const times = [road];
    let unit = 1;
    let result = "";
    let last_item = ""
    let new_road: String = "";
    let passed_barrer = false
    while(unit <= road.length && unit < time){
        new_road = times[times.length - 1];
        if(unit >= 5)  new_road = new_road.replace(/\|/g, "*");
        for(let step in new_road){
            if(new_road[step] === "S" && new_road[Number(step)+1] !== "|"){
                result =result+(passed_barrer ? "*" : ".") 
                if(passed_barrer) passed_barrer = false;
            }else if (last_item === "S" && (new_road[step] === "." || new_road[step] === "*")){
                result = result + "S"
            }else {
                result = result + new_road[step]
            }
            passed_barrer = (new_road[step] === "*" && last_item === "S") || passed_barrer
            last_item = new_road[step]
        }
        times.push(result)
        unit++
        result = ""
    }
    return times
}


const road = 'S..|...|..'
const time = 10 // unidades de tiempo
const result = cyberReindeer(road, time)
for(let res of  result){
    //console.log(res , "\n")
}

// 1. "S."
// 2. ".S"
  