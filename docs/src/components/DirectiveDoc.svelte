<script lang="ts">
    import Badge from "./Badge.svelte";
    import Code from "./Code.svelte";

    export let name: string;
    export let selector: string;
    export let description: string;
    export let errorKey: string;
    export let namespace: string;
    export let configInterface: string = '';
    export let inputs: { name: string; type: string; description: string; required?: boolean }[] = [];
    export let usageExamples: { title: string; description: string; code: string }[] = [];
    export let relatedDirectives: { name: string; path: string }[] = [];
</script>

<h1>{name} Directive</h1>
<hr class="mt-0 mb-4">
<p>{@html description}</p>

<h2 class="mt-4">Selector</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    {selector}
</Code>

{#if inputs.length > 0}
<h3 class="mt-4">Inputs</h3>
<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {#each inputs as input}
        <tr>
            <td><code>{input.name}</code></td>
            <td><code>{input.type}</code></td>
            <td>{input.required ? 'Yes' : 'No'}</td>
            <td>{input.description}</td>
        </tr>
        {/each}
    </tbody>
</table>
{/if}

{#if configInterface}
<h3 class="mt-4">Configuration Interface</h3>
<p>Import and use the <code>{configInterface}</code> interface for type-safe configuration.</p>
{/if}

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">

{#each usageExamples as example}
<h3>{example.title}</h3>
<p>{@html example.description}</p>
<Code language="html">
    {example.code}
</Code>
{/each}

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>{errorKey}</Badge> error is returned if the attribute doesn't meet the validation requirements.</p>

{#if relatedDirectives.length > 0}
<h2 class="mt-4">Related Directives</h2>
<hr class="mt-0 mb-4">
<ul>
    {#each relatedDirectives as related}
    <li><a href={related.path}>{related.name}</a></li>
    {/each}
</ul>
{/if}
