<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>LesserThanOrEqual Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>lesserThanOrEqual validator</em>. For details about the <em>lesserThanOrEqual validator</em> <a href="/validators/multi/lesser-than-or-equal">click here</a>.
</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    [nguardLesserThanOrEqual]="fieldKey"
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    &lt;input name="maxValue" [ngModel]="maxValue"&gt;
    &lt;input name="currentValue" [nguardLesserThanOrEqual]="'maxValue'" [ngModel]="currentValue"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>lesserThanOrEqual</Badge> error is returned if the value is not less than or equal to the referenced field.</p>
