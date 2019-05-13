// const ChicagoPlaces: { [key: string]: string; } = {};
// ChicagoPlaces['oakbrook'] = 'Oak Brook';
// ChicagoPlaces['woodfield'] = 'Woodfield Mall';
// ChicagoPlaces['ohare'] = "O'hare";

// const ChampaignPlaces: { [key: string]: string; } = {};
// ChampaignPlaces['union'] = 'The Union';
// ChampaignPlaces['altgeld'] = 'Altgeld';
// ChampaignPlaces['isr'] = 'Illinois Street Residence Halls';
// ChampaignPlaces['armory'] = 'Armory';

// const ChicagoPlaces = new Map();
// ChicagoPlaces.set("oakbrook", "Oak Brook");
// ChicagoPlaces.set("woodfield", "Woodfield");
// ChicagoPlaces.set("ohare", "O'hare");

// const ChampaignPlaces = new Map();
// ChampaignPlaces.set("union", "Illini Union");
// ChampaignPlaces.set("altgeld", "Altgeld");
// ChampaignPlaces.set("isr", "Illinois Street Residence Hall");
// ChampaignPlaces.set("armory", "Armory");

// console.log("chicago places constants file: "+ChicagoPlaces.size);
// console.log(ChicagoPlaces);
// console.log(typeof(ChicagoPlaces));
// Array.from(ChicagoPlaces.keys()).forEach( key => console.log(key));

const ChicagoPlaces:{ [key:string] : {place: string} } = {};
ChicagoPlaces['oakbrook'] = {place: 'Oak Brook'};
ChicagoPlaces['woodfield'] = {place: 'Woodfield Mall'};
ChicagoPlaces['ohare'] = { place: "O'hare"} ;

const ChampaignPlaces:{ [key:string] : {place: string} } = {};
ChampaignPlaces['union'] = {place: 'The Union'};
ChampaignPlaces['altgeld'] = {place: 'Altgeld'};
ChampaignPlaces['isr'] = {place: 'Illinois Street Residence Halls'};
ChampaignPlaces['armory'] = {place: 'Armory'};

console.log("in constants file: "+ChicagoPlaces['oakbrook'].place);

export default {ChicagoPlaces, ChampaignPlaces};
