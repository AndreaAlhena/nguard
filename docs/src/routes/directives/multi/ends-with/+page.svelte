<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Ends With Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>EndsWith validator</em>. For details about the <em>EndsWith validator</em> <a href="/validators/multi/ends-with">click here</a>.
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
    &lt;input name="fieldA" nguardEndsWith="first" [ngModel]="componentPropA"&gt;
    &lt;!-- With an array of values --&gt;
    &lt;input name="fieldA" [nguardEndsWith]="['first', 1, 'something']" [ngModel]="componentPropA"&gt;
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>endsWith</Badge> error is returned if the attribute ends with one of the provided values</p>