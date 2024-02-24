<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Lowercase Validator</h1>
<hr class="my-0">
<p>The field under validation must be lowercase</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (): ValidatorErrors | null
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    new FormControl('', [NguardValidators.String.lowercase]);
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>lowercase</Badge> error is returned if the attribute doesn't meet the validator requirements.
</p>