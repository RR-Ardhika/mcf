var cart = "";
var redCart = ""; // redundant cart
// var objCart = [];
// var trash = [];
// var index = 0;

$(document).ready(function() {

	// Init mcf-show to show blank
	$("#mcf-show").removeAttr("src");
	
	// Init shapeshift
	$(".mcf-menu").shapeshift({
		dragClone: true,
		enableCrossDrop: false,
		autoHeight: false,
		gutterY: 50,
	});
	
	$(".mcf-order-droparea").shapeshift({
		colWidth: 100,
		autoHeight: false,
	});
	
	$(".mcf-order-trash").shapeshift({
		colWidth: 100,
		enableTrash: true,
		autoHeight: false,
	});
	
	// Events
	var menu_area = $(".mcf-menu");
	$(menu_area).on("ss-removed", function (e, selected) {
		// console.log($(selected));
	});
	
	var drop_area = $(".mcf-order-droparea");
	$(drop_area).on("ss-added", function (e, selected) {
		// console.log($(this));
		// console.log($(selected).context.id);
		// console.log("Into this position:" + $(selected).index());
		// console.log(getFoodId($(selected).context.id));
		// $("#mcf-show").attr("src", "../asset/img/foods/3.jpg");
		
		addFood(getFoodId($(selected).context.id));				
		
		// objCart = drop_area;
		// objCart = objCart[0].children;
		
		var secret_number = Math.floor((Math.random() * 10000000000));
		$(selected).attr("name", secret_number);
		
		debugFoodName(selected);
		
		// console.log(secret_number);
		// $(selected)[0].children.secret_number = secret_number;
		// objCart[index].secret_number = secret_number;
		// index++;				
		// console.log(objCart[index-1].secret_number);
		// objCart.push($(selected));
		// $(e).data = secret_number;
		// console.log($(this));
		// console.log($(e));
		
		// console.log($(selected).attr("name"));
		
	});
	
	var trash_area = $(".mcf-order-trash");
	$(trash_area).on("ss-trashed", function (e, selected) {
		// console.log(getFoodId($(selected).context.id));
		// console.log($(selected.parent));
		// console.log($(selected)[0]);
		// trash = trash_area;
		// trash.push($(selected));
		// console.log(objCart[0]);
		// console.log(trash[0]);
		
		// console.log($(selected).attr("name"));
		
		// console.log($(e));
		// console.log($(selected));
		
		debugFoodName(selected);
		if ($(selected).attr("name"))
			removeFood(getFoodId($(selected).context.id));
		
		// // console.log(findInRedCart($(selected)));
		// debugCart();
		
	});
	
});

function getFoodId(food)
{
	return food.replace('item', '');
}

function sortFoodId(str)
{
	var tmp = str.split("");
	tmp = tmp.sort();
	return tmp.toString().replace(/,/g, '');	
}

function sortCart()
{
	cart = sortFoodId(cart);
}

function countCart(foodId)
{
	var regex = new RegExp(foodId, "g");
	return cart.match(regex).length;
}

function sortRedCart()
{
	redCart = sortFoodId(redCart);
}

function countRedCart(foodId)
{			
	var regex = new RegExp(foodId, "g");
	return redCart.match(regex).length;
}

// function findInRedCart(food)
// {
// 	for (i = 0; i < redCart.length; i++) {
// 		console.log(objCart[i].context.className.toString());
// 		console.log(food.context.className.toString());
// 		if (objCart[i].context.className.toString() === food.context.className.toString()) {
// 			return true;
// 		}
// 	}
// 	return false;
// }

function addFood(foodId)
{
	if (!cart.includes(foodId)) {
		cart = cart.concat(foodId);
		sortCart();
	}
	redCart = redCart.concat(foodId);
	sortRedCart();
	debugCart();
	showFood(cart);
}

function removeFood(foodId)
{
	if (countRedCart(foodId) > 1) {
		redCart = redCart.replace(foodId, '');
	} else if (countRedCart(foodId) == 1) {
		redCart = redCart.replace(foodId, '');
		cart = cart.replace(foodId, '');
	} else {
		return;
	}
	debugCart();
	showFood(cart);
}

function showFood(foodId)
{
	if (foodId.length > 0)
		$("#mcf-show").attr("src", "../asset/img/foods/" + foodId + ".jpg");
	else
		$("#mcf-show").removeAttr("src");
}

function debugCart()
{
	// console.log(cart);
	// console.log(redCart);
}

function debugFoodName(selected)
{
	// console.log($(selected).attr("name"));
}