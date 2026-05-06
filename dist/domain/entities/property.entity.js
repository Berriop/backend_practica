"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyEntity = void 0;
class PropertyEntity {
    id;
    title;
    price;
    location;
    available;
    createdAt;
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.price = props.price;
        this.location = props.location;
        this.available = props.available;
        this.createdAt = props.createdAt;
    }
}
exports.PropertyEntity = PropertyEntity;
