const ChicagoPlaces:{ [key:string] : {place: string} } = {};
ChicagoPlaces['oakbrook'] = {place: 'Oak Brook'};
ChicagoPlaces['woodfield'] = {place: 'Woodfield Mall'};
ChicagoPlaces['ohare'] = { place: "O'hare"} ;

const ChampaignPlaces:{ [key:string] : {place: string} } = {};
ChampaignPlaces['union'] = {place: 'The Union'};
ChampaignPlaces['altgeld'] = {place: 'Altgeld'};
ChampaignPlaces['isr'] = {place: 'Illinois Street Residence Halls'};
ChampaignPlaces['armory'] = {place: 'Armory'};

export default {ChicagoPlaces, ChampaignPlaces};
