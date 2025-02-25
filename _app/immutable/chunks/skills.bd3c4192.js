import{A as e}from"./UIcon.dfc5bf3c.js";const g=`# Svelte

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
`;function m(a,...o){const n=Object.assign({},a);return Object.keys(n).forEach(s=>{o.includes(s)&&delete n[s]}),n}const i=a=>a,d=[i({name:"Programming Languages",slug:"pro-lang"}),i({name:"Machine Learning",slug:"ml"}),i({name:"Visualisation",slug:"visualisation"}),i({name:"Web",slug:"web"}),i({name:"Technologies/Frameworks",slug:"tech"}),i({name:"Libraries",slug:"library"}),i({name:"Langauges",slug:"lang"}),i({name:"Databases",slug:"db"}),i({name:"ORMs",slug:"orm"}),i({name:"DevOps",slug:"devops"}),i({name:"Testing",slug:"test"}),i({name:"Dev Tools",slug:"devtools"}),i({name:"Markup & Style",slug:"markup-style"}),i({name:"Design",slug:"design"}),i({name:"Soft Skills",slug:"soft"})],t=a=>{const o=m(a,"category");return a.category&&(o.category=d.find(n=>n.slug===a.category)),o},c=[t({slug:"python",color:"yellow",description:"",logo:e.Python,name:"Python",category:"pro-lang"}),t({slug:"r",color:"green",description:"",logo:e.R,name:"R",category:"pro-lang"}),t({slug:"sql",color:"blue",description:"",logo:e.SQL,name:"SQL",category:"pro-lang"}),t({slug:"cpp",color:"blue",description:"",logo:e.Cpp,name:"C++",category:"pro-lang"}),t({slug:"csharp",color:"purple",description:"",logo:e.Csharp,name:"C#",category:"pro-lang"}),t({slug:"numpy",color:"orange",description:"",logo:e.Numpy,name:"Numpy",category:"ml"}),t({slug:"pandas",color:"cyan",description:"",logo:e.Pandas,name:"Pandas",category:"ml"}),t({slug:"tensorflow",color:"orange",description:"",logo:e.Tensorflow,name:"TensorFlow",category:"ml"}),t({slug:"scikitlearn",color:"blue",description:"",logo:e.Scikitlearn,name:"Scikit-learn",category:"ml"}),t({slug:"powerbi",color:"yellow",description:"",logo:e.Powerbi,name:"PowerBI",category:"visualisation"}),t({slug:"css",color:"blue",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:e.CSS,name:"CSS",category:"web"}),t({slug:"html",color:"orange",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:e.HTML,name:"HTML",category:"web"}),t({slug:"reactjs",color:"cyan",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:e.ReactJs,name:"React Js",category:"library"}),t({slug:"svelte",color:"orange",description:g,logo:e.Svelte,name:"Svelte",category:"library"}),t({slug:"azure",color:"blue",description:"",logo:e.Azure,name:"Azure",category:"tech"}),t({slug:"keras",color:"red",description:"",logo:e.Keras,name:"Keras",category:"ml"}),t({slug:"hf",color:"yellow",description:"",logo:e.Huggingface,name:"HuggingFace",category:"ml"}),t({slug:"matplotlib",color:"blue",description:"",logo:e.Matplotlib,name:"Matplotlib",category:"visualisation"}),t({slug:"seaborn",color:"blue",description:"",logo:e.Seaborn,name:"Seaborn",category:"visualisation"}),t({slug:"dotnet",color:"purple",description:"",logo:e.Dotnet,name:".Net",category:"web"}),t({slug:"git",color:"orange",description:"",logo:e.Git,name:"Git",category:"tech"}),t({slug:"hadoop",color:"yellow",description:"",logo:e.Hadoop,name:"Hadoop",category:"tech"}),t({slug:"aws",color:"orange",description:"",logo:e.AWS,name:"AWS",category:"tech"}),t({slug:"django",color:"green",description:"",logo:e.Django,name:"Django",category:"web"})],b="Skills",h=(...a)=>c.filter(o=>a.includes(o.slug)),y=a=>{const o=[],n=[];return c.forEach(s=>{if(a.trim()&&!s.name.toLowerCase().includes(a.trim().toLowerCase()))return;if(!s.category){n.push(s);return}let r=o.find(u=>{var l;return u.category.slug===((l=s.category)==null?void 0:l.slug)});r||(r={items:[],category:s.category},o.push(r)),r.items.push(s)}),n.length!==0&&o.push({category:{name:"Others",slug:"others"},items:n}),o};export{y as a,h as g,c as i,b as t};
