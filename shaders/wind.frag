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