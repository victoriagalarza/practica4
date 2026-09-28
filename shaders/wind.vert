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