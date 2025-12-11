<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Min Validator</h1>
<hr class="my-0">
<p>The field under validation must be greater than or equal to the given minimum value.</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (minVal: number): ValidatorFn
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    // Age must be at least 18
    new FormControl('', [NguardValidators.Number.min(18)]);

    // Price must be at least 0
    new FormControl('', [NguardValidators.Number.min(0)]);
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>min</Badge> error is returned if the value is less than the minimum.
</p>
