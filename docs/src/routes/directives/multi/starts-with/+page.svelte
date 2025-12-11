<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Starts With Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>StartsWith validator</em>. For details about the <em>StartsWith validator</em> <a href="/validators/multi/starts-with">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    //
    primitive | primitive[]
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    &lt;!-- With a single value --&gt;
    &lt;input name="fieldA" nguardStartsWith="first" [ngModel]="componentPropA"&gt;
    &lt;!-- With an array of values --&gt;
    &lt;input name="fieldA" [nguardStartsWith]="['first', 1, 'something']" [ngModel]="componentPropA"&gt;
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>startsWith</Badge> error is returned if the attribute starts with one of the provided values</p>