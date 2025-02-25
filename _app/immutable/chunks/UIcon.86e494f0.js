import{t as q,a as F,S as L,i as P}from"./index.28409b7f.js";import{u as E,s as H,f as K,g as Q,h as V,d as N,j as R,i as z,n as C}from"./scheduler.7a274a43.js";import{w as B,b as G}from"./paths.baee97ac.js";function ss(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function es(e,t){q(e,1,1,()=>{t.delete(e.key)})}function ts(e,t,a,n,r,i,c,S,m,v,g,h){let d=e.length,u=i.length,f=d;const b={};for(;f--;)b[e[f].key]=f;const w=[],k=new Map,A=new Map,T=[];for(f=u;f--;){const o=h(r,i,f),l=a(o);let p=c.get(l);p?n&&T.push(()=>p.p(o,t)):(p=v(l,o),p.c()),k.set(l,w[f]=p),l in b&&A.set(l,Math.abs(f-b[l]))}const _=new Set,j=new Set;function J(o){F(o,1),o.m(S,g),c.set(o.key,o),g=o.first,u--}for(;d&&u;){const o=w[u-1],l=e[d-1],p=o.key,y=l.key;o===l?(g=o.first,d--,u--):k.has(y)?!c.has(p)||_.has(p)?J(o):j.has(y)?d--:A.get(p)>A.get(y)?(j.add(p),J(o)):(_.add(y),d--):(m(l,c),d--)}for(;d--;){const o=e[d];k.has(o.key)||m(o,c)}for(;u;)J(w[u-1]);return E(T),w}const D="@riadh-adrani-theme",O=e=>{localStorage.setItem(D,JSON.stringify(e))},I=B(!1),x=e=>I.update(t=>{var n;const a=typeof e=="boolean"?e:!t;return O(a),(n=document.querySelector(":root"))==null||n.setAttribute("data-theme",a?"dark":"light"),a}),ns=()=>{const e=localStorage.getItem(D);e?x(JSON.parse(e)):window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?x(!0):x(!1)},M=e=>`${G}/logos/${e}`,s=(e,t)=>t?{dark:M(t),light:M(e)}:M(e),as={AWS:s("aws.svg"),Bootstrap:s("bootstrap.svg"),C:s("c.svg"),Cpp:s("cpp.svg"),Celery:s("celery.svg"),Django:s("django.svg"),FastApi:s("fastapi"),Flask:s("flask.svg"),Go:s("go.svg"),Kafka:s("kafka.svg"),Neo4j:s("neo4j.svg"),Nginx:s("nginx.svg"),Numpy:s("numpy.svg"),Pandas:s("pandas.png"),RabbitMQ:s("rabbitmq.svg"),Rust:s("rust.svg","rust-dark.png"),Scrapy:s("scrapy.png"),Selenium:s("selenium.svg"),Docker:s("docker.svg"),Kubernetes:s("kubernetes.svg"),Csharp:s("csharp.svg"),Xamarin:s("xamarin.svg"),TypeScript:s("ts.png"),VueJs:s("vue.png"),ReactJs:s("react.svg"),Dart:s("dart.png"),Kotlin:s("kotlin.png"),Python:s("python.png"),NodeJs:s("node.png"),Deno:s("deno.png","deno-dark.png"),Svelte:s("svelte.png"),ExpressJs:s("express.png"),JavaScript:s("js.png"),Fastify:s("fastify.svg","fastify-dark.png"),NestJs:s("nest.svg"),Quasar:s("quasar.svg"),SolidJs:s("solid.svg"),Electron:s("electron.png"),Flutter:s("flutter.svg"),Java:s("java.png"),AdonisJs:s("adonis.png"),Android:s("android.png"),Angular:s("angular.png"),PostgreSQL:s("postgres.png"),Firebase:s("firebase.png"),Sass:s("sass.png"),Unknown:s("no-img.svg"),MongoDB:s("mongodb.svg"),Redis:s("redis.svg"),Tailwind:s("tailwind.svg"),HTML:s("html.svg"),Premiere:s("premiere.svg"),Photoshop:s("photoshop.svg"),CSS:s("css.svg"),AfterEffects:s("after-effects.svg"),Illustrator:s("illustrator.svg"),Nuxt:s("nuxt.png"),Vite:s("vite.png"),Vitest:s("vitest.svg"),Jest:s("jest.png"),Unocss:s("unocss.svg"),Ruvy:s("ruvy.svg"),Postcss:s("postcss.svg"),Informed:s("informed.png"),SUT:s("sut.png"),R:s("r.png"),SQL:s("sql.svg"),Scikitlearn:s("scikitlearn.svg"),Tensorflow:s("tensorflow.svg"),Powerbi:s("powerbi.png"),Azure:s("azure.svg"),Keras:s("keras.svg"),Huggingface:s("hf.png"),Matplotlib:s("matplotlib.svg"),Seaborn:s("seaborn.svg"),Dotnet:s("dotnet.svg"),Git:s("git.png"),Hadoop:s("hadoop.svg")};let U;I.subscribe(e=>U=e);const os=e=>typeof e=="string"?e:U?e.dark:e.light;globalThis&&globalThis.__awaiter;function W(e){let t,a;return{c(){t=K("i"),this.h()},l(n){t=Q(n,"I",{class:!0}),V(t).forEach(N),this.h()},h(){R(t,"class",a=`${e[0]} ${e[1]}`)},m(n,r){z(n,t,r)},p(n,[r]){r&3&&a!==(a=`${n[0]} ${n[1]}`)&&R(t,"class",a)},i:C,o:C,d(n){n&&N(t)}}}function X(e,t,a){let{icon:n=void 0}=t,{classes:r=""}=t;return e.$$set=i=>{"icon"in i&&a(0,n=i.icon),"classes"in i&&a(1,r=i.classes)},[n,r]}class is extends L{constructor(t){super(),P(this,t,X,W,H,{icon:0,classes:1})}}export{as as A,is as U,x as a,es as b,ss as e,os as g,ns as o,I as t,ts as u};
