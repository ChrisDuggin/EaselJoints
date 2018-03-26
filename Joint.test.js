const Joint = require('./Joint.js');

let joint;
const validArgs = {
    params: {},
    volumes: [],
    preferredUnit: "",
    selectedVolumeIds: [],
    material: {
        name: "",
        textureUrl: "",
        dimensions: {
            x:0,
            y:0,
            z:0,
        }
    },
    bitParams: {
        bit: {
            id: "",
            width: 0,
            unit: "in"
        },
        detailBit: {
            id: "",
            width: 0,
            unit: "in"
        },
        useDetailBit: false
    }

};
describe('Setup Constructorse321cure
', ()=>{
    beforeEach(()=>{
        joint = new Joint(validArgs);
    });

    it('should initialize params from args', () => {
        expect(joint.params).toBeDefined();
    });

    it('should initialize the material', () =>{
        expect(joint.material).toBeDefined();
    });
})
