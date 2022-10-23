create_eye_tracker = (htmlObj, data) => {

	// EYE IMAGE
	let eye_obj = document.createElement("img")
	eye_obj.src = data.url
	eye_obj.style.setProperty("width", "100%")
	eye_obj.style.setProperty("height", "100%")
	// eye_obj.style.setProperty("border", "2px solid red")
	
	// MAIN DIV
	htmlObj.style.setProperty("position", "relative")
	htmlObj.appendChild(eye_obj);

	// SETTING DIMENSTIONS
	let win_dim = [window.innerWidth, window.innerHeight]
	let eye_dim = [htmlObj.clientWidth, htmlObj.clientHeight]
	let eye_pos = [htmlObj.offsetLeft, htmlObj.offsetTop]

	data.eyes.forEach((eye, i) => {
		// EYE BALL
		let eye_ball_obj = document.createElement("img")
		eye_ball_obj.src = eye.eye_ball_url
		eye_ball_obj.style.setProperty("position", "absolute")

		// setting the dimensions
		eye_ball_dim = [eye_dim[0]/10 * eye.dim_zoom[0], eye_dim[1]/10 * eye.dim_zoom[1]]
		eye_ball_obj.style.setProperty("width", eye_ball_dim[0] + "px")
		eye_ball_obj.style.setProperty("height", eye_ball_dim[1] + "px")

		// placing the eye ball in center
		eye_ball_obj.style.setProperty(
			"left", eye.center[0]*eye_dim[0] - eye_ball_dim[0]/2 - 30 + "px"
		)
		eye_ball_obj.style.setProperty(
			"top", eye.center[1]*eye_dim[1] - eye_ball_dim[1]/2 + "px"
		)

		eye.eye_ball_obj = eye_ball_obj


		htmlObj.appendChild(eye_ball_obj)
	});

	return (event)=>{
		let cur_dim = [event.clientX, event.clientY]
		data.eyes.forEach((eye, i)=>{
			eye_ball_obj = eye.eye_ball_obj
			eye_ball_dim = [eye_ball_obj.clientWidth, eye_ball_obj.clientHeight]
			eye_ball_pos = [
				eye_ball_obj.offsetLeft + eye_pos[0] + eye_ball_dim[0]/2,
				eye_ball_obj.offsetTop + eye_pos[1] + eye_ball_dim[1]/2
			]
			eye_ball_center_pos = [
				eye.center[0]*eye_dim[0] - eye_ball_dim[0]/2 + eye_pos[0] + eye_ball_dim[0]/2,
				eye.center[1]*eye_dim[1] - eye_ball_dim[1]/2 + eye_pos[1] + eye_ball_dim[1]/2
			]
			d = [cur_dim[0] - eye_ball_center_pos[0], cur_dim[1] - eye_ball_center_pos[1]]

			let sum = (
				Math.pow(d[0], 2) / Math.pow(eye.diameters[0]*eye_dim[0], 2)
				+
				Math.pow(d[1], 2) / Math.pow(eye.diameters[1]*eye_dim[1], 2)
			)

			if (sum < 1) {
				// CURSOR IS INSIDE THE EYE
				eye_ball_obj.style.setProperty("left", eye.center[0]*eye_dim[0] + d[0] - eye_ball_dim[0]/2 + "px")
				eye_ball_obj.style.setProperty("top", eye.center[1]*eye_dim[1] + d[1] - eye_ball_dim[1]/2 + "px")
			} else {
				// CURSOR IS OUTSIDE THE EYE
				r = [eye.diameters[0] * eye_dim[0], eye.diameters[1] * eye_dim[1]]
				x = ( d[0] * r[0] * r[1] ) / Math.pow(( d[0]*d[0]*r[1]*r[1] + d[1]*d[1]*r[0]*r[0] ), 0.5)
				y = d[1] * x / d[0]

				eye_ball_obj.style.setProperty("left", eye.center[0]*eye_dim[0] + x - eye_ball_dim[0]/2 + "px")
				eye_ball_obj.style.setProperty("top", eye.center[1]*eye_dim[1] + y - eye_ball_dim[1]/2 + "px")
			}

		})
	}

}


const data = {
	url: "/src/img.png",
	eyes: [
		{
			eye_ball_url: "/src/eye_ball.png",
			dim_zoom: [1, 1.5],
			center: [0.255, 0.5],
			diameters: [0.15, 0.38],
		},
		{
			eye_ball_url: "/src/eye_ball.png",
			dim_zoom: [1, 1.5],
			center: [0.755, 0.5],
			diameters: [0.15, 0.38],
		},
	]
}
const data2 = {
	url: "/src/img3.png",
	eyes: [
		{
			eye_ball_url: "/src/eye_ball.png",
			dim_zoom: [0.2, 0.2],
			center: [0.36, 0.6],
			diameters: [0.07 - 0.04, 0.07 - 0.04],
		},
		{
			eye_ball_url: "/src/eye_ball.png",
			dim_zoom: [0.2, 0.2],
			center: [0.47, 0.57],
			diameters: [0.07 - 0.04, 0.07 - 0.04],
		},
		{
			eye_ball_url: "/src/eye_ball.png",
			dim_zoom: [0.2, 0.2],
			center: [0.617-0.01, 0.337],
			diameters: [0.084 - 0.04, 0.084 - 0.04],
		},
		{
			eye_ball_url: "/src/eye_ball.png",
			dim_zoom: [0.2, 0.2],
			center: [0.73-0.01, 0.334],
			diameters: [0.084 - 0.04, 0.084 - 0.04],
		},
	]
}
const data4 = {
	url: "/src/img4.png",
	eyes: [
		{
			eye_ball_url: "/src/eye_ball_2.png",
			dim_zoom: [0.6, 0.6],
			center: [0.41, 0.223],
			diameters: [0.05, 0.04],
		},
		{
			eye_ball_url: "/src/eye_ball_2.png",
			dim_zoom: [0.6, 0.6],
			center: [0.572, 0.223],
			diameters: [0.05, 0.04],
		},
	]
}

let htmlObj = document.getElementsByClassName("eye-div")[0]
let htmlObj1 = document.getElementsByClassName("eye-div")[1]
let htmlObj4 = document.getElementsByClassName("eye-div")[2]

let move_func = create_eye_tracker(htmlObj, data2);
let move_func_1 = create_eye_tracker(htmlObj1, data);
let move_func_4 = create_eye_tracker(htmlObj4, data4);

document.onmousemove = (event) => {
	move_func(event);
	move_func_1(event);
	move_func_4(event);
}