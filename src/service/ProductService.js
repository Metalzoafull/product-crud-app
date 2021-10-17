import axios from "axios";

export class ProductService {
    baseUrl = "http://localhost:8080/product/";
    getAll() {
        return axios.get(this.baseUrl + "getAll").then(res => res.data);

    }

    save(product) {
        return axios.post(this.baseUrl + "create", product).then(res => res.data);
    }


}