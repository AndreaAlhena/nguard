<script>
    import AlphaDirectiveConfigInterface from "../../../../components/AlphaDirectiveConfigInterface.svelte";
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Url Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>url validator</em>. For details about the <em>url validator</em> <a href="/validators/string/url">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Default</h3>
<Code language="html">
    //
    &lt;input name="fieldName" nguardUrl [ngModel]="componentProp"&gt;
</Code>

<h3>ASCII only</h3>
<Code language="html">
    //
    &lt;input name="fieldName" nguardUrl [ngModel]="componentProp"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>url</Badge> error is returned if the attribute doesn't meet the validator requirements.</p>