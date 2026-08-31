export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;

    vec2 mouse = u_mouse;
    mouse.x *= aspect;

    float mouseDistance = distance(uv, mouse);

    float mouseInfluence = 1.0 - smoothstep(
      0.0,
      0.65,
      mouseDistance
    );

    float wave = sin(
      uv.y * 7.0 +
      u_time * 1.4
    );

    uv.x += wave * 0.08;
    uv.x += mouseInfluence * 0.32;

    float mouseWave = sin(
      mouseDistance * 18.0 -
      u_time * 2.0
    );

    uv.x += mouseWave * mouseInfluence * 0.08;

    vec3 deepPink = vec3(
      0.937,
      0.627,
      0.722
    );

    vec3 wardPink = vec3(
      1.0,
      0.784,
      0.867
    );

    vec3 softPink = vec3(
      1.0,
      0.910,
      0.941
    );

    vec3 white = vec3(
      1.0,
      1.0,
      1.0
    );

    float topGradient = smoothstep(
      0.0,
      0.72,
      vUv.y
    );

    vec3 color = mix(
      deepPink,
      wardPink,
      topGradient
    );

    float whiteGradient = smoothstep(
      0.48,
      1.0,
      vUv.y
    );

    color = mix(
      color,
      softPink,
      whiteGradient * 0.75
    );

    color = mix(
      color,
      white,
      whiteGradient * 0.35
    );

    float highlight = sin(
      uv.x * 4.0 +
      u_time * 1.15
    );

    highlight = highlight * 0.5 + 0.5;

    color = mix(
      color,
      white,
      highlight * 0.07
    );

    color += mouseInfluence * vec3(
      0.16,
      0.04,
      0.08
    );

    gl_FragColor = vec4(
      color,
      1.0
    );
  }
`;
