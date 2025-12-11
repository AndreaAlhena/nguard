<script lang="ts">
    import Badge from "./Badge.svelte";
    import Code from "./Code.svelte";

    export let name: string;
    export let description: string;
    export let apiSignature: string;
    export let errorKey: string;
    export let namespace: string;
    export let validatorPath: string;
    export let params: { name: string; type: string; description: string; required?: boolean }[] = [];
    export let usageExamples: { title: string; description: string; code: string }[] = [];
    export let relatedValidators: { name: string; path: string }[] = [];
</script>

<h1>{name} Validator</h1>
<hr class="mt-0 mb-4">
<p>{@html description}</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    {apiSignature}
</Code>

{#if params.length > 0}
<h3 class="mt-4">Parameters</h3>
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
        {#each params as param}
        <tr>
            <td><code>{param.name}</code></td>
            <td><code>{param.type}</code></td>
            <td>{param.required ? 'Yes' : 'No'}</td>
            <td>{param.description}</td>
        </tr>
        {/each}
    </tbody>
</table>
{/if}

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">

{#each usageExamples as example}
<h3>{example.title}</h3>
<p>{@html example.description}</p>
<Code language="typescript">
    {example.code}
</Code>
{/each}

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>{errorKey}</Badge> error is returned if the attribute doesn't meet the validator requirements.</p>

{#if relatedValidators.length > 0}
<h2 class="mt-4">Related Validators</h2>
<hr class="mt-0 mb-4">
<ul>
    {#each relatedValidators as related}
    <li><a href={related.path}>{related.name}</a></li>
    {/each}
</ul>
{/if}
