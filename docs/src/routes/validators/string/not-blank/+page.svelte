<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>NotBlank Validator</h1>
<hr class="my-0">
<p>The field under validation must not be empty or contain only whitespace characters.</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (control: AbstractControl): ValidationErrors | null
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    new FormControl('', [NguardValidators.String.notBlank]);
</Code>

<h2 class="mt-4">Invalid examples</h2>
<hr class="mt-0 mb-4">
<ul>
    <li>Empty string: <code>""</code></li>
    <li>Whitespace only: <code>"   "</code></li>
    <li>Tabs only: <code>"\t\t"</code></li>
    <li>Newlines only: <code>"\n\n"</code></li>
</ul>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>notBlank</Badge> error is returned if the value is empty or contains only whitespace.
</p>
