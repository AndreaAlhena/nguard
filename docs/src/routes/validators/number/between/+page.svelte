<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Between Validator</h1>
<hr class="my-0">
<p>The field under validation must be between the given minimum and maximum values (inclusive).</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (minVal: number, maxVal: number): ValidatorFn
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    // Rating between 1 and 5
    new FormControl('', [NguardValidators.Number.between(1, 5)]);

    // Percentage between 0 and 100
    new FormControl('', [NguardValidators.Number.between(0, 100)]);
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>between</Badge> error is returned if the value is outside the range.
</p>
<p class="mt-2">
    <strong>Note:</strong> Throws <code>RangeValidatorErrors.MinGreaterThanMax</code> if minVal &gt; maxVal.
</p>
