import red_one from "./assets/products/red_1.png";
import red_two from "./assets/products/red_2.png";
import navy_one from "./assets/products/navy_1.png";
import navy_two from "./assets/products/navy_2.png";
import black_one from "./assets/products/black_1.png";
import black_two from "./assets/products/black_2.png";
import dark_green_one from "./assets/products/dark-green_1.png";
import dark_green_two from "./assets/products/dark-green_2.png";
import green_one from "./assets/products/green_1.png";
import green_two from "./assets/products/green_2.png";
import grey_one from "./assets/products/grey_1.png";
import grey_two from "./assets/products/grey_2.png";

import productsFile from "./assets/products.json"

let loadedImages : any = {
	red: [
		red_one,
		red_two
	],
	navy: [navy_one,
		navy_two
	],
	black: [
		black_one,
		black_two],
	dark_green: [
		dark_green_one,
		dark_green_two,
	],
	green: [
		green_one,
		green_two,
	],
	grey: [

		grey_one,
		grey_two
	]
}

let products : any = productsFile.products

for (let product of products){
	if(product.id in loadedImages){
		product["images"] = loadedImages[product.id];
	}
}


export default products;