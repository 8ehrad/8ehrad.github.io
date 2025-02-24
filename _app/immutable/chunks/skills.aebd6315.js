import{A as n}from"./UIcon.d98891fb.js";const m=`# Svelte

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
`;function d(t,...i){const a=Object.assign({},t);return Object.keys(a).forEach(s=>{i.includes(s)&&delete a[s]}),a}const e=t=>t,g=[e({name:"Programming Languages",slug:"pro-lang"}),e({name:"Machine Learning",slug:"ml"}),e({name:"Visualisation",slug:"visualisation"}),e({name:"Web",slug:"web"}),e({name:"Technologies/Frameworks",slug:"tech"}),e({name:"Libraries",slug:"library"}),e({name:"Langauges",slug:"lang"}),e({name:"Databases",slug:"db"}),e({name:"ORMs",slug:"orm"}),e({name:"DevOps",slug:"devops"}),e({name:"Testing",slug:"test"}),e({name:"Dev Tools",slug:"devtools"}),e({name:"Markup & Style",slug:"markup-style"}),e({name:"Design",slug:"design"}),e({name:"Soft Skills",slug:"soft"})],r=t=>{const i=d(t,"category");return t.category&&(i.category=g.find(a=>a.slug===t.category)),i},l=[r({slug:"python",color:"yellow",description:"",logo:n.Python,name:"Python",category:"pro-lang"}),r({slug:"cpp",color:"blue",description:"",logo:n.Cpp,name:"C++",category:"pro-lang"}),r({slug:"css",color:"blue",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:n.CSS,name:"CSS",category:"markup-style"}),r({slug:"html",color:"orange",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:n.HTML,name:"HTML",category:"markup-style"}),r({slug:"r",color:"green",description:"",logo:n.R,name:"R",category:"pro-lang"}),r({slug:"reactjs",color:"cyan",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.",logo:n.ReactJs,name:"React Js",category:"library"}),r({slug:"svelte",color:"orange",description:m,logo:n.Svelte,name:"Svelte",category:"library"})],h="Skills",b=(...t)=>l.filter(i=>t.includes(i.slug)),y=t=>{const i=[],a=[];return l.forEach(s=>{if(t.trim()&&!s.name.toLowerCase().includes(t.trim().toLowerCase()))return;if(!s.category){a.push(s);return}let o=i.find(c=>{var u;return c.category.slug===((u=s.category)==null?void 0:u.slug)});o||(o={items:[],category:s.category},i.push(o)),o.items.push(s)}),a.length!==0&&i.push({category:{name:"Others",slug:"others"},items:a}),i};export{y as a,b as g,l as i,h as t};
