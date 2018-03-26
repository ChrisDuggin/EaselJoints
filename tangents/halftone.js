// Define a properties array that returns array of objects representing
// the accepted properties for your application
var properties = [
  {type: 'range', id: "size", value: 1, min: 0, max: 10, step: 1},
  {type: 'range', id: "padding", value: 0.1, min: 0, max: 2, step: 0.1}
];

// Define an executor function that builds an array of volumes,
// and passes it to the provided success callback, or invokes the failure
// callback if unable to do so

var executor = function(args, success, failure) {
  var params = args.params;
  var material = args.material;
  var size = params.size;
  var padding = params.padding;

  const halfTone = new HalfTone(material, size, padding);
  success(halfTone.volumes());
};

class HalfTone {
constructor(material, size, padding) {
this.material = material;
this.size = size;
this.padding = padding;

}

randomZ(min, max){
let z = Math.random() * (max - min) + min;
//Optimize tool path by limiting depth variance
z = (Math.round(z * 8) / 8);
return z;


}

dot(offsetX, offsetY) {
 return {
    shape: {
      type: "rectangle",
      center: {
        x: (this.size * offsetX) + (this.padding * offsetX),
        y: (this.size * offsetY) + (this.padding * offsetY)
      },
      flipping: {},
      width: this.size,
      height: this.size,
      rotation: 0,
      cornerRadius: {
        x: 0,//this.size,
        y: 0//this.size
      }
    },
    cut: {
      //depth: this.material.dimensions.z,
      depth: this.randomZ(0.01, this.material.dimensions.z-.1),
      type: 'outline',
      outlineStyle: 'on-path',
      tabPreference: false
    }
  }
}
offset(offsetX, offsetY) {
return {
  x: (this.size * offsetX) + (this.padding * offsetX),
  y: (this.size * offsetY) + (this.padding * offsetY)

};
}

volumes() {
let offsets = [];
let volumes = [];
  for(let i = 0; i < 25; i++) {
    for(let j = 0; j < 25; j++) {
      offsets.push(this.offset(i,j));
      volumes.push(this.dot(i,j));
    }
  }
return volumes;
}
}
