<script>
    import AlphaDirectiveConfigInterface from "../../../../components/AlphaDirectiveConfigInterface.svelte";
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Uppercase Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>uppercase validator</em>. For details about the <em>uppercase validator</em> <a href="/validators/string/uppercase">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Default</h3>
<Code language="html">
    //
    &lt;input name="fieldName" nguardUppercase [ngModel]="componentProp"&gt;
</Code>

<h3>ASCII only</h3>
<Code language="html">
    //
    &lt;input name="fieldName" nguardUppercase [ngModel]="componentProp"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>uppercase</Badge> error is returned if the attribute doesn't meet the validator requirements.</p>