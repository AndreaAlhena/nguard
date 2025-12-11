<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Greater Than Validator</h1>
<hr class="mt-0 mb-4">
<p>
    Validates that an attribute is greater than the given field.
    The check is performed if both the fields have the same type.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    //
    (...compareFieldKey: string): ValidatorFn
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    //
    new FormControl('', [
        NguardValidators.Multi.greaterThan('fieldName')
    ])
</Code>
<h3>Usage notes</h3>
<p>
    Both the fields (the one under validation and the one used for comparing) must have the same data type.
    If a data type mismatch happens, a validation error is returned.
</p>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>greaterThan</Badge> error is returned if the attribute is not greater than the field used for comparing</p>