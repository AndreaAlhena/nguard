<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Greater Than Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>GreaterThan validator</em>. For details about the <em>GreaterThan validator</em> <a href="/validators/multi/greater-than">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    //
    string
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    &lt;!-- FieldA must be greater FieldB --&gt;
    &lt;input name="fieldA" nguardGreater="fieldB" [ngModel]="componentPropA"&gt;
    &lt;input name="fieldB"[ngModel]="componentPropB"&gt;
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>greaterThan</Badge> error is returned if the field with the validator has a value that is not greater the compared field</p>