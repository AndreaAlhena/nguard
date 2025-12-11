<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>LesserThan Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>lesserThan validator</em>. For details about the <em>lesserThan validator</em> <a href="/validators/multi/lesser-than">click here</a>.
</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    [nguardLesserThan]="fieldKey"
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    &lt;input name="minAge" [ngModel]="minAge"&gt;
    &lt;input name="maxAge" [nguardLesserThan]="'maxAge'" [ngModel]="minAge"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>lesserThan</Badge> error is returned if the value is not less than the referenced field.</p>
