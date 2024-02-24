<script>
    import AlphaNumDirectiveConfigInterface from "../../../../components/AlphaNumDirectiveConfigInterface.svelte";
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Alpha Num Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>alphaNum validator</em>. For details about the <em>alphaNum validator</em> <a href="/validators/string/alpha-num">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<AlphaNumDirectiveConfigInterface />

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Default</h3>
<Code language="html">
    //
    &lt;input name="fieldName" [nguardAlphaNum]="&lcub;hasAsciiOnly: false&rcub;" [ngModel]="componentProp"&gt;
</Code>

<h3>ASCII only</h3>
<Code language="html">
    //
    &lt;input name="fieldName" [nguardAlphaNum]="&lcub;hasAsciiOnly: true&rcub;" [ngModel]="componentProp"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>alphaNum</Badge> error is returned if the attribute doesn't meet the validator requirements.</p>