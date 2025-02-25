import{A as t}from"./UIcon.b4eb2484.js";const m=`# Svelte

---

[\`Svelte\`](https://svelte.dev/) is a free and open-source front end component framework or language created by Rich Harris and maintained by the Svelte core team members. Svelte is not a monolithic JavaScript library imported by applications: instead, Svelte compiles HTML templates to specialized code that manipulates the DOM directly, which may reduce the size of transferred files and give better client performance. Application code is also processed by the compiler, inserting calls to automatically recompute data and re-render UI elements when the data they depend on is modified. This also avoids the overhead associated with runtime intermediate representations, such as virtual DOM, unlike traditional frameworks (such as React and Vue) which carry out the bulk of their work at runtime, i.e. in the browser.

The compiler itself is written in TypeScript. Its source code is licensed under MIT License and hosted on GitHub.

<br/>

Svelte is :

- compiled : Svelte shifts as much work as possible out of the browser and into your build step. No more manual optimisations — just faster, more efficient apps.
- compact : Write breathtakingly concise components using languages you already know — HTML, CSS and JavaScript. Oh, and your application bundles will be tiny as well.
- complete : Built-in scoped styling, state management, motion primitives, form bindings and more — don't waste time trawling npm for the bare essentials. It's all here.

<br/>

## Example

\`\`\`ts
<script>
    let count = 1;
    $: doubled = count * 2;
<\/script>

<p>{count} * 2 = {doubled}</p>

<button on:click={() => count = count + 1}>Count</button>
\`\`\`

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

> Svelte is a free and open-source front end component framework or language created by Rich Harris and maintained by the Svelte core team members.
`;function g(a,...s){const n=Object.assign({},a);return Object.keys(n).forEach(o=>{s.includes(o)&&delete n[o]}),n}const e=a=>a,d=[e({name:"Programming Languages",slug:"pro-lang"}),e({name:"Machine Learning",slug:"ml"}),e({name:"Visualisation",slug:"visualisation"}),e({name:"Web",slug:"web"}),e({name:"Technologies/Frameworks",slug:"tech"}),e({name:"Libraries",slug:"library"}),e({name:"Langauges",slug:"lang"}),e({name:"Databases",slug:"db"}),e({name:"ORMs",slug:"orm"}),e({name:"DevOps",slug:"devops"}),e({name:"Testing",slug:"test"}),e({name:"Dev Tools",slug:"devtools"}),e({name:"Markup & Style",slug:"markup-style"}),e({name:"Design",slug:"design"}),e({name:"Soft Skills",slug:"soft"})],i=a=>{const s=g(a,"category");return a.category&&(s.category=d.find(n=>n.slug===a.category)),s},u=[i({slug:"python",color:"yellow",description:"",logo:t.Python,name:"Python",category:"pro-lang"}),i({slug:"cpp",color:"blue",description:"",logo:t.Cpp,name:"C++",category:"pro-lang"}),i({slug:"r",color:"green",description:"",logo:t.R,name:"R",category:"pro-lang"}),i({slug:"sql",color:"blue",description:"",logo:t.SQL,name:"SQL",category:"pro-lang"}),i({slug:"numpy",color:"orange",description:"",logo:t.Numpy,name:"Numpy",category:"ml"}),i({slug:"pandas",color:"cyan",description:"",logo:t.Pandas,name:"Pandas",category:"ml"}),i({slug:"tensorflow",color:"orange",description:"",logo:t.Tensorflow,name:"TensorFlow",category:"ml"}),i({slug:"scikitlearn",color:"blue",description:"",logo:t.Scikitlearn,name:"Scikit-learn",category:"ml"}),i({slug:"powerbi",color:"yellow",description:"",logo:t.Powerbi,name:"PowerBI",category:"visualisation"}),i({slug:"css",color:"blue",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:t.CSS,name:"CSS",category:"markup-style"}),i({slug:"html",color:"orange",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:t.HTML,name:"HTML",category:"markup-style"}),i({slug:"reactjs",color:"cyan",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:t.ReactJs,name:"React Js",category:"library"}),i({slug:"svelte",color:"orange",description:m,logo:t.Svelte,name:"Svelte",category:"library"})],h="Skills",b=(...a)=>u.filter(s=>a.includes(s.slug)),y=a=>{const s=[],n=[];return u.forEach(o=>{if(a.trim()&&!o.name.toLowerCase().includes(a.trim().toLowerCase()))return;if(!o.category){n.push(o);return}let r=s.find(c=>{var l;return c.category.slug===((l=o.category)==null?void 0:l.slug)});r||(r={items:[],category:o.category},s.push(r)),r.items.push(o)}),n.length!==0&&s.push({category:{name:"Others",slug:"others"},items:n}),s};export{y as a,b as g,u as i,h as t};
