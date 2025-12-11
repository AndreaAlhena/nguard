<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Max Validator</h1>
<hr class="my-0">
<p>The field under validation must be less than or equal to the given maximum value.</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (maxVal: number): ValidatorFn
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    // Quantity cannot exceed 100
    new FormControl('', [NguardValidators.Number.max(100)]);

    // Percentage cannot exceed 100
    new FormControl('', [NguardValidators.Number.max(100)]);
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>max</Badge> error is returned if the value exceeds the maximum.
</p>
