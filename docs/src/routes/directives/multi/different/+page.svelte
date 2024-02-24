<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
    import ComparableInterface from "../../../../components/ComparableInterface.svelte";
</script>

<h1>Different Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>different validator</em>. For details about the <em>different validator</em> <a href="/validators/multi/different">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<ComparableInterface />

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Default (no strict)</h3>
<Code language="html">
    //
    &lt;input name="fieldNameA" [nguardDifferent]="&lcub;compareFieldKey: 'fieldNameB'&rcub;" [ngModel]="componentPropA"&gt;
    &lt;input name="fieldNameB" [ngModel]="componentPropB"&gt;
</Code>

<h3>Strict</h3>
<Code language="html">
    //
    &lt;input name="fieldNameA" [nguardDifferent]="&lcub;compareFieldKey: 'fieldNameB', isStrict: true&rcub;" [ngModel]="componentPropA"&gt;
    &lt;input name="fieldNameB" [ngModel]="componentPropB"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>different</Badge> error is returned if the attribute is not different from the given <em>(compareFieldKey)</em> one.</p>