<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Numeric Validator</h1>
<hr class="my-0">
<p>The field under validation must be numeric (integer or floating point).</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (control: AbstractControl): ValidationErrors | null
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    new FormControl('', [NguardValidators.Number.numeric]);
</Code>

<h2 class="mt-4">Valid examples</h2>
<hr class="mt-0 mb-4">
<ul>
    <li><code>42</code></li>
    <li><code>3.14</code></li>
    <li><code>-100</code></li>
    <li><code>"123.45"</code> (string that parses to number)</li>
</ul>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>numeric</Badge> error is returned if the value is not numeric.
</p>
