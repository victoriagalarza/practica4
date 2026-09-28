# Práctica 04 — Crecimiento

## Breve descripción

El proyecto representa un **laboratorio de crecimiento vegetal en 3D**, donde se pueden observar tres plantas en diferentes etapas de desarrollo. La simulación permite controlar la velocidad de crecimiento, el viento, las ramas y otros elementos mientras las plantas crecen de manera progresiva. También se incluyen objetos de laboratorio para crear un entorno más completo, como mesas, lámpara de crecimiento, centrífuga, monitor y microscopio.

### ¿Qué tema representa tu simulador de crecimiento?

El simulador representa el **crecimiento y desarrollo de una planta dentro de un laboratorio de observación**. La planta comienza con el tallo y posteriormente aparecen las ramas, hojas y flores.

### ¿Cómo implementaste el bucle de animación con `requestAnimationFrame`?

Se utilizó `requestAnimationFrame()` dentro de la función `animate()`. Esta función se ejecuta continuamente para actualizar el crecimiento, el movimiento del viento, los controles y finalmente renderizar la escena en cada cuadro.

```javascript
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (!isPaused) {
        elapsedTime += delta;
        globalGrowth += delta * 0.075 * growthSpeed;

        if (globalGrowth > 1) {
            globalGrowth = 1;
        }

        plantRecords.forEach(record => {
            updatePlantGrowth(record, globalGrowth);
        });
    }

    controls.update();
    renderer.render(scene, camera);
}
```

### ¿Cómo animaste el crecimiento de la planta?

El crecimiento se realizó principalmente mediante **escalado de los objetos**. El tallo comienza con una escala vertical de cero y aumenta progresivamente hasta alcanzar su tamaño final. Después aparecen las ramas y las hojas, y finalmente la flor.

También se utiliza la posición de los objetos dentro de la jerarquía para que las diferentes partes acompañen el crecimiento del tallo. Se aplicó una función de suavizado para que el crecimiento no fuera completamente lineal y se viera más natural.

### ¿Cómo simulaste el viento?

Se utilizaron principalmente **transformaciones de rotación** mediante funciones `Math.sin()` y `Math.cos()` para producir movimientos continuos en tallos y ramas.

Además, se implementó un **shader GLSL personalizado para las hojas**, que modifica ligeramente la posición de sus vértices para generar un movimiento similar al producido por el viento.

### ¿Qué controles agregaste para modificar la simulación?

Se agregaron controles para:

* Modificar la velocidad de crecimiento.
* Cambiar la cantidad de ramas.
* Ajustar la intensidad del viento.
* Modificar la intensidad de la lámpara.
* Pausar y continuar la simulación.
* Reiniciar el crecimiento.
* Cambiar el color de las hojas.
* Mostrar u ocultar las hojas.
* Reiniciar la posición de la cámara.

También se agregó interacción mediante **raycasting** para seleccionar partes de la planta y mostrar información sobre ellas.

### ¿Cómo gestionaste la jerarquía para que el crecimiento se propague?

Se utilizaron objetos `THREE.Group` para crear una jerarquía entre las diferentes partes de cada planta.

La estructura principal es:

```text
Planta
└── Tallo
    ├── Ramas
    ├── Hojas
    └── Flor
        ├── Pistilo
        └── Pétalos
```

De esta forma, las ramas, hojas y flores dependen de la estructura del tallo. Esto permite que al crecer el tallo también cambie la posición de los elementos que se encuentran dentro de su grupo.

### ¿Qué shader personalizado usaste y qué efecto produce?

Se utilizó un shader GLSL compuesto por un **vertex shader** y un **fragment shader**.

El vertex shader modifica ligeramente las coordenadas de los vértices mediante funciones sinusoidales, creando un movimiento ondulatorio en las hojas. La intensidad de este movimiento se controla mediante `uWindStrength`.

El fragment shader utiliza la textura de la hoja y permite modificar su color mediante `uColor`.

Los archivos de referencia del shader se encuentran en:

```text
shaders/
├── wind.vert
└── wind.frag
```

### ¿Qué parte del proyecto fue la más difícil?

La parte más difícil fue coordinar las diferentes etapas del crecimiento para que los elementos no aparecieran todos al mismo tiempo. Fue necesario controlar por separado el tallo, las ramas, las hojas y la flor, además de organizar correctamente su jerarquía.

También fue necesario ajustar el movimiento del viento para que fuera visible pero no demasiado exagerado.

### ¿Cómo podría mejorar este simulador con PHP, FlightPHP y SQLite?

El simulador podría conectarse posteriormente con un backend desarrollado con **PHP y FlightPHP**, utilizando **SQLite** para almacenar información.

Se podrían guardar las configuraciones utilizadas en cada simulación, como la velocidad de crecimiento, intensidad del viento y cantidad de ramas. También podría registrarse un historial de simulaciones y crearse un catálogo de diferentes especies de plantas, cada una con sus propios parámetros de crecimiento.

De esta manera, el proyecto pasaría de ser solamente una demostración 3D a convertirse en un pequeño sistema para almacenar, consultar y comparar diferentes simulaciones de crecimiento.
