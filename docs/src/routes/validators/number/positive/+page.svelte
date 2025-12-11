<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Positive Validator</h1>
<hr class="my-0">
<p>The field under validation must be a positive number (greater than 0).</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (control: AbstractControl): ValidationErrors | null
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    new FormControl('', [NguardValidators.Number.positive]);
</Code>

<h2 class="mt-4">Valid examples</h2>
<hr class="mt-0 mb-4">
<ul>
    <li><code>1</code></li>
    <li><code>100</code></li>
    <li><code>0.5</code></li>
</ul>

<h2 class="mt-4">Invalid examples</h2>
<hr class="mt-0 mb-4">
<ul>
    <li><code>0</code> (zero is not positive)</li>
    <li><code>-5</code></li>
</ul>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>positive</Badge> error is returned if the value is not positive.
</p>
