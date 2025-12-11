<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>NotBlank Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>notBlank validator</em>. For details about the <em>notBlank validator</em> <a href="/validators/string/not-blank">click here</a>.
</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    nguardNotBlank
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    &lt;input name="name" nguardNotBlank [ngModel]="name"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>notBlank</Badge> error is returned if the value is empty or contains only whitespace.</p>
