export interface IRide {
    name: String;
    departure: String;
    destination: String;
    time: Date;
}

export interface IRideProps {
    rides: IRide[]
}
