<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>JSON Validator</h1>
<hr class="my-0">
<p>The field under validation must be a valid JSON string.</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (control: AbstractControl): ValidationErrors | null
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    new FormControl('', [NguardValidators.String.json]);
</Code>

<h2 class="mt-4">Valid examples</h2>
<hr class="mt-0 mb-4">
<ul>
    <li><code>{`{"key": "value"}`}</code></li>
    <li><code>[1, 2, 3]</code></li>
    <li><code>"hello"</code></li>
    <li><code>123</code></li>
    <li><code>true</code></li>
    <li><code>null</code></li>
</ul>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>json</Badge> error is returned if the value is not a valid JSON string.
</p>
