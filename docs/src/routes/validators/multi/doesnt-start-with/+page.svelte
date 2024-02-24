<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Doesn't Start With Validator</h1>
<hr class="mt-0 mb-4">
<p>
    Validate that an attribute doesn't start with one of the given values.
    The performed check is case insensitive
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    //
    (...values: primitive[]): ValidatorFn
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Multiple values</h3>
<p>The validator accepts one or more values used for the comparison. If the attribute's value doesn't start with one of the provided values, the check is valid</p>
<Code language="typescript">
    //
    new FormControl('', [
        NguardValidators.String.doesntStartWith('first', 'second', 'third')
    ])
</Code>
<h3>Different types allowed</h3>
<p>The validator performs checks against other types of data. I.e., if a number is provided, the validator checks if that number starts with one of the provided values:</p>
<Code language="typescript">
    //
    new FormControl('', [
        NguardValidators.String.doesntStartWith(24, 25, 26)
    ])
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>doesntStartWith</Badge> error is returned if the attribute starts with one of the provided values</p>