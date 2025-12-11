<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>NotRegex Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>notRegex validator</em>. For details about the <em>notRegex validator</em> <a href="/validators/string/not-regex">click here</a>.
</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    [nguardNotRegex]="pattern"
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    &lt;input name="username" [nguardNotRegex]="'[^a-zA-Z0-9]'" [ngModel]="username"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>notRegex</Badge> error is returned if the value matches the forbidden pattern.</p>
