<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import hljs from 'highlight.js/lib/core';
    import bash from 'highlight.js/lib/languages/bash';
    import xml from 'highlight.js/lib/languages/xml';
    import typescript from 'highlight.js/lib/languages/typescript';

    export let language: string;
    let codeBlockEl: HTMLElement;

    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('typescript', typescript);

    onMount(() => {
        hljs.highlightElement(codeBlockEl);
    });
</script>

<div class="row">
    <div class="col-lg-12">
        <pre bind:this={codeBlockEl}>
            <code  class="language-{language}"><slot></slot></code>
        </pre>
    </div>
</div>