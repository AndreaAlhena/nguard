<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Regex Validator</h1>
<hr class="my-0">
<p>The field under validation must match the given regular expression pattern.</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (pattern: RegExp): ValidatorFn
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    // Match uppercase letters followed by numbers
    new FormControl('', [NguardValidators.String.regex(/^[A-Z]+[0-9]+$/)]);

    // Match a date format
    new FormControl('', [NguardValidators.String.regex(/^\d{4}-\d{2}-\d{2}$/)]);
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>regex</Badge> error is returned if the value does not match the specified pattern.
</p>
