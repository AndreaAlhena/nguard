<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>NotRegex Validator</h1>
<hr class="my-0">
<p>The field under validation must NOT match the given regular expression pattern.</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (pattern: RegExp): ValidatorFn
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    // Must not contain numbers
    new FormControl('', [NguardValidators.String.notRegex(/\d/)]);

    // Must not contain special characters
    new FormControl('', [NguardValidators.String.notRegex(/[!@#$%^&*]/)]);
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>notRegex</Badge> error is returned if the value matches the specified pattern.
</p>
