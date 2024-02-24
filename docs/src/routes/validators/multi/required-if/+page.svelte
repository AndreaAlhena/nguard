<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Required If Validator</h1>
<hr class="mt-0 mb-4">
<p>
    The field is required if another field, for the given fieldKey, is set.
    If a value is provided, the other field must match that value
    (the equality check is non strict until true is passed to the isStrict param)
    
    The field is considered filled if the provided value is true while casted to boolean
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (fieldKey: string, value?: primitive, isStrict: boolean = false): ValidatorFn
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>No value provided</h3>
<p>If target attribute marked by the provided <em>fieldKey</em> is evaluable to true, the field where the validator has been applied is required</p>
<Code language="typescript">
    //
    new FormControl('', [
        NguardValidators.String.requiredIf('anotherField', 'another field value', true)
    ])
</Code>

<h3>Value provided</h3>
<p>If target attribute marked by the provided <em>fieldKey</em> has the exact specified value (<em>value</em>), the field where the validator has been applied is required</p>
<Code language="typescript">
    //
    new FormControl('', [
        NguardValidators.String.requiredIf('anotherField', 'anotherField value')
    ])
</Code>

<h3>Strict</h3>
<p>If target attribute marked by the provided <em>fieldKey</em> has the exact specified value (<em>value</em>), the field where the validator has been applied is required</p>
<p>Comparison is made taking into account the data type of the fields. In example, 1 and '1' will not be considered the same:</p>
<Code language="typescript">
    //
    new FormControl('', [
        NguardValidators.String.requiredIf('anotherField', 'anotherField value')
    ])
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>requiredIf</Badge> error is returned if the attribute has been marked as required and there is no value provided to the same attribute where this validator has been applied</p>