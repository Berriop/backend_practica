export interface PropertyProps {
  id: string | number;
  title: string;
  price: number;
  location: string;
  available: boolean;
  createdAt: Date;
}

export class PropertyEntity {
  public readonly id: string | number;
  public readonly title: string;
  public readonly price: number;
  public readonly location: string;
  public readonly available: boolean;
  public readonly createdAt: Date;

  constructor(props: PropertyProps) {
    this.id = props.id;
    this.title = props.title;
    this.price = props.price;
    this.location = props.location;
    this.available = props.available;
    this.createdAt = props.createdAt;
  }

}
