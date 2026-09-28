import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ============================================================
// ESCENA
// ============================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xdbeafe);

scene.fog = new THREE.Fog(
    0xdbeafe,
    18,
    38
);


// ============================================================
// CÁMARA
// ============================================================

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

const initialCameraPosition = new THREE.Vector3(
    0,
    4.0,
    8.5
);

camera.position.copy(initialCameraPosition);


// ============================================================
// RENDERER
// ============================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.outputColorSpace = THREE.SRGBColorSpace;

document
    .getElementById('canvas-container')
    .appendChild(renderer.domElement);


// ============================================================
// ORBIT CONTROLS
// ============================================================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.target.set(
    0,
    2.1,
    0
);

controls.maxPolarAngle = Math.PI * 0.48;

controls.update();


// ============================================================
// ILUMINACIÓN
// ============================================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.85
);

scene.add(ambientLight);


const dirLight = new THREE.DirectionalLight(
    0xffffff,
    1.8
);

dirLight.position.set(
    6,
    11,
    7
);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

dirLight.shadow.camera.left = -15;
dirLight.shadow.camera.right = 15;
dirLight.shadow.camera.top = 15;
dirLight.shadow.camera.bottom = -15;

scene.add(dirLight);


const windWindowLight = new THREE.PointLight(
    0x7dd3fc,
    0.8,
    18
);

windWindowLight.position.set(
    -14,
    6,
    2
);

scene.add(windWindowLight);


const growLight = new THREE.PointLight(
    0xa855f7,
    1.6,
    8
);

growLight.position.set(
    0,
    5.5,
    0
);

scene.add(growLight);


// ============================================================
// MATERIALES DEL LABORATORIO
// ============================================================

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5e7eb,
    roughness: 0.55,
    metalness: 0.15
});


const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.8
});


const blueMaterial = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    roughness: 0.5
});


const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.3,
    metalness: 0.7
});


const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.25,
    metalness: 0.8
});


const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.18,
    roughness: 0.1,
    metalness: 0.1
});


// ============================================================
// FUNCIÓN PARA CREAR OBJETOS
// ============================================================

function addBox(
    width,
    height,
    depth,
    position,
    material,
    parent = scene
) {

    const geometry = new THREE.BoxGeometry(
        width,
        height,
        depth
    );

    const mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.position.set(
        position.x,
        position.y,
        position.z
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    parent.add(mesh);

    return mesh;
}


function addCylinder(
    radiusTop,
    radiusBottom,
    height,
    position,
    material,
    parent = scene
) {

    const geometry = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        32
    );

    const mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.position.set(
        position.x,
        position.y,
        position.z
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    parent.add(mesh);

    return mesh;
}


// ============================================================
// PISO
// ============================================================

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(
        32,
        32
    ),
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;

floor.receiveShadow = true;

scene.add(floor);


// ============================================================
// CUADRÍCULA DEL LABORATORIO
// ============================================================

const grid = new THREE.GridHelper(
    32,
    32,
    0x94a3b8,
    0xcbd5e1
);

grid.position.y = 0.01;

scene.add(grid);


// ============================================================
// PAREDES
// ============================================================

const rearWall = addBox(
    32,
    14,
    0.2,
    {
        x: 0,
        y: 7,
        z: -5.2
    },
    wallMaterial
);


const leftWall = addBox(
    0.2,
    14,
    24,
    {
        x: -12,
        y: 7,
        z: 0
    },
    wallMaterial
);


// ============================================================
// ZOCLO
// ============================================================

addBox(
    32,
    0.3,
    0.25,
    {
        x: 0,
        y: 0.15,
        z: -5.05
    },
    blueMaterial
);


// ============================================================
// VENTANA TRASERA
// ============================================================

const observationWindow = new THREE.Group();

observationWindow.position.set(
    0,
    7,
    -5.05
);

scene.add(observationWindow);


addBox(
    9,
    4,
    0.15,
    {
        x: 0,
        y: 0,
        z: 0
    },
    glassMaterial,
    observationWindow
);


const windowFrameMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.6,
        roughness: 0.3
    });


addBox(
    9.4,
    0.15,
    0.25,
    {
        x: 0,
        y: 2,
        z: 0.1
    },
    windowFrameMaterial,
    observationWindow
);


addBox(
    9.4,
    0.15,
    0.25,
    {
        x: 0,
        y: -2,
        z: 0.1
    },
    windowFrameMaterial,
    observationWindow
);


addBox(
    0.15,
    4,
    0.25,
    {
        x: -4.5,
        y: 0,
        z: 0.1
    },
    windowFrameMaterial,
    observationWindow
);


addBox(
    0.15,
    4,
    0.25,
    {
        x: 4.5,
        y: 0,
        z: 0.1
    },
    windowFrameMaterial,
    observationWindow
);


// ============================================================
// MESA PRINCIPAL
// ============================================================

addBox(
    8.8,
    0.2,
    2.6,
    {
        x: 0,
        y: 1.2,
        z: 0
    },
    darkMetalMaterial
);


const tableLegPositions = [
    [-3.8, 0.6, -0.9],
    [3.8, 0.6, -0.9],
    [-3.8, 0.6, 0.9],
    [3.8, 0.6, 0.9]
];


for (const [x, y, z] of tableLegPositions) {

    addCylinder(
        0.12,
        0.15,
        1.2,
        { x, y, z },
        metalMaterial
    );
}


// ============================================================
// LÁMPARA DE CRECIMIENTO
// ============================================================

addBox(
    7.5,
    0.15,
    0.6,
    {
        x: 0,
        y: 5.7,
        z: 0
    },
    darkMetalMaterial
);


const ledMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xc084fc,
    emissiveIntensity: 2
});


addBox(
    6.7,
    0.05,
    0.35,
    {
        x: 0,
        y: 5.6,
        z: 0
    },
    ledMaterial
);


addCylinder(
    0.04,
    0.04,
    1.1,
    {
        x: -2.5,
        y: 6.25,
        z: 0
    },
    darkMetalMaterial
);


addCylinder(
    0.04,
    0.04,
    1.1,
    {
        x: 2.5,
        y: 6.25,
        z: 0
    },
    darkMetalMaterial
);


// ============================================================
// MESA LATERAL IZQUIERDA
// ============================================================

addBox(
    3.6,
    0.2,
    2.4,
    {
        x: -6.8,
        y: 1.2,
        z: 0
    },
    darkMetalMaterial
);


const sideLegs = [
    [-8.2, 0.6, -0.9],
    [-5.4, 0.6, -0.9],
    [-8.2, 0.6, 0.9],
    [-5.4, 0.6, 0.9]
];


for (const [x, y, z] of sideLegs) {

    addCylinder(
        0.1,
        0.13,
        1.2,
        { x, y, z },
        metalMaterial
    );
}


// ============================================================
// CENTRÍFUGA
// ============================================================

addCylinder(
    0.7,
    0.7,
    0.75,
    {
        x: -6.8,
        y: 1.65,
        z: -0.3
    },
    darkMetalMaterial
);


addCylinder(
    0.58,
    0.58,
    0.08,
    {
        x: -6.8,
        y: 2.05,
        z: -0.3
    },
    metalMaterial
);


// ============================================================
// CAJA DE PORTAOBJETOS
// ============================================================

addBox(
    0.9,
    0.35,
    0.6,
    {
        x: -6.8,
        y: 1.48,
        z: 0.7
    },
    blueMaterial
);


// ============================================================
// MESA DERECHA
// ============================================================

addBox(
    3.6,
    0.2,
    2.4,
    {
        x: 6.8,
        y: 1.2,
        z: 0
    },
    darkMetalMaterial
);


const rightLegs = [
    [5.4, 0.6, -0.9],
    [8.2, 0.6, -0.9],
    [5.4, 0.6, 0.9],
    [8.2, 0.6, 0.9]
];


for (const [x, y, z] of rightLegs) {

    addCylinder(
        0.1,
        0.13,
        1.2,
        { x, y, z },
        metalMaterial
    );
}


// ============================================================
// MONITOR
// ============================================================

addCylinder(
    0.18,
    0.18,
    0.7,
    {
        x: 6.8,
        y: 1.65,
        z: 0
    },
    darkMetalMaterial
);


addBox(
    2.4,
    1.5,
    0.15,
    {
        x: 6.8,
        y: 2.55,
        z: 0
    },
    darkMetalMaterial
);


const monitorScreenMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.45
    });


addBox(
    2.05,
    1.15,
    0.03,
    {
        x: 6.8,
        y: 2.55,
        z: -0.08
    },
    monitorScreenMaterial
);


addBox(
    1.4,
    0.12,
    0.65,
    {
        x: 6.8,
        y: 1.48,
        z: 0.55
    },
    metalMaterial
);


// ============================================================
// MICROSCOPO GLB
// ============================================================

const gltfLoader = new GLTFLoader();

gltfLoader.load(
    'assets/microscope.glb',

    function (gltf) {

        const microscope = gltf.scene;

        microscope.scale.set(
            0.9,
            0.9,
            0.9
        );

        microscope.position.set(
            -6.8,
            1.48,
            0.65
        );

        microscope.rotation.y =
            Math.PI * 0.15;

        microscope.traverse(
            function (child) {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }

            }
        );

        scene.add(microscope);

    },

    undefined,

    function (error) {

        console.error(
            'No se pudo cargar microscope.glb:',
            error
        );

    }
);


// ============================================================
// RAYCASTING
// ============================================================

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

const clickableParts = [];

let selectedObject = null;


// ============================================================
// DATOS DE LAS PLANTAS
// ============================================================

const plantRecords = [];

let leavesArray = [];


// ============================================================
// TEXTURA DE HOJA
// ============================================================

const textureLoader = new THREE.TextureLoader();

const leafTexture =
    textureLoader.load(
        'assets/leaf.png'
    );

leafTexture.colorSpace =
    THREE.SRGBColorSpace;


// ============================================================
// SHADER DE VIENTO
// ============================================================

const windUniforms = {

    uTime: {
        value: 0
    },

    uWindStrength: {
        value: 0.5
    },

    uColor: {
        value: new THREE.Color(
            0x16a34a
        )
    },

    uTexture: {
        value: leafTexture
    }

};


const leafVertexShader = `

uniform float uTime;
uniform float uWindStrength;

varying vec2 vUv;

void main() {

    vUv = uv;

    vec3 transformed = position;

    float wave =
        sin(
            uTime * 2.0
            + position.y * 10.0
            + position.x * 5.0
        );

    float movement =
        wave
        * uWindStrength
        * uv.y;

    transformed.x += movement;

    transformed.z +=
        cos(
            uTime * 1.5
            + position.x * 5.0
        )
        * uWindStrength
        * 0.35
        * uv.y;

    gl_Position =
        projectionMatrix
        * modelViewMatrix
        * vec4(
            transformed,
            1.0
        );

}

`;


const leafFragmentShader = `

uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv;

void main() {

    vec4 textureColor =
        texture2D(
            uTexture,
            vUv
        );

    if (textureColor.a < 0.1) {
        discard;
    }

    vec3 finalColor =
        textureColor.rgb
        * uColor;

    gl_FragColor =
        vec4(
            finalColor,
            textureColor.a
        );

}

`;


const leafShaderMaterial =
    new THREE.ShaderMaterial({

        uniforms: windUniforms,

        vertexShader:
            leafVertexShader,

        fragmentShader:
            leafFragmentShader,

        transparent: true,

        side: THREE.DoubleSide

    });


// ============================================================
// FUNCIÓN PARA REGISTRAR OBJETOS CLICKEABLES
// ============================================================

function tagPart(
    mesh,
    name,
    desc,
    growthType = 'structure'
) {

    mesh.userData.name = name;

    mesh.userData.geoName =
        mesh.geometry.type;

    mesh.userData.desc = desc;

    mesh.userData.growthType =
        growthType;

    mesh.userData.growthPercent = 0;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    clickableParts.push(mesh);

    return mesh;
}


// ============================================================
// CREAR PLANTA
// ============================================================

function createLilyPlant(
    posX,
    posZ,
    scale = 1,
    plantId = 1,
    specimenCode = 'LC-01'
) {

    const plantRoot =
        new THREE.Group();

    plantRoot.position.set(
        posX,
        1.3,
        posZ
    );

    plantRoot.scale.setScalar(
        scale
    );

    scene.add(
        plantRoot
    );


    // --------------------------------------------------------
    // REGISTRO
    // --------------------------------------------------------

    const record = {

        id: plantId,

        code: specimenCode,

        root: plantRoot,

        stemGroup: null,

        stemMesh: null,

        branches: [],

        leaves: [],

        flowers: [],

        growth: 0,

        growthOffset:
            (plantId - 1) * 0.7

    };


    plantRecords.push(
        record
    );


    // --------------------------------------------------------
    // MACETA
    // --------------------------------------------------------

    const potMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x9a3412,
            roughness: 0.75
        });


    const pot = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.75,
            0.52,
            1.1,
            32
        ),

        potMaterial

    );

    pot.position.y =
        0.55;

    plantRoot.add(
        pot
    );


    tagPart(
        pot,
        `Maceta ${specimenCode}`,
        'Contenedor que sostiene el sustrato y permite el desarrollo de la planta.'
    );


    // --------------------------------------------------------
    // BORDE DE MACETA
    // --------------------------------------------------------

    const rim =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                0.75,
                0.06,
                12,
                32
            ),

            potMaterial

        );

    rim.rotation.x =
        Math.PI / 2;

    rim.position.y =
        1.1;

    plantRoot.add(
        rim
    );


    tagPart(
        rim,
        `Borde de maceta ${specimenCode}`,
        'Borde superior que delimita y protege el sustrato.'
    );


    // --------------------------------------------------------
    // TIERRA
    // --------------------------------------------------------

    const soilMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x422006,
            roughness: 1
        });


    const soil =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.68,
                0.60,
                0.1,
                32
            ),

            soilMaterial

        );

    soil.position.y =
        1.0;

    plantRoot.add(
        soil
    );


    tagPart(
        soil,
        `Sustrato ${specimenCode}`,
        'Medio donde se encuentran las raíces y del cual la planta obtiene agua y nutrientes.'
    );


    // --------------------------------------------------------
    // GRUPO PRINCIPAL DEL TALLO
    // --------------------------------------------------------

    const stemGroup =
        new THREE.Group();

    stemGroup.position.y =
        1.1;

    plantRoot.add(
        stemGroup
    );

    record.stemGroup =
        stemGroup;


    // --------------------------------------------------------
    // GRUPO DE CRECIMIENTO DEL TALLO
    // --------------------------------------------------------

    const stemGrowthGroup =
        new THREE.Group();

    stemGroup.add(
        stemGrowthGroup
    );


    // --------------------------------------------------------
    // TALLO
    // --------------------------------------------------------

    const stemHeight =
        1.85;


    const stemMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x15803d,
            roughness: 0.6
        });


    const stem =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.06,
                0.08,
                stemHeight,
                16
            ),

            stemMaterial

        );


    stem.position.y =
        stemHeight / 2;


    stemGrowthGroup.add(
        stem
    );


    tagPart(
        stem,
        `Tallo ${specimenCode}`,
        'Estructura que sostiene hojas y flores y transporta agua y nutrientes.',
        'stem'
    );


    record.stemMesh =
        stem;


    // El grupo crece desde su base
    stemGrowthGroup.scale.y =
        0;


    // --------------------------------------------------------
    // RAMAS
    // --------------------------------------------------------

    const branchAngles = [
        -0.75,
        0,
        0.75
    ];


    const branchHeights = [
        0.65,
        1.05,
        1.38
    ];


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const branchGroup =
            new THREE.Group();

        branchGroup.position.set(
            0,
            branchHeights[i],
            0
        );

        branchGroup.rotation.z =
            branchAngles[i];

        stemGrowthGroup.add(
            branchGroup
        );


        const branch =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.035,
                    0.05,
                    0.6,
                    12
                ),

                stemMaterial

            );


        branch.position.y =
            0.3;


        branch.rotation.z =
            Math.PI / 2;


        branchGroup.add(
            branch
        );


        tagPart(
            branch,
            `Rama ${i + 1} ${specimenCode}`,
            'Rama lateral que distribuye hojas y permite ampliar la superficie fotosintética.',
            'branch'
        );


        branchGroup.scale.set(
            0,
            0,
            0
        );


        record.branches.push({
            group: branchGroup,
            mesh: branch
        });

    }


    // --------------------------------------------------------
    // HOJAS
    // --------------------------------------------------------

    const leafGeometry =
        new THREE.SphereGeometry(
            0.28,
            16,
            12
        );


    leafGeometry.scale(
        1.75,
        0.12,
        0.55
    );


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const leafNode =
            new THREE.Group();


        const height =
            0.35
            + i * 0.23;


        leafNode.position.set(
            0,
            height,
            0
        );


        leafNode.rotation.y =
            i * 0.9;


        stemGrowthGroup.add(
            leafNode
        );


        const leaf =
            new THREE.Mesh(

                leafGeometry,

                leafShaderMaterial

            );


        leaf.position.x =
            0.32;


        leaf.rotation.z =
            -0.22;


        leafNode.add(
            leaf
        );


        tagPart(
            leaf,
            `Hoja ${i + 1} ${specimenCode}`,
            'Órgano especializado en la fotosíntesis, intercambio gaseoso y transpiración.',
            'leaf'
        );


        leaf.userData.baseColor =
            new THREE.Color(
                0x16a34a
            );


        leafNode.scale.set(
            0,
            0,
            0
        );


        record.leaves.push({
            node: leafNode,
            mesh: leaf,
            index: i
        });

        leavesArray.push(
            leaf
        );

    }


    // --------------------------------------------------------
    // FLORES
    // --------------------------------------------------------

    const flowerGroup =
        new THREE.Group();

    flowerGroup.position.y =
        stemHeight;

    stemGrowthGroup.add(
        flowerGroup
    );


    const flowerMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            roughness: 0.4,
            side: THREE.DoubleSide
        });


    const centerMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xfacc15,
            roughness: 0.5
        });


    const pistil =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                0.14,
                0.35,
                16
            ),

            centerMaterial

        );


    pistil.position.y =
        0.2;


    flowerGroup.add(
        pistil
    );


    tagPart(
        pistil,
        `Pistilo ${specimenCode}`,
        'Estructura reproductiva central de la flor.'
    );


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const petal =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    0.28,
                    0.95,
                    16
                ),

                flowerMaterial

            );


        const angle =
            (Math.PI * 2 / 6) * i;


        petal.position.set(
            Math.cos(angle) * 0.38,
            0.2,
            Math.sin(angle) * 0.38
        );


        petal.rotation.z =
            -Math.PI / 4;


        petal.rotation.y =
            angle;


        petal.scale.z =
            0.18;


        flowerGroup.add(
            petal
        );


        tagPart(
            petal,
            `Pétalo ${i + 1} ${specimenCode}`,
            'Parte floral que contribuye a atraer polinizadores.'
        );

    }


    flowerGroup.scale.set(
        0,
        0,
        0
    );


    record.flowers.push(
        flowerGroup
    );


    // --------------------------------------------------------
    // ETIQUETA DEL ESPÉCIMEN
    // --------------------------------------------------------

    const tagMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xf8fafc
        });


    const tag =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1.2,
                0.45,
                0.08
            ),

            tagMaterial

        );


    tag.position.set(
        0,
        0.18,
        0.82
    );


    plantRoot.add(
        tag
    );


    return record;

}


// ============================================================
// CREAR LAS TRES PLANTAS
// ============================================================

createLilyPlant(
    -2.4,
    0,
    0.92,
    1,
    'LC-Alfa'
);


createLilyPlant(
    0,
    0,
    1.05,
    2,
    'LC-Control'
);


createLilyPlant(
    2.4,
    0,
    0.95,
    3,
    'LC-Beta'
);


// ============================================================
// FUNCIONES DE CRECIMIENTO
// ============================================================

function easeOutCubic(t) {

    return 1 -
        Math.pow(
            1 - t,
            3
        );

}


function clamp01(value) {

    return Math.max(
        0,
        Math.min(
            1,
            value
        )
    );

}


function updatePlantGrowth(
    record,
    globalProgress
) {

    const progress =
        clamp01(
            globalProgress
            + record.growthOffset * 0.08
        );


    record.growth =
        progress;


    // --------------------------------------------------------
    // TALLO
    // --------------------------------------------------------

    const stemProgress =
        clamp01(
            progress / 0.45
        );


    const stemEased =
        easeOutCubic(
            stemProgress
        );


    record.stemMesh.parent.scale.y =
        stemEased;


    record.stemMesh.userData.growthPercent =
        Math.round(
            stemEased * 100
        );


    // --------------------------------------------------------
    // RAMAS
    // --------------------------------------------------------

    record.branches.forEach(
        (branchData, index) => {

            const branchStart =
                0.30
                + index * 0.12;


            const branchProgress =
                clamp01(
                    (progress - branchStart)
                    / 0.30
                );


            const branchEased =
                easeOutCubic(
                    branchProgress
                );


            const visibleBranches =
                currentBranchCount;


            if (
                index < visibleBranches
            ) {

                branchData.group.scale.set(
                    branchEased,
                    branchEased,
                    branchEased
                );

                branchData.group.visible =
                    true;

            } else {

                branchData.group.scale.set(
                    0,
                    0,
                    0
                );

                branchData.group.visible =
                    false;

            }


            branchData.mesh.userData.growthPercent =
                Math.round(
                    branchEased * 100
                );

        }
    );


    // --------------------------------------------------------
    // HOJAS
    // --------------------------------------------------------

    record.leaves.forEach(
        (leafData, index) => {

            const leafStart =
                0.42
                + index * 0.045;


            const leafProgress =
                clamp01(
                    (progress - leafStart)
                    / 0.25
                );


            const leafEased =
                easeOutCubic(
                    leafProgress
                );


            leafData.node.scale.set(
                leafEased,
                leafEased,
                leafEased
            );


            leafData.mesh.userData.growthPercent =
                Math.round(
                    leafEased * 100
                );

        }
    );


    // --------------------------------------------------------
    // FLORACIÓN
    // --------------------------------------------------------

    const flowerProgress =
        clamp01(
            (progress - 0.70)
            / 0.30
        );


    const flowerEased =
        easeOutCubic(
            flowerProgress
        );


    record.flowers.forEach(
        flower => {

            flower.scale.set(
                flowerEased,
                flowerEased,
                flowerEased
            );

        }
    );

}


// ============================================================
// VARIABLES DE SIMULACIÓN
// ============================================================

let growthSpeed = 1.0;

let windStrength = 0.5;

let currentBranchCount = 3;

let globalGrowth =
    0;

let isPaused =
    false;

let leafVisible =
    true;

let colorIndex =
    0;


const leafColors = [

    0x16a34a,
    0x84cc16,
    0x06b6d4,
    0x15803d

];


// ============================================================
// REINICIAR CRECIMIENTO
// ============================================================

function resetGrowth() {

    globalGrowth = 0;

    for (
        const record
        of plantRecords
    ) {

        record.growth =
            0;

        record.stemMesh.parent.scale.y =
            0;

        for (
            const branch
            of record.branches
        ) {

            branch.group.scale.set(
                0,
                0,
                0
            );

        }

        for (
            const leaf
            of record.leaves
        ) {

            leaf.node.scale.set(
                0,
                0,
                0
            );

        }

        for (
            const flower
            of record.flowers
        ) {

            flower.scale.set(
                0,
                0,
                0
            );

        }

    }

}


// ============================================================
// RAYCASTING
// ============================================================

renderer.domElement.addEventListener(
    'pointerdown',
    onPointerDown
);


function onPointerDown(event) {

    if (
        event.target.closest(
            '.hud-card'
        )
    ) {

        return;

    }


    const rect =
        renderer.domElement.getBoundingClientRect();


    mouse.x =
        (
            (event.clientX - rect.left)
            / rect.width
        ) * 2 - 1;


    mouse.y =
        -(
            (event.clientY - rect.top)
            / rect.height
        ) * 2 + 1;


    raycaster.setFromCamera(
        mouse,
        camera
    );


    const intersections =
        raycaster.intersectObjects(
            clickableParts,
            false
        );


    if (
        intersections.length === 0
    ) {

        return;

    }


    const object =
        intersections[0].object;


    // Restaurar selección anterior
    if (
        selectedObject
    ) {

        restoreObjectColor(
            selectedObject
        );

    }


    selectedObject =
        object;


    highlightObject(
        object
    );


    updateInfoPanel(
        object
    );

}


// ============================================================
// SELECCIÓN VISUAL
// ============================================================

function highlightObject(
    object
) {

    if (
        object.material
        &&
        object.material.uniforms
        &&
        object.material.uniforms.uColor
    ) {

        object.userData.previousColor =
            object.material.uniforms.uColor.value.clone();

        object.material.uniforms.uColor.value.set(
            0x22d3ee
        );

    }

    else if (
        object.material
        &&
        object.material.color
    ) {

        object.userData.previousColor =
            object.material.color.clone();

        object.material.color.set(
            0x22d3ee
        );

    }

}


function restoreObjectColor(
    object
) {

    if (
        object.material
        &&
        object.material.uniforms
        &&
        object.material.uniforms.uColor
        &&
        object.userData.previousColor
    ) {

        object.material.uniforms.uColor.value.copy(
            object.userData.previousColor
        );

    }

    else if (
        object.material
        &&
        object.material.color
        &&
        object.userData.previousColor
    ) {

        object.material.color.copy(
            object.userData.previousColor
        );

    }

}


// ============================================================
// PANEL DE INFORMACIÓN
// ============================================================

function updateInfoPanel(
    object
) {

    const data =
        object.userData;


    document
        .getElementById('hint-text')
        .classList.add(
            'hidden'
        );


    document
        .getElementById('plant-data')
        .classList.remove(
            'hidden'
        );


    document
        .getElementById('part-name')
        .textContent =
        data.name;


    document
        .getElementById('part-geo')
        .textContent =
        data.geoName;


    document
        .getElementById('part-growth')
        .textContent =
        `${data.growthPercent || 0}%`;


    document
        .getElementById('part-height')
        .textContent =
        `${object.getWorldPosition(
            new THREE.Vector3()
        ).y.toFixed(2)} m`;


    document
        .getElementById('part-desc')
        .textContent =
        data.desc;


    document
        .getElementById('growth-progress')
        .style.width =
        `${data.growthPercent || 0}%`;

}


// ============================================================
// CONTROLES HTML
// ============================================================

const growthSlider =
    document.getElementById(
        'slider-growth'
    );


const growthValue =
    document.getElementById(
        'growth-val'
    );


growthSlider.addEventListener(
    'input',
    () => {

        growthSpeed =
            Number(
                growthSlider.value
            );

        growthValue.textContent =
            `${growthSpeed.toFixed(1)}x`;

    }
);


// ============================================================
// RAMAS
// ============================================================

const branchesSlider =
    document.getElementById(
        'slider-branches'
    );


const branchesValue =
    document.getElementById(
        'branches-val'
    );


branchesSlider.addEventListener(
    'input',
    () => {

        currentBranchCount =
            Number(
                branchesSlider.value
            );

        branchesValue.textContent =
            currentBranchCount;

    }
);


// ============================================================
// VIENTO
// ============================================================

const windSlider =
    document.getElementById(
        'slider-wind'
    );


const windValue =
    document.getElementById(
        'wind-val'
    );


const windStatus =
    document.getElementById(
        'wind-status'
    );


windSlider.addEventListener(
    'input',
    () => {

        windStrength =
            Number(
                windSlider.value
            );

        windUniforms
            .uWindStrength
            .value =
            windStrength;

        windValue.textContent =
            windStrength.toFixed(1);

        windStatus.textContent =
            windStrength.toFixed(1);

    }
);


// ============================================================
// LUZ
// ============================================================

const lightSlider =
    document.getElementById(
        'slider-light'
    );


const lightValue =
    document.getElementById(
        'light-val'
    );


lightSlider.addEventListener(
    'input',
    () => {

        dirLight.intensity =
            Number(
                lightSlider.value
            );

        lightValue.textContent =
            dirLight.intensity.toFixed(1);

    }
);


// ============================================================
// PAUSAR / REANUDAR
// ============================================================

const toggleAnimationButton =
    document.getElementById(
        'btn-toggle-anim'
    );


const simulationState =
    document.getElementById(
        'simulation-state'
    );


toggleAnimationButton.addEventListener(
    'click',
    () => {

        isPaused =
            !isPaused;


        if (isPaused) {

            toggleAnimationButton.textContent =
                '▶️ Reanudar';

            simulationState.textContent =
                'Pausado';

        }

        else {

            toggleAnimationButton.textContent =
                '⏸️ Pausar';

            simulationState.textContent =
                'Creciendo';

        }

    }
);


// ============================================================
// REINICIAR CRECIMIENTO
// ============================================================

document
    .getElementById(
        'btn-reset-growth'
    )
    .addEventListener(
        'click',
        () => {

            resetGrowth();

            simulationState.textContent =
                'Reiniciado';

        }
    );


// ============================================================
// CAMBIAR COLOR DE HOJAS
// ============================================================

document
    .getElementById(
        'btn-color-leaves'
    )
    .addEventListener(
        'click',
        () => {

            colorIndex =
                (
                    colorIndex + 1
                )
                % leafColors.length;


            const newColor =
                new THREE.Color(
                    leafColors[
                        colorIndex
                    ]
                );


            windUniforms
                .uColor
                .value.copy(
                    newColor
                );


            for (
                const leaf
                of leavesArray
            ) {

                leaf.userData.baseColor =
                    newColor.clone();

            }

        }
    );


// ============================================================
// OCULTAR / MOSTRAR HOJAS
// ============================================================

const toggleLeavesButton =
    document.getElementById(
        'btn-toggle-leaves'
    );


toggleLeavesButton.addEventListener(
    'click',
    () => {

        leafVisible =
            !leafVisible;


        for (
            const record
            of plantRecords
        ) {

            for (
                const leaf
                of record.leaves
            ) {

                leaf.node.visible =
                    leafVisible;

            }

        }


        toggleLeavesButton.textContent =
            leafVisible
                ? '👁️ Ocultar hojas'
                : '👁️ Mostrar hojas';

    }
);


// ============================================================
// REINICIAR CÁMARA
// ============================================================

document
    .getElementById(
        'btn-reset-cam'
    )
    .addEventListener(
        'click',
        () => {

            camera.position.copy(
                initialCameraPosition
            );

            controls.target.set(
                0,
                2.1,
                0
            );

            controls.update();

        }
    );


// ============================================================
// ANIMACIÓN
// ============================================================

const clock =
    new THREE.Clock();


let elapsedTime =
    0;


function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        clock.getDelta();


    if (!isPaused) {

        elapsedTime +=
            delta;


        // --------------------------------------------
        // CRECIMIENTO GENERAL
        // --------------------------------------------

        globalGrowth =
            Math.min(
                1,
                globalGrowth
                + delta
                * 0.075
                * growthSpeed
            );


        for (
            const record
            of plantRecords
        ) {

            updatePlantGrowth(
                record,
                globalGrowth
            );

        }


        // --------------------------------------------
        // MOVIMIENTO DEL TALLO
        // --------------------------------------------

        for (
            const record
            of plantRecords
        ) {

            const windTime =
                elapsedTime
                * 1.5;


            record.stemGroup.rotation.z =
                Math.sin(
                    windTime
                    + record.id * 1.7
                )
                * 0.035
                * windStrength;


            record.stemGroup.rotation.x =
                Math.cos(
                    elapsedTime * 1.1
                    + record.id
                )
                * 0.02
                * windStrength;


            // ----------------------------------------
            // MOVIMIENTO DE RAMAS
            // ----------------------------------------

            record.branches.forEach(
                (branchData, index) => {

                    if (
                        branchData.group.visible
                    ) {

                        branchData.group.rotation.x =
                            Math.sin(
                                elapsedTime * 2
                                + index
                            )
                            * 0.05
                            * windStrength;

                    }

                }
            );

        }


        // --------------------------------------------
        // SHADER DE HOJAS
        // --------------------------------------------

        windUniforms
            .uTime
            .value =
            elapsedTime;


        // --------------------------------------------
        // ESTADO GENERAL
        // --------------------------------------------

        document
            .getElementById(
                'global-growth'
            )
            .textContent =
            `${Math.round(
                globalGrowth * 100
            )}%`;

    }


    // Actualizar panel seleccionado
    if (
        selectedObject
    ) {

        updateInfoPanel(
            selectedObject
        );

    }


    controls.update();

    renderer.render(
        scene,
        camera
    );

}


animate();


// ============================================================
// RESIZE
// ============================================================

window.addEventListener(
    'resize',
    () => {

        camera.aspect =
            window.innerWidth
            / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);