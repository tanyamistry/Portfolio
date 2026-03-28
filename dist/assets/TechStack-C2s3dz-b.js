import{r as S,g as q,j as s,S as Z}from"./index-gvWhh7tk.js";var D={};function H(n){if(typeof window>"u")return;const c=document.createElement("style");return c.setAttribute("type","text/css"),c.innerHTML=n,document.head.appendChild(c),n}Object.defineProperty(D,"__esModule",{value:!0});var e=S;function U(n){return n&&typeof n=="object"&&"default"in n?n:{default:n}}var o=U(e);H(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const Y=e.forwardRef(function({style:c={},className:i="",autoFill:t=!1,play:l=!0,pauseOnHover:h=!1,pauseOnClick:_=!1,direction:a="left",speed:g=50,delay:M=0,loop:k=0,gradient:z=!1,gradientColor:T="white",gradientWidth:y=200,onFinish:$,onCycleComplete:I,onMount:A,children:b},B){const[N,V]=e.useState(0),[w,G]=e.useState(0),[x,C]=e.useState(1),[R,J]=e.useState(!1),Q=e.useRef(null),u=B||Q,p=e.useRef(null),v=e.useCallback(()=>{if(p.current&&u.current){const r=u.current.getBoundingClientRect(),j=p.current.getBoundingClientRect();let f=r.width,d=j.width;(a==="up"||a==="down")&&(f=r.height,d=j.height),C(t&&f&&d&&d<f?Math.ceil(f/d):1),V(f),G(d)}},[t,u,a]);e.useEffect(()=>{if(R&&(v(),p.current&&u.current)){const r=new ResizeObserver(()=>v());return r.observe(u.current),r.observe(p.current),()=>{r&&r.disconnect()}}},[v,u,R]),e.useEffect(()=>{v()},[v,b]),e.useEffect(()=>{J(!0)},[]),e.useEffect(()=>{typeof A=="function"&&A()},[]);const P=e.useMemo(()=>t?w*x/g:w<N?N/g:w/g,[t,N,w,x,g]),X=e.useMemo(()=>Object.assign(Object.assign({},c),{"--pause-on-hover":!l||h?"paused":"running","--pause-on-click":!l||h&&!_||_?"paused":"running","--width":a==="up"||a==="down"?"100vh":"100%","--transform":a==="up"?"rotate(-90deg)":a==="down"?"rotate(90deg)":"none"}),[c,l,h,_,a]),K=e.useMemo(()=>({"--gradient-color":T,"--gradient-width":typeof y=="number"?`${y}px`:y}),[T,y]),L=e.useMemo(()=>({"--play":l?"running":"paused","--direction":a==="left"?"normal":"reverse","--duration":`${P}s`,"--delay":`${M}s`,"--iteration-count":k?`${k}`:"infinite","--min-width":t?"auto":"100%"}),[l,a,P,M,k,t]),E=e.useMemo(()=>({"--transform":a==="up"?"rotate(90deg)":a==="down"?"rotate(-90deg)":"none"}),[a]),W=e.useCallback(r=>[...Array(Number.isFinite(r)&&r>=0?r:0)].map((j,f)=>o.default.createElement(e.Fragment,{key:f},e.Children.map(b,d=>o.default.createElement("div",{style:E,className:"rfm-child"},d)))),[E,b]);return R?o.default.createElement("div",{ref:u,style:X,className:"rfm-marquee-container "+i},z&&o.default.createElement("div",{style:K,className:"rfm-overlay"}),o.default.createElement("div",{className:"rfm-marquee",style:L,onAnimationIteration:I,onAnimationEnd:$},o.default.createElement("div",{className:"rfm-initial-child-container",ref:p},e.Children.map(b,r=>o.default.createElement("div",{style:E,className:"rfm-child"},r))),W(x-1)),o.default.createElement("div",{className:"rfm-marquee",style:L},W(x))):null});var F=D.default=Y;q.registerPlugin(Z);const m=["#5eead4","#818cf8","#fb923c","#34d399","#60a5fa","#f472b6","#facc15"],O=[{label:"Languages",techs:["Python","SQL","Java","JavaScript","TypeScript","R"]},{label:"Data Engineering",techs:["Apache Kafka","Apache Spark","PostgreSQL","Snowflake","ETL Pipelines"]},{label:"Cloud & DevOps",techs:["AWS S3","AWS Glue","Athena","Lambda","Docker","Git"]},{label:"ML / Data Science",techs:["Pandas","NumPy","Scikit-learn","TensorFlow","PyTorch","OpenCV"]},{label:"Visualization",techs:["Tableau","Power BI","Streamlit","Plotly"]},{label:"Web Development",techs:["React","Node.js","Express","Vite"]}],ee=O.flatMap(n=>n.techs);function ne(){const n=S.useRef(null),c=S.useRef(null);return S.useEffect(()=>{const i=q.context(()=>{var t;(t=c.current)!=null&&t.children&&q.fromTo(Array.from(c.current.children),{y:30,opacity:0},{y:0,opacity:1,duration:.6,ease:"power3.out",stagger:.06,scrollTrigger:{trigger:n.current,start:"top 72%"}})});return()=>i.revert()},[]),s.jsxs("section",{ref:n,className:"techstack",id:"techstack",children:[s.jsx("div",{className:"section-label",children:"Technologies"}),s.jsx("h2",{className:"techstack__heading",children:"Tech Stack"}),s.jsx("p",{className:"techstack__sub",children:"Tools and technologies I work with"}),s.jsx("div",{ref:c,className:"techstack__categories",children:O.map((i,t)=>s.jsxs("div",{className:"techstack__cat",children:[s.jsx("span",{className:"techstack__cat-label",style:{color:m[t%m.length]},children:i.label}),s.jsx("div",{className:"techstack__cat-pills",children:i.techs.map((l,h)=>s.jsx("span",{className:"techstack__pill",style:{"--accent":m[(t+h)%m.length]},"data-hoverable":!0,children:l},l))})]},i.label))}),s.jsx("div",{className:"techstack__marquee-wrapper",children:s.jsx(F,{gradient:!1,speed:36,pauseOnHover:!0,children:ee.map((i,t)=>s.jsx("span",{className:"techstack__tag",style:{color:m[t%m.length]},children:i},t))})})]})}export{ne as default};
