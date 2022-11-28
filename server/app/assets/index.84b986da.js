const w = function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
        c(o);
    new MutationObserver(o=>{
        for (const r of o)
            if (r.type === "childList")
                for (const n of r.addedNodes)
                    n.tagName === "LINK" && n.rel === "modulepreload" && c(n)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function x(o) {
        const r = {};
        return o.integrity && (r.integrity = o.integrity),
        o.referrerpolicy && (r.referrerPolicy = o.referrerpolicy),
        o.crossorigin === "use-credentials" ? r.credentials = "include" : o.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
        r
    }
    function c(o) {
        if (o.ep)
            return;
        o.ep = !0;
        const r = x(o);
        fetch(o.href, r)
    }
};
w();
function A(t) {
    function e(o, r) {
        const n = t.createShader(o);
        if (!n)
            throw new Error("createShader failed");
        if (t.shaderSource(n, r),
        t.compileShader(n),
        !t.getShaderParameter(n, t.COMPILE_STATUS))
            throw console.log(t.getShaderInfoLog(n)),
            t.deleteShader(n),
            new Error("compilation error");
        return n
    }
    function x(o, r) {
        const n = t.createProgram();
        if (!n)
            throw new Error("createProgram failed");
        if (t.attachShader(n, e(t.VERTEX_SHADER, o)),
        t.attachShader(n, e(t.FRAGMENT_SHADER, r)),
        t.linkProgram(n),
        !t.getProgramParameter(n, t.LINK_STATUS))
            throw console.log(t.getProgramInfoLog(n)),
            t.deleteProgram(n),
            new Error("link error");
        return n
    }
    function c(o, r, n) {
        const a = t.getUniformLocation(o, r);
        switch (a === null && console.log(`Uniform ${r} not found`),
        n) {
        case 1:
            return {
                set: (...i)=>t.uniform1f(a, i[0])
            };
        case 2:
            return {
                set: (...i)=>t.uniform2f(a, i[0], i[1])
            };
        case 3:
            return {
                set: (...i)=>t.uniform3f(a, i[0], i[1], i[2])
            };
        case 4:
            return {
                set: (...i)=>t.uniform4f(a, i[0], i[1], i[2], i[3])
            }
        }
        return {}
    }
    return {
        createProgram: x,
        createUniform: c
    }
}
const E = `#version 300 es

in vec4 a_position;
in vec2 a_texcoord;
out vec2 v_texcoord;


uniform mat4 u_matrix;

void main() {
   gl_Position = u_matrix * a_position;
   v_texcoord = a_texcoord;
}`
  , L = `#version 300 es

precision highp float;

in vec2 v_texcoord;
uniform sampler2D u_texture;
uniform vec3 u_mouse;
uniform float u_time;
uniform vec3 u_color;
uniform float u_brushsize;
out vec4 outColor;

vec3 artistictouch(in vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

float creativity(vec2 co) {
  float a = 12.9891;
  float b = 178.233;
  float c = 43758.5453;
  float dt = dot(co.xy, vec2(a, b));
  float sn = mod(dt, 3.14);
  return fract(sin(sn) * c);
}

float cellCount = 24.;

float Cp2(float x, float r) {
  return clamp(x * x + r * r, 0., 1.);
}

vec3 captcha(vec2 uv) {
  float x = uv.x;
  float y = uv.y;
  float v = Cp2(y - 143., (x - 221.));
  v *= Cp2(y - 247., (x - 153.) * (x - 289.) * (x - 136.) * (x - 221.) * (x - 170.) * (x - 357.) * (x - 102.) * (x - 238.) * (x - 204.));
  v *= Cp2(y - 208., (x - 170.) * (x - 272.) * (x - 340.) * (x - 306.) * (x - 85.) * (x - 102.) * (x - 238.) * (x - 221.) * (x - 34.) * (x - 68.));
  v *= Cp2(y - 52., (x - 221.) * (x - 289.) * (x - 136.) * (x - 238.) * (x - 170.) * (x - 374.) * (x - 306.) * (x - 85.) * (x - 17.) * x * (x - 340.) * (x - 34.) * (x - 102.) * (x - 272.));
  v *= Cp2(y - 91., (x - 374.) * (x - 340.) * (x - 85.) * (x - 357.) * (x - 153.) * (x - 204.) * (x - 136.) * (x - 170.) * (x - 238.));
  v *= Cp2(y - 104., (x - 204.) * (x - 340.) * (x - 136.) * (x - 170.) * (x - 238.) * (x - 374.) * (x - 68.));
  v *= Cp2(y - 234., (x - 17.) * (x - 68.) * (x - 102.) * (x - 340.) * (x - 85.) * (x - 357.) * (x - 289.));
  v *= Cp2(y - 195., (x - 357.) * (x - 102.) * (x - 204.) * (x - 289.) * (x - 340.) * (x - 34.) * (x - 221.) * (x - 153.) * (x - 272.));
  v *= Cp2(y - 169., (x - 221.) * (x - 238.) * (x - 204.) * (x - 170.) * (x - 136.) * (x - 357.) * (x - 153.) * (x - 340.) * (x - 85.) * (x - 102.) * x * (x - 289.) * (x - 34.) * (x - 272.));
  v *= Cp2(y - 78., (x - 374.) * (x - 340.) * (x - 85.) * (x - 102.) * (x - 136.) * (x - 170.));
  v *= Cp2(y - 0., x * (x - 340.) * (x - 136.));
  v *= Cp2(y - 182., (x - 153.) * (x - 374.) * (x - 238.) * (x - 204.) * (x - 68.) * x * (x - 85.) * (x - 306.) * (x - 340.) * (x - 272.) * (x - 34.) * (x - 17.));
  v *= Cp2(y - 156., (x - 153.) * (x - 34.) * x);
  v *= Cp2(y - 130., (x - 374.) * (x - 289.) * (x - 34.) * (x - 272.) * (x - 136.) * (x - 17.) * (x - 102.) * (x - 238.) * (x - 170.) * (x - 306.) * (x - 85.) * x * (x - 340.));
  v *= Cp2(y - 260., (x - 17.) * (x - 102.) * (x - 85.) * (x - 68.) * (x - 136.) * (x - 374.) * (x - 289.) * (x - 238.) * (x - 204.));
  v *= Cp2(y - 26., (x - 204.) * (x - 272.) * (x - 374.) * (x - 136.) * (x - 153.) * (x - 68.) * (x - 238.) * (x - 340.) * (x - 102.) * x);
  v *= Cp2(y - 13., (x - 136.) * (x - 221.) * (x - 272.) * x * (x - 68.) * (x - 238.) * (x - 102.) * (x - 340.) * (x - 85.) * (x - 306.) * (x - 289.));
  v *= Cp2(y - 117., (x - 170.) * (x - 374.) * (x - 136.) * (x - 221.) * (x - 340.) * (x - 85.) * (x - 238.));
  v *= Cp2(y - 39., (x - 272.) * (x - 170.) * (x - 204.) * (x - 85.) * (x - 68.) * x * (x - 238.) * (x - 340.) * (x - 357.) * (x - 136.));
  v *= Cp2(y - 286., (x - 85.) * (x - 68.) * (x - 340.) * (x - 153.) * (x - 17.) * (x - 170.) * (x - 238.) * (x - 289.) * (x - 136.) * (x - 221.) * (x - 357.) * (x - 102.));
  v *= Cp2(y - 273., (x - 204.) * (x - 102.) * (x - 17.) * (x - 357.) * (x - 221.) * (x - 136.));
  return artistictouch(vec3(creativity(uv), 1., v / 2.0));
}

vec3 cout(float x) {
  x /= cellCount;
  return vec3(x, 1.0 - x, 0.0);
}

vec3 cin(vec2 x) {
  x += .5;
  x /= cellCount;
  return texture(u_texture, x).rgb;
}

void main() {
  vec2 cellPos = floor(v_texcoord * cellCount);
  vec2 cellOffset = fract(v_texcoord * cellCount);
  vec2 mouseCell = floor(u_mouse.xy * cellCount);
  bool isUnderCursor = distance(mouseCell, cellPos) < (u_brushsize - .7);
  vec3 color = vec3(1.);

  if(u_time < 1000.) {
    // Init canvas
    color = vec3(1.);
  } else
    color = texture(u_texture, v_texcoord).rgb;

  if(isUnderCursor && u_mouse.z == 1.0) {
    color = u_color;
  }

  // First pass
  if(cellPos.x > cellCount - 2.) {
    float d = 0.;
    for(float i = 0.; i < cellCount - 1.; i += 1.0) {
      vec2 pos = vec2(i, cellPos.y);
      d += length(captcha(pos * vec2(17., 13.)) - cin(pos));
    }

    color = cout(d);
  }

  // Second pass
  if(cellPos.y > cellCount - 2.) {
    float d = 0.;
    for(float i = 0.; i < cellCount - 1.; i += 1.0) {
      vec2 pos = vec2(cellPos.x, i);
      d += length(captcha(pos * vec2(17., 13.)) - cin(pos));
    }
    color = cout(d);
  }

  // Third pass
  if(cellPos.x > cellCount - 2. && cellPos.y > cellCount - 2.) {
    float d = 0.;
    for(float i = 0.; i < cellCount - 1.; i += 1.0) {
      vec2 p1 = vec2(cellPos.x, i);
      vec2 p2 = vec2(i, cellPos.y);
      d += length(cout(0.) - cin(p1)) + length(cout(0.) - cin(p2));
    }
    color = cout(d);
  }

  // Draw the pixel lines
  float lineSize = 0.04;
  vec3 lineColor = isUnderCursor ? u_color : vec3(0.);

  if(abs(.5 - cellOffset.x) > .5 - lineSize || abs(.5 - cellOffset.y) > .5 - lineSize) {
    color = lineColor;
  }

  outColor = vec4(color, 1.);
}`;
function P() {
    const t = [0, 0, 0]
      , e = document.querySelectorAll(".palette .color");
    function x(c) {
        if (!c)
            return;
        const o = window.getComputedStyle(c).backgroundColor
          , r = /rgba?\((\d+), (\d+), (\d+)/.exec(o);
        t[0] = parseInt(r[1]) / 255,
        t[1] = parseInt(r[2]) / 255,
        t[2] = parseInt(r[3]) / 255
    }
    return e.forEach(c=>{
        c.addEventListener("click", ()=>x(c))
    }
    ),
    x(document.querySelector("input[type=radio]:checked+label")),
    t
}
function T(t) {
    const e = {
        x: -100,
        y: -100,
        z: 0,
        isIn: !1
    };
    return window.addEventListener("mousedown", ()=>{
        e.z = 1
    }
    ),
    window.addEventListener("mouseup", ()=>{
        e.z = 0
    }
    ),
    window.addEventListener("mousemove", x=>{
        const c = t.getBoundingClientRect()
          , o = x.x - c.left
          , r = x.y - c.top;
        e.x = o / 600,
        e.y = r / 600,
        e.isIn = o >= 0 && o < 600 && r >= 0 && r < 600
    }
    ),
    e
}
function I() {
    const t = document.querySelector("#brush-size")
      , e = document.querySelector(".brush-size > label")
      , x = {
        size: 1
    };
    function c(o) {
        x.size = o,
        e.innerText = `Brush size: ${o}`
    }
    return t.addEventListener("input", ()=>c(parseInt(t.value))),
    c(parseInt(t.value)),
    x
}
function U(t) {
    const e = document.querySelector("#result");
    let x = 0;
    function c() {
        console.log(t)
        return t.getImageData(587, 587, 1, 1).data[1] / 255
    }
    window.setInterval(()=>{
        const o = c();
        console.log(o)
        o != x && (o != 1 ? (e.classList.replace("correct", "wrong"),
        e.innerText = "Invalid captcha !") : (e.innerText = "Correct, you can submit your flag!",
        e.classList.replace("wrong", "correct")))
    }
    , 100)
}
function R(t, e) {
    const x = document.createElement("canvas");
    return x.width = t,
    x.height = e,
    {
        ctx: x.getContext("2d"),
        canvas: x
    }
}
async function z() {
    const t = document.querySelector("#canvas")
      , e = t.getContext("webgl2")
      , x = R(600, 600)
      , c = T(t);
    U(x.ctx);
    const o = P()
      , r = I()
      , {createUniform: n, createProgram: a} = A(e)
      , i = a(E, L)
      , f = n(i, "u_mouse", 3)
      , d = n(i, "u_color", 3)
      , v = n(i, "u_time", 1)
      , m = n(i, "u_brushsize", 1)
      , s = e.getAttribLocation(i, "a_position")
      , u = e.getAttribLocation(i, "a_texcoord")
      , p = e.getUniformLocation(i, "u_matrix")
      , y = e.getUniformLocation(i, "u_texture")
      , h = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
     console.log(e)
    e.bufferData(e.ARRAY_BUFFER, new Float32Array(h), e.STATIC_DRAW);
    const C = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, C);
    const _ = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
    e.bufferData(e.ARRAY_BUFFER, new Float32Array(_), e.STATIC_DRAW);
    const b = e.createTexture();
    e.bindTexture(e.TEXTURE_2D, b);
    function l(g) {
        e.viewport(0, 0, e.canvas.width, e.canvas.height),
        e.useProgram(i),
        f.set(c.x, c.y, c.isIn ? c.z : 0),
        d.set(...o),
        v.set(g),
        m.set(r.size),
        e.enableVertexAttribArray(s),
        e.vertexAttribPointer(s, 2, e.FLOAT, !1, 0, 0),
        e.enableVertexAttribArray(u),
        e.vertexAttribPointer(u, 2, e.FLOAT, !1, 0, 0);
        const S = [2, 0, 0, 0, 0, -2, 0, 0, 0, 0, -1, 0, -1, 1, 0, 1];
        e.uniformMatrix4fv(p, !1, S),
        e.uniform1i(y, 0),
        e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, x.canvas),
        e.generateMipmap(e.TEXTURE_2D),
        e.drawArrays(e.TRIANGLES, 0, 6),
        x.ctx.drawImage(e.canvas, 0, 0),
        requestAnimationFrame(l)
    }
    requestAnimationFrame(l)
}
window.addEventListener("DOMContentLoaded", z);
